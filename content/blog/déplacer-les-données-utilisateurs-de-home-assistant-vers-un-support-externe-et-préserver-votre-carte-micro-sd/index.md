---
draft: false
level: Débutant
url_haoff: ""
authors:
  - mcfly
  - pulpy
date: 2022-09-19
lastmod: 23-11-2322 16:11
author: mcfly
socialshare: true
title: Déplacer les données utilisateurs de Home Assistant vers un support
  externe et préserver votre carte Micro SD
image: ""
description: "Préserver votre carte Micro SD en déplaçant les données
  utilisateurs de Home Assistant vers un support externe. "
type_install:
  - ha-os
categories:
  - Installation
series:
  - Débuter avec Home Assistant
tags:
  - ha-os
  - micro-sd
  - raspberry-pi
  - tag1
  - tag2
---
Pour préserver la carte Micro SD, tout en gardant un système rapide ou si la taille de votre mémoire interne devient trop juste, Home Assistant permet de déplacer les données utilisateurs sur un support externe (il peut être interne avec un boitier adapté).

![Image du Schéma de principe sur le stockage des données vers un support externe](img/imagebf_image_usbdatadisk.png "Schéma de principe sur le stockage des données vers un support externe.")

Nous allons en conséquence voir comment effectuer cette manipulation.

> Il est conseillé de faire une sauvegarde avant d'effectuer cette manipulation, même s'il ne devrait pas avoir de problème.

* Dans `Paramètres`, `Système`, `Stockage`,
* En haut à droite, cliquer sur `...` puis appuyer sur `Déplacer le disque de données`,
* Sélectionner le disque,
* Cliquer sur `Déplacer`.



![](img/deplacer_donnees_utilisateur_home_assistant.gif)

Après avoir redémarré, vos données seront sur le disque dur et les écritures ne viendront plus abimer votre carte Micro SD.

## Conclusion.

Pour une installation sur Raspberry avec Micro SD, cette méthode permet d'éviter les problèmes de détection du disque dur lié à USB3 et ceux de la carte MicroSD corrompue. Il permet aussi au système de profiter d'un démarrage rapide.

> En cas de Carte MicroSD corrompue (ce qui ne devrait plus arriver avec cette methode), il vous suffit de reinstaller Home Assistant OS sur une nouvelle carte MicroSD Classe 2 et relancer votre Raspberry Pi. Votre solution domotique se relance comme s'il ne c'estait rien passé.

## Sources.

* https://www.home-assistant.io/common-tasks/os/#using-external-data-disk