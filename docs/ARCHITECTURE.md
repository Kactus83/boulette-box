# Architecture — Boulette Box

## Intention

Application de communication guidée destinée d'abord à deux personnes,
éventuellement distribuée publiquement ultérieurement.

## Frontières

- **ChatGPT** : langage naturel, guidage, reformulation et analyse.
- **UI MCP Apps** : tableau de bord et actions explicites.
- **Serveur MCP** : contrats, permissions, contrôle des écritures, accès au stockage.
- **Stockage futur** : adaptateur Google Drive / Sheets ou alternative, sans accès automatique depuis le connecteur ChatGPT.
- **Données privées** : hors du stockage partagé tant qu'aucune publication n'a été approuvée.

## Prototype 0.1.0

- API MCP en lecture seule, un outil : open_dashboard.
- Entrées global + thread sous réserve des capacités de l'hôte ChatGPT.
- Interface intégrée en HTML autonome compilé par Vite.
- Quatre boutons qui utilisent le message MCP Apps pour demander un workflow à ChatGPT.
- Trois sujets fictifs : aucune persistance, authentification ou API IA externe.

## Contraintes de sécurité

Le prototype est réservé au test avec données fictives.
Ne pas connecter un stockage réel ni exposer une opération d'écriture avant
d'avoir ajouté authentification OAuth, contrôle d'accès, consentement à la
publication, gestion des secrets, validation des origines et tests multi-utilisateurs.

## Prochaines étapes

1. Valider l'installation, le build local, MCP Inspector et l'interface dans ChatGPT.
2. Tester les entrées globales et thread sur les deux comptes.
3. Introduire un modèle Topic/Perspective et un repository métier indépendant du stockage.
4. Ajouter authentification OAuth et stockage durable.
5. Ajouter les écritures contrôlées, avec confirmation explicite des deux personnes lorsque nécessaire.
6. Stabiliser URL et identité du plugin avant distribution publique.
