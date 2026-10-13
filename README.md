# Boulette Box

Un espace pour déposer ses pensées, mieux se comprendre et préparer des échanges à deux.

> **Prototype technique 0.1.0 : uniquement des sujets fictifs.** Rien n'est enregistré ni publié.

## Architecture

- Serveur MCP **v2** TypeScript en Streamable HTTP sur /mcp.
- Tableau de bord MCP Apps, avec tentative d'entrée globale et de panneau de conversation.
- Actions ouvrant une conversation guidée via le bridge MCP Apps.
- Aucune API d'inférence IA ni connexion Google Drive à ce stade.

Voir [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) et [docs/CI.md](docs/CI.md).

## Prérequis

- Node.js 22.12 ou supérieur (version LTS conseillée)
- npm récent
- Éventuellement un tunnel HTTPS temporaire pour tester depuis ChatGPT

## Démarrage sous Windows (PowerShell)

    git clone https://github.com/Kactus83/boulette-box.git
    cd boulette-box
    git fetch origin
    git switch dev/flo/mcp-bootstrap
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
- La connexion automatique aux comptes ChatGPT personnels, le partage, la persistance,
  l'authentification et les écritures restent à construire.
- Pas de données privées ni de tokens dans le dépôt Git.
- Ne pas exposer ce prototype sans authentification avec de vraies données.

## Source technique

- https://developers.openai.com/plugins/build/app-quickstart
- https://developers.openai.com/plugins/build/extensions
- https://github.com/modelcontextprotocol/typescript-sdk
- https://github.com/modelcontextprotocol/ext-apps
