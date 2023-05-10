---
folder: ha_2023_5
title: "2023.5 : Maintenant, parle !"
type: news
visibleInCMS: true
draft: true
date: 2023-05-10
lastmod: 2023-05-10
images: img/social.png
description: >-
  Comme chaque premier mercredi du mois, une nouvelle version de Home Assistant
  Core est sortie.

  Voici la traduction par l'Équipe HACF de cette release notes publiée par Nabu Casa.
tags:
  - release
  - traduction
author: default
---
> Cet article est une traduction de [2023.5: Let's talk!](https://www.home-assistant.io/blog/2023/05/03/release-20235/) publié sur le site de Home Assistant.

**Home Assistant Core 2023.5 ! 🎉**

*Quelle fabuleuse version nous avons pour vous ce mois-ci ! Cette version est entièrement consacrée à la voix (enfin, presque entièrement), et je suis super excité à l'idée que nous puissions vous livrer toutes ces choses vraiment incroyables !*

*J'ai suivi les progrès de la construction de tout cela ce mois-ci, et sincèrement, j'ai été époustouflé plusieurs fois par semaine. Qu'est-ce qu'il y a là-dedans ? Eh bien, vous pouvez maintenant parler à Home Assistant ! 🤯*

*J'apprécie vraiment que tous ces éléments vocaux aient été conçus à la manière de Home Assistant : pour être complètement configurables et extensibles. Vous donnez des choix, y compris des options entièrement locales pour votre propre assistant vocal.*

*Cette version est pleine à craquer de belles choses ! Et nous n'en sommes même pas encore à la moitié de l'Année de la voix de Home Assistant...*

*Bonne lecture !*

*../Frenck*

## Maintenant, parle !

Notre objectif pour 2023 est de vous permettre de contrôler Home Assistant dans votre propre langue : c'est l' [année de la voix de Home Assistant](https://www-home--assistant-io.translate.goog/blog/2022/12/20/year-of-voice/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) ! Après [le chapitre 1](https://www-home--assistant-io.translate.goog/blog/2023/01/26/year-of-the-voice-chapter-1/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) en janvier, [nous avons annoncé le chapitre 2](https://www-home--assistant-io.translate.goog/blog/2023/04/27/year-of-the-voice-chapter-2/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) de cette aventure passionnante !

Cette version contient tout ce qui a été annoncé (et plus encore) ! Cela signifie qu'à partir de cette version, vous pouvez commencer à parler à Home Assistant ! 🎙️

![](img/hqdefault.jpg)

Voici un bref résumé de [tout ce qui a été annoncé](https://www-home--assistant-io.translate.goog/blog/2023/04/27/year-of-the-voice-chapter-2/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) , avec des liens vous permettant d'en savoir plus :

* [Composez votre propre assistant vocal à l'aide des nouveaux pipelines d'assistance](https://www-home--assistant-io.translate.goog/blog/2023/04/27/year-of-the-voice-chapter-2/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp#composing-voice-assistants)
* [Assistant vocal alimenté par Home Assistant Cloud](https://www-home--assistant-io.translate.goog/blog/2023/04/27/year-of-the-voice-chapter-2/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp#voice-assistant-powered-by-home-assistant-cloud)
* [Synthèse vocale entièrement locale à l'aide de Piper](https://www-home--assistant-io.translate.goog/blog/2023/04/27/year-of-the-voice-chapter-2/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp#piper-our-new-model-for-high-quality-local-text-to-speech)
* [Conversion parole-texte entièrement local à l'aide d'OpenAI Whisper](https://www-home--assistant-io.translate.goog/blog/2023/04/27/year-of-the-voice-chapter-2/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp#local-speech-to-text-with-openai-whisper)
* [Le protocole et l'intégration du Wyoming](https://www-home--assistant-io.translate.goog/blog/2023/04/27/year-of-the-voice-chapter-2/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp#wyoming-the-voice-assistant-glue)
* [Créez votre propre assistant vocal alimenté par ESPHome](https://www-home--assistant-io.translate.goog/blog/2023/04/27/year-of-the-voice-chapter-2/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp#esphome-powered-voice-assistants)
* [L'intégration Voice-over-IP, appelez Home Assistant ☎️](https://www-home--assistant-io.translate.goog/blog/2023/04/27/year-of-the-voice-chapter-2/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp#worlds-most-private-voice-assistant)

Pour vous aider à démarrer, nous nous sommes assurés que la documentation est parfaite, y compris des didacticiels de projet sympas pour démarrer votre propre parcours d'assistant vocal privé :

* [L'assistant vocal le plus privé au monde](https://www-home--assistant-io.translate.goog/projects/worlds-most-private-voice-assistant/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp)
* [Donner à votre assistant vocal une personnalité Super Mario en utilisant OpenAI](https://www-home--assistant-io.translate.goog/projects/worlds-most-private-voice-assistant/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp#give-your-voice-assistant-personality-using-the-openai-integration)
* [Installer un pipeline Assist local](https://www-home--assistant-io.translate.goog/docs/assist/voice_remote_local_assistant/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp)
* [Le petit assistant vocal basé sur ESPHome à 13 $](https://www-home--assistant-io.translate.goog/projects/thirteen-usd-voice-remote/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp)

Si vous avez manqué [la diffusion en direct de la semaine dernière](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://www.youtube.com/watch?v%3DTk-pnm7FY7c) , n'hésitez pas à la consulter. Elle regorge de démos en direct et d'explications détaillées de tout ce qui se trouve dans cette version. L'enregistrement du flux en direct :

<https://www.youtube.com/watch?v=Tk-pnm7FY7c>

![](img/hqdefault2.jpg)

## [](https://www-home--assistant-io.translate.goog/blog/2023/05/03/release-20235/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp#manage-what-is-exposed-to-your-voice-assistants)Gérez ce qui est exposé à vos assistants vocaux

Un tout nouvel élément de menu intéressant se trouve dans votre menu **[Paramètres](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://my.home-assistant.io/redirect/config)** : **[assistants vocaux](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://my.home-assistant.io/redirect/voice_assistants)** !

![](img/voice-assistants.png)

Ce nouvel élément de paramètres vous donne accès à de nombreuses nouvelles fonctionnalités vocales fantastiques. Il fournit également un nouvel onglet **Exposer** où vous pouvez gérer les entités qui sont exposées à votre Assistant, Alexa et Google Assistant.

![voice-assistants-expose-entities](img/voice-assistants-expose-entities.png "Expose Entities")

Il donne un aperçu des entités que vous avez exposées à vos assistants vocaux et vous permet d'en supprimer ou d'en ajouter facilement de nouvelles. En cliquant sur une entité dans cet écran, vous ferez apparaître les paramètres de l'assistant vocal pour cette entité, ce qui vous permettra d'activer ou de désactiver l'exposition de l'entité à un assistant vocal spécifique et de gérer les alias de l'entité.

![voice-assistants-expose-entities-settings](img/voice-assistants-expose-entities-settings.png "Expose Entities settings")

Cela prend actuellement en charge notre [Assistant](https://www-home--assistant-io.translate.goog/docs/assist?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) , et Amazon Alexa et Google Assistant via Home Assistant Cloud.

## [](https://www-home--assistant-io.translate.goog/blog/2023/05/03/release-20235/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp#improved-entity-setting)Paramétrage des entités amélioré

Quelques améliorations ont été apportées à la boîte de dialogue de paramétrage des entités, afin de la rendre plus facile à utiliser et de lui donner un aspect plus épuré.

La boîte de dialogue de paramétrage des entités comportait une section avancée extensible, que vous pouviez développer pour accéder à des fonctionnalités telles que l'affichage/masquage/désactivation des entités, la modification de la zone, etc.

La section avancée a été supprimée et toutes ses fonctionnalités ont été réorganisées. Ainsi, aucune fonctionnalité n'a été perdue tout en offrant une interface beaucoup plus agréable.

![voice-assistants-expose-entities-settings](img/entity-settings.png "Expose Entities Settings")

Et puisque nous sommes dans l'année de la voix, vous remarquerez peut-être l'option **"Assistants vocaux"** dans la capture d'écran ci-dessus, qui s'affichera :

![](img/entity-settings-voice-assistants.png)

Cela vous permet de modifier rapidement les assistants vocaux auxquels l'entité est exposée, y compris ses alias, sans avoir à revenir au panneau des assistants vocaux dans l'écran principal des paramètres.

## [](https://www-home--assistant-io.translate.goog/blog/2023/05/03/release-20235/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp#configuring-the-leds-of-your-home-assistant-yellow)Configurer les voyants de votre "Home Assistant Yellow"

Le boîtier de notre étonnant [Home Assistant Yellow](https://www-home--assistant-io.translate.goog/yellow?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) vous permet de voir la magnifique carte et les pièces qu'elle contient.

Cependant, les LED de la carte peuvent éclairer votre environnement lorsqu'il fait sombre de manière indésirable. Par exemple, lorsque vous dormez dans la même pièce que votre Home Assistant Yellow.

A partir de cette version, vous pouvez configurer (activer/désactiver) le disque, le rythme cardiaque et les LEDs d'alimentation de votre Home Assistant Yellow en utilisant le bouton Configurer sur la page `Paramètres `> `Matériel`.

![home-assistant-yellow-led-controls](img/home-assistant-yellow-led-controls.png)

## [](https://www-home--assistant-io.translate.goog/blog/2023/05/03/release-20235/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp#webhooks-trigger-options)Options de déclenchement des webhooks

Les webhooks ont été étendus dans cette version. Nous prenons désormais en charge les webhooks qui utilisent la méthode **GET HTTP** !

Mais ce n'est pas tout. Grâce à [@esev](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/esev) , nous avons également obtenu de nouvelles fonctionnalités de sécurité pour nos déclencheurs de webhooks. Vous pouvez maintenant définir les méthodes HTTP avec lesquelles votre déclencheur de webhook fonctionne et la possibilité de limiter les webhooks pour qu'ils ne fonctionnent que sur votre réseau local.

![webhook-trigger-settings](img/webhook-trigger-settings.png)

## [](https://www-home--assistant-io.translate.goog/blog/2023/05/03/release-20235/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp#new-assist-pipeline-and-language-selectors)Nouveau pipeline "Assistant" et sélecteurs de langue

Si vous construisez des Blueprints d'automatisation ou de scripts, vous pouvez désormais utiliser deux nouveaux sélecteurs d'interface utilisateur avec vos Blueprints : un sélecteur de pipeline "Assistant" et un sélecteur de langue.

![blueprints-language-selector](img/blueprints-language-selector.png)

Le sélecteur de langue permet à un utilisateur de choisir parmi une liste de langues.

Vous pouvez, par exemple, exploiter cette possibilité dans un Blueprint de notification pour permettre le réglage d'une langue différente sur une notification de synthèse vocale.

[Vous trouverez plus d'informations dans la documentation de nos sélecteurs](https://www-home--assistant-io.translate.goog/docs/blueprint/selectors?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) .

## [](https://www-home--assistant-io.translate.goog/blog/2023/05/03/release-20235/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp#other-noteworthy-changes)Autres changements notables

Il y a beaucoup plus de choses dans cette version ; Voici quelques-uns des autres changements notables de cette version :

* [Le système d'exploitation Home Assistant v10 est sorti ! ](https://www-home--assistant-io.translate.goog/blog/2023/04/18/home-assistant-os-release-10/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp)L'ODROID M-1 est désormais pris en charge, la prise en charge des disques de données et la gestion de la mémoire ont été améliorées. Corrections de bogues et améliorations de la fiabilité pour Bluetooth et Thread.
* [Matter](https://www-home--assistant-io.translate.goog/integrations/matter?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) prend désormais en charge les ouvrants, merci [@hidaris](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/hidaris) !
* Le processus de création de sauvegardes est désormais plus rapide 🚀, merci [@bdraco](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/bdraco) !
* [@bdraco](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/bdraco) a également amélioré l'intégration [ONVIF](https://www-home--assistant-io.translate.goog/integrations/onvif?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) , ce qui devrait améliorer la stabilité de l'intégration. Top !
* Vous pouvez désormais configurer plusieurs instances de l'intégration [OpenAI Conversation](https://www-home--assistant-io.translate.goog/integrations/openai_conversation?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) avec, par exemple, différentes promps. Merci, [@balloob](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/balloob) !
* [@rubenbe](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/rubenbe) a ajouté la prise en charge de l'orientation aux ventilateurs sous [MQTT](https://www-home--assistant-io.translate.goog/integrations/mqtt?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) !
* [BTHome](https://www-home--assistant-io.translate.goog/integrations/bthome?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) a ajouté la prise en charge des événements liés aux boutons et aux variateurs. Cela signifie qu'il prend en charge le tout nouveau [Shelly BLU Button1](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://www.shelly.cloud/en/products/shop/shelly-blu-button1?tracking%3DA7FsiPIfUWsFpnfKHa8SRyUYLXjr2hPq) ! Merci, [@Ernst79](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/Ernst79) !
* Le [superviseur](https://www-home--assistant-io.translate.goog/integrations/hassio?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) peut désormais créer des suggestions de réparation pour certains des problèmes qu'il a détectés sur votre système. Génial [@mdegat01](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/mdegat01) !
* [@mib1185](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/mib1185) a ajouté un service pour permettre le tri de la [liste d'achats](https://www-home--assistant-io.translate.goog/integrations/shopping_list?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) . Merci!
* [@depoll](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/depoll) a ajouté un attribut aux entités Person qui liste les traqueurs d'appareils pour cette personne. Très utile pour les modèles ! Merci!
* L' intégration [NextDNS](https://www-home--assistant-io.translate.goog/integrations/nextdns?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) a ajouté tout un tas de nouvelles options de contrôle parental, merci [@bieniu](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/bieniu) !
* [Synology DSM](https://www-home--assistant-io.translate.goog/integrations/synology_dsm?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) peut désormais parcourir vos photos Synology dans le navigateur multimédia. Ajout cool, [@lodesmets](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/lodesmets) !
* [Simplepush](https://www-home--assistant-io.translate.goog/integrations/simplepush?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) prend désormais en charge les pièces jointes, grâce à [@tymm](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/tymm) !
* Certains capteurs de notification [Z-Wave](https://www-home--assistant-io.translate.goog/integrations/zwave_js?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) ne se mettent pas automatiquement en veille. Vous pouvez maintenant utiliser les nouveaux boutons de mise en veille des notifications pour les mettre en veille manuellement !

## Nouvelles intégrations

Nous accueillons les nouvelles intégrations suivantes dans cette version :

* **[Android TV Remote](https://www-home--assistant-io.translate.goog/integrations/androidtv_remote?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp)** , ajouté par[ @tronikos](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/tronikos)\
  Lancez des applications et contrôlez votre appareil Android TV.
* **[RAPT Bluetooth](https://www-home--assistant-io.translate.goog/integrations/rapt_ble?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp)** , ajouté par[ @sairon](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/sairon)\
  Intègre les hydromètres *RAPT Pill* dans Home Assistant.
* **[Voix sur IP](https://www-home--assistant-io.translate.goog/integrations/voip?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp)** , ajoutée par[ @synesthesiam](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/synesthesiam)\
  Parler à[ Assist](https://www-home--assistant-io.translate.goog/docs/assist?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) à l'aide d'un téléphone analogique et d'un adaptateur VoIP.
* **[Wyoming](https://www-home--assistant-io.translate.goog/integrations/wyoming?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp)** , ajouté par[ @synesthesiam](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/synesthesiam)\
  Connectez-vous aux services vocaux supportant le protocole *Wyoming*.
* **[Roborock](https://www-home--assistant-io.translate.goog/integrations/roborock?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp)** , ajouté par[ @Lash-L](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/Lash-L)\
  Contrôlez votre aspirateur RoboRock tout en gardant la prise en charge de l'application Roborock.
* **[Anova](https://www-home--assistant-io.translate.goog/integrations/anova?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp)** , ajouté par[ @Lash-L](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/Lash-L)\
  Controller *Anova sous vides* avec capacités Wi-Fi.

Cette version comporte également une **nouvelle intégration virtuelle**. Les intégrations virtuelles sont des modules qui sont gérés par d'autres intégrations (existantes) afin de faciliter la recherche. Celle-ci est nouvelle :

* **[Monessen](https://www-home--assistant-io.translate.goog/integrations/monessen?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp)** fourni par[ Intellifire](https://www-home--assistant-io.translate.goog/integrations/intellifire?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) , ajouté par[ @jeeftor](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/jeeftor)

## Les intégrations sont maintenant disponibles pour être configurées à partir de l'interface utilisateur

Les intégrations suivantes sont désormais disponibles via l'interface utilisateur de Home Assistant :

* **[Brottsplatskartan](https://www-home--assistant-io.translate.goog/integrations/brottsplatskartan?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp)** , réalisé par[ @gjohansson-ST](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/gjohansson-ST)
* **[qBittorrent](https://www-home--assistant-io.translate.goog/integrations/qbittorrent?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp)** , réalisé par[ @ chrisx8](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/chrisx8)
* **[Snapcast](https://www-home--assistant-io.translate.goog/integrations/snapcast?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp)** , réalisé par[ @luar123](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/luar123)
* **[Journée de travail](https://www-home--assistant-io.translate.goog/integrations/workday?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp)** , réalisée par[ @gjohansson-ST](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/gjohansson-ST)

## [](https://www-home--assistant-io.translate.goog/blog/2023/05/03/release-20235/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp#breaking-changes)Changements de rupture

**Accuweather**

Les `ozone`capteurs et l' `ozone`attribut d'état de l'entité météo ont affiché des valeurs incorrectes et sont en cours de suppression. Si vous utilisez ces valeurs dans vos automatisations ou scripts, vous devez les mettre à jour.

( [@bieniu](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/bieniu) - [\#91492](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/91492) ) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/accuweather?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

**Android TV**

L'intégration "Android TV" a été renommée "Android Debug Bridge".

Ce changement de nom est dû au fait que c'est ce qu'il a réellement contrôlé/fourni. Avec l'ajout de l'intégration d'Android TV Remote dans cette version, nous voulions réduire toute confusion possible à l'avenir.

( [@tronikos](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/tronikos) - [\#90657](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/90657) ) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/androidtv?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

**Histoire**

Toutes les options de configuration YAML pour l'intégration de l'historique ont été supprimées car elles n'étaient plus utilisées par le frontend.

( [@bdraco](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/bdraco) - [\#90992](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/90992) ) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/history?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

**HomeKit**

Les humidités cibles min/max pour l'appareil (dés)humidificateur exposé sur HomeKit ont changé. L'interface utilisateur HomeKit affichera désormais l'humidité relative réelle. Lorsque le curseur dans HomeKit passe au-dessus ou en dessous de l'humidité max/min définie, il sera ramené à l'humidité max/min autorisée.

( [@stackia](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/stackia) - [\#90854](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/90854) ) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/homekit?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

HomeKit par défaut pour écouter sur toutes les interfaces pour correspondre au comportement de Home Assistant. Pour limiter HomeKit à des interfaces réseau spécifiques, spécifiez un `address`in `configuration.yaml`.

( [@bdraco](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/bdraco) - [\#91520](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/91520) ) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/homekit?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

**IMAP**

L'utilisation de `imap_content`l'événement peut être interrompue pour les utilisateurs qui souhaitent analyser les données de messages électroniques plus volumineux à partir de la partie tronquée. Seuls les 2 048 premiers octets du corps du message (2 Kio) seront disponibles.

( [@jbouwh](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/jbouwh) - [\#92066](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/92066) ) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/imap?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

**Overkiz**

L'option de silence pour DynamicShutter a été supprimée car elle rendait l'entité de couverture non fonctionnelle si elle ne prenait pas en charge le silence. Cette fonctionnalité sera réintroduite dans une prochaine version.

( [@iMicknl](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/iMicknl) - [\#91354](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/91354) ) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/overkiz?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

**Reolink**

Pour les sonnettes Reolink, l'entité lumineuse "Status LED" est remplacée par une entité de sélection "Status LED". L' `off`état de l'interrupteur correspond à la sélection `Auto`et l' `on`état de l'interrupteur correspond à la sélection `Auto & always on at night`. Un `Stay off`état supplémentaire est maintenant disponible.

( [@starkillerOG](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/starkillerOG) - [\#90469](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/90469) ) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/reolink?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

**Snapcast**

* Les groupes en sourdine avec diffusion en continu auront un état `idle`au lieu de `playing`.
* Les clients connectés n'auront `on`plus d'état mais utiliseront les mêmes états que les groupes : `idle`et `playing`.
* Les clients déconnectés ont un état `standby`au lieu de `off`car le serveur Snapcast accepte toujours les commandes.

( [@luar123](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/luar123) - [\#77449](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/77449) ​​) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/snapcast?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

**DSM de Synology**

La conversion d'unité pour tous les capteurs liés à la mémoire, au stockage et à l'utilisation du réseau a été corrigée de la base binaire ( *1024* ) à la base décimale ( *1000* ) pour être en ligne avec les unités de mesure utilisées ( *eq. Mo = 1.000.000 octets* ).

Vous devrez peut-être mettre à jour les unités enregistrées historiquement pour ces capteurs via la page de statistiques sous les outils de développement.

( [@mib1185](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/mib1185) - [\#90633](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/90633) ) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/synology_dsm?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

**Modèles**

L' `ensure_ascii`argument pour `to_json`dans les modèles Jinja est désormais par défaut `False`, ce qui nous permet d'utiliser un encodeur JSON plus rapide par défaut.

Cela ne devrait pas être un problème pour la plupart, car les analyseurs JSON acceptent largement les entrées Unicode. Si vous avez encore besoin d'encoder des caractères Unicode dans des chaînes JSON, définissez `ensure_ascii`explicitement `True`pour restaurer l'ancien comportement.

( [@depoll](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/depoll) - [\#91253](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/90863) )

**Réseau UniFi**

L'intégration UniFi ne fournit plus les attributs `hostname`et `host_name`pour une entité de suivi des clients. Seul `host_name`sera fourni en tant qu'attribut.

( [@Kane610](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/Kane610) - [\#91188](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/91188) ) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/unifi?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

**UniFi Protect**

Le `set_doorbell_message`service obsolète précédent a été supprimé. Utilisez plutôt l'entité de texte pour l'écran LCD UniFi Protect.

( [@AngellusMortis](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/AngellusMortis) - [\#91523](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/91523) ) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/unifiprotect?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

Dispositifs universels ISY/IoX

La configuration YAML précédemment obsolète de l'intégration Universal Devices ISY/IoX a été supprimée.

Universal Devices ISY/IoX est maintenant configuré via l'interface utilisateur. Toute configuration YAML existante a été importée dans les versions précédentes et peut désormais être supprimée en toute sécurité de vos fichiers de configuration YAML.

( [@shbatm](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/shbatm) - [\#91575](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/91575) ) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/isy994?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

- - -

L'unité de pourcentage intégrée `%`est maintenant utilisée pour l'humidité relative et l'humidité absolue au lieu des unités personnalisées `%RH`et `%AH`, respectivement.

( [@shbatm](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/shbatm) - [\#90863](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/90863) ) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/isy994?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

- - -

Les services ISY994 personnalisés suivants ont été supprimés :

* `reload`
* `cleanup_entities`
* `system_query`
* `set_ramp_rate`
* `set_on_level`
* `run_network_resource`
* `set_variable`

Ces services étaient auparavant obsolètes au profit des services intégrés et des entités `number`, `select`et `button`. Veuillez mettre à jour vos automatisations et tableaux de bord pour utiliser les nouvelles entités et/ou services intégrés si vous ne l'avez pas déjà fait.

( [@shbatm](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/shbatm) - [\#91569](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/91569) ) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/isy994?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

- - -

Les nœuds Crépuscule/Aube sur les capteurs de mouvement Insteon ont maintenant leurs états inversés pour afficher correctement « Lumière détectée » pendant la lumière du jour et « Pas de lumière » lorsque le capteur crépusculaire est actif.

Ceci est inversé par rapport au comportement précédent. Si vous comptez sur ce capteur dans vos automatisations, ils doivent être mis à jour.

( [@shbatm](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/shbatm) - [\#92035](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/92035) ) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/isy994?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

Webhooks

Deux nouvelles options de déclenchement Webhook ont ​​été ajoutées pour limiter la manière dont un webhook peut déclencher une automatisation. Une nouvelle option *allow_methods* peut être utilisée pour contrôler quelles méthodes de requête HTTP peuvent activer le déclencheur ( `GET`, `HEAD`, `POST`et `PUT`). Et l' `local_only`option est utilisée pour permettre aux appareils extérieurs à votre réseau local d'activer le déclencheur.

Auparavant, tous les déclencheurs de webhook pouvaient être activés par les méthodes `HEAD`, `POST`et `PUT`depuis n'importe quel appareil (local ou sur Internet). Avec les nouvelles options, seuls `POST`et `PUT`sont activés par défaut.

Dans Home Assistant Core 2023.7, tout déclencheur de webhook qui n'est pas défini `local_only`sur false ne peut être activé que par des appareils sur le même réseau que Home Assistant.

Cliquez sur l'icône d'engrenage/roue dentée à côté de l'ID Webhook pour mettre à jour vos déclencheurs Webhook. Sélectionnez ensuite une valeur appropriée pour **Uniquement accessible depuis le réseau local** . Il est nécessaire de désélectionner l'option pour que le bouton **Enregistrer** apparaisse. Puis resélectionnez l'option si elle doit être activée. Cela fera disparaître l'avertissement de réparation.

![breaking-change-webhook-triggers](img/breaking-change-webhook-triggers.png)

Consultez la [documentation du déclencheur de webhook](https://www-home--assistant-io.translate.goog/docs/automation/trigger/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp#webhook-trigger) pour une description des nouvelles options. Et veuillez consulter la nouvelle section [Webhook Security](https://www-home--assistant-io.translate.goog/docs/automation/trigger/?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp#webhook-security) pour connaître les meilleures pratiques lors de l'utilisation des déclencheurs webhook.

( [@esev](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/esev) - [\#66494](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/66494) ) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/webhook?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

**Z-Wave**

Avec cette version, vous devrez mettre à jour votre `zwave-js-server`instance. Vous devez utiliser `zwave-js-server`1.28.0 ou supérieur (schéma 28).

* Si vous utilisez le `Z-Wave JS`module complémentaire, vous avez besoin d'au moins la version `0.1.79`.
* Si vous utilisez le `Z-Wave JS UI`module complémentaire, vous avez besoin d'au moins la version `1.11.2`.
* Si vous utilisez le `Z-Wave JS UI`conteneur Docker, vous avez besoin d'au moins la version `8.14.2`.
* Si vous exécutez votre propre conteneur Docker ou une autre méthode d'installation, vous devrez mettre à jour votre `zwave-js-server`instance au moins vers `1.28.0`.

( [@raman325](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/raman325) - [\#91989](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/91989) ) ( [documentation](https://www-home--assistant-io.translate.goog/integrations/zwave_js?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) )

Si vous êtes un développeur d'intégrations personnalisées et que vous souhaitez en savoir plus sur les modifications radicales et les nouvelles fonctionnalités disponibles pour votre intégration : assurez-vous de suivre notre [blog des développeurs](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://developers.home-assistant.io/blog/) . Les éléments suivants sont les plus notables pour cette version :

* [Nouvelles limites pour les modules complémentaires de superviseur](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://developers.home-assistant.io/blog/2023/04/13/new_limits_for_add_ons)

## Dites leur adieu

Les intégrations suivantes ne sont également plus disponibles à partir de cette version :

* **Le coronavirus (COVID-19)** a été supprimé. Les données ne sont plus fournies par le fournisseur source. ( [@emontnemery](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/emontnemery) - [\#90934](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/90934) )
* **Xbox Live** était auparavant obsolète et a maintenant été supprimé. L' [intégration Xbox](https://www-home--assistant-io.translate.goog/integrations/xbox?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp) est toujours disponible. ( [@MartinHjelmare](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/MartinHjelmare) - [\#90592](https://translate.google.com/website?sl=auto&tl=fr&hl=fr&client=webapp&u=https://github.com/home-assistant/core/pull/90592) )

## Toutes les modifications

Bien sûr, il y a beaucoup plus dans cette version. Vous pouvez trouver une liste de toutes les modifications apportées ici : [Journal complet des modifications pour Home Assistant Core 2023.5](https://www-home--assistant-io.translate.goog/changelogs/core-2023.5?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp)