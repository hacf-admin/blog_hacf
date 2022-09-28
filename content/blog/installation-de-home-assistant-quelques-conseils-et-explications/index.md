---
title: "Installation de Home Assistant : Quelques conseils et explications"
draft: true
date: 28-09-22 14:44
lastmod: 2022-09-28 14:44
image: img/article3.png
description: "Avant de vous lancer dans l'installation de Home Assistant, il est
  important de connaitre les grandes lignes de votre installation et la
  direction que celle-ci va prendre dans un futur proche. Voici quelques
  conseils et explications sur les différentes méthodes d'installation de Home
  Assistant. "
socialshare: true
categories:
  - Installation
tags:
  - ha-container
  - ha-os
  - ha-core
  - docker
  - ha-supervised
  - linux
  - windows
  - mac-os
  - nuc
  - odroid
  - raspbery-pi
  - vm
series:
  - HA les Bases
  - Débuter
author:
  - tata
---
>Pour commencer, sachez que ce guide est une base de réflexion pour votre future installation domotique. Ce qui est écrit, est à adapter en fonction de vos connaissances, de votre matériel disponible et du temps que vous voulez constater à sa gestion (hors domotique). 

Avant de vous lancer dans l'installation de Home Assistant, il est important de connaitre les grandes lignes de votre installation et la direction que celle-ci va prendre dans un futur proche.

Il faut savoir, que lors du passage d'un type d'installation a un autre, la partie **core** (entités, automatisations, intégrations) sera facilitée par les sauvegardes de Home Assistant, mais pas pour tous (les add-ons par exemple).

#### Quelques conseils (subjectifs).
* Si vous êtes débutant, n'allez pas chercher des complications. Cela va plus vous dégoûter qu'autre chose. Il y a dans la communauté des membres qui tournent sur des installations complexes, qui certes, peuvent faire rêver et/ou font penser que c'est la meilleure façon, mais ce sont souvent des personnes avec des bagages techniques. Chercher au plus simple et, une fois la prise en main effectuée, vous pouvez songer à changer de type d'installation.

* Si vous découvrez Linux, partez sur des installations dites "complètes", (Raspberry, Odroid, etc). Par image complète, j'entends, une image faite pour votre matériel, comprenant l'OS (système exploitation) et Home Assistant avec le Superviseur.

Il existe trois types d'installations de Home Assistant : 
* La version **Home Assistant OS** : Système d'exploitation minimal optimisé pour Home Assistant. Il est livré avec un superviseur pour gérer le noyau et les modules complémentaires (add-ons) de Home Assistant. (méthode d'**installation recommandée**).
* La version **Container** : Installation autonome du Home Assistant **Core** dans un conteneur (par exemple, Docker). Tous les add-ons seront à installer et configurer indépendamment.

Deux méthodes d'installation alternatives sont disponibles pour les utilisateurs expérimentés :
* **Home Assistant Supervised** : Installation manuelle de home Assistant avec le Superviseur.
* **Home Assistant Core** : Installation manuelle à l'aide de l'environnement virtuel Python.
    
>La version **Core** contient seulement Home Assistant et nécessite l'installation et la configuration des add-ons en manuelle et en parallèle de Home Assistant. (**déconseillé pour les débutants**).


## Les principales méthodes d’installation pour Home Assistant.
### Home Assistant OS (*Raspberry PI, Odroid, Tinkerboard, NUC, Linux*).
Cette méthode implique l’utilisation de votre matériel pour une unique tache. L’image d’installation contiendra l’OS et Home Assistant avec le Superviseur.

Elle a l’avantage d’être la moins énergivore et la plus simple d’utilisation.

Mais, avec certains matériels, elle a l’inconvénient d’une installation sur un support micro SD qui, à force d’écriture, peut être plus fragile. (Une solution peut être de remplacer la carte Micro SD par un disque SSD).


**AJOUTER SHORTCODE/PARTIAL CATEGORIE INSTALLATION ET TAGS HAOS**

>Nous vous conseillons cette installation sur un Odroid ou Raspberry, mais sur ceux derniers, il faudra prévoir un SSD en supplément.

### Home Assistant Container (*Raspberry PI, Odroid, Tinkerboard, NUC, Linux*).
Cette solution permet l’utilisation de votre matériel pour d'autres choses que la seule utilisation de Home Assistant.
Vous installez Home Assistant **core** dans votre propre environnement de conteneurs, que vous gérez vous-même.
&gt;Sous Linux cette [installation est aussi possible avec le Superviseur](https://github.com/home-assistant/supervised-installer). Cette façon de gérer Home Assistant est celle qui exige le plus de vous. Elle a également des exigences strictes que vous devez respecter. À moins que vous n'ayez vraiment besoin de ce type d'installation, vous devriez installer Home Assistant OS (qui peut aussi être une machine virtuelle), ou Home Assistant Container.
</div>""

**SHORTCODE PARTTIAL ARTICLES INSTALLATION HA CONTAINER**

### Home Assistant Core (*Raspberry PI, Odroid, Tinkerboard, NUC, Linux, Windows, MacOS*).
Cette solution est **réellement** réservée aux personnes expérimentées et ne sera pas abordée pour le moment.

## Résumé des installations
|Fonctions|HA OS|HA Containeur|HA Core|HA Supervised|
| :--- | :---: | :---: | :---: | :---: | 
|[Automations](https://www.home-assistant.io/docs/automation)|:check:|:true:|**OK**|
|[Dashboards](https://www.home-assistant.io/dashboards)|**OK**|**OK**|**OK**|**OK**|
|[Intégrations](https://www.home-assistant.io/integrations)|**OK**|**OK**|**OK**|**OK**|
|[Blueprints](https://www.home-assistant.io/docs/blueprint)|**OK**|**OK**|**OK**|**OK**|
|Utilise les Containeurs|**OK**|**OK**|**X**|**OK**|
|[Superviseur](https://www.home-assistant.io/docs/glossary/#home-assistant-supervisor)|**OK**|**X**|**X**|**OK**|
|[Add-ons](https://www.home-assistant.io/addons)|**OK**|**X**|**X**|**OK**|
|[Sauvegardes](https://www.home-assistant.io/common-tasks/os/#backups)|**OK**|**OK** *1*|**OK** *1*|**OK**|
|Gestion de l'OS|**OK**|**X**|**X**|**X**|

1 : Les sauvegardes pour Home Assistant Core et Home Assistant Container sont fournies par l'[intégration de la `sauvegarde`](https://www.home-assistant.io/integrations/backup).

#### Sources
[Home Assistant Installation Officie (EN)](https://www.home-assistant.io/installation/)

**PARTIAL AIDE BOUTTON**

### Liste des articles concernant l'installation de Home Assistant.

PARTIAL ARTICLE CONNEX