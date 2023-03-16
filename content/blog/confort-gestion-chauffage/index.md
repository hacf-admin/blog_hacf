---
folder: confort_gestion_chauffage
title: Gestion du chauffage de bout en bout
type: post
visibleInCMS: true
draft: false
level: Avancé
author: argonaute
date: 2022-09-30
lastmod: null
images: img/chauffage-chat2.jpg
description: "A l'heure où le chauffage est un poste de dépense très important,
  Home Assistant ne fournit qu'un thermostat basique. Cet article propose une
  implémentation complète permettant de gérer son chauffage : thermostat plus
  performant, planification des plages de température, pilotage, gestion des
  ouvrants, interface graphique et courbes pour l'optimisation."
categories:
  - Automatisation
  - Confort
  - Energie
tags:
  - blueprint
  - chauffage
  - energie
url_hacf: https://forum.hacf.fr/t/gestion-de-bout-en-bout-du-chauffage/4897
socialshare: true
series: null
---
## Avant propos

Cet article traite de l'implémentation d'un thermostat plus efficient que le thermostat virtuel de HA, une solution de planification du chauffage suivant des plages horaires, la gestion de différents modes de chauffage (manuel, éco, confort...), et enfin un exemple de carte lovelace pour afficher le tout.

Ce post s'adresse tout particulièrement aux personnes **n'utilisant pas un thermostat physique** (type Nest, Heatit, Netatmo ou même celui intégré au chauffage) et ayant un **mode de chauffage pilotable en on-off** (typiquement des convecteurs avec module on-off ou [fil pilote](https://amzn.to/3F6UVjS)).
L'implémentation fait appel à pas mal de concepts, ce qui peut s'avérer complexe pour les personnes débutant avec Home Assistant.

## 1. Le chauffage dans Home Assistant

S’il y a un domaine source de confort et d’économie dans une maison domotisée, c’est bien le chauffage. Home Assistant est un système domotique incroyable, offrant énormément de possibilités. Et pourtant, le sujet du chauffage est plutôt mal traité (pour l’instant).

Un thermostat générique (intégration et carte lovelace) est proposé par HA pour piloter un chauffage en ON-OFF, mais il est de type **hystérésis** : il chauffe à 100% jusqu’à atteindre la température plus un seuil, puis s'arrête. Le convecteur sera alors soit bouillant, soit froid, ce qui crée des **oscillations de température** et du chaud-froid inconfortables en plus de consommer plus. 

C’est probablement adapté aux climatiseurs réversibles américaines, mais pas du tout à nos convecteurs et autres modes de chauffage. La **température extérieure** n’est même pas prise en compte, pas plus que la coupure du chauffage quand une **fenêtre est ouverte**.

De plus, il n’y a pas de gestion des **plages horaires** permettant de définir les périodes de chauffe. Il faut alors faire appel à des intégrations de la communauté, ou alors pour les plus courageux tout redévelopper avec des automatisations et des champs inputs (oups !!). Les deux principales intégrations sont [Schedy](https://hass-apps.readthedocs.io/en/stable/apps/schedy/concept.html) et le [Scheduler](https://github.com/nielsfaber). Schedy est un "daemon" (un processus qui s'exécute en arrière-plan) qui permet de planifier dynamiquement des événements, mais bien que très puissant, il n’a pas d’interface et son intégration est relativement complexe. Je vous proposerai d’utiliser l’autre intégration : le **[scheduler](https://community.home-assistant.io/t/scheduler-card-custom-component/217458)**.  

Pour gérer les différents modes, par exemple pour moduler la température sur les périodes de présences et absences, il n’y a donc pas d’autres choix que de redévelopper des automations. 

## 2. Proposition d’implémentation

L’article qui suit propose de mettre en place :

* Un **thermostat de type TPI** (Time Proportional Integration) basé sur les températures intérieure et extérieure, avec arrêt quand une fenêtre est ouverte.
* Une **gestion des modes** : auto-confort, auto-éco, manuel, hors gel, arrêt, absences.
* Une gestion des **plages horaires** pour les modes auto-confort et auto-éco.
* Une **carte lovelace** permettant de gérer le tout, dont l’affichage de la puissance en cours.
* L'affichage de **graphiques** permettant de contrôler les paramètres

J’utilise ce type de thermostat TPI pour huit convecteurs et depuis cinq ans (avec une autre box) et c’est vraiment très performant, avec une chaleur très douce de la pièce et des radiateurs, sans grandes variations.

## 3. Le thermostat TPI

### 3.1 Le principe

L’objectif du thermostat est de calculer un coefficient de puissance de chauffe en fonction d’une **consigne** donnée, de la **température intérieure** et de la **température extérieure**. Nous l’appellerons juste **puissance** pour simplifier.

* Puissance = 100% : le convecteur chauffe en permanence
* Puissance = 50% : le convecteur chauffe la moitié du temps
* Puissance = 0% : le convecteur ne chauffe plus

La puissance doit être de 100% quand la température de la pièce est loin de la consigne, puis baisser doucement jusqu’à atteindre la consigne. Ensuite le radiateur doit rester légèrement tiède pour compenser les pertes thermiques, ce en fonction de la température extérieure.

**Tout d'abord, on calcule la puissance en pourcentage**

Le calcul de la puissance en %, est assuré par la formule :

> Puissance = coeff_c * *(T consigne - T intérieure) + coeff_t*   (T consigne - T extérieure) 

 avec un min à 0% et un max à 100%

* **coeff_c** est un coeff. qui dépend de la puissance du chauffage et de la surface.
* **coeff_t** dépend lui de l’isolation de la pièce et des pertes thermiques.

Pour une installation standard aux normes, on a coeff_c = 0,6 et coeff_t = 0,01

> Exemple : Tint = 19°C Text = 10°C et consigne a 20°C alors puissance = 70%

Le fait de considérer la température extérieure est donc indispensable pour compenser les pertes de chaleur et garder une température très constante, ce qui n'est pas assuré par le thermostat standard de HA.

**Ensuite, on transforme la puissance exprimée en % par une séquence de ON-OFF de notre chauffage.**

L’implémentation proposée ici est pour des convecteurs avec un fil pilote (Qubino). Mais une adaptation est possible pour d’autres types de chauffage.

Pour nos convecteurs, **la puissance nécessaire est recalculée toutes les 10 mn**, ce qui donne le temps de marche sur la période. Avec une puissance calculée de 70%, le convecteur sera alors sur ON 7mn puis sur OFF 3mn.

La périodicité dépend de l’inertie : 30mn à une 1H pour une chaudière, 10mn pour un convecteur on/off (fil pilote). Pour un poêle a granulé, la puissance devrait être recalculée toutes les 30mn par exemple.

Le thermostat prend en charge la fenêtre et il coupe le radiateur quand cette dernière est ouverte.

### 3.2 Code du thermostat

Le code du thermostat est dans un **Blueprint** qui peut être téléchargé via cette url :
[https://github.com/argonaute199/chauffage-home-assistant/blob/main/blueprint/thermostat_tpi.yaml](https://community.home-assistant.io/t/scheduler-card-custom-component/217458)

Pour le charger dans Home Assistant, aller dans `configuration`, `blueprints`puis cliquer sur le bouton `importer un blueprint` en bas à droite et recopier l'URL précédente.
Ensuite une automatisation  `thermostat` peut être facilement créée pour chaque radiateur (j’en ai 8 à la maison) en cliquant sur le  bouton "créer une automatisation".

La puissance et la consigne sont dans des `input_number` définis spécifiquement et utilisés dans la carte lovelace. Les deux températures sont dans des `sensors`et la fenêtre un `binary sensor`. Enfin le radiateur est piloté par un `switch`.

La création ou édition d’un nouveau thermostat revient alors à renseigner les paramètres suivants :

![Blueprint Thermostat TPI](img/blueprint.png "Blueprint Thermostat TPI")

Si on a des radiateurs avec vanne thermo-dynamiques (pas en mode ON OFF, mais injection de la puissance), il faudrait reprendre le calcul de puissance et le *Blueprint* devrait être adapté.

> **Attention** : si le format des nombres sur votre système est avec des virgules et non des points, il faut changer dans le blueprint les valeurs min - max - step de coeff_c et coeff_t, et remplacer les points en virgules.

## 4. La carte lovelace

Une carte assez basique permet de **visualiser** pour chaque radiateur le **mode de chauffage**, la **température de consigne** de la pièce, la **puissance** du chauffage et l’**état de la fenêtre**.

**Elle remplace la carte thermostat de HA.**

![Carte thermostat TPI](img/cartethermostat.png "Carte thermostat TPI")

Voici les différents modes proposés (champs de type `input select`):

![Carte thermostat TPI - mode de chauffage](img/cartethermostat-mode.png "Carte thermostat TPI - mode de chauffage")

* **Mode « auto-confort » :** quand la pièce est occupée. Ajuste automatiquement la température suivant des plages horaires définies dans le Scheduler (planification « auto-confort »)
* **Mode « auto-eco » :** quand la pièce est inoccupée (par exemple la semaine ou quand l’alarme est mise). Ajuste automatiquement la température suivant des plages horaires définies dans le Scheduler (planification « auto-eco »). 
  Une solution simple pour définir les températures du mode ECO sera de prendre les heures et les températures de CONFORT en les abaissants de 2 degrés.
* **Mode « manuel » :** la consigne est gérée manuellement et non par une planification du Scheduler. Dans ce mode, la carte affiche une ligne supplémentaire permettant d’ajuster la consigne.
* **Mode « hors gel » :** règle la consigne sur une température donnée (en fait 10°C pour moi)
* **Mode « stop » :** tout est arrêté, y compris le thermostat. C’est le mode été.
* **Mode « absent » :** n’est pas censé être sélectionné manuellement, mais automatiquement mis quand une personne est absente et que le chauffage était en CONFORT, le chauffage passe en mode ECO. Le fait d’avoir un état dédié permet de remettre en CONFORT quand la pièce est de nouveau occupée.

La carte utilise plusieurs cartes de la communauté, qu’il faut installer au préalable : button-card, hui-element et number-box.
<https://www.home-assistant.io/lovelace/button/>
<https://github.com/thomasloven/lovelace-hui-element>
[Input Number - Home Assistant (home-assistant.io)](https://www.home-assistant.io/integrations/input_number/)

Voici le code de la carte

```yaml
type: entities
entities:
  - type: 'custom:button-card'
    color: '#D1DBAE'
    name: Salon
    styles:
      card:
        - background-color: '#E2E2E2'
        - height: 25px
      name:
        - font-size: 18px
  - entity: input_select.chauffage_salon_mode
    name: Mode
  - type: conditional
    conditions:
      - entity: input_select.chauffage_salon_mode
        state: Manuel
    row:
      entity: input_number.chauffage_salon_consigne
      type: 'custom:numberbox-card'
      name: Réglage consigne
  - type: 'custom:hui-element'
    card_type: glance
    show_name: false
    style: |
      ha-card {
        background: var(--background-card-color);
        box-shadow: none;
        font-size: 20px;
        top: -10px;
        margin: -20px
      }
    entities:
      - entity: sensor.oregon_thermometre_salon_temperature
      - entity: input_number.chauffage_salon_consigne
      - entity: input_number.chauffage_salon_puissance
      - entity: binary_sensor.aqara_fenetre_salon_onoff
        icon: 'mdi:window-closed-variant'
```

## 5. La planification (scheduler)

La planification est basée sur le Scheduler proposé dans HACS, composé d'un composant et une carte.
<https://community.home-assistant.io/t/scheduler-card-custom-component/217458>

Une vue principale permet de voir les différents thermostats. L’interface présentée ici est pour un mobile. L’entête de la vue a une icône « outils » à sa droite qui permet d’accéder à une deuxième vue de réglages des radiateurs, qui contiendra alors la Scheduler card.

![Thermostat TPI - Liste thermostats](img/listethermostats.png "Thermostat TPI - Liste thermostats")

La vue réglage contient une seule carte scheduler affichant la planification de tous les radiateurs. 

Chaque radiateur a deux planifications : une **CONFORT** et une **ECO**. Malheureusement, la Scheduler card les affichent ici dans le désordre (en fait en fonction des plages horaires).

![Scheduler card - Liste planifications](img/planificationliste.png "Scheduler card - Liste planifications")

La planification sera bien entendue active ou non en fonction du mode choisi dans le thermostat. La température de consigne va automatiquement changer en fonction de l’heure et du programme quand la planification est activée (le Scheduler gère cela automatiquement pour nous).

Il est possible, si on est administrateur, d'éditer chaque planification puis sélectionner la température de consigne par plage horaire.

![Scheduler card - Détail planification](img/planificationdetail.png "Scheduler card - Détail planification")

Voici le code de l'implémentation de la Scheduler card

```yaml
type: 'custom:scheduler-card'
include:
  - input_number.chauffage_*_consigne
time_step: 15
title: ''
show:
  labels: true
  labels_secondary: false
display_options:
  primary_info: name
  secondary_info: ' '
style: |
  .card-header {
    font-size: 18px;
  }
discover_existing: false
```

Une fois la carte Scheduler créée, elle est vide. Il faut utiliser l'interface pour créer les différentes planifications (type schema - 2 planifications : auto-eco et auto-confort pour chaque radiateur). 

> **Avertissement** : sur certains devices, la carte numberbox-card peut mal fonctionner : Il faut alors cliquer au-dessus et non sur les + et -. Si cela arrive, il est possible de juste supprimer la ligne *type: 'custom:numberbox-card'* pour revenir aux champs input-number standard.

## 6. L’automatisation des modes

La sélection du mode doit activer ou désactiver les trois automatisations : **thermostat** (notre premier Blueprint), **auto-confort** et **auto-eco** (les deux automatisations créées par le Scheduler). 

La consigne est changée pour une valeur en dure si le mode n’est pas auto-eco ou auto-confort (par exemple pour le hors-gel).
Pour ce faire, une dernière automatisation, codée également dans un Blueprint, permet de prendre en charge cette sélection du mode pour chaque radiateur. Elle prend en entrée le mode de chauffage désiré, la consigne et les trois automatisations à piloter (thermostat, auto-confort et auto-eco).

Le code du Blueprint de gestion des modes peut être téléchargé via cette URL :
<https://github.com/argonaute199/chauffage-home-assistant/blob/main/blueprint/chauffage_pilotage.yaml>

Pour le charger dans Home Assistant, comme précédemment, aller dans configuration, Blueprint puis cliquer sur le bouton "importer un blueprint" en bas à droite et recopier l'URL précédente.

Ensuite une automatisation peut être facilement créée pour chaque radiateur en cliquant sur le  bouton "créer une automatisation". Il faut alors renseigner chaque valeur en entrée du Blueprint.

![Thermostat TPI - Nouveau thermostat](img/nouveauthermonstat.png "Thermostat TPI - Nouveau thermostat")

> **Point important** : comme déjà évoqué, si par exemple on passe du mode confort au mode eco, le scheduler ajuste automatiquement la consigne en fonction de sa planification et de l’heure qu’il est. Cela permet de se passer d’un deamon dynamique comme shedy.

Enfin le thermostat met la consigne à 0 si la fenêtre est ouverte, et remet la bonne valeur une fois fermée.

Voyons maintenant chacun des modes, et comment le changement de mode active ou désactive les 3 automatisations thermostat, auto-confort, auto-eco :

**Mode "auto-confort"**

* Automatisation thermostat : ON
* Automatisation auto-confort : ON
* Automatisation auto-eco : OFF

**Mode "auto-eco"**

* Automatisation thermostat : ON
* Automatisation auto-confort : OFF
* Automatisation auto-eco : ON

**Mode "Hors-gel"**

* Automatisation thermostat : ON
* Automatisation auto-confort : OFF
* Automatisation auto-eco : OFF
* Consigne forcée à 10°C (bon un peu plus qu’un hors gel…"

**Mode "Manuel"**

* Automatisation thermostat : ON
* Automatisation auto-confort : OFF
* Automatisation auto-eco : OFF

**Mode "Arrêt"**

* Automatisation thermostat : OFF
* Automatisation auto-confort : OFF
* Automatisation auto-eco : OFF
* Consigne et puissance a 0.

**Mode "Absence"**

* Automatisation thermostat : ON
* Automatisation auto-confort : OFF
* Automatisation auto-eco : ON

Le thermostat fonctionne en ECO. Le mode absence n’est pas censé être activé manuellement, mais automatiquement par la détection d’une absence (l’alarme mise dans mon cas).

Voici le code du Blueprint de gestion des modes.

```yaml
blueprint:
  name: Pilotage chauffage
  description: Gestion des différents modes de chauffage - Stop  Hors-gel  Auto confort Auto eco 
  domain: automation

  input:
    entity_consigne:
      name: Consigne
      description: Champs d'entrée de la température de consigne (input number).
      selector:
        entity:
          domain: input_number
    entity_mode:
      name: Sélection du mode
      description: Entité de gestion du mode de gestion du chauffage (input_select)
      selector:
        entity:
          domain: input_select
    entity_schedule_confort:
      name: Schedule mode confort
      description: Entité générée par schedule pour la planification du mode confort (switch)
      selector:
        entity:
          domain: switch
    entity_schedule_eco:
      name: Schedule mode eco
      description: Entité générée par schedule pour la planification du mode eco (switch)
      selector:
        entity:
          domain: switch
    entity_thermostat_tpi:
      name: Thermostat
      description: Entité de gestion du thermostat TPI (automation)
      selector:
        entity:
          domain: automation


# Température pour le hors gel
variables:
  temperature_hg: 10

alias: Pilotage chauffage bureau Patrick
description: ''
trigger:
  - platform: state
    entity_id: !input entity_mode
condition: []
action:
  - choose:
      # ----- Mode Stop
      - conditions:
          - condition: state
            entity_id: !input entity_mode
            state: Stop
        sequence:
          - service: input_number.set_value
            data:
              value: 0
            target:
              entity_id: !input entity_consigne
          - service: switch.turn_off
            target:
              entity_id:
                - !input entity_schedule_eco
                - !input entity_schedule_confort
          - service: automation.turn_off
            target:
              entity_id: !input entity_thermostat_tpi
      # ----- Mode Hors-gel
      - conditions:
          - condition: state
            entity_id: !input entity_mode
            state: Hors-gel
        sequence:
          - service: automation.turn_on
            target:
              entity_id: !input entity_thermostat_tpi
          - service: input_number.set_value
            data:
              value: '{{temperature_hg}}'
            target:
              entity_id: !input entity_consigne
          - service: switch.turn_off
            target:
              entity_id:
                - !input entity_schedule_eco
                - !input entity_schedule_confort
      # ----- Mode Auto - confort
      - conditions:
          - condition: state
            entity_id: !input entity_mode
            state: Auto - confort
        sequence:
          - service: automation.turn_on
            target:
              entity_id: !input entity_thermostat_tpi
          - service: switch.turn_on
            target:
              entity_id: !input entity_schedule_confort
          - service: switch.turn_off
            target:
              entity_id:
                - !input entity_schedule_eco
      # ----- Mode Auto - eco ou absent
      - conditions:
          - condition: or
            conditions:
              - condition: state
                entity_id: !input entity_mode
                state: 'Auto - eco'
              - condition: state
                entity_id: !input entity_mode
                state: 'Absent'
        sequence:
          - service: automation.turn_on
            target:
              entity_id: !input entity_thermostat_tpi
          - service: switch.turn_off
            target:
              entity_id:
                - !input entity_schedule_confort
          - service: switch.turn_on
            target:
              entity_id: !input entity_schedule_eco
    # ----- Mode manuel
    default:
      - service: switch.turn_off
        target:
          entity_id:
            - !input entity_schedule_eco
            - !input entity_schedule_confort
      - service: automation.turn_on
        target:
          entity_id: !input entity_thermostat_tpi
mode: single
```

## 7. Gestion des absences

J’utilise actuellement l**'activation-désactivation de l’alarme** pour détecter les absences. Pour information, j’ai une alarme MyFox qui "voit" HA comme un actionneur 433MHz (type Chacon). Cela permet d’avertir HA quand l’alarme est mise ou enlevée sans avoir à passer par une API web.

La gestion de l’alarme est :

* Si **alarme mise**, mettre les chauffages qui sont en mode auto-confort en absence.
* Si **alarme enlevée**, mettre les chauffages qui sont en mode absence en auto-confort.

En général, pour faire simple, les températures du mode ECO sont en général les températures du mode confort mois 1.5 degré.

> L’automatisation n’a pas été reportée ici, mais elle est basique. Il est également possible de gérer la présence de chaque membre de la famille par son portable.

## 8. Quel matériel utiliser

### 8﻿.1 Le micro-module de pilotage du convecteur

La première chose est le pilotage du chauffage lui-même (typiquement les convecteurs). Le chauffage sera mis à une température un peu haute (24°C par exemple) et le thermostat TPI va générer une succession de *on-off* (typiquement 1 toutes les 10 minutes), la période de chauffe étant proportionnelle à la puissance. Il est **déconseillé** d'allumer-couper l'alimentation électrique du convecteur, car cela endommagerait l'électronique du chauffage. Il est donc impératif d'utiliser le fil pilote des convecteurs, ou le système intégré d'arrêt-marche pour les autres types de chauffage.

J'utilise personnellement des **[qubino zwave ZMNHJD1](https://amzn.to/3L1MZnP)** spécialement faits pour le fil pilote, qui sont très fiables, petits, ne chauffent pas. Et pour une chambre, il  n'y a surtout pas ce "click" bruyant à chaque démarrage que l'on trouve dans les modules bon marché. Certes un peu cher, mais c'est quand même pour du chauffage..... Il existe aussi une version à mettre dans le tableau électrique.
Le module [Fil Pilote Wifi - **Heatzy**](https://amzn.to/3kTLIVh) est intéressant et peut se trouver dans des magasins de bricolage.

Mais en fait tout module on-off type [**SonOff ZBMini** ](https://amzn.to/3YtxXuc)ou [**Xiaomi Aqara SSM-U02**](https://amzn.to/3J70RL4) en Zigbee pourra convenir pour gérer le fil pilote. Mais il faut mettre en série une diode : 

![Module et fil pilote](img/filpilote.png)

La diode n'a pas à supporter une grande puissance, car l'intensité du fil pilote est faible. 

**Attention cependant**, si vous utilisez un micro-module avec une diode, le fonctionnement du module sera inversé : le radiateur sera en confort quand le micro-module sera OFF, et arrêté quand le micro-module sera sur ON. Il faut alors modifier le code du blueprint thermostat (mettre switch_off à la place de switch_on). Ou à défaut, il faut créer un switch virtuel qui reprend l’état du micro-module et l’inverse :

```yaml
switch:
  - platform: template
    switches:
      convecteur:
        friendly_name: Convecteur
        value_template: "{{ is_state('switch.monconvecteur', 'off') }}"
        turn_on:
          service: switch.turn_off
          data:
            entity_id: switch.monconvecteur
        turn_off:
          service: switch.turn_on
          data:
            entity_id: switch.monconvecteur
        icon_template: "{% if is_state('switch.monconvecteur', 'on') %}mdi:radiator-disabled{% else %}mdi:radiator{% endif %}"
```

### 8﻿.2 Pilotage d'un thermostat

Il est aussi possible de faire des on-off avec un **thermostat physique** (type Heatit pilotant des câbles chauffants électrique par exemple).  Ci-dessous le modèle (template) pour transformer le thermostat en switch.

```yaml
switch:
  - platform: template
    switches:
      thermostat_bureau_onoff:
        value_template: "{{ is_state('climate.heatit_thermostat_bureau', 'heat') }}"
        turn_off:
          service: climate.turn_off
          target:
            entity_id: climate.heatit_thermostat_bureau
        turn_on:
          service: climate.turn_on
          target:
            entity_id: climate.heatit_thermostat_bureau
```

Le même principe de template peut être utilisé si un micro-module nécessite d'inverser la commande : "on" pour éteindre et "off" pour allumer.

### 8﻿.3 Le capteur de température

Pour les capteurs de température, j'utilise et recommande des capteurs [**zigbee Aqara ( WSDCGQ11LM)**](https://amzn.to/3mC5uVT) : ils sont fiables, petits et peu chers.

Pour ceux qui veulent un **afficheur**, les capteurs **Orvibo** sont aussi très bien.

J'ai aussi historiquement des capteurs avec afficheurs **Oregon THGR228N** en 433mhz, très précis et dont les piles AAA tiennent 4 ans. Mais ils sont maintenant difficilement trouvables, ce qui est dommage.

### 8﻿.4 Le détecteur d'ouverture

Pour les capteurs de fenêtre, là aussi, je recommande les [**Xiaomi Aqara ( MCCGQ11LM)**](https://amzn.to/3L10nbQ). 

Le thermostat TPI demande un capteur d'ouverture que l'on n'a pas forcément : il est possible de le simuler avec le code suivant :

```yaml
# Fenêtre virtuelle toujours fermée, pour chauffage
binary_sensor:
  - platform: template
    sensors:
      fenetre_virtuelle_onoff:
          friendly_name: Fenetre vituelle
          value_template: off
          device_class: opening
```

## 9. Afficher des courbes de suivi

Il est pertinent de **contrôler le fonctionnement du thermostat** et éventuellement affiner les paramètres.  Voici à titre indicatif le code pour afficher des graphiques du fonctionnement de thermostat.

![Thermostat TPI - Courbes](img/courbe.png "Thermostat TPI - Courbes")

```yaml
type: custom:apexcharts-card
header:
  show: true
  title: Historique sur 24h
graph_span: 24h
update_interval: 15 min
yaxis:
  - id: temperature
  - id: pourcentage
    opposite: true
    decimals: 0
series:
  - entity: sensor.oregon_thermometre_salon_temperature
    name: Temperature
    stroke_width: 2
    group_by:
      duration: 1 min
    show:
      extremas: true
      legend_value: false
    yaxis_id: temperature
  - entity: input_number.chauffage_salon_consigne
    name: Consigne
    stroke_width: 4
    curve: stepline
    yaxis_id: temperature
    show:
      extremas: true
      legend_value: false
  - entity: input_number.chauffage_salon_puissance
    name: Puissance
    stroke_width: 2
    curve: stepline
    yaxis_id: pourcentage
    show:
      legend_value: false
```

## 10. Suivi de la consommation électrique

Si on utilise un micro-module connecté au fil pilote du radiateur, **il ne peut mesurer pas la consommation**. Il ne mesure que la consommation du fil pilote qui est quasi nulle **SAUF** via l'utilisation de la [sortie de câble Legrand Fil Pilote](https://amzn.to/3L5aXys).

Il est cependant possible d’approximer la consommation :

* mesure du temps où le switch est *ON* avec un history_stats
* conversion en énergie avec un modèle (template)

```yaml
sensor:
  - platform: history_stats
    name: convecteur_cuisine_temps_allumage
    entity_id: switch.qubino_convecteur_cuisine_onoff
    state: 'on'
    type: time
    start: "{{ now().replace(hour=0, minute=0, second=0, microsecond=0) }}"
    end: "{{ now() }}"

template:
  sensor:
    - name: Convecteur cuisine kWh
      unique_id: convecteur_cuisine_kwh
      device_class: energy
      state_class: total_increasing
      unit_of_measurement: 'kWh'
      state: "{{ states('sensor.convecteur_cuisine_temps_allumage')|float(0) * 1.47}}"
```

Dans l’exemple précédent, 1.47 kW est la puissance du convecteur.

Je conseille de mesurer la puissance du convecteur en actionnant le convecteur et en regardant les différences de puissance consommée sur le compteur de la maison (sauf si on a une pince ampérométrique). On obtient des AV (Ampères*volts => puissance apparente) mais le cosfi d’un convecteur étant à 1, cela correspond aux watts réels consommés.

L’entité calculée peut directement être mise dans le module Energy.

## 11. Pour aller plus loin

Il serait possible d'avoir deux planifications "confort". Une pour la **semaine** et une pour le **week-end**, en spécifiant les jours dans le scheduler. Il faut alors modifier le blueprint pour piloter non pas une mais les deux planifications.

Le thermostat peut être utilisé pour des **chaudières ou des poêles à granule**. Mais il serait recommandé d'augmenter la période de chauffe (plutôt 20mn) et ne pas lancer la chaudière si la puissance est de moins de 5% et la laisser tourner si la puissance est plus de 95% pour éviter les cycles courts. Cela demande une petite adaptation du thermostat TPI.

Enfin, le bon fonctionnement des thermostats implique le bon fonctionnement des sondes. Avec mon ancienne box, j’avais un **« sanity check »** toutes les deux heures pour vérifier que les sondes rafraichissaient toujours bien leurs données. Le chauffage coute trop cher pour ne pas avoir ce type de vérification, et ne pas se contenter de la vérification de la pile des capteurs. Il faudra utiliser l'entité status (valeur "alive" si tout va bien) si l'on a des modules zwave.