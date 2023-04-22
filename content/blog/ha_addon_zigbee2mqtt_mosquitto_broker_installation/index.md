---
folder: ha_addon_zigbee2mqtt_mosquitto_broker_installation
title: Installation de Zigbee2mqtt et Broker Mosquitto
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
url_hacf: https://forum.hacf.fr/t/tuto-installation-de-zigbee2mqtt-et-broker-mosquitto/23103
---
Hello
Comme on voit de nouveaux membres chaque jour et que beaucoup ont des soucis pour installer Zigbee2mqtt et le m, j’ai de ce fait procédé a une installation sur VM et en ai profité pour faire des GIF pour vous aider.mosquittoosquitto


Etape 1 , crée un user 
![partie 0|690x348](upload://4sJ1LMNfHGSVda5ZuRHIRxtiplD.gif)

Etape 2 , installé zigbee2mqtt
Lien a inséré :
```
https://github.com/zigbee2mqtt/hassio-zigbee2mqtt
```
![partie 1|690x345](upload://gz8WFu5Hqye25NAUxmZCkzL9eP4.gif)

Etape 3, installé le broker mosquitto

![partie 3|690x348](upload://zuJoQLL5wkOZ0SC2wNpJR7FS6lu.gif)

Voilà, les installations sont finies, on passe aux configurations.

Aller dans  le broker mosquitto est ajouté ceci dans la partie login.
**[u][color=green]PS[/color]: 
@WarC0zes , m'as rappelé que la création d'un user n'est plus obligatoire.[/u]**
La connection se fera tout seul entre les deux !

Si par contre vous avez un souci alors employé la création d'un user 
[color=yellow][u]**Cela représente l'utilsateur qu'on créé au debut**[/u][/color] 
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
Sérial [color=red]*[u]( la faite attention au modéle de cle que vous avez )[/u]*[/color]
Moi j'ai une sonoff version P donc je dois mettre ceci

```
port: >-
  /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
```
![partie 6|690x348](upload://rlUm7DpJ3aY0T40cOUABxKyvXXd.gif)

Voilà vous avez fini 

Si tout se passe bien HA devrais détecté un broker 
![Capture d’écran 2023-04-20 225500|690x238](upload://uor5y2aR7XZfUOla30dUp6TzTQ.png)


**[color=green]Pour ce qui on besoin d'aide pour trouvé le chemin de la clé[/color]** 
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