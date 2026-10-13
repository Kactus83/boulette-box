# Contrat de données candidat — Drive / Sheets

**Statut : PROVISOIRE ; aucun Google Sheet réel créé.**

## Localisation

- 1 dossier Google Drive = 1 Box.
- 1 Google Sheet **Boulette Box — Données** dans le dossier.
- Le fichier comporte des onglets : Config, Topics, Perspectives, Resolutions.
- Le dossier est choisi par **ID Google Drive réel**, et non par libellé.
- Le registre Config établit la correspondance avec un identifiant métier UUID.
- Schéma versionné, pour envisager les migrations sans casser les anciennes Box.

## Onglet Config (clé -> valeur)

| clé | exemple fictif | remarque |
|---|---|---|
| kind | boulette-box | signature du projet |
| schemaVersion | 1 | version du stockage |
| boxId | 82a66762-e210-49f0-9751-ce428301702d | UUID stable, fictif |
| driveFolderId | demo-folder-id-only | doit correspondre au dossier accessible |
| displayName | Box de démonstration | modifiable |

Le contrat TypeScript de démonstration valide uniquement les cinq champs ci-dessus. Un futur horodatage de création nécessitera une évolution versionnée du schéma, pas une colonne silencieusement ajoutée.

Si l'ID folder ne correspond pas au dossier demandé, **refuser**
l'association automatique et demander une nouvelle vérification.

## Onglet Topics

| champ | type | règle |
|---|---|---|
| topicId | UUID | unique, stable |
| boxId | UUID | même Box que Config |
| title | texte court | pas de données personnelles superflues |
| category | texte / enum contrôlée | extensible |
| content | texte | publié volontairement |
| authorLabel | texte | **déclaratif**, non authentifié par le Sheet |
| createdAt | ISO 8601 UTC | immuable en fonctionnement normal |
| updatedAt | ISO 8601 UTC | suivi des éditions |
| status | PENDING / IN_DISCUSSION / RESOLVED | transitions à valider |
| revision | entier positif | aide à détecter les éditions concurrentes |

## Onglet Perspectives

| champ | type | règle |
|---|---|---|
| perspectiveId | UUID | clé stable |
| topicId | UUID | sujet existant |
| authorLabel | texte | déclaratif, non une identité vérifiée |
| body | texte | contribution distincte |
| createdAt | ISO 8601 UTC | horodatage |
| revision | entier | aide au suivi |

**Règle d'intégrité :** l'ajout d'une perspective est une insertion,
jamais une mise à jour d'une perspective d'un autre auteur par l'IA.
Mais les éditeurs directs du Sheet disposent toujours de leurs permissions
Google ; le modèle n'offre pas de garantie de non-modification hors app.

## Onglet Resolutions

Le modèle de validation collective reste ouvert. Préparer au minimum :
resolutionId, topicId, proposal, proposedByLabel, proposedAt,
state, approvals, updatedAt. Ne pas coder une règle « deux validations »
tant que la sémantique multi-personnes n'est pas décidée.

## Synchronisation et concurrence

Google Sheets ne fournit pas de transaction métier multi-onglets par défaut.
Une lecture-modification-écriture naïve peut écraser une contribution.
Tester explicitement deux publications simultanées, les retries et les
éditions externes.

Choix candidats : ajouts de lignes plutôt qu'overwrite, UUID + idempotency
key, batch API pour opérations liées, comparaison de révision,
relecture systématique après écriture. **Aucun de ces mécanismes
n'est encore implémenté ni garanti pour le connecteur ChatGPT.**

## Confidentialité

- Les brouillons personnels ne figurent **dans aucun** de ces onglets.
- N'y placer aucune clé API, jeton OAuth ni identifiant de session ChatGPT.
- Toute personne disposant des droits Drive appropriés peut ouvrir
  directement le Sheet et en inspecter les données.
- Ne pas présenter un auteur / contributeur affiché comme une preuve
  d'identité forte.
