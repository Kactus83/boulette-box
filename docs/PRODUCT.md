# Produit et parcours du MVP

## Promesse

Boulette Box est un espace où plusieurs personnes de confiance peuvent
préparer puis partager, volontairement, des sujets difficiles à aborder.
Elle aide à comprendre des perspectives sans rendre de verdict et sans se
présenter comme une thérapie.

Elle est conçue pour les couples à l'origine, mais le langage et le modèle
ne doivent pas imposer « deux personnes » : famille, colocation ou petit
collectif sont des usages envisageables.

## Deux modes d'expérience

- **Conversation privée** : créer un brouillon avec ChatGPT dans une
  conversation personnelle, sans sauvegarde automatique dans la Box.
- **Espace partagé** : consulter les sujets effectivement publiés,
  contribuer, puis préparer une discussion commune à partir des textes.

## Navigation cible

- **Accueil** : aide à la prise en main, Box active, compteurs si disponibles.
- **Box** : choisir un espace accessible et comprendre ses droits.
- **Sujets** : liste, état, perspectives distinctes, actions explicites.
- **Actions** : déposer, enrichir, discuter, proposer une résolution.
- **Aide** : documentation et conversation guidée, état des permissions.

## Onboarding (« Créer / Rejoindre »)

1. Expliquer que Google Drive doit être lié *sur le compte ChatGPT courant*.
2. Créer : proposer dossier + Sheet dédiés avec permissions restreintes,
   après accord explicite de l'utilisateur.
3. Rejoindre : demander un lien de dossier / explorer les Box accessibles.
4. Confirmer le bon ID de dossier et la présence du manifeste de Box.
5. Vérifier les droits effectifs, afficher les limites lecteur / éditeur.
6. Ne jamais exiger d'envoyer au chatbot des mots de passe ou des jetons.
7. Aucune configuration n'est prétendue réussie sans relecture du dossier
   et de ses métadonnées.
8. Pouvoir changer de Box si plusieurs dossiers sont accessibles.

Le parcours reste **à tester** ; le backend MCP ne sait pas encore effectuer
ces opérations Drive de manière autonome.

## Workflows

### Déposer un sujet

Déclencheur UI -> conversation privée -> faits/ressentis/besoins ->
reformulation à la première personne -> aperçu (titre, thème, texte) ->
confirmation explicite -> tentative d'écriture dans la Box choisie ->
relecture de la donnée publiée -> succès seulement après confirmation.

### Ajouter ma perspective

Choisir un sujet accessible -> consulter ce qui est publié -> recueillir
un point de vue supplémentaire -> vérifier la formulation ->
confirmer -> ajouter **une nouvelle perspective** (sans réécrire
les précédentes) -> relecture.

### Préparer une discussion

Lire les sujets visibles -> distinguer les faits rapportés, les émotions,
les préoccupations, les convergences et les divergences ->
proposer des questions ouvertes et un ordre du jour non accusatoire ->
ne pas générer de diagnostics ni prétendre trancher qui a raison.

### Résoudre / archiver

Proposer une résolution ; ne pas confondre une suggestion de l'IA avec
un accord. Pour N participants, la règle de consentement (unanimité,
quorum, approbation des auteurs seulement, etc.) reste à déterminer.

### Comprendre / configurer Boulette Box

L'IA explique la Box active, son état de connexion Drive et ses limites
documentées ; elle peut aider à configurer un dossier, sous réserve de
l'accès réel aux actions correspondantes.

## Périmètre

**Dans le premier MVP** : interface, onboarding guidé, choix du dossier,
sujets, perspectives, état, synthèse, non-persistance des brouillons privés.

**Différé** : pièces jointes sensibles, automatisations, notifications,
recherche sémantique distante, votes, diagnostics, conflits complexes,
administration dédiée et comptes Boulette Box.

## Critères de qualité UX

- Les actions portent des noms simples et montrent leurs effets.
- Un utilisateur sait s'il est en « démonstration », en « brouillon »
  ou dans une Box réellement connectée.
- Un dashboard qui n'a pas de données ne doit pas afficher de faux
  indicateurs comme s'ils étaient réels.
- Toute écriture doit afficher un aperçu et un consentement.
- Un refus d'accès est expliqué sans révéler les contenus du dossier.
- L'app peut fonctionner en mode démonstration sans secrets ni données réelles.
