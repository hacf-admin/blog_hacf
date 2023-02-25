---
folder: installations-ha-methodes
title: "Installation de Home Assistant : les méthodes"
type: post
visibleInCMS: true
draft: true
date: 2023-02-22
lastmod: null
images: img/article3.png
description: "Avant de vous lancer dans l'installation de Home Assistant, il est
  important de connaitre les différentes alternatives d'installations et comment
  cela peut impacter votre futur système. Voici quelques conseils et
  explications sur ces différentes méthodes d'installation. "
level: Débutant
categories:
  - Installation
  - Concepts
  - Add-on/intégration
series:
  - Les Bases de Home Assistant
  - Débuter avec Home Assistant
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
  - vm
  - raspberry-pi
author: mcfly
url_hacf: https://forum.hacf.fr/t/conseils-sur-le-choix-methode-ou-type-dinstallation/2068
socialshare: true
---
Dans cet article, nous allons aborder tous les points important vous permettant de vous lancer facilement avec Home Assistant.

N﻿ous allons essayer de vous donner des points de réflexions vous permettant de choisir les solutions les plus adaptées a votre utilisation, vos connaissances et vos besoins dans les domaines suivants :

*﻿ Installation,
* A﻿dd-ons indispensables, 
*﻿ Accès depuis l'extérieur,
*﻿ Les sauvegardes.

>Un article sur les concepts, plus théorique, de Home Assistant est disponible [ici](/blog/concepts-home-assistant).

## L’installation de Home Assistant

>Ce guide est une base de réflexion à lire avant toute installation de votre futur système domotique. Votre choix dépendra de vos connaissances, de votre matériel et du temps que vous voulez consacrer à sa gestion (hors domotique).

Il existe deux méthodes principales :

* **Home Assistant OS (HA-OS)** : Composé du Système d'exploitation (OS) **dédié** et **optimisé** pour Home Assistant et de la couche **Superviseur**,
* **Container** : Installation sur une machine possédant déjà son système d'exploitation. Home Assistant **Core** est installé dans un conteneur (par exemple, Docker). Tous les add-ons seront à installer et configurer indépendamment.

Deux méthodes d'installation alternatives sont disponibles pour les **utilisateurs expérimentés** :

* **Home Assistant Supervised** : Installation manuelle de home Assistant avec le Superviseur.
* **Home Assistant Core** : Installation manuelle à l'aide de l'environnement virtuel Python.

>La version **Core** est très peu utilisée et s'adresse à des personnes de profil développeur ayant une bonne connaissance de l'environnement python. Cette solution est **réellement** réservée aux personnes **expérimentées** et ne sera pas abordée.

### Installation "Home Assistant OS"

Cette méthode implique **à priori** l’utilisation de votre matériel pour une unique tâche. L’image d’installation contiendra l’OS dédié clé en main avec Home Assistant et le Superviseur.
Elle a l’avantage d’être la moins gourmande en ressources et la plus simple d’utilisation.

Le type d'installation HA OS sur un support micro SD sera très facile. Mais attention, à force d’écriture, votre système peut être plus fragile. Pour une utilisation perenne, il vous faudra remplacer la carte Micro SD par un disque SSD ou a minima déplacer les données utilisateur vers un support externe.

Enfin, si vous ne voulez pas dédier votre système à Home Assistant (sur un mini PC par exemple), vous pouvez faire une installation "Home Assistant OS" dans un **système virtualisé**. Le plus courant est **proxmox**.

vous débuterez, sur Home Assistant, sans vous soucier d'autres choses. C'est une version **clé en main**. Elle permet un accès simple aux modules complémentaires (add-ons) et aux services [Nabucasa](https://www.nabucasa.com/) de Home Assistant. C'est la méthode d'installation recommandée pour profiter pleinement de Home Assistant.

>Cette methode est officiellement supportée pour les Raspberry, Odroid, Asus Thinkerboard et Generic X86-X64 (Intel NUC). Au vu de la penurie de ce premier, n´hesitez pas a vous orienter vers d'autres machines si vous n'en avez pas en stock.

{{< selected_post title="***Articles concernant l'installation de Home Assistant OS***" tag="ha-os" cat="Installation" >}}

### Installation "Home Assistant Container"

Cette solution permet l’utilisation de votre matériel **avec son système d'exploitation initial** : Linux, Windows, Mac OS, Synology DSM.
Un gestionnaire de container (typiquement docker) permet d'installer des services qu'il est possible de gérer avec un outil comme portainer (gestionnaire de containers) présenté ci-dessous. L'ensemble fera office de supervisor dont on se passera alors.

Vous installez Home Assistant **core** dans votre propre environnement de conteneurs, que vous gérez vous-même.
Home Assistant tourne alors comme un service à côté d'autres services comme MQTT, une base de donnée, un gestionnaire multimédia, etc 
Attention : tout add-on sera vu comme un service et sera à installer séparément.

{{< selected_post title="Articles concernant l'installation de Home Assistant Container" tag="ha-container" cat="Installation" >}}

### Installation "Home Assistant Supervised"

Cette solution permet l’utilisation de votre matériel **avec son système d'exploitation initial**. Mais vous pouvez vous passer d'un gestionnaire de containers externe (typiquement docker + portainer) et utiliser le superviseur de Home Assistant, qui permettra l'installation d'addons.

>Linux est particulièrement adapté à une [installation supervised](https://github.com/home-assistant/supervised-installer). Cette façon de gérer Home Assistant est celle qui exige le plus de vous. Elle a également des exigences strictes que vous devez respecter. À moins que vous n'ayez vraiment besoin de ce type d'installation, vous devriez installer Home Assistant OS (qui peut aussi être une machine virtuelle), ou Home Assistant Container.

{{< selected_post title="Articles concernant l'installation de Home Assistant Supervised " tag="ha-supervised" cat="Installation" >}}

### Résumé des installations

| Fonctions                                                                             | HA OS  | HA Containeur | HA Core    | HA Supervised |
| ------------------------------------------------------------------------------------- | ------ | ------------- | ---------- | ------------- |
| [Automations](https://www.home-assistant.io/docs/automation)                          | **OK** | **OK**        | **OK**     |               |
| [Dashboards](https://www.home-assistant.io/dashboards)                                | **OK** | **OK**        | **OK**     | **OK**        |
| [Intégrations](https://www.home-assistant.io/integrations)                            | **OK** | **OK**        | **OK**     | **OK**        |
| [Blueprints](https://www.home-assistant.io/docs/blueprint)                            | **OK** | **OK**        | **OK**     | **OK**        |
| Utilise les Containeurs                                                               | **OK** | **OK**        | **X**      | **OK**        |
| [Superviseur](https://www.home-assistant.io/docs/glossary/#home-assistant-supervisor) | **OK** | **X**         | **X**      | **OK**        |
| [Add-ons](https://www.home-assistant.io/addons)                                       | **OK** | **X**         | **X**      | **OK**        |
| [Sauvegardes](https://www.home-assistant.io/common-tasks/os/#backups)                 | **OK** | **OK** *1*    | **OK** *1* | **OK**        |
| Gestion de l'OS                                                                       | **OK** | **X**         | **X**      | **X**         |

1 : Les sauvegardes pour Home Assistant Core et Home Assistant Container sont fournies par l'[intégration de la `sauvegarde`](https://www.home-assistant.io/integrations/backup).

### Nos conseils

* **Si vous êtes débutant, n'allez pas chercher des complications et choisissez HA OS**. Autrement, vous perdrez plus de temps à essayer de faire tourner votre installation plutôt que domotiser votre logement. Il y a, dans la communauté, des membres qui tournent sur des installations complexes, qui certes, peuvent faire rêver et/ou font penser que c'est la meilleure façon, mais ce sont souvent des personnes avec des bagages techniques. Chercher au plus simple et, une fois la prise en main effectuée, vous pouvez changer de type d'installation (tout ne sera pas à refaire).
* **S﻿i vous ne voulez pas dédier une machine à Home Assistant, envisagez une virtualisation Proxmox.**
* **Si vous découvrez Linux, docker, les VMs, partez sur des installations pré-configurées,** Vous les trouverez disponibles pour NUC, Raspberry, Odroid, etc. Par image pré-configurée, j'entends, une image faite pour votre matériel, comprenant l'OS (système exploitation) et Home Assistant avec le Superviseur (*Plus de détails plus bas*).

>**Attention**. Si vous envisagez un jour une migration, il faut savoir, que lors du passage d'un type d'installation a un autre, la partie **core** (entités, automatisations, intégrations, *backup*) sera facilitée par les sauvegardes de Home Assistant, mais pas pour tous (les add-ons par exemple).

## Les add-ons indispensables.

{{< selected_post title="Articles concernant les Add-ons indispensables de Home Assistant" cat="add-on/intégration" >}}


## L'accès l'extérieur.


{{< selected_post title="Articles concernant l'accès extérieur à Home Assistant" tag="acces-exterieur" cat="Installation" >}}

## La sauvegarde.

{{< selected_post title="Articles concernant les sauvegardes de Home Assistant" tag="backup" >}}

## Sources

[Home Assistant Installation Officie (EN)](https://www.home-assistant.io/installation/)