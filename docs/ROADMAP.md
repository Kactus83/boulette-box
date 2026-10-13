# Feuille de route — jalons et critères d'acceptation

## J0 — Documentation et modèle « Drive-first » (en cours)

- Registre de décisions, ADR Drive-first, périmètre produit, schéma candidat.
- Maquette de Box fictive multi-personnes ; aucune permission réelle.
- CI sur master uniquement, exécution explicite.
- Sortie : typecheck + tests + build + smoke verts sur branche de travail.

## J1 — Premier plugin Boulette Box réel

- Endpoint HTTPS de test et intégration MCP de l'UI.
- Valider les entrées global/thread, les boutons et la conversation.
- Uniquement des données factices.
- Sortie : E-001 prouvé avec contexte et version.

## J2 — Drive via ChatGPT, guidé

- Prompt de configuration Créer / Rejoindre et vérification du dossier ID.
- Réaliser la première lecture et une écriture fictive après confirmation.
- Vérifier droits lecteur / éditeur / refus.
- Sortie : E-002, E-003, E-004, E-007 validés.

## J3 — Décider comment rafraîchir le dashboard

- Tenter le transfert des données Drive ChatGPT vers l'UI.
- Évaluer robustesse, latence, confidentialité et périmètre public.
- Si cela échoue : ADR supplémentaire sur un adaptateur Drive propre,
  OAuth, authentification MCP et stockage des préférences.
- Sortie : E-005 validé OU décision de repli explicitement approuvée.

## J4 — MVP réellement utilisable

- Topics, perspectives, statuts, historique, résolution multi-personnes.
- Contrôle d'écriture, idempotence et concurrence documentée.
- Tester perte de permission, éditions externes, erreurs et récupération.
- Sortie : E-006 + revue de sécurité + autorisation d'utiliser de
  vraies données. Aucune affirmation de confidentialité forte sans preuve.

## J5 — Diffusion

- Onboarding soigné, accessibilité, internationalisation, politique
  de confidentialité, gestion des données et suppression.
- Conformité des outils MCP publics autonomes.
- Hébergement fiable, observation expurgée, coûts et licence.
- Sortie : revue publication et documentation utilisateur.

## Politique de développement

Développer sur dev/*, intégrer sur develop après revue et CI explicite
lancée sur master en visant la branche source. Ne promouvoir develop
vers master que lorsque les critères de release ont été acceptés.
Ne pas consommer de minutes GitHub Actions automatiquement sur PR/push.
