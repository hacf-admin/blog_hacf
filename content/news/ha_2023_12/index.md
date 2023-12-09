---
path: ha_2023_12
title: "2023.12 : Bienvenue à la maison !"
type: news
visibleInCMS: true
draft: true
date: 2023-12-09
lastmod: 2023-12-09
image: content/news/ha_2023_12/img/home_assistant_2023.12.png
description: >-
  Comme chaque premier mercredi du mois, une nouvelle version de Home Assistant
  Core est sortie.

  Voici la traduction par l'Équipe HACF de cette release notes publiée par Nabu Casa.
tags:
  - release
  - traduction
author: default
---
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

![](https://www.home-assistant.io/images/blog/2023-12/new-login-screen.png)
![]()








Il est également beaucoup plus intelligent ! Il fonctionne de manière transparente avec [les réseaux de confiance](https://www.home-assistant.io/docs/authentication/providers/#trusted-networks) et, une fois à la maison, il se souvient automatiquement de votre nom d'utilisateur. Ainsi, vous n'oublierez plus de cocher la case "Gardez-moi connecté". 👊









Bien entendu, lorsque vous vous connectez en dehors de votre réseau domestique, nous ne pouvons pas le faire car cela reviendrait à divulguer des informations confidentielles sur votre système et sur les personnes qui s'y trouvent. Ainsi, lorsque vous êtes en dehors de votre réseau domestique, la page de connexion vous demandera votre nom d'utilisateur et votre mot de passe, comme auparavant.

![](https://www.home-assistant.io/images/blog/2023-12/new-login-external-network.png)








Oh ! Et vous pouvez maintenant changer la langue directement à partir de la page de connexion ! 🌍
