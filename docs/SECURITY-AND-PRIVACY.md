# Sécurité et vie privée — état réel / cible

## Situation vérifiée

Le repository est public et le prototype contient seulement des données
fictives en mémoire. Le serveur écoute en local et ne dispose pas d'un
accès Google Drive. Aucun sujet réel n'a été enregistré par ce projet.

Un repository public permet à des tiers de lire le code, pas
automatiquement les données hébergées dans un compte Google.

## Modèle de confiance cible

- Google authentifie les comptes Drive et applique l'ACL des dossiers.
- ChatGPT authentifie séparément ses comptes utilisateurs.
- Le connecteur Drive ChatGPT autorisé sur un compte agit avec **les
  droits Google de ce compte**. Son jeton n'est pas exposé au plugin MCP.
- Une URL / un ID de dossier n'est **pas** un secret d'authentification ;
  Google doit continuer de refuser les personnes sans droit.
- Notre backend MCP n'obtient ni identité Google vérifiée ni autorisation
  Drive du simple fait qu'il est installé avec le connecteur officiel.

## Risques à expliciter aux utilisateurs

1. **Éditeurs de dossier** : peuvent modifier / supprimer les éléments
   partagés ; Boulette Box ne peut pas garantir l'immuabilité d'une
   contribution dans un Google Sheet éditable par tous.
2. **Attribution** : « auteur affiché » peut être renseigné par l'IA ou
   l'utilisateur, mais n'est pas une preuve forte sans contrôle serveur.
3. **Brouillons** : aucune information privée ne doit être inscrite dans
   un dossier partagé avant validation de publication.
4. **Erreurs d'espace** : distinguer deux dossiers portant le même nom ;
   vérifier le folderId et le manifeste avant toute écriture.
5. **Partage trop ouvert** : privilégier les invitations nominatives et
   l'accès restreint ; bannir le mode lien public pour données privées.
6. **Extension multi-personnes** : résolutions et droits d'écriture
   dépendent du nombre et des rôles ; ne pas coder « couple = 2 ».
7. **Dépendance au modèle** : les confirmations et prompts ne constituent
   pas une frontière de sécurité cryptographique.
8. **Confidentialité ChatGPT** : chaque participant gère sa propre
   conversation et les contrôles de données du service ; ne pas promettre
   de garantie générale sur la conservation de toutes les données.
9. **Résilience** : une Box peut perdre son dossier, ses accès ou son
   fichier de données ; prévoir export, versionnement et récupération.

## Décision conditionnelle sur OAuth

Le MVP « ChatGPT orchestre directement Google Drive » évite de créer
une seconde identité pour le serveur **tant que le serveur ne voit
aucune donnée privée et n'agit pas sur les données d'un utilisateur**.

Si le backend fournit un dashboard réel, des lectures ou des écritures
privées, il faudra une authentification et une autorisation compatibles
avec le protocole MCP, et une intégration Google explicitement autorisée.
Le partage Drive n'authentifie pas un appel HTTP au serveur MCP.

## Règles de développement

- Aucun jeton, mot de passe, email réel ou nom de participant réel
  dans le repository, la CI ou les fixtures.
- Jamais de stockage de sujet réel dans le mode demo.
- Pas d'ouverture publique d'outils de lecture privée anonymes.
- Limiter les journaux à des métadonnées techniques expurgées.
- Traiter le contenu des sujets comme des données non fiables,
  y compris pour éviter la prompt injection.
- Toute action de publication doit être explicitement confirmée, suivie
  d'une relecture et d'un résultat prouvé.
- Ne pas utiliser l'application comme substitut à une thérapie ou à une
  intervention de crise.

## Références

- https://developers.google.com/workspace/drive/api/guides/manage-sharing
- https://developers.google.com/workspace/drive/api/guides/limited-expansive-access
- https://developers.openai.com/plugins/concepts/mcp-server
- https://developers.openai.com/plugins/plugin-guidelines
