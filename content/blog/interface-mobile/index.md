---
folder: interface-mobile
title: Une interface pour mobile
type: post
visibleInCMS: true
draft: true
date: 2023-06-04
lastmod: 2023-06-04
images: img/accueil.png
description: >-
  Afficher une centaine d'informations, commandes, images et graphiques sur un
  écran mobile de l'ordre de 6 pouces est un véritable défi. Surtout si l'on
  veut que l'expérience d'utilisation reste bonne pour toute la famille. 

  Cet article propose comment réaliser une interface conviviale pour mobile avec Home Assistant.  
level: Intermédiaire
version_ha: "2003.5"
categories:
  - Interface UI
tags:
  - Dashboard
author: argonaute
---
Cet article propose comment réaliser une interface conviviale pour mobile (iPhone, Android). 

L'idée est d'avoir une page d'accueil de menu en tuile, donnant accès aux différentes fonctions de son système domotique. Chaque groupe de fonctions est regroupé dans une sous-vue dédiée. Le menu du haut par défaut sera supprimé, la navigation étant assurée par la page principale en tuile, avec un bouton de retour sur les différentes vues.

## Quelques considérations d'UX Design

UX signifie Expérience utilisateur. L'idée est de réfléchir comme créer un système **convivial** et **intuitif** pour toute la famille. Il s'agit de répondre par exemple au fameux WAF (Wife Acceptance Factor).

> UX design doit ne pas être confondu avec UI design (User Interface) qui ne traite que de l'interface, les couleurs, les formes, etc.

Un bon système domotique **doit se faire oublier**, et on doit privilégier les **automatisations** qui rendent "intelligente" notre maison : les caméras se mettent à surveiller si on met l'alarme, le chauffage se déclenche quand on rentre ou aux bonnes heures, etc

Je reste persuadé que la maison doit pouvoir interagir avec les utilisateurs, en **envoyant des messages**, éventuellement avec des images, et **proposant des commandes contextuelles**. Cela peut être réalisé avec Telegram (voir [Dialogue avec Telegram](/blog/ha_integration_telegram/)).

On peut aussi mettre une tablette au centre de la maison avec une interface WAOU. J'adore ce que propose @griz ([mon dashboard](https://forum.hacf.fr/t/mon-dashboard-griz/4544)). Tiens, je crois me rappeler que c'est un UX designer d'ailleurs...

Rien n'empêche aussi de mettre des petits afficheurs type Nextion ou Sonof là où c'est utile (voir [Ecran tactile Nextion avec ESPHome](/blog/esphome-ecran-tactile-nextion/)).

Mais dans tous les cas, **le mobile est la "zappette" de votre système domotique**. C'est lui qui permet d'interagir avec votre maison, et l'interface doit être traitée avec le plus grand soin. La taille de l'écran fait que l'interface de la tablette n'est pas appropriée, et il est préférable d'en recréer une.

Côté UX Design, on va s'intéresser aux personnes qui utilisent le système (votre femme, les enfants, vous) et aux cas d'utilisation de chacun. On va structurer l'interface par grand sujet. Ayant pas mal d'éléments à traiter, j'ai préféré les séparer en 15 rubriques (voir chapitre suivant) : caméras, météo, Lumières, etc 15 vues ou groupe fonctionnel est probablement le maximum.

Ensuite, dans les vues accessibles par le menu en tuile, il est préférable d'afficher en premier ce qui est le plus utilisé.

Les éléments techniques (niveau des piles, monitoring du CPU, etc) ou réglages seront déportés et cachés dans des sous-vues de niveau 2, accessibles depuis les différentes sous-vues fonctionnelles.

> Les pires interfaces sont les tableaux de bord de 747, comme on en voit trop souvent, ou tout mélangé. Pensez-y et bannissez cela.

## Le menu en tuiles

Voici à quoi ressemble mon menu d'accueil.

![Menu en tuiles](img/menu-en-tuiles.jpg "Menu en tuiles")

Pour le créer, on va utiliser une grille avec des boutons. Ci-dessous le code avec les premiers éléments...

```yaml
type: grid
cards:
  - type: button
    tap_action:
      action: navigate
      navigation_path: /lovelace/cameras
    name: Caméras
    icon: argo:camera
    style: |
      ha-card {
        color: var(--text-menu-color);
        background: var(--camera-color);
        font-weight: bold;
      }
  - type: button
    icon: argo:meteo
    tap_action:
      action: navigate
      navigation_path: /lovelace/meteo
    name: Météo
    style: |
      ha-card {
        color: var(--text-menu-color);
        background: var(--meteo-color);
        font-weight: bold;
      }
  ......
```

Les **couleurs** ont été déportées dans un thème, mais vous pouvez mettre les codes couleur directement dans la grille. 

Ci-dessous différentes couleurs qui m'ont été proposées par une graphiste pour leur cohérence. 

```yaml
camera-color: '#CDC2EE'
meteo-color: '#BAE0F1'
lumieres-color: '#FDF4B7'
poules-color: '#EED7BD'
jardin-color: '#CDF0C1'
piscine-color: '#C9FFF3'
chauffage-color: '#FCCFDA'
volets-color: '#F1FFFA'
confort-color: '#FFDFAF'
solaire-color: '#FCFFAD'
robots-color: '#AFFFBE'
securite-color: '#FFB8B8'
medias-color: '#E8D7FF'
consos-color: '#C9FFE1'
system-color: '#D9FFFB'
```

Pour les **icônes**, vous pouvez utiliser des icônes *Material Design* (MDI) par défaut. Mais je vous conseille de créer vos propres icônes, ou récupérer des icônes tous faits, en suivant l'excellent tuto de @clemalex ([Ajouter ou créer des icones](https://forum.hacf.fr/t/ajouter-creer-des-icones/4190)).

## Créer les sous-vues

Voici en animation l'utilisation du menu est des différences sous-vues fonctionnelles.

![Utilisation des sous-vues](img/sous-vues.gif "Utilisation des sous-vues")