---
path: ha_2023_12
title: "2023.12 : Bienvenue à la maison !"
type: news
visibleInCMS: true
draft: true
date: 2023-12-11
lastmod: 2023-12-11
image: content/news/ha_2023_12/img/home_assistant_2023.12.png
description: >-
  Comme chaque premier mercredi du mois, une nouvelle version de Home Assistant
  Core est sortie.

  Voici la traduction par l'Équipe HACF de cette release notes publiée par Nabu Casa.
tags:
  - release
  - traduction
author: default
url_haoff: https://www.home-assistant.io/blog/2023/12/06/release-202312/
---
Cet article est une traduction de [2023.12: Welcome home!](https://www.home-assistant.io/blog/2023/12/06/release-202312/) publié sur le site de Home Assistant.





Home Assistant Core 2023.12 ! 🎄

La dernière version de 2023 est arrivée, et nous la quittons en beauté ! 🎉

2023 a été l'[année de la voix](https://www.home-assistant.io/blog/2022/12/20/year-of-voice/)
[5ème chapitre final en direct sur notre chaîne YouTube](https://www.youtube.com/watch?v=djEkgoS5dDQ) et restez à l'écoute, car nous organiserons un [5ème chapitre final en direct sur notre chaîne YouTube](https://www.youtube.com/watch?v=djEkgoS5dDQ) le 13 décembre 2023, à 12:00 PST / 21:00 CET ! Mais ce n'est pas la fin du voyage de la voix... Ne manquez pas de nous suivre !

Cette version comporte quelques améliorations de la qualité de vie, ce qui donne déjà l'impression d'être à Noël ! La carte de thermostat a été redessinée pour correspondre à la magnifique nouvelle boîte de dialogue d'entité introduite, une nouvelle fonctionnalité pour la carte de tuiles toujours améliorée, la réimportation des Blueprints, et bien d'autres choses encore !

Ce qui m'enthousiasme le plus, c'est la nouvelle page de connexion que cette version apporte. Elle est belle, moderne et vous accueille littéralement dans votre propre maison ! 🏡 C'est à la maison que se trouve Home Assistant, n'est-ce pas ? 😃

C'est tout pour 2023 ! Quelle année nous avons eue ! J'ai juste une dernière chose à dire cette année :

Merci d'avoir utilisé Home Assistant ! ❤️

Joyeuses fêtes et bonne lecture !

.../Frenck

# Une nouvelle page de connexion

La page de connexion de Home Assistant a été redessinée pour être plus moderne et correspondre à [la récente refonte de l'interface d'accueil de Home Assistant](https://www.home-assistant.io/blog/2023/09/06/release-20239/#onboarding).

Lorsque Home Assistant détecte que vous y accédez via votre réseau domestique local, cela signifie que vous vous trouvez dans votre environnement domestique de confiance. Vous serez alors accueilli par cette magnifique nouvelle page de connexion, qui ressemble à la façon dont la plupart des plateformes, comme Windows, macOS, Netflix et d'autres, gèrent cette situation : en affichant vos profils d'utilisateur.

![](https://www.home-assistant.io/images/blog/2023-12/new-login-screen.png) Il est également beaucoup plus intelligent ! Il fonctionne de manière transparente avec [les réseaux de confiance](https://www.home-assistant.io/docs/authentication/providers/#trusted-networks) et, une fois à la maison, il se souvient automatiquement de votre nom d'utilisateur. Ainsi, vous n'oublierez plus de cocher la case "Gardez-moi connecté". 👊

Bien entendu, lorsque vous vous connectez en dehors de votre réseau domestique, nous ne pouvons pas le faire car cela reviendrait à divulguer des informations confidentielles sur votre système et sur les personnes qui s'y trouvent. Ainsi, lorsque vous êtes en dehors de votre réseau domestique, la page de connexion vous demandera votre nom d'utilisateur et votre mot de passe, comme auparavant.

![](https://www.home-assistant.io/images/blog/2023-12/new-login-external-network.png)

Oh ! Et vous pouvez maintenant changer la langue directement à partir de la page de connexion ! 🌍

# Nouveau design pour la carte thermostat

[Home Assistant 2023.9 a introduit](https://www.home-assistant.io/blog/2023/09/06/release-20239/#new-climate-humidifier-and-water-heater-entity-dialogs) une nouvelle boîte de dialogue pour les entités thermostat. Suite à cela, de nombreuses personnes ont demandé un design similaire pour la carte thermostat. Et bien, le voici !

![Deux cartes de thermostat qui mettent en valeur leur nouvelle apparence](https://www.home-assistant.io/images/blog/2023-12/thermostat-card.png) Vous n'avez rien à faire pour utiliser cette nouvelle carte. Une fois que vous aurez effectué la mise à jour vers cette version, la carte de thermostat utilisera automatiquement ce magnifique nouveau design.

Nous sommes allés encore plus loin en ajoutant la prise en charge des fonctionnalités. Les caractéristiques sont des fonctionnalités supplémentaires que vous pouvez ajouter à une carte et qui n'étaient auparavant disponibles que pour la carte des tuiles. Cette version ajoute la prise en charge des fonctionnalités à la carte thermostat également !

![Nouvelles fonctionnalités disponibles lors de la configuration d'une carte de thermostat](https://www.home-assistant.io/images/blog/2023-12/thermostat-card-features.png) La carte de thermostat permet d'ajouter des boutons de mode de chauffage, de ventilation et de climatisation ainsi que des préréglages. Par défaut, ces fonctionnalités sont masquées, ce qui donne à la carte un aspect le plus épuré possible.

Le même design a été appliqué à la carte (dé)humidificateur, bien sûr, y compris ses caractéristiques de tuiles respectives 😎

![Le même style a été appliqué à la carte de l'humidificateur](https://www.home-assistant.io/images/blog/2023-12/humidifier-card.png)

# Fonctionnalité de saisie numérique pour les cartes de tuiles

La [carte de tuiles](https://www.home-assistant.io/dashboards/tile/) est très puissante, et [@JosephAbbey](https://github.com/JosephAbbey) l'étend même dans cette version en ajoutant une nouvelle fonctionnalité de "saisie numérique".

La fonction de saisie numérique fonctionne avec toutes les entités numériques et les aides numériques. Elle vous permet de contrôler l'entité numérique directement à partir de la carte des tuiles et vous donne le choix de l'utiliser comme un curseur ou comme une entrée avec des boutons haut/bas.

![two tile cards, one showing the button variant, the other displaying a slider.](https://www.home-assistant.io/images/blog/2023-12/tile-card-numberic-input-feature.png)

# Options pour le tableau de bord par défaut

Le tableau de bord par défaut dispose désormais d'options qui vous permettront de modifier son comportement. Vous pouvez désormais configurer le tableau de bord par défaut de manière à masquer certaines zones, à masquer les entités qui n'appartiennent pas à une zone et à masquer la carte récapitulative de l'énergie.

![nouvelles options disponibles pour le tableau de bord par défaut généré](https://www.home-assistant.io/images/blog/2023-12/dashboard-options.png) Lorsque vous sélectionnez **Zones**, vous pouvez choisir de masquer les zones, mais aussi de modifier l'ordre d'affichage des zones en les faisant glisser.

C'est un premier pas pour rendre les tableaux de bord configurables, mais surtout, cela vous donne plus de contrôle sur le tableau de bord par défaut, surtout si vous venez de commencer à utiliser Home Assistant.

Lors de l'ajout d'un nouveau tableau de bord, nous avons ajouté une boîte de dialogue similaire à celles que nous affichons lorsque vous créez de nouvelles automatisations ou de nouveaux scripts. Elle vous donne la possibilité de commencer avec un tableau de bord manuel vide ou de créer un nouveau tableau de bord par défaut.

![nouvelle boîte de dialogue présentée lors de la création d'un nouveau tableau de bord](https://www.home-assistant.io/images/blog/2023-12/create-new-dashboard-dialog.png)

# Tableau de bord historique affichant des statistiques à long terme

Le tableau de bord de l'historique a reçu un peu d'attention de la part de [@karwosts](https://github.com/karwosts) dans cette version ; il a apporté une grande amélioration à tous les graphiques qui y sont affichés.

Auparavant, les graphiques n'affichaient que l'historique de l'état, limité à quelques jours, jusqu'à ce que les données soient supprimées. Ce n'est pas toujours très utile, par exemple, lorsque vous voulez regarder plus loin dans le temps.

[@karwosts](https://github.com/karwosts) a trouvé une solution à ce problème, et le tableau de bord de l'historique combine désormais l'historique de l'état avec les statistiques à long terme enregistrées pour donner un aperçu du passé.

![un graphique d'historique sur une longue période](https://www.home-assistant.io/images/blog/2023-12/long-term-history-dashboard.png) La partie droite et plus foncée de la ligne du graphique est fournie par l'historique de l'état (comme auparavant), et les statistiques à long terme fournissent la partie gauche et plus claire de la ligne du graphique (et sont donc des données horaires sous-échantillonnées).

Si vous avez modifié manuellement le [nombre de jours à conserver avant de purger](https://www.home-assistant.io/integrations/recorder#configuration-variables) l'enregistreur sur votre système, envisagez de supprimer cette personnalisation. Avec les statistiques à long terme et la nouvelle fonctionnalité, vous n'en aurez probablement plus besoin, ce qui se traduira par une base de données plus petite et, par conséquent, par des sauvegardes plus rapides et moins volumineuses.

# Plus de tâches !

La première itération de la prise en charge des listes de tâches a été ajoutée dans [la dernière version](https://www.home-assistant.io/blog/2023/11/01/release-202311/#there-is-a-lot-to-do), et le travail sur cette fonctionnalité s'est poursuivi dans cette version.

Tout d'abord, deux nouveaux services sont disponibles. Un service très demandé pour [lister tous les éléments d'une liste de tâches](https://www.home-assistant.io/integrations/todo/#service-todoget_items) et un service utile pour [supprimer tous les éléments terminés d'une liste de tâches](https://www.home-assistant.io/integrations/todo/#service-todoclear_items).

Il est agréable de voir que les intégrations ajoutent un support pour la fonctionnalité de liste de tâches. Par exemple, l'intégration [CalDAV](https://www.home-assistant.io/integrations/caldav) permet désormais d'ajouter des tâches à votre serveur CalDAV, et [Picnic](https://www.home-assistant.io/integrations/picnic) et [OurGroceries](https://www.home-assistant.io/integrations/ourgroceries) vous permettent de gérer votre liste de courses. Dans le cas de Picnic, l'application va même chercher le produit que vous avez ajouté à votre liste d'achats dans leur magasin et l'ajouter à votre panier.

De plus, lorsque vous consultez une liste de tâches à partir de l'interface de l'assistant domestique, vous pouvez copier/coller ou mettre en signet l'URL, ce qui vous ramènera toujours à la même - une petite amélioration très utile.

# Réimportation de Blueprint

Cette version ajoute la possibilité de réimporter le blueprint depuis la source à partir de laquelle vous l'avez importé à l'origine. Le nouveau plan téléchargé remplacera le plan existant, offrant ainsi une simple fonction de "mise à jour" pour les plans.

Si vous utilisez des Blueprints, par exemple ceux [créés par notre incroyable communauté](https://community.home-assistant.io/c/blueprints/38), vous avez peut-être remarqué que lorsque vous importez un Blueprint, il n'est pas mis à jour lorsque l'auteur le met à jour. La seule option que vous aviez était d'ajuster manuellement le YAML du Blueprint pour qu'il corresponde à la dernière version publiée par l'auteur. Pour faciliter cette tâche, nous avons ajouté cette possibilité de réimportation.

![menu de débordement d'un blueprint fournit maintenant l'option de réimporter un blueprint](https://www.home-assistant.io/images/blog/2023-12/re-import-blueprint.png) Une fonctionnalité utile qui facilitera la synchronisation de vos plans avec la dernière version publiée par l'auteur du plan.

## Autres changements notables

Il y a beaucoup plus d’améliorations dans cette version ; voici quelques-uns des autres changements notables dans cette version :

- Nous avons un tout nouveau [sélecteur de déclencheur](https://www.home-assistant.io/docs/blueprint/selectors/#trigger-selector) (trigger) que vous pouvez utiliser dans vos Blueprints et vos scripts. Merci, [@piitaya](https://github.com/piitaya) !
- Ce n'est pas tout pour les sélecteurs, [@schelv](https://github.com/schelv) a ajouté le support du Kelvin au [sélecteur de température de couleur](https://www.home-assistant.io/docs/blueprint/selectors/#color-temperature-selector). Super !
- Si vous utilisez le bureau [IKEA IDÅSEN](https://www.home-assistant.io/integrations/idasen_desk), vous aurez maintenant un capteur de hauteur ! Merci [@abmantis](https://github.com/abmantis) !
- L'intégration [ESPHome](https://www.home-assistant.io/integrations/esphome) a bénéficié de nombreuses améliorations de performance, la rendant plus rapide et plus fiable. Merci [@bdraco](https://github.com/bdraco) !
- [@Lash-L](https://github.com/Lash-L) a ajouté la possibilité d'afficher les cartes de vos aspirateurs [Roborock](https://www.home-assistant.io/integrations/roborock) ! Génial !
- Les services avec une réponse prennent maintenant en charge la gestion des réponses lorsque plusieurs entités sont ciblées. C'est super ! Merci [@eifinger](https://github.com/eifinger) !
- [@iMicknl](https://github.com/iMicknl) a ajouté le support de l'API locale pour le Somfy TaHoma à l'intégration [Overkiz](https://www.home-assistant.io/integrations/overkiz) ! Merci également à [Somfy](https://www.somfy.com/) ! C'est agréable de voir un fabricant ajouter un support API local !
- Le [ViCare](https://www.home-assistant.io/integrations/vicare) a reçu des tonnes d'amour de la part de [@CFenner](https://github.com/CFenner) ; continuez à faire du bon travail !
- Le navigateur média permet désormais de basculer entre la vue grille et la vue liste. Merci [@karwosts](https://github.com/karwosts) !
- [@emontnemery](https://github.com/emontnemery) a travaillé dur pour améliorer tous les messages d'erreur provenant de la configuration YAML manuelle. Les messages devraient maintenant être plus détaillés, plus lisibles et indiquer correctement le fichier et la ligne de fichier où se trouve l'erreur. Génial !
- [@karwosts](https://github.com/karwosts) a créé une interface utilisateur pour ajouter des sélecteurs à votre champ de script ! Très bien fait !
- Les erreurs affichées par Home Assistant peuvent maintenant être traduites ! Bien que de nombreux endroits doivent encore l'adopter, il s'agit d'un grand pas en avant et d'une grande facilité d'utilisation ! Excellent travail [@jbouwh](https://github.com/jbouwh) !

## Nouvelles intégrations

Nous accueillons les nouvelles intégrations suivantes dans cette version :

- [Devialet](https://www.home-assistant.io/integrations/devialet), ajouté par [@fwestenberg](https://github.com/fwestenberg). Contrôlez vos enceintes sans fil Devialet.
- [Linear Garage Door](https://www.home-assistant.io/integrations/linear_garage_door), ajouté par [@IceBotYT](https://github.com/IceBotYT). Permet de contrôler et d'automatiser vos portes de garage Linear.
- [MyPermobil](https://www.home-assistant.io/integrations/mypermobil), ajouté par [@IsakNyberg](https://github.com/IsakNyberg). Fournit divers capteurs pour votre fauteuil roulant Permobil.
- [OurGroceries](https://www.home-assistant.io/integrations/ourgroceries), ajouté par [@OnFreund.](https://github.com/OnFreund) S'intègre aux listes de courses de OurGroceries.
- [V2C](https://www.home-assistant.io/integrations/v2c), ajouté par [@dgomes.](https://github.com/dgomes) Surveillance et contrôle d'un EVSE local V2C Trydan.

## Intégrations désormais disponibles à partir de l’interface utilisateur (UI)

Les intégrations suivantes sont désormais disponibles via l’interface utilisateur de Home Assistant :

- 


[CalDAV](https://www.home-assistant.io/integrations/caldav), réalisé par [@allenporter](https://github.com/allenporter)

- 


[Fast.com](https://www.home-assistant.io/integrations/fastdotcom), réalisé par [@erwindouna](https://github.com/erwindouna)

- 


[Ping](https://www.home-assistant.io/integrations/ping), réalisé par [@jpbede](https://github.com/jpbede)

## Breaking Changes

Pour les “Breaking Changes” c’est par [ici](https://www.home-assistant.io/blog/2023/12/06/release-202312/#backward-incompatible-changes) (non traduits).
