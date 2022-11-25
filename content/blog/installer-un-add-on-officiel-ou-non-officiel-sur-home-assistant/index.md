---
draft: false
type: post
visibleInCMS: true
date: 2022-09-18
lastmod: 
author: mcfly
url_hacf: https://forum.hacf.fr/t/comment-installer-un-add-on-officiel-et-non-officiel/2071/
socialshare: true
title: Installer un Add-on officiel ou non officiel sur Home Assistant
image: img/installerunaddonofficielounonofficiel.jpg
description: >-
  Dans cet article, nous allons parler des **add-ons**.
  Les add-ons sont une des forces de Home Assistant, car ils vous permettent d'y ajouter des services reconnus et très connus (comme Node-Red, Grafana, InfluxDB, DuckDNS, etc.) déjà quasi configurés pour communiquer simplement avec votre système domotique.
categories:
  - Add-on
tags:
  - ha_os
  - ha-supervised
series:
  - Les Bases de Home Assistant
  - Débuter avec Home Assistant
---
Dans cet article, nous allons parler des **add-ons**.

Les add-ons sont une des forces de Home Assistant, car ils vous permettent d'y ajouter des services reconnus et très connus (comme ""Node-Red"", ""Grafana"", ""InfluxDB"", ""DuckDNS"", etc.) déjà quasi configurés pour communiquer simplement avec votre système domotique.

Il existe deux types d’add-on :

* **Les officiels :** reconnues officiellement par Home Assistant,
* **Les non-officiels** : nécessitant l'ajout du dépôt GitHub en manuel.
* **Add-ons HACS** : Disponible dans le magasin de module complémentaire **non officiel** HACS (Home Assistant Community Store)

L'installation des add-ons étant toujours la même, voici les différentes méthodes.

> Home assistant a simplifié les choses en mettant à disposition des développeurs un script générant des boutons qui, d'un simple clique, fait les actions à votre place. Cela nécessite simplement de saisir l'adresse de votre instance.

**Matériels utilisés**

* *Home Assistant OS 2022.8.7*

## Installation d'un Add-on Officiel.

Pour installer un Add-on officiel, il n'y a rien de compliqué.
Dans Home Assistant, cliquer sur `Paramètres`-&gt; `Modules complémentaires` -&gt; `Boutique des modules complémentaires`.

* Rechercher l'add-on,
* Cliquer dessus,
* Puis `INSTALLER`

**IMAGE ANIMEE**

### Description d'un add-on.

Les add-ons sont quasiment tous fait pareil.
Une fois installé, vous avez quatre onglets en haut.

* **Info** : Permet de contrôler l'add-on et donne une description, il permet aussi de voir les ressources utilisées par ce dernier,
* **Documentation** : Explique son fonctionnement et les réglages possibles (si besoin),
* **Configuration** : Permet de configurer l'add-on,
* **Journal** : Vous donne les logs sur le lancement et fonctionnement de l'add-on.

Un exemple en image avec l'add-on DuckDNS.

**IMAGE ANIMEE**

> **NOTA :** Il y a certains `Add-ons`  qui n’ont pas besoin de fonctionner en permanence, par exemple `ESPHome`, mais d’autres doivent être démarrés dès le lancement, comme `Mosquitto Boker`  sinon vos appareils MQTT ne seront pas disponibles.
>
> **NOTA 2 :**  Bien-sur, plus il y a d’add-on installé, plus il faudra de ressources à votre installation.

## Installation d'un Add-on Non Officiel.

Les add-ons non officiels permettent aux développeurs de mettre à disposition leur travail sans forcément attendre une validation Officielle de Home Assistant.

> **ATTENTION :** Ces add-on ne sont pas officiellement supportés, cela veut dire que vous les installés en connaissance de cause. 

Pour ajouter un add-on non officiel, il va falloir ajouter  dépôt dans la boutique des modules complémentaires.

Dans Home Assistant, cliquer sur `Paramètres`->`Modules complémentaires` -> `Boutique des modules complémentaires`->`...` (en haut à droite) -> `Dépôts`.

* Coller le lien du dépôt,
* Puis `AJOUTER`,
* Rafraichir la page via `F5` ou via `Rechercher des mises a jour` dans les `...` en haut à droite.
* Chercher maintenant l'add-on puis `INSTALLER`.

> Le fonctionnement est identique à un add-on officiel.

**IMAGE ANIMEE**

## Installation d'un Add-on HACS.

Il est aussi possible d'installer des add-ons ou autres via **HACS** (*Home Assistant Community Store*), mais vu que cette installation permet d'autres choses, elle bénéficie d'un [article dédié](blog/installer-hacs-sur-home-assistant-et-profiter-dun-magasin-alternatif/).

## Conclusion.

Nous venons voir comment ajouter une multitude de possibilités à notre instance domotique.

Nous verrons par la suite quels sont les add-ons indispensables.

### Sources

[McFlyPartages](https://mcflypartages.fr/articles/ha_addon/)