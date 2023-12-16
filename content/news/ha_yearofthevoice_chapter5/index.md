---
path: ha_YearOfTheVoice_Chapter5
title: Année de la voix - Chapitre 5
type: news
visibleInCMS: true
draft: true
workflow: write
date: 2023-12-16
lastmod: 2023-12-16
image: https://www.home-assistant.io/images/blog/2023-12-13-year-of-the-voice-chapter-5/social.png
description: Après une année de développement de la voix sur Home Assistant,
  nous arrivons au point d'orgue avec ce dernier chapitre.
tags:
  - voix
  - traduction
author: tank
url_haoff: https://www.home-assistant.io/blog/2023/12/13/year-of-the-voice-chapter-5/
---
Nous avons atteint la fin de [l'année de la voix](https://www.home-assistant.io/blog/2022/12/20/year-of-voice/) pour Home Assistant ! Notre objectif pour 2023 était de permettre aux utilisateurs de contrôler Home Assistant en parlant dans leur propre langue.

Au début de l'année 2023, Home Assistant disposait d'un contrôle textuel de base pour certains appareils, en anglais uniquement. En cette fin d'année, les utilisateurs peuvent désormais contrôler leur maison intelligente et poser des questions à l'aide de la voix dans plus de 50 langues sur une variété d'appareils, notamment :

- Tout appareil [ESPHome ](https://esphome.io/)équipé d'un micro
- Téléphones, tablettes et montres Android
- Les anciens téléphones analogiques ([avec un adaptateur](https://www.home-assistant.io/voice_control/worlds-most-private-voice-assistant/))

Les utilisateurs de Home Assistant peuvent désormais créer plusieurs assistants vocaux en mélangeant les composants d'un "pipeline" vocal. Les abonnés à Home Assistant Cloud ont automatiquement accès à des composants vocaux de haute qualité dans plus de 130 langues et dialectes. Des composants entièrement locaux sont également disponibles, tels que notre système de synthèse vocale [Piper](https://github.com/rhasspy/piper/), permettant un contrôle vocal 100% hors ligne.

Dans le [chapitre 4](https://www.home-assistant.io/blog/2023/10/20/year-of-the-voice-chapter-4/), nous avons ajouté le traitement de texte en mode veille directement dans Home Assistant en nous appuyant sur le projet [openWakeWord](https://github.com/dscripka/openWakeWord). Cela a permis à de minuscules satellites vocaux tels que [le kit de développement M5 ATOM Echo](https://www.home-assistant.io/voice_control/thirteen-usd-voice-remote/) de décharger la détection des mots de réveil en envoyant de l'audio à un serveur Home Assistant. La communauté a travaillé d'arrache-pied pour créer une variété de [mots de réveil personnalisés](https://github.com/fwartner/home-assistant-wakewords-collection) que chacun peut utiliser pour rendre son expérience vocale unique.

Pour le dernier chapitre de 2023, nous avons élargi les types de commandes vocales disponibles pour inclure la météo, la température et les listes de choses à faire. Les satellites vocaux savent désormais dans quelle zone ils se trouvent, et davantage d'options matérielles et logicielles sont également disponibles.

Bonnes fêtes de fin d'année !

[![](https://markdown-videos-api.jorgenkh.no/youtube/erf7HqTwCGs)](https://youtu.be/erf7HqTwCGs)
