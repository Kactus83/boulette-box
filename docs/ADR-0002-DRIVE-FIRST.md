# ADR-0002 — Drive-first : dossier partagé comme Box

- Statut : **ACCEPTÉ pour le modèle produit ; intégration technique EXPÉRIMENTALE**.
- Date : 2026-10-13.
- Remplace la proposition « compte Boulette Box + Auth0 + couple limité à deux » de la PR #5 pour le MVP.
- La PR #5 reste une piste historique utile si un stockage serveur privé devient nécessaire.

## Contexte

Le produit privilégie les comptes ChatGPT existants et le connecteur Google Drive
déjà autorisé individuellement par chaque participant. Notre application MCP ajoute
une interface et des scénarios guidés, mais n'est pas elle-même un proxy Google Drive.

## Décision

- 1 Box = 1 dossier Google Drive unique, pouvant contenir plusieurs participants.
- L'ID réel Google Drive est l'identifiant de localisation de la Box, jamais son nom.
- Un manifeste logique dans l'onglet Config d'une Google Sheet atteste qu'il s'agit
  d'une Box (signature, version, UUID interne et ID de dossier).
- La Box peut être renommée sans perdre son identité.
- Une personne peut avoir plusieurs Box ; elle choisit explicitement celle à utiliser.
- Les permissions Google servent d'autorisation d'accès **aux fichiers Drive**.
- L'app n'exige ni mot de passe ni compte Boulette Box dédié pour le parcours cible.

## Frontières de confiance

1. **ChatGPT** gère ses propres sessions et décide quels outils utiliser.
2. **Connecteur Google Drive ChatGPT** agit avec les permissions Google du compte
   connecté, sous ses propres contrôles et confirmations.
3. **UI MCP Boulette Box** pilote une conversation ; elle n'obtient pas de jeton
   du connecteur Google Drive et ne peut pas appeler directement ses fonctions.
4. **Serveur MCP Boulette Box** sert pour l'instant une UI et des données fictives.
   Il ne dispose d'aucune identité Google ni de droits sur les dossiers personnels.

Une conversation peut potentiellement orchestrer plusieurs outils disponibles.
Cela reste une **hypothèse à tester** ; ce n'est pas une garantie d'exécution ou
un canal de synchronisation machine-à-machine.

## Deux chemins d'exécution

### A. Conversation pilotée par ChatGPT (premier essai)

- Utilisateur déclenche « Déposer un sujet » dans Boulette Box.
- Boulette Box demande à ChatGPT d'engager un accompagnement verbal.
- ChatGPT clarifie / prépare le contenu et demande la confirmation explicite.
- Si ChatGPT peut appeler Drive dans ce contexte et a les droits, il écrit
  la donnée dans la Box choisie.
- ChatGPT peut lire / résumer les sujets existants depuis Drive et les présenter
  dans la conversation.

Avantages : évite OAuth Google développé par nous. Limites : invocations
potentiellement variables, interaction avec le bon dossier, résultats lisibles
dans le dashboard non garantis. Pour un plugin public, chaque outil MCP doit
remplir sa propre promesse sans exiger qu'un autre plugin soit appelé.

### B. Dashboard avec données fraîches garanties (solution de repli)

- Boulette Box implémente son propre adaptateur Drive côté serveur.
- Google autorise explicitement cet adaptateur (OAuth Google ou identité
  technique limitée selon la cible).
- Le serveur vérifie les droits de l'utilisateur sur chaque requête privée ;
  le simple partage du dossier ne suffit pas à authentifier une requête MCP.
- Le tableau de bord lit les données avec un contrat déterministe.

Avantages : dashboard indépendant et fiable. Coûts : gestion des jetons et
des autorisations, sécurité, hébergement. Aucun appel IA payant n'est nécessaire.

## Limites importantes

- Un éditeur Drive peut généralement modifier ou supprimer les données communes,
  même celles rédigées par autrui, hors de Boulette Box.
- Le partage d'un dossier peut donner accès à tout son contenu ; un brouillon
  marqué « privé » dans ce dossier **n'est pas privé**.
- L'auteur affiché dans une feuille n'est pas une identité cryptographiquement
  prouvée si les utilisateurs peuvent éditer les cellules.
- Une Box doit être partagée en accès restreint, jamais via « tous les
  utilisateurs disposant du lien », sauf choix explicitement assumé.
- Révocation Google : appliquée par Google à ses ressources ; l'UI MCP doit
  cesser d'afficher les données si elle ne peut plus les obtenir / autoriser.
- Les droits hérités du dossier ne fournissent pas un contrôle ligne par ligne.
- Une personne avec simple droit lecteur peut consulter mais pas contribuer.
- Aucune intégration Google externe ne doit être lancée sans accord explicite.

## Pourquoi nous ne créons pas maintenant Auth0

Une base d'utilisateurs, des invitations et un registre de groupes séparés
du Drive seraient redondants pour une première version conversationnelle.
Ils ne résoudraient pas à eux seuls l'accès au Drive ni la dépendance
entre plugins. Il reste **interdit** d'exposer des outils MCP privés anonymes ;
si la variante B est nécessaire, une authentification protocolaire adaptée
redeviendra un prérequis.

## Critères de réexamen

Déclencher une nouvelle ADR si :
- Q-01/Q-02 de DECISIONS ne sont pas techniquement réalisables ;
- le modèle de droits Google ne suffit plus pour la confidentialité visée ;
- l'authenticité des auteurs et les écritures immuables deviennent requises ;
- un stockage de brouillons privés en dehors des conversations est demandé ;
- distribution publique exige un outil autonome.

## Sources

- https://developers.google.com/workspace/drive/api/guides/manage-sharing
- https://developers.google.com/workspace/drive/api/guides/limited-expansive-access
- https://developers.openai.com/plugins/plugin-guidelines
- https://developers.openai.com/plugins/build/extensions
- https://developers.openai.com/plugins/concepts/mcp-server
