---
title: "Installer un add-on officiel ou non officiel sur Home Assistant" # Titre article explicite
date: 2022-02-02 # Date format YYYY-MM-DD
lastmod:   # Date format YYYY-MM-DD   SI rine n'est rentré il prendra la modification GIT.
draft: false
#layout: pages 
type:  # Types existant : pages; news; awesome; guidedev;etc. Laisser vide pour les articles

description: "Comment ajouter un add-on (plugin ou extension) sur Home Assistant via le store officiel et via un dépôt externe." # Description du sujet.
# hero: /path/image.ext # Recherche un fichier hero.(webp;jpg;png;svg) a la racine du dossier OU si un hero est defini ici SINON il prend un hero par defaut.

# Simple ou multi auteurs, il faut remplir l'auteur principal.
author: mcfly

# Recherche par auteurs et si multi auteurs.
authors:
  - mcfly

#socialshare: true # Active l'option de partage
article_ha: true # Ajoute les boutton du forum et les medias des deux communautés Home Assistant (Off et HACF)

hacf: "https://forum.hacf.fr/t/comment-installer-un-add-on-officiel-et-non-officiel/2071"     # Liens vers le post du forum HACF.
url_off:             # Liens vers le post du forum Officiel.

categories: # Categories atuelles : domotique; home assistant; news; nodered;....
- domotique
- home assistant

series: # En cours permet de reunir des series d'articles autour d'un meme sujet (ex : bien debuter avec HA; ou les addons essentiels pour commencer).
- home assistant
  
tags: # Mettre ce qui est en relation avec l'article NE PAS REMETTRE les categories.
- add-on
- officiel
- externe
- HAOS

keywords: # Mettre tous les mots definissant votre article, ils sont utilisés pour le referencement. PAS de limitation.
- add-on
- extension
- plugin
- haos
- store officielle
- externe



##################################################
##################################################

# Toutes ne sont pas a remplir (ex : pour les pages), il suffit pour cela de ne rien  mettre apres les : ou alors de commenter la ligne avec un # devant.

##################################################
##################################################

###################
# Non fonctionnel
###################

#menu:
#  sidebar:
#    name: HA 2021.9.X
#    identifier: ha-2021-9-X
#    parent: news-home-assistant
#    weight: 10
---

{{< haautoconfig bp "https://essaiedeboutonhomeassitant.fr" >}}

Les add-ons permettent d’ajouter des fonctions, services ou autres à votre Home Assistant. Des services très connus et reconnus (comme Node-Red, Grafana, InfluxDB, DuckDNS, etc.) sont déjà presque configuré pour communiquer simplement avec votre système domotique.

Il existe deux types d’extensions :
* Les officielles : reconnues officiellement par Home Assistant,
* Les non-officielles : nécessitant l'ajout du dépôt GitHub en manuel.

L'installation des extensions étant toujours la même, voici les différentes méthodes.

{{< alert "Home assistant a simplifié la chose en mettant à disposition des développeurs un script générant un bouton (pour les BluePrint, Dépots, etc) qui, d'un simple clique, fait les actions à votre place. Cela nécessite simplement de saisir l'adresse de votre instance. ![Bouton Import Dépôt](img/repository_import.svg), ![Bouton Import BluePrint](img/blueprint_import.svg)" "info" >}}

## Extension Officielle.
Pour les extensions officielles, il n'y a rien de compliqué.

{{< gallery folder="ajoutAddonOff" >}}

Dans Home Assistant, cliquer sur `Configuration`-> `Modules complémentaires, Sauvegardes et Superviseur` -> `Boutique des modules complémentaires`.
* Rechercher l'add-on,
* Cliquer dessus,
* Puis `INSTALLER`
![Exemple d'add-on avec DuckDNS](img/addon_duck_dns.png)

Les add-ons sont quasiment tous fait pareil.
Une fois installé vous avez quatre onglets en haut.
* **Info** : Permet de contrôler l'add-on et donne une description.
* **Documentation** : Explique son fonctionnement et ses réglages possibles.
* **Configuration** : Permet de configurer l'add-on,
* **Journal** : Vous donne les logs sur le fonctionnement de l'add-on.

Un exemple en image avec l'add-on DuckDNS.
{{< gallery folder="addonDuckDns" >}}

## Extension non officielle.

Les extensions non officielles permettent aux développeurs de mettre à disposition leur travail sans forcément attendre une validation officielle.
Cela permet de rendre Home Assistant encore plus extensible.

Pour ajouter un add-on non officiel il va falloir ajouter un nouveau dépôt dans la boutique des modules complémentaires.

Dans Home Assistant, cliquer sur `Configuration`-> `Modules complémentaires, Sauvegardes et Superviseur` -> `Boutique des modules complémentaires` ->`...` en haut à droite-> `Dépôts`. 

* Ajouter le lien du dépôt,
* Rafraichir la page via `F5` ou via `Rechercher des mises a jour` dans les `...` en haut à droite.
* Chercher maintenant l'add-on voulu et `INSTALLER`.

{{< alert "Le fonctionnement est identique à un add-on officiel." info >}}

{{< gallery folder="ajoutNouveauDepot" >}}

## Conclusion
Nous venons de mettre à disposition de notre instance une multitude de possibilités.

Nous verrons par la suite quelques add-ons indispensables.
