---
path: gestion-eau
title: Gestion de sa consommation d'eau
type: post
visibleInCMS: true
draft: true
workflow: read
date: 2023-10-15
lastmod: 2023-10-15
description: >
  Maîtriser sa consommation d'eau est essentiel, d'autant dans le contexte de
  pénurie. Cet article explore les solutions pour mettre en place un compteur
  connecté, afficher les consommations et les coûts associés dans Home
  Assistant, et détecter les éventuelles fuites.
level: medium
type_install: ""
categories:
  - ESPHome/DIY
  - Energie
tags:
  - eau
  - DIY
  - esphome
author: argonaute
---
Beaucoup d'entre nous mesurent les consommations d'électricité, que ce soit par la connection de son compteur par la prise téléinformation, des prises ou modules connectées ou tout être dispositif.

Mais **maîtriser sa consommation d'eau** est bien autant essentiel, d'autant dans le contexte de pénurie actuel et d'augmentation du prix de l'eau. Et les conséquences d'une fuite, ou même un simple chasse d'est qui coule des jours, peut d'avérer très génant.

Cet article explore les solutions pour mettre en place un compteur connecté. Nous détaillerons une solution avec un compteur à impulsion **Gianola** et un **ESP32**. Enfin, nous verrons comment afficher les consommations et les coûts associés, et **détecter les éventuelles fuites**.

L'interface qui est implémentée permet de voir :

- Le débit d'eau instantanné
- Le pourcentage d'usage sur la dernière heure (100% si l'eau coule en permanence)
- Les consommations et coûts par jours / mois / année
- La consommation la nuit dernière
- La valeur totale du compteur (remis à 0 en début d'année)
- L'historique des 50 derniers tirages d'eau effectué

![Interface gestion de l'eau](img/interface.jpg)

## Connecter son compteur

La solution sera différente suivant si vous être propriétaire ou locataire, suivant ou se situe le compteur de votre fournisseur, quel est son type, et ou arrive la conduite d'eau.

### Installer un compteur connecté

Dans mon cas, le compteur de la maison est à l'extérieur, très peu accessible. J'ai donc opté pour l'installation d'un nouveau compteur. On ne présente pas avec l'eau, donc j'ai préféré une marque italienne reconnue : Gianola. Il a l'avantage d'avoir un affichage de la consommation, et une sortie contact sec pour mesurer les impulsions : 1 impulsion tous les  0.25l dans mon cas (mais il existe aussi en 1l / impulsion).

![](img/compteur-gioanola.jpg)
### Se connecteur à un compteur existant












