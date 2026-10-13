# Expérimentations et preuves — journal vivant

**Aucune de ces expérimentations ne doit utiliser des messages personnels.**
Ne jamais qualifier un test de réussi à partir d'une simple possibilité
conceptuelle. Enregistrer une date, un environnement, une observation et,
si possible, un lien de run / capture expurgée.

## E-000 : capacités déjà observées

- Compte ChatGPT testé : Bits & Bolts Remote installé et accessible
  dans la barre latérale (retour utilisateur, 2026-10-13).
- Serveur MCP Boulette Box : Node 24, npm ci, typecheck, unit tests,
  build, HTTP health check réussis sur GitHub Actions.
  CI : https://github.com/Kactus83/boulette-box/actions/runs/38378327509
- **Non démontré** : notre propre app affichée dans ChatGPT ;
  son interaction avec Drive ; les écritures et le partage multi-comptes.

## E-001 — Endpoint MCP réel dans ChatGPT [P0]

Précondition : test HTTP HTTPS, identité du plugin de démonstration.
Action : connecter Boulette Box, ouvrir via barre latérale, cliquer
« Déposer un sujet », « Aide ».
Réussite : dashboard réellement visible + conversation lancée ;
toute absence de bridge doit être observée / expliquée.
N'utiliser que les sujets factices.

## E-002 — Orchestration ChatGPT + Drive [P0]

Précondition : connecteur Drive de l'utilisateur relié ; dossier TEST
autorisé créé avec confirmation.
Action : depuis la conversation déclenchée par Boulette Box, demander
création du document/sheet test, lecture puis publication d'une
perspective fictive après accord explicite.
Réussite : l'action Drive s'est déroulée avec le bon compte et le bon
dossier ; relecture indépendante du fichier, aucune écriture non validée.
Échec : ChatGPT ne peut pas utiliser les outils requis dans le contexte
du plugin, ou ne sait pas cibler fiablement le fichier.

## E-003 — Identification / découverte du dossier [P0]

Créer deux dossiers fictifs portant le même nom. Fournir uniquement l'ID
du bon dossier ; vérifier le marqueur « Boulette Box » et sa version.
Réussite : aucun choix basé uniquement sur le libellé.
Nécessite la validation effective des outils de découverte Drive.

## E-004 — Comptes indépendants et ACL [P0]

Compte A éditeur, compte B éditeur, compte C sans accès.
Action : publier un sujet fictif via A, lire depuis B et tenter
l'accès depuis C ; révoquer B puis réessayer.
Réussite : A/B voient le même document avant révocation ; C/B révoqué
n'accèdent plus via leurs comptes Google. Tester lecteurs également.
Attention : ce test **ne prouve pas** une identité auteur côté serveur MCP.

## E-005 — Dashboard dynamique [P0]

Action : faire lire à ChatGPT une Box de test et faire parvenir aux
composants UI un résultat structuré, puis modifier la feuille et rafraîchir.
Réussite : chiffres et liste exacts, statut de fraîcheur explicite,
absence de cache privé visible par un autre utilisateur.
Échec probable : pas de passerelle fiable inter-plugins. Dans ce cas,
documenter les limites et décider d'un adaptateur Google direct + auth.

## E-006 — Modifications concurrentes [P0 avant vrai usage]

Deux comptes publient / modifient presque simultanément un sujet fictif.
Vérifier absence d'écrasement, doublons, pertes et incohérences du statut.
Retenter après interruptions simulées. Résultat à consigner.

## E-007 — Brouillon privé [P0 avant vrai usage]

Rédiger un brouillon test dans une conversation privée.
Vérifier qu'il n'existe dans aucun dossier partagé avant l'accord.
Après refus de publication, vérifier absence d'écriture Drive.

## E-008 — Faisabilité plugin public [P1]

Vérifier que chaque outil MCP public fonctionne de manière autonome
et n'exige pas l'invocation préalable d'un autre plugin.
Si un outil exige Google Drive ChatGPT, ne pas le promettre comme
outil MCP public autonome.

## Tableau des résultats

| ID | Résultat | Preuves | Prochaine action |
|---|---|---|---|
| E-000 | PARTIELLEMENT VALIDÉ | Retour Bits & Bolts + run CI ci-dessus | Connecter notre plugin |
| E-001 | NON EXÉCUTÉ | — | Déployer endpoint test |
| E-002 | NON EXÉCUTÉ | — | Configurer dossier fictif |
| E-003 | NON EXÉCUTÉ | — | Tester recherche et ID |
| E-004 | NON EXÉCUTÉ | — | Inviter comptes de test |
| E-005 | NON EXÉCUTÉ | — | Prototype structuré |
| E-006 | NON EXÉCUTÉ | — | Tests simultanés |
| E-007 | NON EXÉCUTÉ | — | Test de non-publication |
| E-008 | NON EXÉCUTÉ | — | Vérifier règles de distribution |
