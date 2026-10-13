# Documentation de Boulette Box

**Source de vérité du projet** — les décisions ci-dessous priment sur les hypothèses anciennes des conversations. Référence initiale : 13 octobre 2026.

Boulette Box est une application MCP pour ChatGPT visant à faciliter des échanges réfléchis, initialement entre proches, puis potentiellement pour des groupes de taille variable. Elle ne remplace ni un professionnel ni un service d'urgence.

## Par où commencer ?

| Document | Objet |
|---|---|
| [DECISIONS.md](DECISIONS.md) | Registre des choix validés, envisagés, abandonnés, et des questions non résolues |
| [ADR-0002-DRIVE-FIRST.md](ADR-0002-DRIVE-FIRST.md) | Architecture « une Box = un dossier Drive » et séparation des connecteurs |
| [PRODUCT.md](PRODUCT.md) | Parcours utilisateur et périmètre produit du MVP |
| [DATA-CONTRACT.md](DATA-CONTRACT.md) | Schéma candidat Google Sheets, identifiants et cohérence |
| [SECURITY-AND-PRIVACY.md](SECURITY-AND-PRIVACY.md) | Modèle de confiance, droits Drive, brouillons et limites |
| [EXPERIMENTS.md](EXPERIMENTS.md) | Tests bloquants, hypothèses falsifiables et preuves |
| [ROADMAP.md](ROADMAP.md) | Ordre de réalisation et critères d'entrée / sortie |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Architecture technique du prototype historique |
| [CI.md](CI.md) | CI GitHub déclenchée à la demande sur master |

## Convention de décision

- **VALIDÉ — produit** : intention et règle métier décidées. N'implique pas leur faisabilité technique.
- **VALIDÉ — technique** : comportement réellement vérifié avec preuves, version et contexte.
- **PROVISOIRE** : préférence réversible sans validation.
- **À TESTER** : hypothèse exigeant une preuve ou un prototype.
- **ÉCARTÉ / DIFFÉRÉ** : ne pas implémenter dans le jalon courant.
- **BLOQUANT** : aucun usage réel avant validation.

Toujours indiquer la différence entre « ce que l'on souhaite », « ce que la documentation promet » et « ce qui a été observé ». Ne jamais transformer une hypothèse de coordination entre plugins en garantie.

## Règle de maintenance documentaire

Toute PR qui change le produit, l'architecture, les dépendances, les permissions, le modèle de données ou l'UX doit mettre à jour simultanément le registre DECISIONS, l'ADR concernée, le protocole EXPERIMENTS et le README si nécessaire.

Conserver les ADR historiques avec leur statut (superseded / rejected) plutôt que réécrire le passé. Ne jamais ajouter de sujets réels, pseudos personnels, liens privés Drive, données de connexion ni jetons dans la documentation publique. Les références publiques dupliquées ici sont techniques uniquement.
