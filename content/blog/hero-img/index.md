---
title: Hero dans dossier Image
draft: false
date: 22-10-14
lastmod: 
image: img/imagebf_image_hero-1-.jpg
description: Vous venez d’installer Home Assistant ? Nous allons balayer
  ensemble la première configuration. Elle vous permet de définir la position de
  votre maison, son élévation, mais aussi ajouter les intégrations
  automatiquement découvertes via discovery.
socialshare: true
categories:
  - Installation
tags:
  - ha-container
  - ha-os
  - ha-core
  - ha-supervised
  - hero
series:
  - Débuter avec Home Assistant
author: mcfly
url_hacf: https://forum.hacf.fr/t/home-assistant-premiere-configuration/679
---
Vous venez d'installer Home Assistant et vous êtes rendu sur votre instance via `http://homeassistant:8123` ou `http://homeassistant.local:8123`. 

Vous arrivez sur une page vous disant d'attendre. Cela peut prendre jusqu'à 20 minutes selon votre connexion internet.

![Image de l'Écran d'attente du premier lancement de Home Assistant](img/installation_prepring_home_assistant-1-.jpg "Écran d'attente du premier lancement de Home Assistant")

Une fois sa préparation terminée, il va vous demander quelques paramétrages :
Sur la première page.

* Un nom pour votre utilisateur,
* Un nom d'utilisateur,
* Un mot de passe et sa confirmation.

> Cet utilisateur sera l'utilisateur avec tous les droits, alors ne pas hésiter à mettre un bon mot de passe.

La seconde page concerne votre domicile.

* Donner un nom votre installation,
* Définir la localisation de votre domicile,
* Choisir le fuseau horaire,
* Rentrer l'[altitude de son domicile](https://www.calcmaps.com/fr/map-elevation/)
* Choisir le système métrique.

![Image de la Configuration de votre domicile dans Home Assistant](img/installation_position_gps_domicile-1-.png "Configuration de votre domicile dans Home Assistant")

La suivante vous permet d'accepter de partager anonymement certaines données, pour aider Home Assistant à améliorer le système.

La dernière concerne les matériels détectés automatiquement par Home Assistant déjà disponibles.
Vous pouvez passer cette étape, on y reviendra plus tard. Ils peuvent être retrouvés dans `Paramètres` -> `Appareils et Services`

![Image de la Détection automatique des matériels présents sur votre réseau.](img/installation_detection_automatique_materiels-1-.png "Détection automatique des matériels présents sur votre réseau.")

Vous voilà enfin sur l'interface de Home Assistant.

## Activer les paramètres avancés.

Le mode avancé vous permet d'avoir plus de contrôle sur votre serveur.
Cliquer sur votre utilisateur (dans le menu) puis activer `Mode avancé`

![Image Activation du mode avancé dans le profil utilisateur de Home Assistant](img/profil_utilisateur-1-.png "Activation du mode avancé dans le profil utilisateur de Home Assistant")

## Conclusion

Vous avez maintenant une installation de Home Assistant toute fraîche. 
Vous pouvez à présent installer les add-ons indispensables.