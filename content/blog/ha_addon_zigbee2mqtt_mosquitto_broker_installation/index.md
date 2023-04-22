---
folder: ha_addon_zigbee2mqtt_mosquitto_broker_installation
title: Installation de Zigbee2MQTT et Broker Mosquitto
type: post
visibleInCMS: true
draft: true
date: 2023-04-22
lastmod: 2023-04-22
description: kjhdzsehbfckjezbfchezkjez
level: Débutant
type_install:
  - ha-os
version_ha: "2024.4"
categories:
  - Add-on/Intégration
tags:
  - zigbee
  - broker
  - mosquitto
  - zigbee2mqtt
author: default
authors:
  - mcfly
url_hacf: https://forum.hacf.fr/t/tuto-installation-de-zigbee2mqtt-et-broker-mosquitto/23103
---
Suite à de nombreuses questions, sur le forum, sur l'installation de Zigbee2MQTT, nous avons profité de l'occasion pour mettre a jour l'article.

### Le Zigbee

L﻿e Zigbee est un protocole quasi présent dans toutes les domotiques, c'est un protocole qui se devait universel, mais qui a vu arriver une incompatibilité entre les constructeurs nous obligeant à avoir une passerelle (gateway) par constructeur.

C’est là qu’interviennent les passerelles universelles.

**Les passerelles**

Il en existe plusieurs (les plus connues) :
* Clés à base Texas Instruments CC2652/CC1352 (Recommandés) (Ex : Sonoff [Amazon](https://www.amazon.fr/SONOFF-EFR32MG21-Coordinator-Universelle-Passerelle/dp/B0B6P22YJC), [Instead](https://sonoff.tech/product/gateway-and-sensors/sonoff-zigbee-3-0-usb-dongle-plus-e/),
* [Conbee II](https://www.amazon.fr/Dresden-ConBee-Electronique-II/dp/B07PZ7ZHG5),
* [Zigate (FR)](https://zigate.fr/),
* Clés à base Texas Instruments CC2531/2530,
* Etc

>[Liste des clés compatibles avec Zigbee2MQTT](https://www.zigbee2mqtt.io/guide/adapters/#recommended)

Les premières, a base de CC2652, sont les plus utilisées et compatibles avec Zigbee2MQTT et ZHA.
La Zigate, marche très bien sur les autres plateformes domotique, mais n'est pas la plus fonctionnelle, malgré une compatibilité Zigbee2MQTT et ZHA.
La Conbee II (environ 30 euros), très utilisée sous Home Assistant, elle est compatible Zigbee2MQTT, ZHA et deCONZ.

La dernière (CC2531/CC2530) est toujours compatible, mais entame son transfert vers les archives. Même si elle suffit à la plupart des devices, elle ne supporte pas « officiellement » le Zigbee 3.

**Les add-ons / Intégrations dans Home Assistant**
Il existe plusieurs façons de communiquer avec vos clés universelles dans Home Assistant, chacune ayant ses avantages et inconvénients, mais aussi une quantité d'appareils (devices) compatibles.

>[Base de données des compatibilités des appareils et des intégrations](https://zigbee.blakadder.com/)

*[ZHA](https://www.home-assistant.io/integrations/zha/) :* C'est l'intégration native de Home Assistant pour les clés universelles Zigbee. ZHA utilise une bibliothèque Python open-source implémentant une pile Zigbee indépendante du matériel appelée zigpy. Tous les coordinateurs compatibles avec zigpy peuvent être utilisés avec ZHA

*[deCONZ](https://www.home-assistant.io/integrations/deconz/) :* est le logiciel de Dresden elektronik qui communique avec les passerelles Zigbee ConBee/RaspBee.

*[Zigbee2MQTT](https://www.zigbee2mqtt.io/) :* Open-source et supportant plusieurs adaptateurs Zigbee ainsi qu'un grand nombre d'appareils, Zigbee2MQTT est l'application supportant le plus grand nombre d'appareils à date.

Nous allons voir comment installer ZigbeetoMQTT et le broker Mosquitto sur Home Assistant.

## Création d'un utilisateur Home Assistant (facultatif)
>Cette étape est facultative, car elle se fait automatiquement maintenant.

Si vous souhaitez le créer par vous-même.

[Création d'un utilisateur sur HA|690x345](upload://gz8WFu5Hqye25NAUxmZCkzL9eP4.gif)

## Installer Zigbee2MQTT.
Zigbee2MQTT est un add-on qui n'est pas directement disponible dans les modules complémentaires, il faut ajouter une source externe. Je vous laisse regarder l'[article sur l'installation d'un add-on](/ha_addons).

Le lien à ajouter est le suivant
```
https://github.com/zigbee2mqtt/hassio-zigbee2mqtt
```
**Passer à l'étape suivante avant de lancer l'add-on Zigbee2MQTT.**

![Installer l'add-on Zigbee2MQTT](upload://gz8WFu5Hqye25NAUxmZCkzL9eP4.gif)

## Installation du Broker Mosquitto.

![Installation du Broker Mosquitto](upload://zuJoQLL5wkOZ0SC2wNpJR7FS6lu.gif)

**Si vous avez laissé la création de l'utilisateur en automatique :**
Vous pouvez maintenant lancer Zigbee2MQTT.

Le résultat dans le fichier `configuration.yaml` de la partie MQTT, se fait automatiquement  après le premier lancement et doit ressembler à cela.
```
mqtt:
  server: mqtt://core-mosquitto:1883
  user: addons
  password: Thee8ahGhahpe4oKoe4xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Si vous avez créé l'utilisateur vous-même :**


Super tutoriel, mais on peut faire plus simple encore maintenant.
La création d'un utilisateur ne sert plus a rien, car maintenant c'est automatique.
Donc étape 1 , on passe. 
étape 3, on installe mosquitto broker et c'est tout. Et dans la configuration de Z2M, on laisse vide la partie `MQTT`.
Au premier lancement de Z2M, ca va créer un utilisateur pour mqtt automatiquement et ajoute l'adresse du broker automatiquement aussi.


Voilà, les installations sont finies, on passe aux configurations.

Aller dans  le broker mosquitto est ajouté ceci dans la partie login.
**\[u]PS\[/color]: 
@WarC0zes , m'as rappelé que la création d'un user n'est plus obligatoire.\[/u]**
La connection se fera tout seul entre les deux !

Si par contre vous avez un souci alors employé la création d'un user 
\[color=yellow]**Cela représente l'utilsateur qu'on créé au debut**\[/u] 

```
  - username: mqtt
    password: mqtt
```

Cliquer sur enregistré , voilà le broker est fini  pour sa config .
![partie 5|690x348](upload://b64lzFoQBCTotAX4jjyIbYZvFhJ.gif)

ensuite, on va dans zigbee2mqtt pour sa configuration
Aller dans sa configuration ( aussi ) :rofl:

dans la partie mqtt

```
base_topic: zigbee2mqtt
server: mqtt://core-mosquitto
user: mqtt
password: mqtt
```

Dans la partie 
Sérial \[color=red]*\[u]( la faite attention au modéle de cle que vous avez )\[/u]*\[/color]
Moi j'ai une sonoff version P donc je dois mettre ceci

```
port: >-
  /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
```

![partie 6|690x348](upload://rlUm7DpJ3aY0T40cOUABxKyvXXd.gif)

Voilà vous avez fini 

Si tout se passe bien HA devrais détecté un broker 
![Capture d’écran 2023-04-20 225500|690x238](upload://uor5y2aR7XZfUOla30dUp6TzTQ.png)

**\[color=green]Pour ce qui on besoin d'aide pour trouvé le chemin de la clé\[/color]** 
![partie 7|690x348](upload://yxUXhDsJqhTjY0dhcqu0iHYwghU.gif)

Edit : 21/04/2023

Les informations pour une conbee II sont ( **preté attention à ajouté adapter** )

```
serial:
  port: >-
    /dev/serial/by-id/usb-dresden_elektronik_ingenieurtechnik_GmbH_ConBee_II_DE2234130-if00
  adapter: deconz
```

Pour la version Sonoff de **VERSION E** ( Remplacer 20XXXXXXXX-if00 ) par le numéro de votre propre clé

```
serial:
  port: >-
    /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20XXXXXXXXX-if00
  adapter: ezsp
```