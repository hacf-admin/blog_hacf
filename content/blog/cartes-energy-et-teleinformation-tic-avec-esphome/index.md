---
title: Cartes "Energy" et teleinformation (TIC) avec ESPHome
type: post
visibleInCMS: true
draft: true
date: 09-02-23
lastmod: 09-02-23
images: img/accueil.png
description: "Les compteurs Linky disposent d'une prise de téléinformation
  appelée TIC qu'il est possible de connecter pour récupérer sa consommation
  électrique dans Home Assistant. Cet article décrit comment construire pour une
  somme modique un module permettant de récupérer les informations du Linky,
  basé sur ESPHome et un ESP32. "
level: Avancé
categories:
  - Energie
  - ESPHome/DIY
tags:
  - linky
  - esphome
  - esp32
author: argonaute
url_hacf: https://forum.hacf.fr/t/cartes-energy-et-teleinformation-tic-avec-esphome/9679
---
Le module Energy est vraiment puissant, propose de belles cartes interactives Lovelace (navigation jour-mois-année, consolidation des coûts), et ce serait à mon sens dommage de ne pas l'utiliser. Le module Energy utilise les tables "statistics" de HA, qui permettent de garder les données sans limite de durée, avec 1 enregistrement seulement stocké par heure.

En général, je préfère toujours bien comprendre et essayer d'utiliser en priorité ce que propose HA avant d'utiliser des intégration tierces (par exemple Energy plutôt que node-red et influxDB pour la consommation électrique). Penser que ne pas faire le choix HA est prendre le risque de ne pas profiter des évolutions à venir de HA.

Certes le sujet télé-information a déjà été pas mal traité, mais je vous propose de vous faire mon retour d'expérience sur une intégration complète et éprouvée, avec un coût de réalisation total < 10€ :

* Réalisation DIY avec un ESP32 et les quelques composants soudés sur une plaque de prototypage 
* Un boitier à imprimer, disponible dans Cults
* Adaptation de la configuration ESPHome pour avoir les entités compatible Energy
* Configuration et intégration du module energy dans Lovelace : consommation et coûts

J'ai documenté ici la procédure de création de nouveaux composants ESPHome que j'utilise : 
[Utilisation ESPHome web pour de nouveaux composants](https://forum.hacf.fr/t/utilisation-esphome-web-pour-de-nouveaux-composants/10506)

Pour plus d'informations, je vous renvoie à 2 excellents tutos :

* ESPHome : [Installer ESPHome.... de @McFly](https://forum.hacf.fr/t/installer-esphome-sur-home-assistant-et-creer-votre-premiere-configuration/223)
* Teleinfo DIY : [Connaitre sa conso... de GammaTroniques](https://gammatroniques.fr/connaitre-sa-consommation-electrique-avec-home-assistant/)

Pour information, mon compteur électrique est en mode TIC "historique", avec heures pleines et heures creuses. Si ce n'est pas votre cas, il faudra faire quelques adaptations.

J'ai moi préféré utiliser un ESP32 plutôt qu'un ESP8866 car, plus puissant, il permet de mieux gérer le flux de données sur la liaison série et ainsi évider les erreurs ("bad CRC"). J'ai choisi une résistance de 2k en entrée, qui est un bon compromis. La liaison série principale de l'ESP32 est utilisée (UART0) dispo sur le GPIO 03.
Autrement, on retrouve le schéma classique : opto-coupleur pour isoler le circuit et la compteur, transistor mofset pour réamplifier le signal. L'ESP32, alimenté par sa prise micro-usb, alimente en 3.3v le circuit.

![image|690x361](img/schema.jpeg)

Les quelques composants sont soudés sur une plaque de prototypage de 5cm x 6cm. Un bornier est rajouté. Certes, on peut trouver des montages tout faits, mais souder ces quelques composants n'est pas très compliqué, et le DIY est toujours tellement plus satisfaisant :smirk:

![](img/boitier.jpeg)

![](img/compteur2.jpeg)

J'ai conçu sous fusion360 et mis en ligne le boitier :
<https://cults3d.com/fr/mod%C3%A8le-3d/outil/box-for-esp32-or-esp8266>

A noter qu'il pourrait bien entendu être utilisé pour d'autres montages à base de ESP32 ou ESP8266 sur carte de prototypages. D'ailleurs, il semble susciter de l'intérêt sur Cult3D.

Concernant ESPHome, ci-dessous mon fichier de configuration.

```yaml
esphome:
  name: esp-teleinfo

esp32:
  board: esp-wrover-kit
  framework:
    type: arduino

logger:
  level: debug
  baud_rate: 0

ota:

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password

api:


uart:
  id: uart_bus
  rx_pin: GPIO3
#  tx_pin: GPIO1
  baud_rate: 1200
  parity: EVEN
  data_bits: 7

teleinfo:
  id: esp_teleinfo
  update_interval: 60s
  historical_mode: true

binary_sensor:
  - platform: status
    id: teleinfo_status
    name: "Teleinfo Status"

sensor:
  - platform: wifi_signal
    name: "Signal wifi"
    update_interval: 60s
    unit_of_measurement: dB
    accuracy_decimals: 0
    force_update: false
    icon: mdi:wifi
    
  - platform: uptime
    id: uptime_seconds
    name: "Uptime Sensor"
    update_interval: 60s
    unit_of_measurement: s
    accuracy_decimals: 0
    force_update: false
    icon: mdi:timer
    
  - platform: teleinfo
    tag_name: "IINST"
    name: "Intensité"
    unit_of_measurement: "A"
    icon: mdi:current-ac

  - platform: teleinfo
    tag_name: "PAPP"
    name: "Puissance"
    unit_of_measurement: "VA"
    icon: mdi:flash

  - platform: teleinfo
    tag_name: "HCHC"
    id: hchc
    name: "Teleinfo index_hc_kwh"
    unit_of_measurement: "kWh"
    device_class: "energy"
    state_class: "total_increasing"
    accuracy_decimals: 3 
    filters:
      - multiply: 0.001
    icon: mdi:gauge

  - platform: teleinfo
    tag_name: "HCHP"
    id: hchp
    unit_of_measurement: "kWh"
    device_class: "energy"
    state_class: "total_increasing"
    name: "Teleinfo index_hp_kwh"
    accuracy_decimals: 3 
    filters:
      - multiply: 0.001
    icon: mdi:gauge

button:
  - platform: restart
    name: "Teleinfo Restart"

text_sensor:
  - platform: teleinfo
    tag_name: "PTEC"
    name: "Tarif actuel"
    icon: mdi:clock-time-nine-outline
  - platform: template
    name: Uptime
    update_interval: 60s
    icon: mdi:clock-start
    lambda: |-
      int seconds = (id(uptime_seconds).state);
      int days = seconds / (24 * 3600);
      seconds = seconds % (24 * 3600);
      int hours = seconds / 3600;
      seconds = seconds % 3600;
      int minutes = seconds /  60;
      seconds = seconds % 60;
      if ( days ) {
        return { (String(days) +"d " + String(hours) +"h " + String(minutes) +"m "+ String(seconds) +"s").c_str() };
      } else if ( hours ) {
        return { (String(hours) +"h " + String(minutes) +"m "+ String(seconds) +"s").c_str() };
      } else if ( minutes ) {
        return { (String(minutes) +"m "+ String(seconds) +"s").c_str() };
      } else {
        return { (String(seconds) +"s").c_str() };
      }
```

Je n'ai gardé que les informations utiles (par exemple l'ID du compteur qui ne change jamais n'a pas besoin d'être lue en permanence). 
Une lecture toutes les minutes est suffisante.
Les sensors d'index ont des attributs compatibles avec le module Energy : state_class de type "total_increasing" et conversion en kWh.
L'UART0 étant utilisée, il est préférable de désactiver la sortie des logs sur la liason série (baud_rate: 0 dans le logger). On peut enlever cela pour le premier flashage par cable, pour vérifier que tout se passe bien.

Ensuite, il faut configurer le module Energy : il est depuis les dernières versions dans configuration - tableau de bord puis cliquer sur Energies. Je vous conseille de mettre les coûts de kWh.

![image|675x500, 75%](img/interfaceenergy.png)

J'ai également configuré la partie CO2 pour tester : cela donne le % d'énergie carbonée utilisée par EDF. Il faut aller sur le site https://co2signal.com/, créer une clé d'API et la rentrée dans la configuration du module Energy. Cela crée une entité CO2 avec en temps réel le % d'énergie carbonée utilisée par EDF.
La doc est ici si jamais : [CO2 Signal - Home Assistant (home-assistant.io)](https://www.home-assistant.io/integrations/co2signal). Bon... 

J'ai aussi essayé d'ajouter mes panneaux solaire, mais comme le module Energy ne prends pas en charge le rachat de la consommation par EDF, cela me faussait les résultats.

Reste enfin à intégrer les cartes Energy dans Lovelace (https://www.home-assistant.io/lovelace/energy/)
Mon dashboard fait pour mobile est assez simple :

![image|220x500](img/interfacelovelace.png)

A noter qu'il y a ici présent le nouveau composant bouton :smirk: 

Et le code, si jamais, des 6 cartes (hors entête de ma navigation sur mobile) :

```yaml
type: energy-date-selection
type: energy-usage-graph
type: energy-sources-table
type: horizontal-stack
cards:
  - type: gauge
    min: 0
    max: 90
    entity: sensor.teleinfo_intensite
    severity:
      green: 0
      yellow: 55
      red: 65
    needle: true
  - type: gauge
    entity: sensor.teleinfo_puissance
    min: 0
    max: 20340
    severity:
      green: 0
      yellow: 12450
      red: 14690
    needle: true
type: horizontal-stack
cards:
  - type: entity
    entity: sensor.teleinfo_index_hc_kwh
    name: Index HC
    icon: mdi:gauge
  - type: entity
    entity: sensor.teleinfo_index_hp_kwh
    name: Index HP
type: horizontal-stack
cards:
  - type: entity
    entity: sensor.teleinfo_index_hc_kwh
    name: Index HC
    icon: mdi:gauge
  - type: entity
    entity: sensor.teleinfo_index_hp_kwh
    name: Index HP
type: entities
entities:
  - entity: sensor.teleinfo_tarif_actuel
  - entity: sensor.fr_grid_fossil_fuel_percentage
    name: Energie fossile / EDF
  - type: section
    label: Gestion du module teleinfo
  - entity: sensor.teleinfo_uptime
    name: Temps de fonctionnement
    secondary_info: last-updated
  - entity: button.teleinfo_restart
    name: Redémarrage
```

La suite pour moi sera d'intégrer les consommations des appareils : chauffage, chauffe-eau…
N'hésitez pas à faire vos retours ou compléments.