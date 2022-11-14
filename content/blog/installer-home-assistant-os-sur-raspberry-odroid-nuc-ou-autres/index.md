---
draft: false
date: 07-10-22 15:40
lastmod: 2022-10-07 15:53
author: mcfly
url_hacf: https://forum.hacf.fr/t/installer-home-assistant-sur-raspberry-pi-ou-autre-sbc-via-hassos/201
socialshare: true
title: Installer Home Assistant OS sur Raspberry, Odroid, NUC ou autres
image: img/imagebf_image_rpihaos.jpg
description: "Installons ensemble Home Assistant OS sur Raspberry Pi, Odroid,
  Tinkerboard, NUC ou autres, de manière simple et rapide. Commençons dans la
  domotique avec un système Open source, gratuit, international et évolutif avec
  plus de 1900 intégrations et des centaines d'add-ons. "
categories:
  - Installation
tags:
  - linux
  - mac-os
  - nuc
  - odroid
  - raspberry-pi
  - ha-supervised
  - ha-os
series:
  - Débuter avec Home Assistant
  - Les Bases de Home Assistant
---
Vous souhaitez commencer l'aventure Home Assistant et votre choix s'est porté sur l'installation de Home Assistant OS sur un matériel dédié ? Vous avez fait le choix de vous concentrer sur votre domotique plutôt que sur la gestion annexe.

Que votre matériel soit une Raspberry, une Tinkerboard ou un Odroid, ce guide est fait pour vous.

Nous allons voir comment installer Home Assistant OS sur l'un de ces SBC (single Board Computer)

***Matériels utilisés :*** *Raspberry Pi et Home Assistant OS 8.5.*

### Prérequis.
* [Balena Etcher](https://www.balena.io/etcher/) *(Linux, Windows, Mac)* ou
* [Raspberry Pi OS](https://www.raspberrypi.com/software/) *(Linux, Windows, MacOS)*
* [L'image pour votre système](https://github.com/home-assistant/operating-system/releases) *(Facultatif)*

**Installation sur Raspberry Pi : Pourquoi il utilise une carte Micro SD alors que, sur le net, tout le monde parle de problèmes avec les cartes SD ?** Parce que [Home Assistant le recommande](https://www.home-assistant.io/common-tasks/os/#using-external-data-disk).

> Dans ce type d'installation, toutes les actions provoquant des écritures à répétitions sur le support SD sont déplacées vers le disque dur. Fini les cartes SD corrompues tout en conservant un démarrage rapide de votre système et éviter les problèmes de disque non reconnu.

Le système d'exploitation Home Assistant permet de stocker la plupart des données sur un support de stockage externe (par exemple, un SSD ou un disque dur connecté par USB). Ce disque de données contient non seulement les données de l'utilisateur, mais aussi la plupart des logiciels de Home Assistant (Core, Supervisor, etc.). Cela signifie qu'un disque de données rapide rendra le système global beaucoup plus rapide.

![Image du Schéma expliquant le support des données en externe.](img/ha_usbdatadisk.png "Schéma expliquant le support des données en externe.")

La [fonction de disque de données](/blog/déplacer-les-données-utilisateurs-de-home-assistant-vers-un-support-externe-et-préserver-votre-carte-micro-sd/) peut être utilisée sur une installation existante sans perdre de données : Le système déplacera automatiquement les données existantes vers le disque de données externe. Toutefois, il est recommandé de [créer et de télécharger une sauvegarde](https://www.home-assistant.io/common-tasks/os/#backups) complète avant de procéder !

> Je tourne avec cette solution et je n'ai aucun problème, si vous installez Home Assistant sur un autre Raspberry et que le disque externe est branché, il récupère automatiquement vos données

## Préparation avec Balena Etcher.
Récupérer la [version de Balena Etcher](https://www.balena.io/etcher/) pour votre système d'exploitation.

![Image de l'interface de Balena Etcher](img/balena-etcher.png "Interface de Balena Etcher")

**Avec l'image déjà récupérée :**

* Lancer Balena Etcher,
* Cliquer sur `Flash from File`,
* Sélectionner votre [image](https://github.com/home-assistant/operating-system/releases),
* Sélectionner votre Micro SD dans `Select target`,
* Cliquez sur `Flash`.

**Avec récupération de l'image en ligne :**

![Image sur l'utilisation de Balena Etcher depuis URL](img/balena-etcher-depuis-url.png "Balena Etcher depuis URL")

* Lancer Balena Etcher,
* Cliquer sur `Flash from URL`,
* Rentrer l'[URL](https://www.home-assistant.io/installation/raspberrypi#write-the-image-to-your-boot-media) correspondante a votre matériel,
* Sélectionner votre Micro SD dans `Select target`,
* Cliquez sur `Flash`.

Une fois la copie terminée et vérifiée, mettre la carte micro SD dans votre Raspberry (ou autre) puis démarrer votre système.

## Préparation avec Raspberry Pi OS.
Récupérer et installer [Rapsberry Pi OS](https://www.raspberrypi.com/software/) pour votre système d'exploitation.

![Interface de Raspberry Pi Imager](img/raspberry-pi-imager.png "Interface de Raspberry Pi Imager")

* Lancer Raspberry Pi OS,
* Dans `CHOISISSEZ L'OS`, `Other specifique-purpose OS`, `Home assistants and home automation`, `Home Assistant` puis `Home Assistant OS 9.3 (TPi4/400)` (au moment où j'écris),
* Dans `CHOISISSEZ LE STOCKAGE`, sélectionner votre Carte SD,
* Puis cliquer sur écrire.

## Lancement.
Une fois votre image transférée par la méthode de votre choix, insérer votre carte Micro SD, votre câble Ethernet (recommandé), l'alimentation puis allumer votre matériel.

Rendez-vous, depuis votre navigateur, sur `[homeassistant.local:8123](http://homeassistant.local:8123)` ou sur `ipdevotremateriel:8123`

![Image d'attente du premier lancement de Home Assistant](img/installation_prepring_home_assistant-1-.jpg "Écran d'attente lors du premier lancement de Home Assistant")

> Il peut falloir 2-3 minutes avant que cette page s'affiche.

Il faut maintenant patienter quelques minutes, plus ou moins longues, en fonction de votre connexion internet avant de pouvoir lancer la première configuration qui est commune à toutes les installations et bénéficie, donc, de son propre article.

#### Connexion en Wi-Fi.
Je n'ai pas parlé de la connexion du Raspberry au Wifi. Ce n'est pas un oubli, mais un système domotique efficace ne repose pas sur du Wi-Fi. De plus, Home Assistant ne le recommande pas, mais sachez qu'il est possible de le configurer facilement, surtout si vous passez par Raspberry Pi OS.

### Sources.
* [Home Assistant Installation](https://www.home-assistant.io/hassio/installation/)
* [Home Assistant OS images](https://github.com/home-assistant/operating-system/releases)
* [Etcher](https://www.balena.io/etcher/)