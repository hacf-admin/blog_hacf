---
title: "Installer Home Assistant sur un Raspberry Pi (méthode officielle)" # Titre article explicite
date: 2022-01-17 # Date format YYYY-MM-DD
lastmod:   # Date format YYYY-MM-DD   SI rine n'est rentré il prendra la modification GIT.
draft: false
#layout: pages 
type: # Types existant : pages; news; awesome; guidedev;etc. Laisser vide pour les articles

description: "Comment installer Home Assistant sur Raspberry Pi avec HAOS sur MicroSD et déplacer le dossier utilisateur sur un disque dur externe ou interne." # Description du sujet.
# hero: /path/image.ext # Recherche un fichier hero.(webp;jpg;png;svg) a la racine du dossier OU si un hero est defini ici SINON il prend un hero par defaut.

# Recherche par auteurs et si multi auteurs.
authors:
  - mcfly

#socialshare: true # Active l'option de partage
article_ha: true # Ajoute les boutton du forum et les medias des deux communautés Home Assistant (Off et HACF)

hacf: 
- "https://forum.hacf.fr/t/installer-home-assistant-sur-raspberry-pi-ou-autre-sbc-via-hassos/201"     # Liens vers le post du forum HACF.
- "https://forum.hacf.fr/t/home-assistant-premiere-configuration/679"
url_off:            # Liens vers le post du forum Officiel.

categories: # Categories atuelles : domotique; home assistant; news; nodered;....
- home assistant
- domotique

series: # En cours permet de reunir des series d'articles autour d'un meme sujet (ex : bien debuter avec HA; ou les addons essentiels pour commencer).
- home assistant
  
tags: # Mettre ce qui est en relation avec l'article NE PAS REMETTRE les categories.
- raspberry pi
- haos
- installation
- ha-supervised
- odroid
- SBC

keywords: # Mettre tous les mots definissant votre article, ils sont utilisés pour le referencement. PAS de limitation.
- raspberry pi
- haos
- installation
- ha-supervised
- home assistant
- domotique
- supervisor
- odroid
- sbc

##################################################
##################################################

# Toutes ne sont pas a remplir (ex : pour les pages), il suffit pour cela de ne rien  mettre apres les : ou alors de commenter la ligne avec un # devant.

##################################################
##################################################

###################
# Non fonctionnel
###################


#menu:
#  sidebar:
#    name: HA 2021.9.X
#    identifier: ha-2021-9-X
#    parent: news-home-assistant
#    weight: 10
---

Home Assistant est à l'heure actuel, le meilleur système domotique sur le marché (ok, c'est mon avis, mais peu de personne ayant quitté leur ancien système domotique pour Home Assistant y sont revenus).

Il est open-source, international, responsive (s'adapte à tous les écrans), élégant et complétement gratuit (application mobile aussi). Il bénéficie aussi d'une grande communauté qui le fait évoluer à la vitesse lumière et lui permet d'être présent sur tous les fronts (Wear OS, extension Chrome et Firefox). Home Assistant est écrit en python (un langage "simple" à apprendre) et construit sur une base "docker" ce qui permet de lui ajouter des services à l'infini.

**"Comment il vend le produit !"** Oui je l'avoue, mais ayant testé Jeedom puis Domoticz, je parle en connaissance de cause.

Il y a plusieurs moyens d'installer Home Assistant et nous allons en voir deux sur mon blog :
* Sur un Raspberry en version OS supervised avec carte SD et optionnellement un disque dur. (Méthode préconisée par Home Assistant),
* Sur Raspberry ou autre SBC (Single Board Computer), mais cette fois via Docker et Portainer. (À éviter si vous débuter).

{{< alert "Les différentes méthodes sont détaillées [ici](https://forum.hacf.fr/t/conseils-sur-le-choix-methode-ou-type-dinstallation/2068). Si vous êtes débutant, il est préférable de suivre cet article." info >}}

**Prérequis :**
* Raspberry Pi est son alimentation
* Carte Micro SD (classe 2 recommandée)
* Disque dur SSD (Avec boitier si besoin)*
* Un boitier pour protéger votre installation*
* [Balena Etcher](https://www.balena.io/etcher/) (Linux, Windows, Mac)
* [L'image pour votre système](https://github.com/home-assistant/operating-system/releases)*

*optionnel pour une installation de test, mais pas pour une installation de production.

{{< alert "Pour que le tout reste joli, il existe des boitiers comme Argon One M.2 qui permettent d'intégrer le disque dans un boitier" info >}}

**Pourquoi il utilise une carte Micro SD alors que, sur le net, tout le monde parle de problèmes avec les cartes SD ?**

Parce que [Home Assistant le recommande](https://www.home-assistant.io/common-tasks/os/#using-external-data-disk).

__*Explication :*__ Dans ce type d'installation, toutes les actions provoquant des écritures à répétitions sur le support SD sont déplacées vers le disque dur. Fin de la carte SD corrompues.

J'ai tourné quelque temps avec cette solution et je n'ai jamais rencontré de soucis, maintenant à vous de voir.

![Installation avec MicroSD et Disque dur](img/shema_ha_microsd_hard_drive.png)

## Installation.
Lancer Balena Etcher
* Sélectionner votre [image](https://github.com/home-assistant/operating-system/releases) (téléchargé) ou [le lien](https://www.home-assistant.io/installation/raspberrypi#install-home-assistant-operating-system)
* Sélectionner votre Micro SD,
  
{{< gallery folder="flashprepa" >}}

* Cliquez sur `Flash`.

{{< gallery folder="flash" >}}

Une fois la copie terminée, mettre la carte micro SD dans votre Raspberry puis démarrer votre système.

## Première configuration.

{{< alert "Cette partie est commune à tous les types d'installation." info >}}

Essayer de vous connecter via l'adresse suivante http://homeassistant:8123 ou http://homeassistant.local:8123. Si rien ne s'affiche récupérer l'adresse IP de votre Raspberry via l'interface de votre routeur et connectez-vous via http://votre_ip:8123

Vous arrivez sur une page vous disant d'attendre. Cela peut prendre jusqu'à 20 minutes selon votre connexion internet.

{{< gallery folder="configuration" >}}

Une fois sa préparation terminée, il va vous demander quelques paramétrages :
Sur la première page.
* Un nom pour votre utilisateur,
* Un nom d'utilisateur,
* Un mot de passe et sa confirmation
  
{{< alert "Cet utilisateur sera l'utilisateur avec tous les droits alors ne pas hésiter à mettre un bon mot de passe." warning >}}

La seconde page concerne l'habitation.
* Donner un nom votre installation,
* Définir la localisation de votre domicile,
* Choisir le fuseau horaire,
* Rentrer l'[altitude de son domicile](https://www.calcmaps.com/fr/map-elevation/)
* Choisir le système métrique.

La troisième vous permet de partager anonymement certaines données, pour aider Home Assistant à améliorer le système.

La quatrième concerne les matériels détectés automatiquement par Home Assistant chez vous.
Vous pouvez passer cette étape, on y reviendra plus tard. Ils peuvent être retrouvés dans `Configuration -> Appareils et Services`

Vous voilà enfin sur l'interface de Home Assistant.

Vous voilà enfin sur l'interface de Home Assistant.

![Page d'accueil de Home Assistant](img/ha_ecran_acceuil.png)

## Déplacer ses données vers un support externe.
Pour préserver la carte Micro SD tout en gardant un système rapide, Home Assistant préconise de déplacer les données utilisateur sur un support externe (il peut être interne avec un boitier adapté).

Pour cela rien de plus simple :
* Dans `Configuration`, `Paramètres`, onglet `Infos`.
* Descendez jusqu'à `Home Assistant Supervisor` puis appuyer sur `GERER`.
* Dans l'onglet ` système`, dans le cadran `Host`, appuyer sur les trois petits point puis sélectionner `Déplacer le disque de données`.

Puis sélectionner le disque.
Home Assistant redémarre.

{{< gallery folder="deplacerdisque" >}}

Vos données seront maintenant sur le disque dur et les écritures ne viendront plus abimer votre carte Micro SD.

## Activer les paramètres avancés.
Le mode avancé vous permet d'avoir plus de contrôle sur votre serveur.
Cliquer sur votre utilisateur (dans le menu) puis activer `Mode avancé`

{{< gallery folder="modeavance" >}}

## Conclusion.
Vous venez d'installer Home Assistant de la plus simple manière qu'il soit, la plus optimisée et surtout de manière pérenne.

Cette méthode permet d'éviter les problèmes de détection du disque dur lié a USB3 et permet aussi au système de profiter d'un démarrage rapide.

Le système Home Assistant est optimisé pour cela et non pour tourner sur un disque dur externe au système.

{{< alert "**Connexion en Wifi :** Je n'ai pas parlé de la connexion du Raspberry au Wifi. Ce n'est pas un oubli, mais un système domotique efficace ne repose pas sur du WiFi. De plus, Home Assistant ne le recommande pas" info >}}


{{< forumhacf "https://forum.hacf.fr/t/home-assistant-premiere-configuration/679" "Première configuration" >}}


## Sources.
* [Using External Data Disk HA Off](https://www.home-assistant.io/common-tasks/os/#using-external-data-disk)
* [Installation HA Off](https://www.home-assistant.io/installation/)
