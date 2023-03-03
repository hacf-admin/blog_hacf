---
draft: false
level: Débutant
authors: mcfly
folder: hacs_installation_utilisation
visibleInCMS: true
date: 06-10-22
lastmod: null
url_hacf: https://forum.hacf.fr/t/hacs-ajoutez-des-modules-et-des-cartes-personnalisees/359
socialshare: true
series:
  - Débuter avec Home Assistant
title: Installer HACS sur Home Assistant et profiter d'un magasin alternatif.
type: post
aliases:
  - /hacs_installation
images: img/imagebf_image_article1-1-.png
description: "Malgré les multitudes d'intégrations, d'add-ons ou de thèmes
  disponibles en natif dans Home Assistant, il y a une communauté qui en
  développe d'autres. Cette communauté, c'est HACS, pour Home Assistant
  Community Store. Voyons comment l'installer "
categories:
  - Add-on/Intégration
  - Automatisation
tags:
  - HACS
  - add-on
  - app-deamon
  - automatisation
  - integration
  - lovelace
  - net-deamon
  - theme
---
Malgré les multitudes d'intégrations, d'add-ons ou de thèmes disponibles en natif dans Home Assistant, il y a une communauté qui en développe d'autres. Parfois, lorsqu'elles sont très utilisées et utiles, elles peuvent se retrouver intégrés dans le core de Home Assistant.

Cette communauté, c'est HACS, pour Home Assistant Community Store. 
Elle va vous permettre d’augmenter le nombre de matériels intégrables dans Home Assistant, à l’image d’un magasin d’intégration, de cartes, de thèmes et de scripts, d'automatisations, et simplifier leurs installations.

Le travail d'une communauté internationale au profit de tous les utilisateurs de Home Assistant, c'est la promesse de HACS. 

**Prérequis**
* Un compte GitHub,
* Avoir installé l'add-on SSH &amp; Web Terminal,
* Avoir `default_config` dans votre`configuration.yaml` *(par défaut normalement) sinon voir [ici](https://www.home-assistant.io/integrations/my/)*,
* Version de Home Assistant supérieure à 2022.8.0.

*Article rédigé avec Home Assistant OS version 2022.8.7*

## Installation.
Ouvrir SSH & Web Terminal puis lancer la commande suivante 
```bash
    wget -O - https://get.hacs.xyz | bash -
```

Ensuite :
* **vider le cache** de votre navigateur ou effectuer un rafraichissement complet (*sinon HACS n'apparaitra pas.*)
* Se rendre dans `Paramètres` -&gt; `Appareils et services` -&gt; `AJOUTER L'INTEGRATION` -&gt; Rechercher `HACS`,
* Cliquer dessus puis accepter en cochant les cases de première page,
* Cliquer sur le lien GitHub puis connectez-vous,
* Saisir le code d'autorisation affiché, au moment où GitHub vous le demande,
* Cliquer sur `Authorize hacs`
* Sélectionner la pièce dans laquelle vous souhaitez ajouter HACS,
* Retourner dans `Paramètres` -&gt; `Appareils et services` 
* Cliquer sur `CONFIGURER` de l'intégration HACS,
* Configurer votre intégration *Facultatif Cocher AppDemon et NetDaemon*

Vous devez avoir dans votre bandeau latéral, HACS de disponible et une tuile dédié dans les intégrations.

Vous avez maintenant accès à plusieurs intégrations et composants d’interface supplémentaires.

## Ajouter une intégration, une interface ou une automatisation.
* Ouvrir HACS, 
* Choisir entre Intégrations, Interface ou Automatisation,
* Cliquer sur le`+ EXPLORER ET TÉLÉCHARGER DES DEPOTS' 
* Rechercher l’intégration, thème, carte, automatisation que vous souhaitez,
* Cliquer dessus, lisez le descriptif puis `TELECHARGER`,
* [Vérifier votre configuration puis redémarrer Home Assistant](?VerifierVotreConfigurationPuisRedemarrerHo).

IMAGE ANIMEE AJOUT INTEGRATION

>Il est possible de choisir une version précise ou d'essayer une version bêta lors de l'installation d'un dépôt, bien sûr, cela est à vos risques.


## Conclusion
Vous avez à présent la possibilité d’ajouter encore plus de matériels via les intégrations de HACS, de custom cards, de thèmes grâce à la formidable communauté de Home Assistant.

### Sources
* https://hacs.xyz/
