---
folder: dev_tuto_introduction
title: Développer pour Home Assistant - Introduction.
type: post
visibleInCMS: true
aliases:
  - /ha_dev
draft: false
date: 2023-04-11
lastmod: 2023-04-11
images: img/tuto-developper-intro.png
description: >-
  Vous souhaitez développer vos propres intégrations pour vous ou pour la
  communauté Home Assistant ou tout simplement contribuer à une intégration
  existante ?

  Alors, la série de tutoriels qui sont présentés ici est faite pour vous.
level: Avancé
version_ha: "2023.4"
categories:
  - Développement
tags:
  - developpement
author: jean-marc_collin
url_hacf: https://forum.hacf.fr/t/developper-pour-home-assistant-introduction/22780
---
Tu veux développer une intégration pour Home Assistant ou tout simplement contribuer à une intégration existante ? Cette suite d'articles est faite pour toi et a pour but de t'aider à te lancer. Elle est conçue comme les articles que j'aurais aimé trouver lorsque je me suis moi-même lancé.

## Les pré-requis

Pour pouvoir utiliser ces articles, il est préférable de :

1. *Connaitre **Home Assistant** un minimum* et notamment les concepts d'Appareils, d'Entités, d'Intégration. Bien que nous devions définir ces termes, il est quand même souhaitable de connaitre ces concepts un minimum,
2. *Connaitre le langage de développement **Python** :* Cette suite d'article n'est pas un cours de Python et suppose que vous connaissez un minimum ce langage. Sinon, il existe d'excellents tutos Python en ligne et il est préférable de les suivre avant d'attaquer ces articles,
3. *Le métier du **développement** :* Le développement est un métier, il a son vocabulaire et ses règles. Des notions sont nécessaires pour comprendre ces articles, même si le niveau n'est pas très élevé. Soyez à l'aise avec les notions de sources, gestionnaire de sources (Github, git), repositories, classes, méthodes, tests unitaires, attributs ou suivez un tuto en ligne avant d'aborder ces articles.
4. *Un compte **Github** :* un compte Github est nécessaire pour pouvoir "forker" des repository et notamment celui de Home Assistant,
5. Un **PC**, un **Mac** ou une machine **Linux** bien sûr.

## Remarques préliminaires

**Open Source on vous a dit :** Il existe littéralement des milliers d'intégrations pour Home Assistant. Le meilleur conseil que je peux donner est d'aller voir leur code. Tu vas apprendre énormément en consultant ce que les autres ont fait et comment ils l'ont fait. 

L'aspect Open-Source est précieux et super utile lorsqu'on but sur une difficulté, alors n'hésite pas.

**HACS :** `Home Assistant Community Store` est tout simplement indispensable. Il propose un magasin parallèle contenant des intégrations, des composants "front"(cartes), des thèmes fournis par la communauté pour la communauté. Il a l'énorme avantage d'être **indépendant** de l'équipe **core** de Home Assistant ce qui vous permet d'être libre dans la réalisation de vos intégrations et notamment dans la fréquence de publication. 

Si vous tentez de faire une intégration officielle Home Assistant, vous devrez soumettre votre intégration à l'équipe core et serez soumis à des délais décourageant (plusieurs mois au moment, j'écris ces lignes). 

Pour démarrer, je ne peux que conseiller de démarrer avec une intégration HACS. Une fois que vous avez une intégration de qualité, vous pouvez tenter de la proposer comme une intégration core, mais pas avant.

**Un peu de lecture :** la doc officielle est [ici](https://developers.home-assistant.io/). Elle est en anglais, pas super à jour tout le temps, n'est pas faite pour développer une intégration HACS et n'est pas très didactique. Si tu n'y connais rien, tu ne comprendras pas grand-chose. Par contre, s'y référer de temps en temps pour étendre le champ de sa connaissance une fois qu'on a compris les concepts est une super bonne idée. Gardes bien ça en tête !

> [![Tip](https://github.com/jmcollin78/tuto-hacs/raw/master/images/tips.png?raw=true?raw=true)](https://github.com/jmcollin78/tuto-hacs/blob/master/images/tips.png?raw=true?raw=true)Tu es prêt ? Fébrile ? Ca va aller, on te dit...

## Liste des tutos

Les tutos sont en cours de rédaction. Mais le premier sera publié très prochainement !!

* **Tuto1 :** Installer son environnement de dev.
* **Tuto2 :** Créer une intégration et une entité simple
* **Tuto3 :** Interactions avec d'autres entités (évènements, états, ...)
* **Tuto4 :** Pages de configuration (configFlow, traductions).
* **Tuto5 :** Aspects avancés (tests unitaires, debugging, travailler avec les sources Home Assistant).
