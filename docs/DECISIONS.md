# Registre de décisions

Mis à jour : 2026-10-13. Ce document distingue les choix métier des assertions techniques.

| ID | Décision / hypothèse | Statut | Justification et suite |
|---|---|---|---|
| D-001 | Nom du produit : **Boulette Box** ; identifiant code : boulette-box | VALIDÉ — produit | Même nom pour prototype et future diffusion |
| D-002 | Aider à formuler, nuancer, comprendre, discuter, sans arbitrage ni diagnostic | VALIDÉ — produit | Rôle de facilitateur, pas de thérapeute |
| D-003 | Lancement dans ChatGPT via plugin + interface MCP | VALIDÉ — produit | Bits & Bolts affiche bien une application en barre latérale sur le compte testé ; notre plugin reste à connecter |
| D-004 | Ne pas facturer d'API de modèle IA externe au MVP | VALIDÉ — produit | ChatGPT effectue les opérations conversationnelles ; API Google distincte = pas d'API de modèle |
| D-005 | Une Box correspond conceptuellement à **un dossier Google Drive partagé** | VALIDÉ — produit | Le dossier matérialise l'espace commun |
| D-006 | Plusieurs participants, au-delà d'un couple, sans nombre 2 codé en dur | VALIDÉ — produit | Généraliser le produit ; résolution consensuelle à définir |
| D-007 | Une personne peut appartenir à plusieurs Box, chacune identifiée par son ID de dossier | VALIDÉ — produit | Le nom d'un dossier n'est pas unique |
| D-008 | Chaque participant utilise son compte ChatGPT et son propre connecteur Google Drive | VALIDÉ — produit | Pas de nouveau compte Boulette Box dans le parcours souhaité |
| D-009 | Réutiliser le connecteur Drive ChatGPT pour les opérations guidées dès que possible | PROVISOIRE | Tester coordination conversationnelle sans dépendance MCP croisée obligatoire |
| D-010 | Le partage Google Drive régit l'accès au dossier et à son contenu | VALIDÉ — technique (principe) | ACL natives Google ; ne garantit pas l'identité des auteurs ni la protection par ligne |
| D-011 | Configurer / rejoindre une Box via conversation guidée et raccourcis UI | VALIDÉ — produit | Vérifier les actions réellement offertes par le connecteur |
| D-012 | Un Google Sheet central avec onglets Config, Topics, Perspectives, Resolutions | PROVISOIRE | Schéma candidat ; vérifier création, lecture ciblée, concurrence et volume |
| D-013 | Brouillons privés : **jamais** dans un fichier accessible à tous | VALIDÉ — produit, BLOQUANT | MVP sans persistance des brouillons partagés |
| D-014 | Publication / mise à jour sensible uniquement après confirmation claire | VALIDÉ — produit, BLOQUANT | Un prompt ne doit pas faire office de contrôle de sécurité |
| D-015 | Conserver les perspectives distinctes, sans modifier silencieusement les propos d'autrui | VALIDÉ — produit | Intégrité métier ; Drive seul ne peut pas l'imposer |
| D-016 | Dashboard permanent, menu, choix d'espace, indicateurs, liste de sujets | VALIDÉ — produit | Source de données et synchronisation toujours à résoudre |
| D-017 | Le composant MCP appelle directement les outils du plugin Google Drive ChatGPT | ÉCARTÉ comme hypothèse | Aucune passerelle automatique garantie entre deux plugins |
| D-018 | Le dashboard peut être rafraîchi par des données relayées depuis ChatGPT | À TESTER | Possible conceptuellement, fiabilité et accès au bridge non prouvés |
| D-019 | Un serveur MCP public peut exiger l'exécution d'un second plugin pour fonctionner | ÉCARTÉ | Les outils publics doivent pouvoir remplir leur fonction de façon indépendante |
| D-020 | Accès Google direct depuis notre backend | DIFFÉRÉ | Alternative si dashboard autonome indispensable ; implique autorisation Google et sécurité |
| D-021 | Auth0, serveur d'identité maison, rôles couple/member | DIFFÉRÉ | Ancienne proposition PR #5 non adaptée comme base du MVP Drive-first |
| D-022 | Contrôle d'accès supplémentaire si le backend conserve des données privées ou agit pour un utilisateur | VALIDÉ — sécurité, BLOQUANT | Pas d'accès privé par serveur anonyme ; OAuth MCP ou architecture approuvée |
| D-023 | Code dans un repository public, sans secrets ni données privées | VALIDÉ — produit | Ne signifie pas que des fichiers Drive deviennent publics |
| D-024 | Branches master -> develop -> dev/* ; CI GitHub uniquement sur master, manuelle | VALIDÉ — technique | CI initiale verte (Node 24, npm ci, tests, build, health) |
| D-025 | Premiers tests : uniquement des sujets et des comptes fictifs | VALIDÉ — sécurité, BLOQUANT | Aucune donnée réelle avant protocole de sécurité complet |
| D-026 | Publier publiquement un plugin privé de dépendances externes à ses outils MCP | À TESTER | Exigences de distribution, limites des connexions et UX des deux comptes |

## Questions ouvertes prioritaires

- Q-01 (P0) : ChatGPT peut-il, depuis une action du dashboard, utiliser son connecteur Drive *dans la même conversation* et opérer sur le bon dossier après accord ?
- Q-02 (P0) : Comment le dashboard MCP obtient-il ses données de façon fiable sans Google API supplémentaire ?
- Q-03 (P0) : Quelles actions du connecteur Drive sont réellement disponibles pour créer un dossier, une feuille et publier une perspective ?
- Q-04 (P0) : Un second compte avec permission de partage retrouve-t-il la même Box et peut-il y contribuer ?
- Q-05 (P0) : Comment empêcher l'usurpation d'auteur et les écritures croisées dans un Sheet partagé ?
- Q-06 (P1) : Comment reprendre la Box active sans « profil Boulette Box » central et sans choix répété pénible ?
- Q-07 (P1) : Comment arbitrer une résolution pour trois personnes ou davantage (consensus, majorité, unanimité) ?
- Q-08 (P1) : Quelle expérience proposer aux membres lecteur / éditeur et quand l'autorisation change ?
- Q-09 (P1) : Comment éviter écrasements, duplications et pertes en cas de publications simultanées ?
- Q-10 (P2) : Hébergement, récupération après incident, export et suppression d'une Box.

## Journal succinct

- 2026-10-13 : Bits & Bolts installé et barre latérale observable ; validation du principe d'UI hébergée dans ChatGPT.
- 2026-10-13 : repository initialisé, develop créé, CI de master vérifiée.
- 2026-10-13 : renoncement provisoire à Auth0 et à un backend Google propriétaire ; décision produit : dossier Drive comme unité de Box, participants variables.
- 2026-10-13 : décision de documenter séparément faits vérifiés, choix et inconnues techniques ; première ADR Drive-first.
