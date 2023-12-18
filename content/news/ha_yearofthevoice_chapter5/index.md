---
path: ha_YearOfTheVoice_Chapter5
title: Année de la voix - Chapitre 5
type: news
visibleInCMS: true
draft: true
workflow: write
date: 2023-12-18
lastmod: 2023-12-18
image: https://www.home-assistant.io/images/blog/2023-12-13-year-of-the-voice-chapter-5/social.png
description: Après une année de développement de la voix sur Home Assistant,
  nous arrivons au point d'orgue avec ce dernier chapitre.
tags:
  - voix
  - traduction
author: tank
url_haoff: https://www.home-assistant.io/blog/2023/12/13/year-of-the-voice-chapter-5/
---
Nous avons atteint la fin de l'[Année de la Voix](https://www.home-assistant.io/blog/2022/12/20/year-of-voice/) de Home Assistant ! Notre objectif pour 2023 était de permettre aux utilisateurs de contrôler Home Assistant en parlant dans leur propre langue.

Début 2023, Home Assistant disposait d'un contrôle textuel de base pour certains appareils en anglais uniquement. En cette fin d'année, les utilisateurs peuvent désormais contrôler et poser des questions à l'aide de la voix dans plus de 50 langues et sur une variété d'appareils, notamment :

- Tout appareil [ESPHome](https://esphome.io/) équipé d'un microphone
- Téléphones, tablettes et montres intelligentes Android
- Téléphones analogiques à l'ancienne ([avec un adaptateur](https://www.home-assistant.io/voice_control/worlds-most-private-voice-assistant/))

Les utilisateurs de Home Assistant peuvent désormais créer plusieurs assistants vocaux en mélangeant et en associant les composants d'un « pipeline » vocal. Les abonnés Home Assistant Cloud (Nabucasa) ont automatiquement accès à des composants vocaux de haute qualité dans plus de 130 langues et dialectes différents. Des composants entièrement locaux sont également disponibles, tels que notre système de synthèse vocale [Piper](https://github.com/rhasspy/piper/), permettant un contrôle vocal 100 % hors ligne.

Lors du [Chapitre 4](https://www.home-assistant.io/blog/2023/10/20/year-of-the-voice-chapter-4/), nous avons ajouté le traitement des mots "clef" directement dans Home Assistant en tirant parti de [openWakeWord](https://github.com/dscripka/openWakeWord), que chacun peut utiliser pour rendre son expérience vocale unique.

Cela a permis à de minuscules satellites vocaux tels que [le kit de développement M5 ATOM Echo](https://www.home-assistant.io/voice_control/thirteen-usd-voice-remote/) de se décharger de la détection des mots de réveil en transmettant l'audio à un serveur Home Assistant. La communauté a travaillé d'arrache-pied pour créer une variété de [mots "clef" personnalisés](https://github.com/fwartner/home-assistant-wakewords-collection) que chacun peut utiliser pour rendre son expérience vocale unique.

Pour le dernier chapitre de 2023, nous avons élargi les types de commandes vocales disponibles pour inclure la météo, la température et les listes de choses à faire. Les satellites vocaux savent désormais dans quelle zone ils se trouvent, et davantage options matérielles et logicielles sont également disponibles.

Bonnes fêtes de fin d'année !

[![](https://markdown-videos-api.jorgenkh.no/youtube/erf7HqTwCGs)](https://youtu.be/erf7HqTwCGs)

## LE S3-BOX-3

Espressif a récemment sorti l'[ESP32-S3-BOX-3](https://www.espressif.com/en/news/ESP32-S3-BOX-3), une mise à jour de l'ESP32-S3-BOX (et de la variante "lite") qui n'était plus disponible. Ce kit de développement "AIoT" contient une puce ESP32-S3, deux microphones, un petit haut-parleur et un écran. Plusieurs docks sont disponibles dans la boîte, qui expose un connecteur d'alimentation USB-C et des broches GPIO pour étendre l'appareil.

[![](https://markdown-videos-api.jorgenkh.no/youtube/73QhFefsbbc)](https://youtu.be/73QhFefsbbc)

L'équipe [ESPHome](https://esphome.io/) a travaillé dur pour ajouter le support de la S3-BOX-3, y compris la possibilité de personnaliser l'affichage ! Consultez (sur le blog officiel) [le tutoriel S3-BOX-3](https://www.home-assistant.io/voice_control/s3_box_voice_assistant/) pour le découvrir.

[![](https://markdown-videos-api.jorgenkh.no/youtube/HQQfaXTbhvc)](https://youtu.be/HQQfaXTbhvc)

# Plus de commandes vocales

Depuis [le chapitre 1](https://www.home-assistant.io/blog/2023/01/26/year-of-the-voice-chapter-1/), nous avons ajouté des commandes vocales pour :

- Allumer et éteindre les lumières et autres appareils.
- Ouvrir et fermer les portes, les fenêtres, etc. 
- Régler la luminosité et la couleur des lumières.
- Ajouter des articles à une liste de courses.
- Poser des questions, par exemple pour savoir quelles fenêtres sont ouvertes dans une zone donnée. 

Pour le chapitre 5, nous avons élargi cette liste pour inclure :

- Ajouter des éléments à **une liste de tâches** - "ajouter la sortie des poubelles à ma liste de tâches" 
- Obtenir la **température intérieure** - "quelle est la température ?" 
- Obtenir les conditions **météo**rologiques actuelles - "Quel temps fait-il ?"
- **Annulation** d'un réveil par satellite - "peu importe". 

Assurez-vous que vous avez [exposé](https://www.home-assistant.io/voice_control/voice_remote_expose_devices/) les appareils auxquels vous voulez que [Assist](https://www.home-assistant.io/voice_control/) ait accès et qu'ils sont nommés correctement. Vous pouvez toujours ajouter un [alias](https://www.home-assistant.io/voice_control/aliases) lorsque vous souhaitez désigner un appareil par un nom plus pratique pour la voix. Par exemple, l'ajout d'un alias "Berlin" à une entité météo vous permettra de dire "quel temps fait-il à Berlin ?

## Connaissance de la zone

Les satellites vocaux peuvent être placés tout autour de la maison, et il est important de garder leur zone à l'esprit lorsque l'on interprète des commandes telles que "allumer les lumières". Cette commande allumera toutes les lumières dans la zone du satellite, et "éteindre les lumières" fera l'inverse. Vous pouvez toujours cibler les lumières d'une autre zone, bien sûr, en spécifiant : "allumer les lumières de la chambre".

Il s'agit d'un premier pas vers la prise de conscience par les satellites de leur contexte et l'adaptation de leur comportement en conséquence.

## Des satellites Raspberry Pi améliorés

Jusqu'à présent, les satellites vocaux basés sur le Raspberry Pi utilisent l'API web socket de Home Assistant. Cela présentait plusieurs limites, comme la nécessité d'un jeton API, le fait de ne pas savoir dans quelle zone se trouve le satellite et l'impossibilité de le configurer dans l'interface utilisateur de Home Assistant.

Nous avons étendu [l'intégration de "Wyoming"](https://github.com/rhasspy/wyoming) pour communiquer directement avec des [satellites distants](https://github.com/rhasspy/wyoming-satellite). Ces satellites sont automatiquement découverts et peuvent être configurés de la même manière que les satellites basés sur ESPHome, avec la possibilité de définir une zone et un "pipeline" vocale.

Plusieurs modes satellites sont pris en charge, notamment:

- **Diffusion en continu** - le satellite transmet tout l'audio à l'assistant domestique. 
- **Diffusion sur voix** - le son n'est diffusé que lorsque la parole est détectée.
- **Mot de "clef" local** - diffusion du son uniquement lorsqu'un mot de réveil est détecté localement.

Le nettoyage audio, tel que le contrôle automatique du gain et la suppression du bruit, peut être effectué dans Home Assistant ou sur le satellite. Un [Raspberry Pi Zero 2 W](https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/) a plus qu'assez de puissance pour effectuer le nettoyage audio local et la détection des mots de réveil, ce qui vous permet d'avoir de nombreux satellites sans surcharger votre serveur Home Assistant. Réutilisez vos vieux Raspberry Pi, et commencez votre voyage avec le contrôle vocal de la maison intelligente !

![](https://portail.hacf.fr/content/images/2023/12/Year-of-the-Voice-Chapter-5.png)




## Restez à l'écoute

Bien que l'année de la voix touche à sa fin, la voix dans Home Assistant ne fait que commencer ! Mike "The Voice" Hansen, continuera au sein de Nabu Casa d'améliorer et d'étendre les capacités vocales et de langage naturel de Home Assistant.

Sur la feuille de route pour l'année prochaine, nous prévoyons des choses comme la détection locale des mots "clef" sur le S3-BOX-3, et l'intégration avec de grands modèles de langage (LLM) comme GPT. Nous sommes également toujours à la recherche du matériel idéal pour les satellites vocaux : peu coûteux, avec un son de qualité, mais aussi capable d'exécuter localement des modèles de mots "clef" open source.

## Remerciements

Merci à la communauté Home Assistant de s'abonner à [Home Assistant Cloud](https://www.nabucasa.com/) pour soutenir l'Année de la Voix et le développement de Home Assistant, de ESPHome et d'autres projets en général.

Merci à nos responsables linguistiques d'avoir étendu la prise en charge des phrases dans plusieurs langues.

Bonnes fêtes de fin d'année !

![](https://portail.hacf.fr/content/images/2023/12/home-assistant-merci-projet.png)



