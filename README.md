# Traquenard

## Résumé

**Traquenard** est une application mobile développée en React Native avec la librairie expo.
C'est un jeu à faire entre amis se jouant à partir de 2.

&nbsp;
Le jeu est composé de 2 phases: 
- Une phase où un seul joueur joue, il a alors 4 actions possibles:
    - Duel: Il affronte un autre joueur de son choix sur un enoncé aléatoire _(ex: A tour de rôle, donnez un animal de la savane)_
    - Amitié: Il joue avec une autre personne de son choix sur un enoncé aléatoire _(ex: Toto pense au premier mot quand tu entends "Russie", si Tata devine vous gagnez)_
    - Questions: Il doit répondre à un QCM _(ex: Combien d'année Valéry Giscard d'Estaing est-il resté au pouvoir ?)_
    - Seul contre Tous: Il affronte seul tous les autres joueurs sur une catégorie de son choix _(ex: Ennoncez un sport dans les JO d'été, le dernier à en citer un gagne)_
- Une phase où tout les joueurs jouent sur un enoncé aléatoire _(ex: Le premier a citere une emission de TF1 gagne)_

## Prérequis

De quoi avez vous besoin pour installer et lancer le projet.

```
npm
git
```

## Installation

Première étape vous devez cloner le projet sur votre machine en tapant la commande suivante dans git

`git clone https://gitlab.com/Senniinn/traquenard`

Quand le projet est cloné dans un dossier local, se rendre dans  celui-ci et lancez la commande d'installation de npm

`npm install`

Installer le package expo permettant d'installer expo

`npm install expo-cli --global`

Une fois toute l'installation finie, entrez la commande de lancement de l'applcation sous expo

```
expo start
```

Pour générer un nouveau fichier .apk, lancez la commande 
```
expo build:android
```

## Test

## Auteurs

* **GENEVEE Damien** - *Developpeur* - [Senniinn](https://gitlab.com/Senniinn)
* **HEROIN Alexis** - *Developpeur* - [Malzik](https://gitlab.com/Malzik)