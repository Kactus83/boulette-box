# Boulette Box

Un espace partagé pour déposer ses pensées, mieux se comprendre et préparer des échanges à plusieurs.

> **Prototype technique 0.1.0 : uniquement des sujets fictifs.** Rien n'est enregistré ni publié.

## Architecture

- Serveur MCP **v2** TypeScript en Streamable HTTP sur /mcp.
- Tableau de bord MCP Apps, avec tentative d'entrée globale et de panneau de conversation.
- Actions ouvrant une conversation guidée via le bridge MCP Apps.
- Aucune API d'inférence IA ni connexion Google Drive à ce stade.

Lire d'abord le [centre de documentation](docs/README.md), puis le
[registre des décisions](docs/DECISIONS.md) et l'[ADR Drive-first](docs/ADR-0002-DRIVE-FIRST.md).

La cible : **une Box = un dossier Google Drive partagé**, plusieurs participants possibles, chaque personne utilisant son propre ChatGPT et son connecteur Google Drive. Ce modèle produit est validé ; l'interopérabilité effective entre les plugins et l'alimentation autonome du dashboard sont encore à tester.

Voir aussi [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) et [docs/CI.md](docs/CI.md).

## Prérequis

- Node.js 22.12 ou supérieur (version LTS conseillée)
- npm récent
- Éventuellement un tunnel HTTPS temporaire pour tester depuis ChatGPT

## Démarrage sous Windows (PowerShell)

    git clone https://github.com/Kactus83/boulette-box.git
    cd boulette-box
    git fetch origin
    git switch develop
    npm ci
    npm run typecheck
    npm test
    npm run build
    npm start

Puis ouvrir http://127.0.0.1:8787/health. Résultat attendu :
{"status":"ok","app":"boulette-box","mode":"demo"}.

Pour inspecter l'API MCP :

    npx @modelcontextprotocol/inspector@latest

Configurer **Streamable HTTP** et l'URL http://127.0.0.1:8787/mcp.

## Test ChatGPT

Ne créer le plugin personnel qu'après validation locale. Exposer temporairement
le port 8787 via un tunnel HTTPS et connecter l'URL HTTPS suivie de /mcp.
Invoquer l'outil open_dashboard. Vérifier si l'entrée de barre latérale apparaît.
Le support dépend du client ChatGPT.

## Développement

    npm run dev

Le script reconstruit d'abord le HTML puis surveille le serveur.
Après changement dans l'interface, relancer npm run build (un mode watch UI viendra ensuite).

## Limites connues

- Le package-lock.json provient de la première exécution GitHub Actions réussie.
- Typecheck, tests, build et démarrage HTTP validés sur GitHub Actions (Node.js 24).
- La connexion MCP à ChatGPT et le rendu réel du dashboard restent à valider.
- Les comptes ChatGPT personnels et leur connecteur Drive sont la cible fonctionnelle ;
  notre MCP ne récupère **pas** automatiquement les autorisations du connecteur Google.
- Le modèle Drive-first, le partage, la persistance et les écritures restent à valider et construire.
- Pas de données privées ni de tokens dans le dépôt Git.
- Ne pas exposer ce prototype sans authentification avec de vraies données.

## Source technique

- https://developers.openai.com/plugins/build/app-quickstart
- https://developers.openai.com/plugins/build/extensions
- https://github.com/modelcontextprotocol/typescript-sdk
- https://github.com/modelcontextprotocol/ext-apps
