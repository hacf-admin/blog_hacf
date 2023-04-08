---
folder: ha_2023_4
title: "Home Assistant 2023.4 : Macro pour les modèles et nouvelles boîtes de
  dialogue entités !"
type: news
visibleInCMS: true
draft: true
date: 2023-04-08
lastmod: 2023-04-08
images: img/social.png
description: >-
  Comme chaque premier mercredi du mois, une nouvelle version de Home Assistant
  Core est sortie.

  Voici la traduction par l'Équipe HACF de cette release notes publiée par Nabu Casa.
tags:
  - release
  - traduction
author: default
authors:
  - argonaute
url_haoff: https://www.home-assistant.io/blog/2023/04/05/release-20234/
---
Home Assistant Core 2023.4 ! 🎉

Le printemps est là ! Et nous avons quelques belles nouvelles fonctionnalités pour vous permettre de jouer avec ce prochain week-end de Pâques ! 🐰

Je suis ravi de voir ces nouveaux dialogues entité arriver dans cette version. Ils sont magnifiques et fonctionnent exceptionnellement bien depuis l'application mobile. Il y a même un bonus supplémentaire avec les nouvelles fonctionnalités des cartes tile (tuiles) ! Mais...

J'adore la nouvelle possibilité de créer ses propres macros de modèles Jinja2 dans cette version. C'est époustouflant ! Et le plus beau, c'est qu'elles sont facilement partageables ! J'ai hâte de voir ce que vous allez inventer !

Joyeuses Pâques ! 🐣 et profitez de cette release !

.../Frenck

<!--StartFragment-->

## Nouvelles boîtes de dialogue pour les entités alarme, volets et ventilateur

[La version précédente](https://www.home-assistant.io/blog/2023/03/01/release-20233/#new-dialogs-for-lights-switches-and-siren-entities) introduit de nouvelles boîtes de dialogue entité pour les lumières, les interrupteurs et les sirènes. Il semble que beaucoup d'entre vous ont vraiment aimé !

Donc, cette version [@piitaya](https://github.com/piitaya) a persévéré, mettant en œuvre les conceptions de [@matthiasdebaat](https://github.com/matthiasdebaat), apportant la même nouvelle interface utilisateur propre et dépouillée dans les dialogues entités pour les panneaux de contrôle d'alarme, les volets et les ventilateurs !

### [](https://www.home-assistant.io/blog/2023/04/05/release-20234/#covers)COUVERCLES

Tout d'abord, **les volets** ! Pour les volets, il existe de nombreuses variantes, portes, fenêtres, rideaux, stores, volets roulants, etc. En plus, certains peuvent être contrôlés jusqu'où ils sont ouverts / fermés et d'autres ne peuvent être qu'ouverts et fermés.

Ce n'est pas un problème pour les nouvelles boîtes de dialogue : elles s'adapteront aux capacités votre volet.

![Captures d'écran montrant les nouvelles boîtes de dialogue d'informations sur les entités de couverture.](https://www.home-assistant.io/images/blog/2023-04/entity-dialog-covers.png)Celui de gauche est intéressant, le curseur contrôle à quel niveau les stores sont baissés. Remarquez comment il se glisse depuis le haut ! Le curseur directement à côté contrôle lui l'inclinaison. Sympa !

### [](https://www.home-assistant.io/blog/2023/04/05/release-20234/#fans)VENTILATEURS

Ensuite, les **entités ventilateur**. L'interface affiche une boîte de dialogue de contrôle permettant de s'adapter aux possibilits du ventilateur que vous contrôlez, exactement comme pour les volets.

![Captures d'écran montrant les nouvelles boîtes de dialogue d'informations sur les entités de fans.](https://www.home-assistant.io/images/blog/2023-04/entity-dialog-fans.png)En fonction du nombre de pas de vitesse dont dispose votre ventilateur, la boîte de dialogue d'ajuste automatiquement automatiquement sur l'interface utilisateur. S'il a quatre étapes de vitesse ou moins, il affiche les boutons de vitesse comme sur la capture d'écran de gauche. Sinon, il utilisera le curseur affiché sur la capture d'écran la plus à droite.

### [](https://www.home-assistant.io/blog/2023/04/05/release-20234/#alarm-control-panels)PANNEAUX DE COMMANDE D'ALARME

Enfin, les **cartes entités du panneau de contrôle d'alarme**. Ils sont un peu différents par rapport pour les autres car, plus souvent, ceux-ci nécessitent que l'on saisisse un code pour armer ou désarmer l'alarme.

![L'enregistrement d'écran montrant les nouvelles boîtes de dialogue d'informations sur l'entité du panneau de commande d'alarme fonctionne avec la broche.](https://www.home-assistant.io/images/blog/2023-04/entity-dialog-alarms.gif)Voilà à quoi ressemble maintenant l'armement et le désarmement d'une alarme.

En cas de besoin, le clavier de code secret apparaîtra ! Une belle touche finale est l'animation très soignée qui est affichée pendant le processus d'armement et de désarmement de l'alarme.

## [](https://www.home-assistant.io/blog/2023/04/05/release-20234/#new-features-for-the-tile-card)Nouvelles fonctionnalités pour la carte Tuile (Tile)

Le [Carte Tuile](https://www.home-assistant.io/dashboards/tile/) a deux nouvelles fonctionnalités : la vitesse du ventilateur et le mode d'alarme.

Les deux se ressemblent et sont similaires aux nouvelles boîtes de dialogue d'entité d'en haut, ce qui donne une apparence agréable et cohérente. Regardez : ne sont-ils pas beaux?

![Captures d'écran la nouvelle fonction de vitesse du ventilateur pour les cartes de carreaux.](https://www.home-assistant.io/images/blog/2023-04/tile-fans.png)

Comme la nouvelle boîte de dialogue entité de ventilateur, la fonction de vitesse du ventilateur affichera les boutons s'il y a sont 4 vitesses ou moins, et dans tous les autres cas, il utilisera le curseur. Si le ventilateur ne peut être que allumé / désactivé, comme le ventilateur au milieu dans la capture d'écran ci-dessus, la tuile ordinaire sera utilisée.

La fonction de sélection du mode d'alarme permet de régler rapidement votre alarme dans les différents états. La fonctionnalité offre la possibilité de sélectionner les modes affichés sous forme de ligne de boutons.

![Captures d'écran la nouvelle fonction de mode d'alarme pour les cartes de carreaux.](https://www.home-assistant.io/images/blog/2023-04/tile-alarms.png)

Tout comme avec la nouvelle boîte de dialogue d'entité, le pavé de broches apparaîtra une fois la saisie de code est nécessaire et même la belle petite animation est là. 🤩

## [](https://www.home-assistant.io/blog/2023/04/05/release-20234/#macros-for-your-templates)Macros pour vos modèles

Si vous êtes un utilisateur avancé de Home Assistant, vous serez probablement familier avec le langage de modélisation de Home Assistant: Jinja2. Cela vous permet de faire incroyable des choses puissantes dans vos modèles. Cependant, si vous en avez beaucoup, vous finissent souvent par répéter une logique similaire partout!

[@depoll](https://github.com/depoll) à la rescousse! Il a trouvé un moyen d'ajouter la capacité de définir de manière centralisée vos propres macros Jinja2 et importez-les et utilisez-les n'importe où dans Home Assistant! 🤯

Pour soutenir cela, Home Assistant a maintenant un nouveau `custom_templates` dossier, où vous pouvez stocker vos macros. Par exemple, supposez ce fichier `/config/custom_templates/tools.jinja`:

```jinja

```

Jinja

Copier

Cette macro `answer_question` posera et répondra à une question basée sur une donnée ID d'entité. Vous pouvez maintenant importer et utiliser cette macro n'importe où dans Home Assistant. Par exemple:

```jinja

```

Jinja

Copier

Qui sortira:

```text

```

Texte

Copier

Une contribution fantastique! Merci, [@depoll](https://github.com/depoll)!

[Réutilisation de la documentation des modèles](https://www.home-assistant.io/docs/configuration/templating/#reusing-templates)

## [](https://www.home-assistant.io/blog/2023/04/05/release-20234/#more-new-templating-features)Plus de nouvelles fonctionnalités de modélisation

Comme si la réutilisation de vos macros n'était pas déjà assez bonne, là est beaucoup plus de qualité de modèle dans cette version!

Merci, [@depoll](https://github.com/depoll), [@ehendrix23](https://github.com/ehendrix23), [@petro31](https://github.com/Petro31), et [@rokam](https://github.com/rokam), pour ces incroyables ajouts ci-dessous! ❤️

### [](https://www.home-assistant.io/blog/2023/04/05/release-20234/#adjusted-behavior-of-relative_time-and-today_at)COMPORTEMENT AJUSTÉ DE RELATIVE_TIME ET D'AUJOURD'HUI_AT

[@Petro31](https://github.com/Petro31) ajuster le comportement des entités de modèle à l'aide du `relative_time` et `today_at` fonctions de modèle pour mettre à jour leur état une fois par minute. Agréable!

### [](https://www.home-assistant.io/blog/2023/04/05/release-20234/#new-is_hidden_entity-function)NOUVELLE FONCTION IS_HIDDEN_ENTITY

Le tout nouveau `is_hidden_entity` fonction a été ajoutée par [@depoll](https://github.com/depoll), qui peut dire si une entité donnée a été marquée “ cachée ” ou non. Cette fonction fonctionne également comme test. Cool!

Cet exemple renvoie une liste de toutes les entités de la cuisine qui ne sont pas caché.

```jinja

```

Jinja

Copier

### [](https://www.home-assistant.io/blog/2023/04/05/release-20234/#new-areas-function)FONCTION DE NOUVELLES ZONES

Parler de domaines, [@rokam](https://github.com/rokam) ajouté un `areas` fonction, qui renvoie une liste de tous les domaines que vous avez!

Un exemple simpliste:

```jinja

```

Jinja

Copier

### [](https://www.home-assistant.io/blog/2023/04/05/release-20234/#added-break-and-continue-for-use-in-for-loops)AJOUT DE LA PAUSE ET CONTINUER À ÊTRE UTILISÉ POUR LES BOUCLES

[@depoll](https://github.com/depoll) support supplémentaire pour `break` et `continue` pour les boucles, qui permet court-circuiter ces boucles, vous permettant de les rendre plus efficaces.

```jinja

```

Jinja

Copier

## [](https://www.home-assistant.io/blog/2023/04/05/release-20234/#new-has_value-function)Nouvelle fonction has_value

Enfin, [@ehendrix23](https://github.com/ehendrix23) ajouté une fonction de modèle demandée du mois de “ Qu'est-ce que le Heck?! ”: `has_value`. Le `has_value` la fonction peut également être utilisée comme tester et filtrer les entités actuellement dans un `unavailable` ou `unknown` état.

Vous pouvez utiliser cette condition, comme ceci:

```jinja

```

Jinja

Copier

Ou, peut-être répertorier toutes les entités du salon qui n'ont actuellement aucun État valeur:

```jinja

```

Jinja

Copier

## [](https://www.home-assistant.io/blog/2023/04/05/release-20234/#database-scalability)Évolutivité de la base de données

À mesure que votre maison intelligente grandit et que vous ajoutez plus d'appareils, cela signifie plus de données à conserver piste de. Cette version comprend des avancées importantes vers l'enregistreur conception de base de données pour aider l'échelle de l'assistant à domicile.

Cette version a un nouveau format de base de données qui réduit l'espace nécessaire au stockage historique de vos appareils. Ce changement présente quelques avantages:

* Déduplication plus petite ( ), moins d'utilisation du disque
* IO disque réduit ( Améliorations de la durée de vie de la carte SD )
* Utilisation réduite du processeur 📉
* Démarrage plus rapide ⁇ ️
* Graphiques et journal de bord d'historique plus rapides
* Latence réduite dans tout le système, ce qui signifie moins d'attente à partir du moment vous appuyez sur un bouton jusqu'à ce qu'une action termine 🚀
* Home Assistant conserve désormais l'historique lors du changement de nom des entités 🤘

Si vous accédez directement à la base de données, consultez le [Portail de la science des données](https://data.home-assistant.io/) et le [Intégration SQL](https://www.home-assistant.io/integrations/sql/) pour les requêtes mises à jour par exemple.

La migration des données de fond peut prendre un certain temps, selon la taille de vos données stockées. Pour vous assurer que l'assistant à domicile conserve l'historique lors du changement de nom entité, attendez 24 heures après la mise à niveau avant le changement de nom.

## [](https://www.home-assistant.io/blog/2023/04/05/release-20234/#new-selector-capabilities)Nouvelles capacités de sélection

[Sélecteurs](https://www.home-assistant.io/docs/blueprint/selectors) sont des entrées utilisateur pour l'interface utilisateur qui conduisent des choses comme [Plans](https://www.home-assistant.io/get-blueprints). Un nouveau sélecteur à utiliser dans Blueprints a été ajouté par [@emontnemery](https://github.com/emontnemery) et [@piitaya](https://github.com/piitaya): Le sélecteur constant.

Le sélecteur constant fournit une entrée facultative, qui renvoie une valeur fixe ( la constante ) lorsqu'elle est activée, sinon ne fournit aucune valeur.

Exemple d'utilisation dans un plan:

```yaml

```

YAML

Copier

Ce qui se traduit par les éléments suivants:

![Une capture d'écran montrant le nouveau sélecteur constant.](https://www.home-assistant.io/images/blueprints/selector-constant.png)Une fois coché, le sélecteur renvoie la valeur définie.

Les filtres de l'appareil et de l'entité sur le [Zone](https://www.home-assistant.io/docs/blueprint/selectors/#area-selector), [Entité](https://www.home-assistant.io/docs/blueprint/selectors/#entity-selector), [Appareil](https://www.home-assistant.io/docs/blueprint/selectors/#device-selector), et [Cible](https://www.home-assistant.io/docs/blueprint/selectors/#target-selector) sélecteurs. Auparavant, vous pouviez filtrer avec un ensemble unique de conditions; maintenant, vous pouvez passer dans une liste de filtres.

Si vous construisez des plans, cela peut être très utile si un utilisateur doit pouvoir sélectionner l'un des multiples appareils différents.

Un exemple, ce sélecteur vous permet de sélectionner le capteur de batterie de soit une télécommande Philips Hue RWL020 ( US ) ou RWL021 ( EU ) dans votre plan directeur.

```yaml

```

YAML

Copier

## [](https://www.home-assistant.io/blog/2023/04/05/release-20234/#translating-entities)Entités traductrices

Au cours des dernières versions, nous avons lentement étendu le support de traduction dans plus places dans Home Assistant. Cette version complète le support pour la traduction entités!

Cela comprend les noms des entités ’, leurs attributs et les traductions de les valeurs d'attribut. Ces traductions seront visibles sur vos tableaux de bord, dialogues, éditeurs d'automatisation, etc. Presque tous les endroits les affichent.

Les intégrations doivent ajouter explicitement une prise en charge de ceux-ci. Pas mal d'intégrations l'ont fait dans cette version, mais nous nous attendons à ce que beaucoup suivent dans la prochaine versions.

## [](https://www.home-assistant.io/blog/2023/04/05/release-20234/#other-noteworthy-changes)Autres changements notables

Il y a beaucoup plus de lapins de Pâques dans cette version; voici quelques autres change cette version en fonction:

* [@ArturoGuerra](https://github.com/ArturoGuerra) prise en charge supplémentaire des verrous [Matière](https://www.home-assistant.io/integrations/matter)! Agréable!
* La nouvelle boîte de dialogue d'entité lumineuse ( a introduit la dernière version ) prend désormais mieux en charge mode blanc. Merci, [@piitaya](https://github.com/piitaya)!
* [@emontnemery](https://github.com/emontnemery) classes de dispositifs de stockage et de stockage de volume d'énergie supplémentaires; ces permettra de différencier, par exemple, l'énergie consommée par rapport à l'énergie stockée énergie dans une batterie.
* [@starkillerOG](https://github.com/starkillerOG) est en train de balancer le [Rebobiner](https://www.home-assistant.io/integrations/reolink) intégration. Il fournit maintenant un bouton, commutateur, sirène, sélectionnez, numérotez et allumez des entités pour toutes sortes de choses que vous Les caméras et les sonnettes peuvent faire l'affaire. Impressionnant!
* Le [Lecteur multimédia universel](https://www.home-assistant.io/integrations/universal) prend désormais en charge les médias de navigation! Merci, [@Drafteed](https://github.com/Drafteed)!
* Le [Superviseur](https://www.home-assistant.io/integrations/hassio) l'intégration fournit désormais des capteurs contenant Statistiques de l'assistant principal et du superviseur à domicile. Merci, [@ludeeus](https://github.com/ludeeus)!
* Le [Spotify](https://www.home-assistant.io/integrations/spotify) l'intégration prend désormais en charge les podcasts! Nice [@BTMorton](https://github.com/BTMorton)!
* [Maison intelligente LIVISI](https://www.home-assistant.io/integrations/livisi) prend désormais en charge les dispositifs climatiques, les commutateurs ( PSSO, ISS, et ISS2 ), et capteurs de fenêtre ( WDS ). Merci [@StefanIacobLivisi](https://github.com/StefanIacobLivisi) & [@planbnet](https://github.com/planbnet)!
* [ESPHome](https://www.home-assistant.io/integrations/esphome) prend désormais en charge l'appariement des appareils Bluetooth. Beau travail [@bdraco](https://github.com/bdraco) & [@jagheterfredrik](https://github.com/jagheterfredrik)!
* [@MarkGodwin](https://github.com/MarkGodwin) étendu le [TP-Link Omada](https://www.home-assistant.io/integrations/tplink_omada) intégration pour prendre en charge la mise à jour entités; génial!
* Tout `sun.sun` les attributs des entités sont désormais également disponibles sous forme de capteurs, beaucoup plus facile à utiliser, merci [@gjohansson-ST](https://github.com/gjohansson-ST)!
* Les couvertures avec la classe des dispositifs de porte apparaissent désormais comme des portes réelles [HomeKit](https://www.home-assistant.io/integrations/homekit), bien [@Dexwell](https://github.com/Dexwell)!
* [@loongyh](https://github.com/loongyh) a fait quelque chose de similaire pour [Assistant Google](https://www.home-assistant.io/integrations/google_assistant). Couvre avec le la classe des appareils de fenêtre apparaît maintenant comme des fenêtres réelles. Merci!
* Le [SQL](https://www.home-assistant.io/integrations/sql) l'intégration prend désormais en charge les paramètres de l'appareil et les classes d'état, merci [@gjohansson-ST](https://github.com/gjohansson-ST)!
* [@teharris1](https://github.com/teharris1) soutien supplémentaire pour le nouveau [Insteon](https://www.home-assistant.io/integrations/insteon) appareil i3, cool!

## [](https://www.home-assistant.io/blog/2023/04/05/release-20234/#new-integrations)Nouvelles intégrations

Cette version n'a pas de nouvelles intégrations, mais fournit quelques nouvelles virtuelles intégrations. Les intégrations virtuelles sont des talons traités par d'autres ( existants ) des intégrations pour aider à la recherche. Ce sont de nouveaux:

* **[ESERA 1 fil](https://www.home-assistant.io/integrations/esera_onewire)** fourni par [1 fil](https://www.home-assistant.io/integrations/one), ajouté par [@jrieger](https://github.com/jrieger)
* **[HomeSeer](https://www.home-assistant.io/integrations/homeseer)** travaille avec [Z-Wave](https://www.home-assistant.io/integrations/zwave_js), ajouté par [@b-uwe](https://github.com/b-uwe)
* **[Quadra-Fire](https://www.home-assistant.io/integrations/quadrafire)** fourni par [IntelliFire](https://www.home-assistant.io/integrations/intellifire), ajouté par [@jeeftor](https://github.com/jeeftor)
* **[Castings du Vermont](https://www.home-assistant.io/integrations/vermont_castings)** fourni par [IntelliFire](https://www.home-assistant.io/integrations/intellifire), ajouté par [@jeeftor](https://github.com/jeeftor)

## [](https://www.home-assistant.io/blog/2023/04/05/release-20234/#integrations-now-available-to-set-up-from-the-ui)Intégrations désormais disponibles à configurer à partir de l'interface utilisateur

Les intégrations suivantes sont désormais disponibles via l'interface utilisateur Home Assistant:

* **[EDL21](https://www.home-assistant.io/integrations/edl21)**, fait par [@StephanU](https://github.com/StephanU)
* **[Frontier Silicon](https://www.home-assistant.io/integrations/frontier_silicon)**, fait par [@wlcrs](https://github.com/wlcrs)
* **[Nextcloud](https://www.home-assistant.io/integrations/nextcloud)**, fait par [@mib1185](https://github.com/mib1185)
* **[Obihai](https://www.home-assistant.io/integrations/obihai)**, fait par [@ejpenney](https://github.com/allenejpenneyorter)

<!--EndFragment-->