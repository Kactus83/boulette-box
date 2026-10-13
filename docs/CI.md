# CI GitHub — exécution économique

## Branches

- `master` : branche principale GitHub, contient `.github/workflows/quality.yml`.
- `develop` : branche d'intégration, aucune exécution automatique.
- `dev/*`, `feature/*`, `fix/*` : branches de travail sans exécution automatique.

Les événements `push`, `pull_request` et `schedule` ne déclenchent **aucune CI**.
Le workflow s'exécute toujours depuis la branche par défaut `master`,
mais peut vérifier le contenu d'une branche indiquée par `target_ref`.
Une exécution valide donc un ref donné, pas automatiquement toutes les branches.

## Déclencher une validation (UI GitHub)

1. Ouvrir **Actions** > **Boulette Box · Quality (on demand)**.
2. Cliquer **Run workflow**.
3. Dans le sélecteur **Branch**, choisir **master** (obligatoire).
4. Renseigner **target_ref**, par exemple `develop` ou `dev/flo/mcp-bootstrap`.
5. Cliquer **Run workflow** puis examiner les logs.

Le workflow comporte un garde empêchant toute exécution du job depuis
une autre branche GitHub. Les refs testables sont `master`, `develop`,
`dev/*`, `feature/*` et `fix/*`.

Un point d'entrée alternatif existe pour l'application GitHub connectée :
**seul le propriétaire Kactus83** peut créer une issue intitulée
`[ci] validate`, dont la première ligne du corps est le ref autorisé.
L'événement est traité sur `master`; les autres issues sont ignorées.

## Contrôles

1. Checkout de la branche cible (sans persister les identifiants).
2. Installation Node.js 24 LTS.
3. `npm ci --no-audit --no-fund` à partir de `package-lock.json`.
4. `npm run typecheck`.
5. `npm test`.
6. `npm run build`.
7. Démarrage HTTP et vérification de `GET /health`.

Timeout global du job : 12 minutes. Concurrence limitée à une exécution.
Autorisations minimales : `contents: read`.

## Protocole Git

- Les commits métier vont sur les branches de travail.
- Ouvrir une PR vers `develop`.
- Valider ponctuellement par la CI de `master` en visant la branche de PR.
- Fusionner dans `develop` après examen des résultats.
- Promouvoir plus tard vers `master` avec PR de release.

Ne pas mettre de secrets dans les inputs de workflow, les issues ou les logs.
Ne pas exposer de données de couple lors des premiers tests du prototype.
