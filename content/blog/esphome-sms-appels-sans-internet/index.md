---
folder: esphome-sms-appels-sans-internet
title: SMS et appels sans internet
type: post
visibleInCMS: true
draft: false
date: 2023-02-08
lastmod: ""
images: img/accueil.png
description: >-
  Home Assistant sécurise notre maison et en permet le contrôle à distance. Mais
  que se passera-t-il si internet tombe alors que vous êtes en voyage pour deux
  semaines ? Et si un incendie se déclenche, seul un appel téléphonique vous
  avertira correctement.

  Cet article présente une solution DIY permettant à Home Assistant d'envoyer et de recevoir des SMS, de déclencher des automatisations, mais aussi de faire un appel téléphonique. 
level: Avancé
author: argonaute
categories:
  - ESPHome/DIY
  - Sécurité
tags:
  - sim800l
  - esp32
  - esphome
  - sms
  - appels
url_hacf: https://forum.hacf.fr/t/sms-et-appels-avec-ha-sans-internet/6314
workflow: published
---
Nos systèmes domotiques gèrent de plus en plus de fonctions, dont certaines sont vite **essentielles**. Il est rassurant de savoir que notre système veille sur la **sécurité** de la maison. 

**Or imaginez** : vous partez à Bali faire le voyage de votre rêve, ou une belle randonnée en montagne (je suis haut savoyard… :wink: ) et vous n'avez plus de 4G. Ou pire, la liaison internet de la maison tombe et la seule solution est de **redémarrer la box**.

Dans ce post, je vous propose une solution relativement économique, basée sur un module à base d'**ESP32-SIM800L** et **ESPHome**, pour pouvoir **envoyer et recevoir des SMS** avec Home Assistant, déclencher des actions sur réception d'un SMS et même **lancer un appel** sur le téléphone, et ce, **sans connexion internet**.

![Boitier ouvert](img/boitier-ouvert.jpeg "Boitier ouvert")

Je vous propose de traiter deux cas concrets :

1. **Redémarrage à distance de la box internet** : envoie d'un SMS qui déclenche le redémarrage
2. **Envoie d'un SMS** puis appel téléphonique pour alerter d'un incendie ou une intrusion.

## 1. Matériel

Le système est basé sur une carte LILYGO TTGO t-call ESP32 SIM800L qui intègre à la fois un ESP32 et un module SIM800L. Donc rien à souder ou adapter, juste à alimenter en USB-C.

J'ai choisi le module avec la puce ch9102f sur Banggood
[LILYGO® TTGO T-Call ESP 32 SIM800L](https://www.banggood.com/fr/LILYGO-TTGO-T-Call-V1_3-V1_4-ESP32-Wireless-Module-GPRS-Antenna-SIM-Card-SIM800L-Board-p-1527048.html)
D'autres versions sont également dispos sur Aliexpress (j'ignore les différences entre les puces)
[LILYGO® TTGO T-Call V1.4 – Module sans fil t-call V1.4 SIM800L ESP32,](https://s.click.aliexpress.com/deep_link.htm?aff_short_key=_All9bw&dl_target_url=https%3A%2F%2Ffr.aliexpress.com%2Fitem%2F33045221960.html)

**ESPHome** propose une implémentation permettant de gérer le module SIM800L, qui est reprise dans ce post et adaptée.
[Documentation ESPHome SIM800L](https://esphome.io/components/sim800l.html?highlight=sim800l)

Enfin, j'ai conçu sous Fusion360 un boitier qui peut être téléchargé et imprimé.
[Boitier à imprimer en 3D sur Cults3D](https://cults3d.com/fr/mod%C3%A8le-3d/outil/case-for-lilygo-module-ttgo-t-call-esp32-sim800l) 

Bien entendu, il faut un **abonnement téléphonique**. Certes un petit coût mensuel, mais moins cher qu'une maison brulée, car on n'a pas été prévenu à temps.

Pour les **abonnés Free**, il est possible d'avoir un abonnement limité à 2h et sans data gratuit. Autrement, il coûte 2€ par mois. C'est ce que je conseille.

> **Vérifier également que votre zone est bien couverte par le GRPS (ou 2G).**
> [Couverture mobile Free](https://mobile.free.fr/couverture)

J'avais initialement pris et conseillé un abonnement SymaMobile à 1,90€ mais à l'usage cet opérateur ne s'avère pas fiable, et les forums sont pleins de personnes insatisfaites. Les SMS étaient vraiment très lents à recevoir ou émettre, mais surtout, j'ai eu en 2 mois 2 grosses pannes de plus de 24 heures venant de chez eux. Donc à fuir.

## 2. Configuration ESPHome

L'article [premiers pas avec ESPHome](/esphome_installation) vous guidera si besoin dans l'installation de ESPHome, puis dans la création initiale du composant.

Voici pour rappel les grandes étapes :

* **Installer ESPHome** si ce n'est pas déjà fait
* **Créer un nouveau composant** que l'on appellera ici `ESP-SIM800`

  ![ESPHome](img/esphome.png "Composant (device) dans ESPHome")
* **Copier le code** qui suit dans le code du composant (bouton `EDIT`) et le valider (bouton `VALIDATE`)

```yaml
esphome:
  name: esp-sim800

esp32:
  board: esp-wrover-kit
  framework:
    type: arduino

logger:
  level: info
  
ota:

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password


# Home Assistant API
api:
  services:
  - service: send_sms
    variables:
      recipient: string
      message: string
    then:
    - sim800l.send_sms:
        recipient: !lambda 'return recipient;'
        message: !lambda 'return message;'
    - lambda: id(esp_sim800_sms_message).publish_state(message);

  - service: dial
    variables:
      recipient: string
    then:
    - sim800l.dial:
        recipient: !lambda 'return recipient;'
  # Retourne le dernier message reçus au dernier expéditeut en y ajoutant OK
  - service: reply_sms_ok
    then:
    - text_sensor.template.publish:
        id: esp_sim800_sms_message
        state: !lambda |-
          return id(esp_sim800_sms_message).state + " OK";
    - sim800l.send_sms:
        recipient: !lambda "return id(esp_sim800_sms_expediteur).state;"
        message: !lambda "return id(esp_sim800_sms_message).state;"
        
uart:
  baud_rate: 9600
  tx_pin: 27
  rx_pin: 26

switch:
  - platform: gpio
    id: "key_pin"
    pin: 4
    restore_mode: ALWAYS_OFF
  - platform: gpio
    id: "reset_pin"
    pin: 5
    restore_mode: ALWAYS_ON
  - platform: gpio
    id: "power_pin"
    pin: 23
    restore_mode: ALWAYS_ON

# Bouton de redémarrage
button:
  - platform: restart
    id: esp_sim800_restart
    name: "ESP-SIM800 Redémarrage"

sim800l:
  on_sms_received:
    - lambda: |-
        id(esp_sim800_sms_expediteur).publish_state(sender);
        id(esp_sim800_sms_message).publish_state(message);
    - logger.log:
        format: "Received '%s' from %s"
        args: [ 'message.c_str()', 'sender.c_str()' ]

text_sensor:
  - platform: template
    id: esp_sim800_sms_expediteur
    name: "Sms Expediteur"
  - platform: template
    id: esp_sim800_sms_message
    name: "Sms Message"

sensor:
  - platform: sim800l
    rssi:
      name: "ESP sim800 signal"

binary_sensor:
  - platform: sim800l
    registered:
      name: "ESP sim800 status"
```

* **Installer le micro-code sur l’ESP**

![Logs](img/log.png "Les logs")

Le log doit afficher *Registered OK* et le niveau de réception (RSSI) du module téléphone à 15 dans mon log ci-dessus.
Le code proposé est avec le logger en mode debug, mais il pourra être changé en info quand tout fonctionnera.

* Enfin **redémarrer Home Assistant,**
* Ajouter la nouvelle intégration ESP-SIM800.

**Trois entités sont créées** : 

* `sensor.esp_sim800_sms_expediteur`
* `sensor.esp_sim800_sms_message`
* `esp_sim800_statut`

Quand le module reçoit un SMS, il va renseigner ces identités `esp_sim800_sms_expediteur` et `esp_sim800_sms_message`
On peut tester en envoyant un SMS au module et en vérifiant que les entités expéditeurs et message sont bien renseignées.

Enfin `esp_sim800_statut` permet de savoir dans l'interface utilisateur si le module est correctement connecté.

**Trois services sont également mis à disposition** :

* `Esp_sim800_send_sms` 
* `Esp_sim800_replay_sms_ok` 
* `Esp_sim800_dia`l

**Esp_sim800_send_sms**  permet d'envoyer un SMS en lui passant le destinataire et un texte du message.
**Esp_sim800_replay_sms_ok**  : revoie la dernière commande reçue suivie de OK au dernier expéditeur. Cette fonction est très utilisée pour confirmer qu'un SMS a bien été reçu et que l'ordre est bien pris en compte.
**Esp_sim800_dial** permet de déclencher un appel. Malheureusement, il n'est pour l'instant pas possible de mettre de la voix. C'est cependant très utile pour déclencher la sonnerie du téléphone et donc générer une alerte.

Pour tester, on peut appeler les services avec l'`outil de développemen`t - `service`.

## 3. Mise en place d'une fonction de test

Pour tester facilement et dans la durée, j'ai mis en place une automatisation qui permet d'envoyer par SMS juste le mot clé ***Test*** et qui retourne par SMS ***Test ok***.

**Voici le code**

```yaml
alias: SIM800L - Test SMS
description: Retourne le SMS avec *Test ok* quand on envoie le SMS *Test* (test d'émission réception)
trigger:
  - platform: state
    entity_id: sensor.esp_sim800_sms_message
    to: Test
condition: []
action:
  - service: esphome.esp_sim800_reply_sms_ok
mode: single
```

## 4. Premier cas d'utilisation : reboot à distance de la box internet

Ce premier cas est important et a sauvé notre connexion pas plus tard que la semaine dernière alors que nous étions en congés. L'alternative serait les **voisins à qui vous avez laissé vos clés**, mais c'est potentiellement moins efficace. Ou alors mettre en place un test de la connexion à intervalles réguliers qui demande de "reboot" automatique par HA, mais plus hasardeux.

J'ai équipé la box d'une prise **Zwave Neo Coolcam**.
Si un SMS est envoyé avec le mot clé ***Restart-box***, alors une automatisation renvoie par SMS que  ***Restart-box OK***, puis éteint la prise, attends une seconde et rallume la prise. La box redémarre.

**Voici le code de l'automatisation.**

```yaml
alias: SIM800L - Box internet reboot
description: Redémarrage la box internet si SMS "Restart-box" est reçu
trigger:
  - platform: state
    entity_id: sensor.esp_sim800_sms_message
    to: Restart-box
condition: []
action:
  - service: switch.turn_off
    target:
      entity_id: switch.neo_coolcam_box_internet_onoff
  - delay:
      hours: 0
      minutes: 0
      seconds: 1
      milliseconds: 0
  - service: switch.turn_on
    target:
      entity_id: switch.neo_coolcam_box_internet_onoff
  - service: esphome.esp_sim800_reply_sms_ok
mode: single
```

## 5. Deuxième cas d'utilisation : alerte SMS et appel

Inondation, incendie, intrusion… **ce n'est pas très raisonnable de ne compter que sur Internet** et le fait que l'on a toujours et en permanence la 4G. Et puis une simple notification type "Coucou votre maison brule" ne sera pas forcément efficace. 

Donc la solution proposée est d'**envoyer un SMS et d'appeler**. Si on reçoit le message, on peut renvoyer un SMS avec le code Stop-alerte pour désactiver l'alerte (ou via l'interface lovelace). Autrement, le système rappellera 3 fois à 5 mn d'intervalle tant que l'alerte n'aura pas été désactivée.

Malheureusement, **l'appel alertera avec sa sonnerie, mais ne peut contenir pour l'instant de message vocal**. Il faut raccrocher et aller lire le SMS pour connaitre la nature de l'alerte. Il est donc recommandé d'entrer le n° de téléphone du module sous le nom "home Assistant" dans ses contacts pour savoir qui appelle. 

Bien entendu, il est conseillé d'inclure l'appel à plusieurs numéros à appeler en cas d'alerte (vous et votre conjoint par exemple, ou les voisins... ceux qui ont les clés), et en parallèle envoyer des notifications classiques.

Voici le code du service (attention, c'est ici un script et non une automatisation), **à appeler quand il y a une alerte critique à générer.**

```yaml
alias: Alerte - SMS puis appel
description: envoie le message passé en paramètre au destinataire, puis l'appel
sequence:
  - repeat:
      count: '3'
      sequence:
        - condition: state
          entity_id: input_boolean.activation_alertes_sms
          state: 'on'
        - service: esphome.esp_sim800_send_sms
          data:
            recipient: '0612131415'
            message: Alerte
        - service: esphome.esp_sim800_dial
          data:
            recipient: '0612131415'
        - delay:
            seconds: 300
mode: single
icon: mdi:message-alert-outline
```

Un *input boolean* ***activation_alertes_sms*** permet de sauvegarder l'armement de l'alerte. S'il est mis à *off*, l'alerte est désactivée.

Et enfin le code qui se déclenche quand on envoie un SMS avec ***Stop-alerte*** au module demandant la désactivation de l'alerte.

```yaml
alias: SIM800L - Stop alerte
description: Arrête l'envoie de SMS + appel sur alertes
trigger:
  - platform: state
    entity_id: sensor.esp_sim800_sms_message
    to: Stop-alerte
condition: []
action:
  - service: input_boolean.turn_off
    target:
      entity_id: input_boolean.activation_alertes_sms
  - service: esphome.esp_sim800_reply_sms_ok
mode: single
```

## Conclusion

Voilà, vous avez pu **sécuriser à moindre coût votre système domotique** en lui rajoutant une **capacité d'appel téléphonique et un moyen de communiquer même si Internet tombe.**

La contrainte reste d'être dans une zone couverte par la 2G, mais c'est, en France, le cas pour pas mal de région. 

L'alternative est d'intégrer un modem type Huawei e3372, avec SMS gateway. Mais cette solution sera un peu plus chère, mais nécessitera surtout l'installation d'un serveur Gammu.

N'hésitez pas à faire vos suggestions ou vos retours sur le forum, voir proposer des solutions alternatives.