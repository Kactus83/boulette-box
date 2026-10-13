# ADR-0001 — Identité, autorisation et confidentialité

- **Statut : proposition pour validation**, 13 octobre 2026.
- **Portée :** Boulette Box, première expérimentation privée à deux utilisateurs.
- **Références :** documentation officielle OpenAI Plugins « Authentication », MCP Authorization, Google Drive « Sharing / Scopes ».

## Contexte

Le repository GitHub `Kactus83/boulette-box` est public. Il ne contient actuellement
que du code et trois sujets fictifs. Cela **ne rend pas publiques** des données
conservées dans un service ultérieur : les permissions du repository Git et
les permissions du serveur MCP sont deux mécanismes indépendants.

Le serveur MCP actuel est exclusivement une démonstration sans stockage ni
authentification. **Interdiction de le relier à des informations réelles** tant
que les contrôles décrits ci-dessous ne sont pas implémentés et testés.

## Décision proposée

Utiliser trois frontières distinctes :

1. **Identification de l'utilisateur** via OAuth 2.1 conforme aux attentes MCP.
   Fournisseur envisagé : Auth0 (éventuellement avec connexion sociale Google).
   Éviter de développer un serveur d'identité ou des mots de passe maison.
   Ne pas activer Dynamic Client Registration (DCR) sans justification et
   restrictions ; une configuration client prédéfinie ou CIMD compatible serait
   préférable après vérification des paramètres du fournisseur.
2. **Autorisation métier**, exécutée dans Boulette Box à chaque requête.
   Un compte identifié ne devient jamais membre du couple automatiquement.
   L'accès n'est accordé qu'aux deux identifiants `sub` approuvés dans la
   relation : `actorId` et `coupleId` sont déterminés côté serveur.
3. **Accès au stockage**, séparé de l'identité ChatGPT et des jetons OAuth MCP.
   Option initiale : Google Sheets / Drive derrière un adaptateur serveur.
   La possession d'un compte Google ne donne pas à Boulette Box l'accès Drive.
   Un fichier dédié peut être autorisé à une identité technique serveur, ou
   bien un flux OAuth Google distinct doit être mis en place. Choix à valider.

### Ne pas confondre les identifiants

| Élément | Responsable | Secret ? | Utilité |
|---|---|---|---|
| Compte ChatGPT personnel | Chaque participant | Oui : session non partagée | Utiliser ChatGPT |
| Session / connexion du fournisseur d'identité | Chaque participant | Oui | Authentifier la personne |
| `client_id` OAuth | Fournisseur d'identité | Généralement non | Identifier le client OAuth |
| Jeton d'accès MCP | Fournisseur / ChatGPT | Oui | Appeler le serveur MCP au nom de la personne |
| `sub` stable | Fournisseur d'identité | Non en soi, donnée personnelle | Identifier le participant |
| Clé ou jeton Google du service | Serveur, gestionnaire de secrets | **Oui** | Accéder au fichier explicitement autorisé |
| URL et ID du fichier Google | Serveur | Non secret d'authentification | Pointer vers la ressource ciblée |

Aucun mot de passe, access token, refresh token ou clé JSON de compte
de service n'est commité dans GitHub, placé dans `plugin.json`, affiché
dans des logs CI ni transmis par une conversation.

### Flux d'authentification MCP

1. ChatGPT invoque un outil protégé et reçoit le challenge OAuth avec la
   metadata `/.well-known/oauth-protected-resource`.
2. Le navigateur ouvre le fournisseur OAuth ; l'utilisateur s'authentifie
   et consent aux seules permissions requises.
3. ChatGPT obtient puis présente un bearer token au serveur MCP.
4. Le serveur vérifie cryptographiquement signature/JWKS, `iss`, `aud`,
   `exp`, `nbf` et scopes, **à chaque requête**.
5. Le serveur résout le `sub` validé vers un participant explicitement
   autorisé et son `coupleId`.
6. Les opérations métier vérifient l'appartenance au couple et les droits
   sur les contenus ciblés avant d'appeler le stockage.
7. Les réponses ne contiennent que les données accessibles à l'appelant.

L'interface, les prompts et les identifiants de sujets fournis par
ChatGPT sont considérés comme **non fiables** pour le contrôle d'accès.
Ils ne peuvent jamais imposer `authorId`, `actorId` ou `coupleId`.

### Politique d'accès

| Opération | Non connecté | Participant A | Participant B | Tiers |
|---|---|---|---|---|
| Voir une démo entièrement fictive | Autorisé | Autorisé | Autorisé | Autorisé |
| Voir le dashboard réel du couple | Refus | Autorisé | Autorisé | Refus |
| Créer son propre brouillon privé | Refus | Autorisé | Autorisé | Refus |
| Lire le brouillon privé de l'autre | Refus | Refus | Refus | Refus |
| Publier sa contribution | Refus | Oui, avec confirmation | Oui, avec confirmation | Refus |
| Modifier la contribution de l'autre | Refus | Refus | Refus | Refus |
| Proposer la résolution d'un sujet | Refus | Autorisé | Autorisé | Refus |
| Confirmer une résolution | Refus | Sa confirmation | Sa confirmation | Refus |

Les résolutions nécessitent deux confirmations distinctes. Les brouillons
privés ne vont jamais dans un espace Google Drive partagé visible directement
aux deux personnes. Dans le MVP initial, ils peuvent rester non persistants,
dans une conversation personnelle, jusqu'à confirmation de publication.
Si les brouillons persistants sont demandés plus tard, ajouter un espace
privé isolé par utilisateur et réévaluer confidentialité/rétention.

### Domaines et identifiants

Modèle métier minimal envisagé :

- `User { id, identityIssuer, identitySubject, status }`
- `Couple { id, status }`
- `Membership { userId, coupleId, role, status }`
- `Topic { id, coupleId, authorId, status, ... }`
- `Perspective { id, topicId, authorId, content, ... }`
- `ResolutionApproval { topicId, userId, approvedAt }`

Ne pas utiliser une adresse e-mail comme clé primaire ni comme unique
preuve d'appartenance. Le propriétaire de chaque contribution est déterminé
par la session validée. Les ACL sont réévaluées à chaque opération.
Les sessions ne doivent pas être accessibles au moyen de simples
identifiants séquentiels sans autorisation (IDOR).

### Google Drive / Sheets

**Option A — compte de service technique à accès limité :**

- Créer le fichier Google Sheet avec un compte Google humain.
- Autoriser explicitement l'adresse du compte de service à accéder
  uniquement à ce fichier (les comptes de service ne possèdent pas
  de quota My Drive et ne doivent pas créer des fichiers en leur nom).
- Stocker l'identité technique et ses permissions hors du repository.
- Toutes les opérations passent par l'adaptateur serveur.
- Ne pas distribuer l'accès direct au Sheet si les permissions métier doivent
  être imposées exclusivement par Boulette Box.

**Option B — OAuth Google distinct :**

- Chaque utilisateur autorise les fichiers nécessaires à Boulette Box.
- Choisir un scope étroit comme `drive.file` lorsque son usage réel le
  permet ; ne pas demander un accès complet à Drive.
- Gérer les refresh tokens et le consentement Google séparément de OAuth MCP.

**Préférence pour un premier couple :** option A avec un fichier
existant explicitement partagé avec l'identité technique. Elle évite
un second flux utilisateur OAuth, mais sa faisabilité et ses ACL doivent
être éprouvées sur les comptes Google réels avant tout engagement.

### Mesures obligatoires avant usage réel

- HTTPS pour l'endpoint accessible à ChatGPT.
- Challenge `401 Unauthorized` + metadata OAuth de découverte.
- `securitySchemes` corrects pour chaque outil ; aucun outil privé anonyme.
- Validation JWT complète et **échec fermé** si configuration absente.
- Autorisation par `sub` / membership / relation, jamais par confiance dans le modèle.
- Validation Zod, longueurs maximales, contrôle de fréquence et quotas d'appels.
- Vérification d'Origin/Host selon transport, protection des points d'entrée HTTP,
  CORS strictement limité, protections adaptées aux tunnels de développement.
- Journalisation expurgée (pas de messages, prompts, jetons, emails ni corps privés).
- Secrets stockés dans un gestionnaire de secrets ou des variables protégées.
- Consentement explicite avant écriture et historique des actions publiées.
- Ne pas injecter directement les textes des utilisateurs dans des instructions
  système : le contenu de sujet est une donnée non fiable.

### Déploiement

- Le seul `/health` anonyme retourne un état générique sans données personnelles.
- Les outils *demo* peuvent rester non authentifiés **uniquement** avec des données fictives.
- Les outils réels de lecture/écriture sont protégés par OAuth puis par l'autorisation métier.
- Garder le domaine et l'URL du serveur MCP stables avant publication publique.
- Préparer l'installation sur deux comptes ChatGPT indépendants, mais connectés
  au même backend, avec authentification individuelle.

## Tests d'acceptation

- [ ] Absence de token => 401 / challenge OAuth, aucune donnée.
- [ ] Token mal signé / expiré / mauvaise audience => refus.
- [ ] Token valide, utilisateur absent de l'allowlist => refus.
- [ ] Token valide, autre `coupleId` => refus.
- [ ] Participant A ne peut pas lire le brouillon de B.
- [ ] Participant A ne peut pas modifier la perspective de B.
- [ ] Le client ne peut pas imposer un `authorId` différent.
- [ ] Deux confirmations différentes exigées pour une résolution.
- [ ] Le rollback de publication ne perd aucune contribution.
- [ ] Le résultat du dashboard est limité à son couple.
- [ ] Les journaux n'exposent aucune donnée personnelle.
- [ ] Une clé Google invalide / absente donne une erreur sans exposer le secret.
- [ ] Les données fictives restent utilisables sans secrets en mode démo.
- [ ] Les tests multi-utilisateurs passent avant premier sujet réel.

## Jalons

1. Prouver que l'interface MCP s'ouvre avec des sujets fictifs.
2. Déployer un endpoint HTTPS stable de test.
3. Sélectionner puis configurer le fournisseur OAuth compatible MCP.
4. Mettre en place authentification et membership des deux comptes.
5. Tester les droits avec deux utilisateurs fictifs et un tiers.
6. Connecter une feuille Google **de test**.
7. Autoriser des sujets personnels seulement après validation multi-utilisateurs.

## Décisions ouvertes

- Fournisseur OAuth : Auth0 proposé ; confirmer compatibilité/conditions
  et choix de la connexion sociale Google.
- Accès Google : compte de service limité ou second OAuth Google.
- Emplacement des éventuels brouillons privés persistants.
- Endpoint d'hébergement et son gestionnaire de secrets.
- Visibilité du code GitHub (public acceptable **sans** secrets ni données).
