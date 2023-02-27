---
folder: HA_instllation_initiale
visibleInCMS: true
draft: true
date: 2023-02-22
lastmod: null
level: Débutant
author: mcfly
url_hacf: https://forum.hacf.fr/t/conseils-sur-le-choix-methode-ou-type-dinstallation/2068
socialshare: true
title: Home Assistant installation initiale
type: post
images: img/article3.png
description: "Avant de vous lancer dans l'installation de Home Assistant, il est
  important de connaitre les différentes alternatives d'installations et comment
  cela peut impacter votre futur système. Voici quelques conseils et
  explications sur ces différentes méthodes d'installation. "
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
---
Dans cet article, nous allons aborder tous les points important vous permettant de vous lancer facilement avec Home Assistant.

N﻿ous allons essayer de vous donner des points de réflexions vous permettant de choisir les solutions les plus adaptées a votre utilisation, vos connaissances et vos besoins dans les domaines suivants :

* Installation, 
* A﻿dd-ons indispensables, 
  ﻿* Accès depuis l'extérieur,
* Les sauvegardes.

> Un article sur les concepts, plus théorique, de Home Assistant est disponible [ici](/blog/concepts-home-assistant).

## L’installation de Home Assistant

> Ce guide est une base de réflexion à lire avant toute installation de votre futur système domotique. Votre choix dépendra de vos connaissances, de votre matériel et du temps que vous voulez consacrer à sa gestion (hors domotique).

Il existe deux méthodes principales :

* **Home Assistant OS (HA-OS)** : Composé du Système d'exploitation (OS) **dédié** et **optimisé** pour Home Assistant et de la couche **Superviseur**,
* **Container** : Installation sur une machine possédant déjà son système d'exploitation et un système de gestion de conteneur (exemple : docker). Cette dernière installe la version **core** de Home Assistant. Tous les add-ons seront à installer et configurer indépendamment.

Deux méthodes d'installation alternatives sont disponibles pour les **utilisateurs expérimentés** :

* **Home Assistant Supervised** : Installation manuelle de home Assistant avec le Superviseur.
* **Home Assistant Core** : Installation manuelle à l'aide de l'environnement virtuel Python.

> La version **Core** est très peu utilisée et s'adresse à des personnes de profil développeur ayant une bonne connaissance de l'environnement python. Cette solution est **réellement** réservée aux personnes **expérimentées** et ne sera pas abordée.

### Home Assistant OS ou HAOS.

Cette méthode implique l’utilisation de votre matériel pour une unique tâche. L’image d’installation contiendra l’OS dédié clé en main avec Home Assistant et le Superviseur.
Elle a l’avantage d’être la moins gourmande en ressources et la plus simple d’utilisation.

S﻿on installation tient au seul transfert de l'image vers un support (MicroSD ou SSD).

> L'installation sur un support micro SD, à force d’écriture de votre systeme domotique, peut provoquer des erreurs ammenant des disfonctionnement de votre domotique. Pour une utilisation perenne, il vous faudra remplacer la carte Micro SD par un disque SSD ou a minima [déplacer les données utilisateur vers un support externe](/blog/installer-home-assistant-os-sur-raspberry-odroid-nuc-ou-autres/#déplacer-les-données-utilisateurs-facultatif).

E﻿n choisissant HAOS, vous débuterez, sans vous soucier d'autres choses. C'est une version **clé en main**. 
Elle permet un accès simple aux modules complémentaires (add-ons) et aux services [Nabucasa](https://www.nabucasa.com/) de Home Assistant. C'est la méthode d'installation recommandée pour profiter pleinement de Home Assistant.

> Cette methode est officiellement supportée pour les Raspberry, Odroid, Asus Thinkerboard et Generic X86-X64 (Intel NUC). Au vu de la penurie de ce premier, n´hesitez pas a vous orienter vers d'autres machines si vous n'en avez pas en stock.

{{< selected_post title="***Articles concernant l'installation de Home Assistant OS***" tag="ha-os" cat="Installation" >}}

Enfin, si vous ne voulez pas dédier votre système à Home Assistant (sur un mini PC par exemple), vous pouvez faire une installation "Home Assistant OS" dans un **système virtualisé**. Le plus courant est **Proxmox**.

{{< selected_post title="***Articles concernant l'installation de Home Assistant OS***" tag="ha-supervised" cat="Installation" >}}

### Home Assistant Container.

C﻿ette autre solution permet d'utiliser votre matériel pour Home Assistant, mais aussi d'autres services, et sur l'OS de votre choix (Linux, Windows, Mac OS, Synology DSM).

Un gestionnaire de conteneur (typiquement Docker et Portainer) fera office de "superviseur", non présent par défaut dans cette installation, permettant d'installer Home Assistant **container**, mais aussi les services annexes (comprenez les add-ons) qui devront être configurés par vos soins.

> **ATTENTION :** C﻿e choix d'installation vous contraint à maintenir vous-même votre environnement à jour.

Home Assistant tourne alors comme un service à côté d'autres services comme MQTT, une base de donnée, un gestionnaire multimédia, etc 

{{< selected_post title="Articles concernant l'installation de Home Assistant Container" tag="ha-container" cat="Installation" >}}

### Home Assistant Supervised.

C﻿ette solution, un peu particulière, permet l’utilisation de votre matériel, **avec son système d'exploitation initial**, pour différentes utilisations. Il contient Home Assistant accompagné de son superviseur et un gestionnaire de conteneur (Docker). C﻿'est un "mélange" des deux méthodes d'installations.

> Linux est particulièrement adapté à une [installation supervised](https://github.com/home-assistant/supervised-installer). Cette façon de gérer Home Assistant est celle qui exige le plus de vous. Elle a également des exigences strictes que vous devez respecter. À moins que vous n'ayez vraiment besoin de ce type d'installation, vous devriez installer Home Assistant OS (qui peut aussi être une machine virtuelle), ou Home Assistant Container.

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

> **Attention**. Si vous envisagez un jour une migration, il faut savoir, que lors du passage d'un type d'installation a un autre, la partie **core** (entités, automatisations, intégrations, *backup*) sera facilitée par les sauvegardes de Home Assistant, mais pas pour tous (les add-ons par exemple).

## Les add-ons.

Les add-ons permettent d’ajouter des fonctions, services ou autres à votre système domotique.
Des services très connus et reconnus (comme Node-Red, Grafana, InfluxDB, DuckDNS, etc.) sont déjà presque configurés pour communiquer simplement avec votre système domotique.

I﻿l existe plusieurs facons d'ajouter un add-on:

* Les officiels : installable via les modules complémentaires,
* Les non-officiels : installable via les modules complémentaires mais nécessitant l’ajout du dépôt GitHub en manuel,
* V﻿ia [HACS (Home Assistant Community Store)](https://hacs.xyz/) : HACS est une bibliothèque d'add-ons, de thèmes, de cartes personnalisée (Custom Card) développé par des membres de la communauté, mais n'étant pas encore officiellement intégré dans Home Assistant.

> ﻿Home assistant a simplifié la chose en mettant à disposition des développeurs un script générant un bouton (pour les BluePrint, Dépots, etc) qui, d’un simple clique, fait les actions à votre place. Cela nécessite simplement de saisir l’adresse de votre instance.
> ![Bouton Add Repository](img/add-repository.svg "Bouton Add Repository")

Q﻿uelques add-ons sont néanmoins quasi indispensable, voici une liste non exhaustive :
* *File Editor ou VSCode* : Permet l'edition des fichiers de configuration.
* *Terminal* :
* *Samba* :


{{< selected_post title="Articles concernant les Add-ons indispensables de Home Assistant" cat="add-on/intégration" >}}

## L'accès l'extérieur.

A﻿ccéder à son système domotique depuis n'importe où dans le monde est primordial, mais il faut prendre conscience que cela peut ouvrir une brèche de sécurité sur votre système domotique et aussi sur votre réseau interne. Il convient donc de faire attention à ce que l'on fait.

Il y a effectivement plein de solutions différentes avec chacune des avantages, des inconvénients, des limitations qui ne sont pas toujours faciles d’appréhender quand on a une expérience limitée en réseau.

N﻿ous allons traiter ici les solutions pouvant etre directement intégrés a Home Assistant.

### Réflexions

Pour vous connecter sur votre serveur Home Assistant (HA) à distance, vous allez être confrontés à plusieurs challenges qui vous amèneront à un choix d’architecture :

* Connaître l’IP publique de votre Box internet qui dans la majorité des cas peut changer régulièrement (volonté des FAIs - Fournisseur d’Accès à Internet - pour diverses raisons),
* Modifier les paramètres réseaux de votre Box internet, donc savoir accéder et connaître l’interface d’administration,
* Gérer un enregistrement DNS, soit avec un nom de domaine (NDD) propre, soit avec un service de DNS dynamique (DynDNS, DuckDNS, etc),
* Gérer un certificat SSL pour sécuriser les données de votre client (le navigateur ou l’application mobile que vous allez utiliser pour vous connecter) et votre serveur Home Assistant
* Configurer HA pour un accès externe ET interne en utilisant le même NDD (pour vous simplifier la vie)
* Et enfin votre appétence à l’informatique et ses technologies

Face à ces challenges, différentes solutions sont possibles et toutes ne sont pas égales en termes de sécurité, de mise en œuvre ou d’accessibilité.

Ces solutions sont :

* Via Nabu Casa,
* Via accès direct en HTTP,
* Via accés direct en HTTPS,
* ﻿Via des services externes,
* Via une Box qui permet le "Loopback" ou un service DNS local,
* Via un proxy inversé (reverse proxy),
* Via un VPN, *﻿ Via un prestataire tiers de services réseaux.

Passons en revue ces différentes solutions.

> AVANT TOUTE CHOSE : Vous devez considérer les accès vers votre réseau avec des communications chiffrées, donc nous parlerons ici uniquement d’accès via HTTPS et non HTTP!

### Nabu Casa

[Nabu Casa](https://www.nabucasa.com/) est la société créée par les fondateurs Home Assistant. Bien que Home Assistant soit Open Source, elle propose un service à 7.50 euros/mois ou 75 euros/an nommé Home Assistant Cloud, permettant, en plus de soutenir Home Assistant, un accès sécurisé depuis n'importe où et l'ajout simplifié de Google Assistant et Alexa.

**Principe**
Le service fournit un accès depuis leur portail vers votre serveur HA, vous avez uniquement besoin de configurer votre HA avec ce service.

![Acces via Nabu Casa](img/acces-nabucasa.png "Acces via Nabu Casa")

**Avantage(s)**

* Pas de nom de domaine à gérer,
* Facilité de mise en œuvre,
* Sécurité ++ (dépend de Nabu Cas),
* Un essai de 31 jours.

**Inconvénient(s)**

* Un abonnement mensuel ou annuel,
* Accès seulement à HA (tout comme l'accès direct).

**Les tutos associés :**

* [????? A FAIRE ????????](<>)

### L'accès direct en HTTP.

L’accès direct est le plus simple en terme d’architecture, mais pas forcément le plus souple et le plus sécurisé.

#### Principe.

Le principe est tout simplement de rediriger les requêtes de votre client (app mobile/navigateur) qui arrivent sur votre Box (via un nom de domaine ou votre IP) vers l’IP interne (du style 192.x.x.x:8123) de votre serveur Home Assistant.

![Accès direct](img/acces-direct.png "Accès direct")

**Avantage(s)**

* Peu d'éléments à configurer : la Box et HA

**Inconvénient(s)**

* Peu sécurisé : HA est directement exposé via un NAT de votre Box et cette dernière n'a pas de fonction de Pare-feu très développée,
* Configuration via des fichiers en YAML (ce format n'est pas "user friendly" donc destiné déjà à des utilisateurs avertis)
* Association exclusive d'un port de l'IP publique de votre Box à HA _(vous pourriez évidemment utiliser d'autres ports pour d'autres services).

**Les tutos associés :**

* [Redirection des ports de votre Box internet](<>)

### L'accès direct en HTTPS.

L’accès direct est le plus simple en terme d’architecture, mais pas forcément le plus souple et le plus sécurisé.

#### Principe.

Le principe est tout simplement de rediriger les requêtes de votre client (app mobile/navigateur) en s’appuyant sur les add-ons DuckDNS (pour avoir un nom de domaine comme [toto.duckdns.org](http://toto.duckdns.org/)) et Let’s Encrypt pour créer et gérer le certificat SSL de votre serveur Home Assistant.

**Avantage(s)**

* Pas de NDD à acheter,
* Plus sécurisé que du HTTP simple.

**Inconvénient(s)**

* Rend plus compliqué l’accès en local,
* Ouverture du port de votre Box,
* Probleme de connexion avec certaine box via le NDD en local "loopback"

**Les tutos associés :**

### Via un proxy inversé

La mise en place d'un proxy inversé complexifie un peu l'architecture, mais peut la rendre plus abordable (suivant la solution de proxy inversé utilisée) et **surtout** la sécuriser un peu mieux que la solution précédente.

#### Principe

Le principe ici est de mettre ce proxy inversé entre votre Box et votre serveur Home Assistant. De ce fait, c'est votre proxy inversé qui prend en charge la connexion sécurisée avec votre client. Le reste de la communication vers votre serveur Home Assistant peut rester non chiffrée (HTTP).

![acces-reverse-proxy](img/topology-proxyinverse.png "acces par reverse proxy")

**Avantage(s)**

* Sécurité accrue avec l'ajout d'un service intermédiaire
* Possibilité d'exposer d'autres services que HA sur l'extérieur (Grafana, Synology, etc) sur le même port que HA
* Configuration SSL automatisé ou plus souple suivant le produit de proxy inversé

**Inconvénient(s)**

* Complexification : configuration d'un service intermédiaire et sa compréhension dans l'architecture

**Tutos associés**

* [Accès de l’extérieur en HTTPS avec Nginx Proxy Manager](<>)
* [Home Assistant via Reverse Proxy Synology](<>)

### 4. Via un opérateur tiers de services réseaux (autre que Nabu Casa)

Cette solution fait appel à un opérateur tiers pour se connecter à son réseau, tout comme la solution Nabu Casa. Sauf que ce n'est pas natif Home Assistant et qu'il vous faudra ajouter un module complémentaire (add-on).

#### Principe

Ceci est UN schéma possible, tout dépend des services fournit par l'opérateur (VPN, DynDNS, Proxy inverse, certificat SSL, etc). Dans l'exemple ci-après, l'opérateur fournit un service de proxy inverse et un certificat valide dans son domaine.

**Avantage(s)**

* Accès via un tiers de confiance qui gère une partie de la sécurité
* Pas besoin d’ouvrir de port en entrée sur la box.

**Inconvénient(s)**

* Ne vous affranchit pas de gérer un certificat pour la communication entre l'opérateur et votre réseau (sauf si service VPN),
* Beaucoup de "services" à gérer (complexité).

### 5. Via un VPN

Cette solution est à but informatif, dans le sens où c'est une possibilité, mais la mise en œuvre technique est bien plus ardue… et si vous êtes intéressé, c'est que vous devriez avoir les compétences nécessaires (ou être suffisamment averti) pour mettre en pratique !

#### Principe

Le schéma présente de façon très simplifiée le principe. Via un client VPN installé sur votre mobile ou PC distant, vous aurez un accès à votre réseau local directement (moyennant quelques contraintes dépendantes de routage).

> **Nota :** Une offre (gratuite à ce jour) de la société [ZeroTier](https://www.zerotier.com/) permet de créer un VPN sans avoir besoin de toucher à sa Box internet, un plus indéniable, d'autant qu'[un add-on Home Assistant](https://github.com/hassio-addons/addon-zerotier) existe !

**Avantage(s)**

* Accès direct à tout votre réseau (pas seulement Home Assistant et pas uniquement en HTTPS),
* Accès sécurisé.

**Inconvénient(s)**

* Être un utilisateur très averti,
* Client VPN à installer sur son mobile ou PC distant.

### Solution / conseil ??

Comme vous pouvez vous en douter, il y a plein de solution adapté à différent niveau de compétence. Même si nos articles essai de rendre tout ça le plus simple possible, ne vous engagez dans des solutions complexes que vous ne comprenez pas.

## La sauvegarde.

Un élément important, que l'on soit débutant ou confirmé, est de bien sauvegarder son travail.

Il est primordial d'effectuer des sauvegardes régulières et dispersées à plusieurs endroits, plus connu sous la règle du 3-2-1.

> La regle du 3-2-1 veut dire, une sauvegarde sur 2 supports differents et une sauvegarde a l'exterieur.

Il y a plusieurs moyens de faire des sauvegardes :

* En manuelle ou automatique, qui reste sur votre système,
* Un envoi vers un espace cloud (Google Drive),
* Un envoi vers un NAS sur le réseau local.

Il n'y a pas de méthode à privilégier, car il faut mélanger les sauvegardes locales et distantes.

En cas de soucis, il est possible de restaurer une sauvegarde dès le premier lancement de votre installation en cas de crash total, ou sinon directement depuis le gestionnaire de sauvegarde qui est maintenant intégré dans la version HA OS et HA Conteneur.

{{< selected_post title="Articles concernant les sauvegardes de Home Assistant" tag="backup" >}}

## Conclusion.

Nous touchons à la fin de cet article généraliste, mais vous permettant d'approfondir et de vous orienter vers des articles adaptés à vos besoins et vos demandes.

Il n'est pas un guide **ultime**, mais bien une aide dans la compréhension et la prise de vos décisions.

N'hésitez pas à nous faire remonter les erreurs ou partager vos trouvailles sur le forum.

### Sources

[Home Assistant Installation Officie (EN)](https://www.home-assistant.io/installation/)