---
folder: premiers-projets
title: Premiers projets
type: post
visibleInCMS: true
draft: false
date: 2023-02-17
lastmod: 2023-02-17
images: img/accueil2.png
description: "Voila, vous avez installé Home Assistant et il est temps pour vous
  d'en découvrir ses possibilités. Ce tuto vous propose une série de mini
  projets pour une première approche. "
level: Débutant
categories:
  - Concepts
series:
  - Débuter avec Home Assistant
tags: []
author: argonaute
---
Vous avez **installé Home Assistant** et il est temps pour vous de découvrir par vous-même ses possibilités. Mais vous n'avez pas forcément d'**objets connectés** compatibles ou de clés type **zigbee** permettant de les intégrer.
Cet article vous propose de créer vos premiers projets pour commencer à appréhender les concepts, mais **sans avoir besoin d'objets connectés** à votre nouveau serveur domotique.

Nous vous proposons les mini-projets suivants :

1. Affichage de l'**IP locale** de votre machine.
2. Installation de l'intégration **Meteo France** et affichage dans l'interface utilisateur.
3. Création d'une **lumière** et d'un **interrupteur** virtuel
4. Développement de votre première **automatisation** pour les connecter
5. **Monitoring** de votre machine

## 1. Afficher l'IP locale de votre machine

### Créer l'entité "IP Local"

Le principe de base d'un serveur domotique est d'intégrer :

* des **capteurs** ("sensor" en anglais), qui retourne des informations
* des **actionneurs**, soit des composants que l'on peut "actionner" : lumières, volets roulants, prises connectées etc.

Nous vous proposons de créer ici votre premier **capteur** qui affiche l'adresse IP locale de votre machine.

Aller dans le menu de gauche sous `Paramètres`, puis `Appareil et services`, et enfin onglet `Intégration`.

On va rajouter une **intégration**, c'est-à-dire une nouvelle bibliothèque de fonctions, à Home assistant. Cliquer en bas à droite sur `Ajouter une intégration`, puis rechercher `Adresse IP locale` et installer l'intégration. L'intégration `local_ip` apparait dans les intégrations et vous pouvez accéder à la nouvelle entité créée `sensor.local_ip`. L'entité contient l'information de l'adresse IP que l'on veut.

Cliquer sur l'entité. Sous l'onglet `paramètres`, on peut voir différents champs :

* Un **nom utilisateur** libre, modifiable
* Un **icône** de type "material design" (mdi:xxx), également modifiable.
* Un **identifiant unique** constitué du type (sensor ici) et d'un ID modifiable constitué de mots séparés par des "_". A terme, vous devrez adopter une politique de nommage rigoureuse de ces ID.
* Une éventuelle **pièce** où se trouve le capteur (sous `Avancé`)
* L'**état** de l'entité (peut être cachée ou désactivée) et un alias permettant de lui mettre un nom convivial pour les assistants vocaux.

Sous l'onglet `Information`, sont affichés la valeur de l'entité et l'historique des valeurs.

![IP Locale - création](img/ip-locale-creation.gif)

### Afficher l'IP local dans le dashboard.

Le **dashboard**, appelé historiquement **"lovelace"**, est l'interface utilisateur de Home Assistant.
Il sera possible de créer plusieurs onglets dans son dashboard, et de créer plusieurs dashboard (par exemple pour les dédier à un type d'interface).

Cliquer sur `Aperçu` dans le menu de gauche. Cliquer sur les **trois points** en haut à droite, puis `modifier le tableau de bord`.
Cliquer sur le bouton `+ Ajouter une carte`. Vous voyez ici toutes les cartes graphiques disponibles.
Sélectionner **Entité** (sans S) Supprimer l'entité existante et sélectionner votre entité Local IP, puis `enregistrer`.
Dans le bandeau, cliquer sur `Terminer` pour sortir du mode d'édition Vous avez alors votre première carte affichant l'adresse IP de votre machine.

![IP locale - dashboard](img/ip-locale-dashboard.gif)

## 2. Intégration Météo France

### Création des entités

Voici une autre intégration, permettant d'afficher cette fois non pas une entité mais plusieurs, relative à la météo. Elle est également utilisée par la carte standard **météo** de Home Assistant.

Cliquez sur `Paramètres` puis `Appareil et services`, et enfin `Ajouter une intégration`. Rechercher `Meteo France`, renseigner votre ville (Lyon dans l'exemple), et validez.

C'est bon, votre intégration de gestion de la météo est installée. 14 "capteur" (sensor) ont été créés. Vous pouvez les voir en cliquant sur `1 service` depuis l'intégration **Météo France**. **Une entité pour chaque capteur a été créée.**

Toutes ces entités sont regroupées sous un **appareil** (en fait ici un service), que vous pouvez retrouver sous l'onglet `Appareils`. En cliquant sur la ligne **Météo France**, vous pouvez voir les entités (différents capteurs) mais aussi où ces entités sont utilisées ainsi qu'un journal historique. Certaines entités sont désactivées par défaut. Activez celles qui vous intéressent : par exemple température, pression et vent.

Les entités créées sont visibles sous l'onglet `entités`.

![Météo France - création](img/meteo-france-creation.gif)

### Afficher la météo dans le dashboard

Comme tout à l'heure, aller sous `Aperçu`, mettez votre dashboard en `édition` (trois points et `Modifier le dashboard`). Ajouter la carte **prévisions météos**. Vous avez alors les prévisions de votre ville.

![Météo France - dashboard](blob:https://dev.hacf.fr/fabb1908-eda2-406b-bf6b-a4641fd67ad8)

La carte est aussi modifiable dans le langage de description **YAML**. Pour voir et éditer la description de la carte en YAML, mettre la carte en mode édition, et cliquer sur `Afficher l'éditeur de code`.

> Beaucoup de choses sont visuelles, mais pas tout. **Comprendre et utiliser YAML vous permettra de décupler les possibilités de votre système domotique.**

La **documentation de Home Assistant** est très bien faite (mais en anglais) : cliquer sur le point d'interrogation en haut à droite de la carte pour l'accéder.

> A noter qu'il existe une multitude d'autres cartes de la communauté (une carte graphique dédiée à Météo France par exemple. Pour cela, il vous faudra à terme installer la bibliothèque de la communauté HACS.

## 3. Un interrupteur et une lumière

Nous avons joué dans les 2 premiers chapitres avec des capteurs ("sensors"). Nous vous proposons ici de créer 2 "actionneurs" (sur lesquels on peut faire des actions) : un interrupteur et une lumière.

Si vous avez une **clé Zigbee**, une **lumière connectée** et un **interrupteur connecté**, une intégration comme **ZHA** (celle par défaut de Home Assistant) ou **zigbee2mqtt** (très puissante et populaire) vous permettront de **pairer** vos objets. Vous aurez alors dans `Appareils` vos 2 objets, et pour chaque objet des entités serons créées. Ce sera à minima une entité de type light pour la lampe et de type switch pour l'interrupteur.

Nous considérons dans cet article que **vous n'avez pas encore ce matériel.** Nous allons simuler la lampe et l'interrupteur par des entités de type **input_boolean**.

### Création des entités

Cliquez dans le menu de gauche sur `Paramètres`, puis `Appareils et Services`, et enfin sur l'onglet `Entrées`.

> Les entrées sont des entités utiles pour l'interface, mais aussi des entités de calculs, de regroupement d'objets. Les entrées sont aussi utilisées comme variable permettant de stocker une donnée.

Cliquer sur le bouton en bas à droite `+ créer une entrée` puis `interrupteur`. Donner le nom ***Interrupteur*** et l'icone ***mdi:toggle-switch***, puis cliquer sur `Créer`. Recréer une deuxième entrée `interrupteur`, en lui donnant le nom ***lampe*** et l'icone ***mdi:lightbulb***. 2 entités de type input_boolean sont créées.

![Lampe et inter - création](blob:https://dev.hacf.fr/47ec40d3-3d3b-494b-95f7-9abf8eb9ec8f)

### Affichage dans le dashboard

Cliquer dans le menu de gauche sur `Aperçu`, puis mettre le dashboard en édition (3 points en haut à droite). Ajouter une carte de type `entités` (avec un S => affiche une liste d'entités), supprimer dans la liste les entités existantes, et rajouter l'entité ***Interrupteur*** précédemment créé. Ajouter ensuite une carte de type `bouton`. Préciser cette fois l'entité ***lampe***. Si vous n'avez pas encore de switch, l'éditeur visuel ne s'affiche pas et il vous faut saisir l'identifiant de la lampe dans le code YAML qui s'affiche. Cliquer sur `terminer` pour quitter le mode édition.

Vous pouvez maintenant jouer avec la lampe et l'interrupteur dans votre interface.

![](blob:https://dev.hacf.fr/d054afb0-a7a6-4011-9698-b8ac9e7c766e)

## 4. Première automatisation

Maintenant que vous avez un interrupteur et une lampe, vous pouvez vouloir **allumer la lampe quand l'interrupteur est actionné**. C'est l'objectif de cette **automatisation**.

Une automatisation est consituée de 3 grand blocs : 
**\- Déclencheur(s)** : les événements qui vont déclencher l'automatisation. Ce peut être un changement d'état d'une entité, une heure, le levé du soleil, une expression qui devient vrai... 
**\- Condition(s) :** une ou plusieurs conditions qui doivent être vrai pour passer à la suite et exécuter les actions.
**\- Actions :** les actions que l'on va exécuter.

Cliquer dans le menu de gauche `Paramètres`, puis `Automatisations et scènes`.
Cliquer sur `créer une automatisation`, puis `commencer par une automatisation vide`

Ensuite on va créer l'automatisation suivante :

* **Déclencheur** : changement d'état de notre interrupteur (1)
* **Condition** : aucune
* **Action** : si interrupteur à on (2), alors allumer la lampe (3), autrement l'éteindre (4).

(1) Cliquer sur `Ajouter un déclencheur` puis `Etat` et sélectionner l'entité ***Interrupteur***.
(2) Cliquer sur `Ajouter une action` puis `Si-alors`. Cliquer sur `Ajouter une condition` , puis `Etat`, rensigner votre entité ***Interrupteur*** dans le champs `entité` et ***Activé*** dans le champs `Etat`.
(3) Sous `Alors`, cliquer sur `Ajouter une action`, `appeler un service` puis `input_boolean.turn_on`, et renseigner l'entité ***Lampe***.
(4) Cliquer sous `Ajouter Sinon`. Cliquer sur `Ajouter une action`, `appeler un service` puis `input_boolean.turn_off`, et renseigner l'entité ***Lampe***.

Cliquer enfin sur enregistrer et donner un nom ***Gestion lampe*** à votre automatisation. Retourner sur votre dashboard et tester l'automatisation. Quand vous actionnez l'interrupteur, la lampe doit s'allumer ou s'éteindre.

![Inter & lampe - automatisation](blob:https://dev.hacf.fr/bdfb09b5-5004-4ba1-9e80-10e23096e6ba)

Si vous devez partager votre automatisation, elle est visible en **YAML**, très compact. Retourner sous `paramètres` - `automatisations et scènes`, éditer l'automatisation en cliquant dessus et sur les 3 points à droite, cliquer sur `Modifier en YAML`. Quand vous maitriserez la syntaxe, il sera très rapide de modifier une automatisation existante via le YAML.$

Il est également possible d'avoir des **traces** pour vérifier comment une automatisation s'est exécutée. Pour cela, cliquer sur `traces` et naviguer sur les dates des dernières exécutions, les noeuds exécutés, etc... c'est très puissant.

Enfin, il est possible de **forcer une exécution**. Le trigger est by-passé, et l'automatisation vérifie les conditions, puis exécute les actions. Pour déclencher l'automatisation et la tester, cliquer sur `exécuter` en haut à droite.

Voila, **vous avez développé votre première automatisation**. Pour aller plus loins, n'hésitez pas à supprimer le trigger sur l'interrupteur, pour le remplacer sur une trigger sur le soleil (levé ou coucher du soleil), sur une heure précise (à telle heure), ou sur un modèle de temps (toutes les x minutes par exemple)...

Vous pouvez aussi essayer de rajouter dans votre automatisation une condition (par exemple sur un interval de temps) qui devra être vérifiée avant de passer à l'action.

> **Ne confonder pas déclencheur et condition, qui est une erreur courante quand on débute.**

## 5. Monitoring de sa machine

Ce chapitre est l'occasion d'utiliser du **YAML** dans le **fichier de configuration de Home Assistant**.
Home Assistant dispose d'une interface graphique qui permet de faire un maximum de chose. Cette interface s'enrichit un peu plus à chaque mise à jour mensuelle (en général le premier mercredi de chaque mois). Mais un certain nombre d'intégrations doivent être définies dans le fichier de configuration de Home Assistant : **configuration.yaml**.

Un prérequis est que vous avez installé votre machine avec un des modules complémentaires suivants, vous permettant de **voir et éditer les fichiers de Home Assistant**. A savoir :

* **Samba** : permet d'accèder aux fichiers de votre machine depuis un gestionnaire de fichiers externe.
* **File Editor** : permet d'éditer un fichier depuis l'interface Home Assistant
* **Visual Code** : permet aussi d'éditer un fichier depuis l'interface Home Assistant. Un outils plébiscité par les développeurs.

Editer le fichier **configuration.yaml** de Home Assistant et recopier le code suivant :

```yaml
sensor:
  # SYSTEME - Monitoring du serveur
  - platform: systemmonitor
    resources:
      - type: disk_use_percent
        arg: /home
      - type: memory_use_percent
      - type: processor_use
      - type: processor_temperature
```

> Attention à bien respecter les tabulations : ce sont 2 espaces pour chaque niveau et pas de TAB.

Puis cliquer sur le menu de gauche sous Home Assistant, `Outils de Développement,` onglet `YAML`, puis cliquer sur `Vérifier votre configuration`. Votre configuration va être vérifiée et vous devez avoir le message ***La configuration ne fera pas échouer le démarrage de Home Assistant !***. Si ce n'est pas le cas, il y a une erreur dans le fichier de configuration.

Vous devez ensuite cliquer sur le bouton `Redémarrer` pour redémarrer votre système.

Toujours dans `outils de développement`, cliquer sur l'onglet `Etats` : c'est l'occasion d'utiliser cet outil pour retrouver les entités créer. Saisir par exemple **Processor** dans le champs de filtre pour retrouver vos entité et voir leurs valeurs.

![Monitoring - états](blob:https://dev.hacf.fr/bc62de77-b97e-4dcf-bd38-1fe1081fbe99)

Il est maintenant temps d'afficher le monitoring dans votre dashboard.
Cette fois, on va créer un nouvel onglet dédié appelé ***Système***. Cliquer sur Aperçu puis mettre le dashboard en édition. Cliquer dans la barre du haut sur + renseigner le titre ***Système*** puis enregistrer. Vous avez un nouvel onglet dans votre dashboard.

![](blob:https://dev.hacf.fr/c3bc93aa-c606-4dba-ab0d-16e74c7ac184)

Créer sous la nouvelle vue de cet onglet une carte `Entités` (vous devriez savoir faire maintenant), et rajouter les 4 entités créées. Vous devriez obtenir ce résultat :

![Monitoring - dashboard](blob:https://dev.hacf.fr/bff5549e-266e-4330-ae63-1e39791020ee)

Vous pouvez aussi vous amuser à utiliser une autre carte appelé Coup d'oeil, qui présente les résultats en ligne. Il est préférable de personnaliser les noms et mettre des noms courts.

## 6. Pour aller plus loins

Voila, ce tuto touche à sa fin. Vous avez probablement des **objets connectés que votre système a automatiquement découvert**. Retourner sous `paramétres`, `Paramétres et Services` et `Intégrations` : ils apparaitront ici. Essayez de les configurer (si vous ne l'avez pas déja fait car vous êtes très curieux... sic ) .

Enfin, pour vraiment bâtir un système domotique, il vous faut des objects connectés et un moyen pour leur parler. Si vous n'en avez pas, l'idéal est d'acquérir une clé USB permettant d'utiliser le protocle **Zigbee** : une clé **Sonoff**, **Conbee II** ou mieux la nouvelle clé USB **Matter Sky Connect**. Le choix d'objet connecté zigbee est immense.