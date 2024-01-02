---
folder: interface-mobile
path: Interface-mobile
title: Une interface mobile pour votre domotique Home Assistant
type: post
visibleInCMS: true
draft: false
workflow: read
date: 2023-06-04
lastmod: 2023-07-15
images: img/accueil.png
image: img/accueil.png
description: >-
  Afficher une centaine d'informations, commandes, images et graphiques sur un
  écran mobile de l'ordre de six pouces est un véritable défi. Surtout si l'on
  veut que l'expérience d'utilisation reste bonne pour toute la famille. 

  Cet article vous propose de réaliser une interface conviviale pour mobile avec Home Assistant.  
level: beginner
type_install: ""
version_ha: "2023.5"
categories:
  - Interface UI
tags:
  - Interface
  - UX
  - Smartphone
author: argonaute
url_hacf: https://forum.hacf.fr/t/une-interface-mobile-pour-votre-domotique-home-assistant/24698
---
Cet article propose comment réaliser une interface conviviale pour mobile (iPhone, Android).

> ⚠️Pré-requis - avoir installé  installé [Home Assistant Community Store (HACS)](https://hacs.xyz/). Ce tuto utilise 2 intégrations de la communauté (card-mod et layout-card).

**Le mobile est LA "zappette" de votre système domotique**. C'est lui qui permet d'interagir avec votre maison en déplacement, et l'interface doit être traitée avec le plus grand soin. La taille réduite de l'écran fait que l'interface dédiée à une tablette ou un ordinateur n'est pas appropriée, et il est préférable d'en recréer une spécifiquement.

Cet article vous présente comment concevoir une page d'accueil avec un menu en tuiles. Chaque tuile donne accès à une page dédiée à un sous-ensemble de fonctions de son système domotique. Chaque page correspond ainsi à une catégorie ou cas d'usage : sécurité, météo, électricité, lumière...

Le menu du haut par défaut est supprimé, la navigation étant assurée par la page d'accueil avec son menu en tuiles. Enfin, chaque page relative à une catégorie a un bouton de retour vers le menu d'accueil.

Dans mon cas, ayant beaucoup, mais vraiment beaucoup d'éléments à afficher, j'ai fait le choix de répartir les éléments importants pour ma famille dans **15 pages dédiés**, regroupées par principaux cas d'usage. Les éléments non importants pour la famille sont eux "cachés" dans des pages annexes (de niveau 2) accessibles depuis les pages principales. Le menu d'accueil est donc constitué de **15 tuiles** donnant accès à 15 pages principales de niveau 1. 15 est d'ailleurs probablement le maximum pour garantir une bonne expérience utilisateur.

![Menu en tuiles](img/menu-tuiles.jpg)

> 💡 Conseil - pour une bonne expérience utilisateur, les catégories doivent être logiques pour votre famille et correspondre aux grands cas d'usage. Affichez dans les pages principales (niveau 1) les éléments les plus utilisés en premier, cacher les éléments techniques dans une vue système ou dans des pages annexes de niveau 2.

## Le menu en tuiles

Voyons ici comment créer la page d'accueil et son menu en tuiles.

**Installer card-mod**

Ouvrir HACS puis installer [card-mod](https://github.com/thomasloven/lovelace-card-mod), une librairie qui permet de faire du CSS et changer les couleurs de fond et des polices des boutons.

Dans HACS, cliquer sur Interface, puis bouton "Explorer et télécharger des dépôts", et enfin rechercher "card-mod" et installez-le. Pensez à faire un rafraîchissement du navigateur.

**Créer un nouveau tableau de bord "Mobile"**

Vous pouvez soit utiliser votre **tableau de bord (ou "dashboard") actuel**, soit **en créer un nouveau**. Pour en créer un nouveau, aller dans paramètre - tableaux de bord, puis cliquer sur le bouton "Ajouter un tableau de bord". On va ici lui donner le nom "Mobile" et spécifier un icône.

Aller dans votre tableau de bord, mettez le en modification (menu "trois point" en haut à droite puis "modifier le tableau de bord" puis cliquer sur "Commencer pas un tableau de bord vide" puis le bouton "prenez le contrôle".

Renommer votre tableau de bord (nom en haut du bandeau) en "Maison".

**Créer une vue dédiée pour le menu**

Si vous avez un tableau de bord avec une première vue vide, renommez la juste en "Menu".

Autrement, créer une nouvelle vue qui sera dédiée à votre menu :

- Aller dans votre tableau de bord, puis mettez-le en mode édition, via le menu avec 3 points en haut à droite.
- Dans la barre d'entête de la vue, cliquer sur le bouton + tout à droite
- Renseignez le nom de la vue (mettre "Menu") et l'URL (mettre "Home").

Mettez maintenant cette vue en premier dans vos vues pour qu'elle s'affiche quand vous lancerez votre tableau de bord. Pour cela, vous avez des flèches permettant de déplacer la vue active et la déplacer en premier.

**Créer la grille de boutons**

Maintenant la vue étant créée, il faut ajouter une carte grille.

- Cliquer "Ajouter carte" en bas à droite, puis choisissez la carte Grille. Laissez coché "Rendre les cartes sous forme de carrés"
- Laisser la valeur par défaut "Nombre de colonnes" à 3.
- Ajouter autant de bouton que votre menu en contiendra en cliquant sur + dans le paramétrage de la grille.
- Vous pouvez rajouter des boutons en cliquant sur + jusqu'à obtenir toutes les entrées du menu. Mais il peut être plus simple de passer la carte en mode YAML. Pour cela, cliquer sur "Afficher l'éditeur de code" dans la configuration de la carte.
- Remplacer le code YAML par le code suivant, qui va créer 2 boutons. Vous pourrez en ajouter d'autres ultérieurement.

```yaml
type: grid
cards:
  - type: button
    tap_action:
      action: navigate
      navigation_path: /dashboard-mobile/cameras
    name: Caméras
    icon: mdi:video-outline
    card_mod:
      style: |
        ha-card {
          background: #CDC2EE;
          font-weight: bold;
        }
  - type: button
    icon: mdi:weather-partly-cloudy
    tap_action:
      action: navigate
      navigation_path: /dashboard-mobile/meteo
    name: Météo
    card_mod:
      style: |
        ha-card {
          background: #BAE0F1;
          font-weight: bold;
        }
```

Vous devriez obtenir une grille basique avec 2 boutons, textes en gras et les couleurs spécifiées.

![Premiers boutons](img/boutons.jpg)

Restera à ajouter les autres boutons. Chaque bouton a une URL qui permettra de naviguer vers les sous-vues. Nous y reviendrons plus loin.

Pour le choix des couleurs, ci-dessous différentes couleurs qui m'ont été proposées par un graphiste pour leur cohérence. J'ai déporté les **couleurs**  dans un thème, mais vous pouvez mettre les codes couleur directement dans le code YAML de votre grille.

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

Pour les **icônes**, vous pouvez utiliser des icônes _Material Design_ (MDI) par défaut. Mais je vous conseille de créer vos propres icônes, ou récupérer des icônes toutes faites, en suivant l'excellent tuto de @clemalex ([Ajouter ou créer des icônes](https://forum.hacf.fr/t/ajouter-creer-des-icones/4190)).

## Créer les différentes pages

Les différentes pages sont des vues du tableau de bord avec l'option "sous-vue" activée.

Voici une illustration de l'utilisation du menu et l'accès à 2 pages ou sous-vues (catégories Météo et Electricité).

![Utilisation des sous-vues](img/sous-vues.jpg)

Pour cela, on va créer autant de vues que l'on a de boutons (15 vues dans mon cas). Pour cela, mettre le tableau de bord en mode édition, et dans la barre de menu appuyer sur `+` pour créer une nouvelle vue.

Renseigner le nom de la vue, mettez une icône, mais surtout :

- Renseigner une URL (ci-dessous) : elle sera à utiliser dans le menu tuile pour le bouton qui appelle la vue
- Activer "sous-vue". Aussi, vous aurez en haut à gauche une flèche de retour permettant de revenir en arrière (vers le menu tuile).

![Configuration de la vue](img/configuration-vues.png)

Reste plus qu'à aller dans le menu tuile et renseigner l'URL dans le code du bouton associé, puis tester :

```yaml
  - type: button
    icon: argo:meteo
    tap_action:
      action: navigate
      navigation_path: /dashboard-mobile/meteo
    name: Météo
    card_mod:
      style: |
        ha-card {
          color: var(--text-menu-color);
          background: var(--meteo-color);
          font-weight: bold;
        }
```

> 💡 L'URL est /dashboard-mobile/meteo ou mobileest le nom du tableau de bord et meteoest le nom de la sous-vue. Historiquement, le nom par défaut du tableau de bord initial était lovelace (l'URL lovelace/meteo fonctionne alors). Vous pouvez retrouver le nom du tableau de bord dans paramètre - tableau de bord.

**Ne plus avoir d'icônes dans la barre de menu.**

Forcément avec plus de 15 vues, vous ne voudrez pas laisser les icônes de la barre de menu. La navigation se fera maintenant par le menu tuile. **Vous pouvez juste laisser "Maison" dans la barre du haut.** Cela sera automatiquement fait **en définissant toutes les vues, à part le menu tuile, comme sous-vues.**

> ⚠️ Attention - Seule la vue "menu" doit être une vue, et toutes les autres doivent être des sous-vues pour qu'aucun icône ou texte ne s'affiche dans la barre d'entête**.**

## Maîtriser l'ordre des cartes dans les vues

Pour votre tableau de bord "mobile", vous voudrez avoir sur votre ordinateur les cartes **dans l'ordre** dans lequel elles s'affichent sur les mobiles, et **en colonne**.

Pour cela, vous allez charger dans HACS / partie interface la [Layout Card](https://community.home-assistant.io/t/layout-card-take-control-of-where-your-cards-end-up/147805) : elle vous permet d'indiquer comment gérer vos cartes dans une vue.

Une fois installée, vous avez deux nouveaux champs dans la configuration des vues : "Type de vue" et "Nombre de colonnes".

![Configuration des vues (layout)](img/configuration-vue-layout.jpg)

Mettre les sous-vues en **mode "Vertical"** et **max_cols à 1** comme indiqué dans l'image précédente.

> Le layout du menu en tuile peut aussi être modifié pour le rendre plus performant : en spécifiant son mode  Masonry.

## Cacher vos paramétrages dans des pages de niveau 2

Les pages principales accessibles depuis le menu ne doivent contenir que des informations et des fonctions **essentielles pour votre famille**.

Aussi, si vous avez des informations secondaires ou utilisées que par vous : paramétrage des heures de fermeture ou ouverture des volets, niveaux des piles,  etc, je vous conseille de créer un bouton dans votre page qui accède à une autre **page annexe, de niveau 2** dédiée aux informations secondaires. Cela rendra l'interface plus claire et conviviale.

Voici un exemple, avec le paramétrage des volets dans une page (ou sous-vue) de niveau 2 :

![Sous-vue niveau 2](img/sous-vues-niveau-2.jpg)

Pour cela, créer une carte bouton dans votre sous-vue de niveau 1, créer une nouvelle sous-vue qui contiendra vos paramètres. Lier le bouton à la sous-vue en spécifiant dans la même URL dans le bouton et la sous-vue niveau 2.

Voici le code du bouton utilisé dans l'exemple précédent :

```yaml
type: custom:button-card
name: Paramétrage des volets...
styles:
  card:
    - background-color: var(--section-color)
    - height: 50px
  name:
    - font-size: 18px
tap_action:
  action: navigate
  navigation_path: /lovelace/volets-param
```

## Un design alternatif pour le menu

@[Rammy078](https://forum.hacf.fr/u/Rammy078) a proposé une alternative assez design et très intéressante du menu présenté précédemment.

![](img/menu-design.jpg)

```yaml
square: false
type: grid
cards:
  - type: custom:button-card
    tap_action:
      action: navigate
      navigation_path: /dashboard-mobile/lumières
    name: Lumières
    icon: mdi:lightbulb-group
    size: 60%
    color: '#53759e'
    styles:
      icon:
        - transform: rotate(350deg)
        - left: 25%
        - top: 20%
        - color: white
        - opacity: 0.4
      name:
        - color: white
        - top: 12%
        - left: 5%
        - font-size: 100%
        - font-weight: bold
        - position: absolute
    card_mod:
      style: |
        ha-card {
          background: linear-gradient(45deg, rgba(6,103,231,1) 0%, rgba(153,189,251,1) 90%);
          font-weight: bold;
          color: #53759e;
        }     
  - type: custom:button-card
    icon: mdi:weather-partly-cloudy
    tap_action:
      action: navigate
      navigation_path: /dashboard-mobile/meteo
    name: Météo
    size: 60%
    color: '#53759e'
    styles:
      icon:
        - transform: rotate(350deg)
        - left: 25%
        - top: 20%
        - color: white
        - opacity: 0.4
      name:
        - color: white
        - top: 12%
        - left: 5%
        - font-size: 100%
        - font-weight: bold
        - position: absolute
    card_mod:
      style: |
        ha-card {
          background: linear-gradient(45deg, rgba(2,164,181,1) 0%, rgba(107,229,238,1) 90%);
          font-weight: bold;
          color: #53759e;
        }      
  - type: custom:button-card
    icon: mdi:power-socket-fr
    tap_action:
      action: navigate
      navigation_path: /dashboard-mobile/prises
    name: Prises
    size: 60%
    color: '#53759e'
    styles:
      icon:
        - transform: rotate(350deg)
        - left: 25%
        - top: 20%
        - color: white
        - opacity: 0.4
      name:
        - color: white
        - top: 12%
        - left: 5%
        - font-size: 100%
        - font-weight: bold
        - position: absolute
    card_mod:
      style: |
        ha-card {
          background: linear-gradient(45deg, rgba(24,156,38,1) 0%, rgba(114,254,129,1) 90%);
          font-weight: bold;
          color: #53759e;
        }  
  - type: custom:button-card
    icon: mdi:multimedia
    tap_action:
      action: navigate
      navigation_path: /dashboard-mobile/multimedia
    name: Multimédia
    size: 60%
    color: '#53759e'
    styles:
      icon:
        - transform: rotate(350deg)
        - left: 25%
        - top: 20%
        - color: white
        - opacity: 0.4
      name:
        - color: white
        - top: 12%
        - left: 5%
        - font-size: 100%
        - font-weight: bold
        - position: absolute
    card_mod:
      style: |
        ha-card {
          background: linear-gradient(45deg, rgba(130,30,255,1) 0%, rgba(189,133,254,1) 90%);
          font-weight: bold;
          color: #53759e;
        }   
  - type: custom:button-card
    icon: mdi:home-thermometer-outline
    tap_action:
      action: navigate
      navigation_path: /dashboard-mobile/thermomètres
    name: Thermomètres
    size: 60%
    color: '#53759e'
    styles:
      icon:
        - transform: rotate(350deg)
        - left: 25%
        - top: 20%
        - color: white
        - opacity: 0.4
      name:
        - color: white
        - top: 12%
        - left: 5%
        - font-size: 100%
        - font-weight: bold
        - position: absolute
    card_mod:
      style: |
        ha-card {
          background: linear-gradient(45deg, rgba(255,28,28,1) 0%, rgba(255,166,166,1) 90%);
          font-weight: bold;
          color: #53759e;
        }  
  - type: custom:button-card
    icon: mdi:fan
    tap_action:
      action: navigate
      navigation_path: /dashboard-mobile/ventilateurs
    name: Ventilateurs
    size: 60%
    color: '#53759e'
    styles:
      icon:
        - transform: rotate(350deg)
        - left: 25%
        - top: 20%
        - color: white
        - opacity: 0.4
      name:
        - color: white
        - top: 12%
        - left: 5%
        - font-size: 100%
        - font-weight: bold
        - position: absolute
    card_mod:
      style: |
        ha-card {
          background: linear-gradient(45deg, rgba(184,184,184,1) 0%, rgba(224,224,224,1) 90%);
          font-weight: bold;
          color: #53759e;
        } 
  - type: custom:button-card
    icon: mdi:solar-power-variant-outline
    tap_action:
      action: navigate
      navigation_path: /dashboard-mobile/solaire
    name: Solaire
    size: 60%
    color: '#53759e'
    styles:
      icon:
        - transform: rotate(350deg)
        - left: 25%
        - top: 20%
        - color: white
        - opacity: 0.4
      name:
        - color: white
        - top: 12%
        - left: 5%
        - font-size: 100%
        - font-weight: bold
        - position: absolute
    card_mod:
      style: |
        ha-card {
          background: linear-gradient(45deg, rgba(255,134,0,1) 0%, rgba(255,222,78,1) 90%);
          font-weight: bold;
          color: #53759e;
        } 
  - type: custom:button-card
    icon: mdi:window-shutter
    tap_action:
      action: navigate
      navigation_path: /dashboard-mobile/volets
    name: Volets
    size: 60%
    color: '#53759e'
    styles:
      icon:
        - transform: rotate(350deg)
        - left: 25%
        - top: 20%
        - color: white
        - opacity: 0.4
      name:
        - color: white
        - top: 12%
        - left: 5%
        - font-size: 100%
        - font-weight: bold
        - position: absolute
    card_mod:
      style: |
        ha-card {
          background: linear-gradient(45deg, rgba(124,168,189,1) 0%, rgba(187,226,242,1) 90%);
          font-weight: bold;
          color: #53759e;
        }
  - type: custom:button-card
    icon: mdi:cog-outline
    tap_action:
      action: navigate
      navigation_path: /dashboard-mobile/systeme
    name: Système
    size: 60%
    color: '#53759e'
    styles:
      icon:
        - transform: rotate(350deg)
        - left: 25%
        - top: 20%
        - color: white
        - opacity: 0.4
      name:
        - color: white
        - top: 12%
        - left: 5%
        - font-size: 100%
        - font-weight: bold
        - position: absolute
    card_mod:
      style: |
        ha-card {
          background: linear-gradient(45deg, rgba(15,15,15,1) 0%, rgba(159,159,159,1) 90%);
          font-weight: bold;
          color: #53759e;
        }
columns: 2


```

## Utiliser des cartes conditionnelles

Enfin, si une carte doit contenir beaucoup d'informations, vous pouvez mettre en entête des boutons avec un affichage conditionnel des différentes cartes en fonction du bouton sélectionné. Attention, la sélection sera valable pour tous les utilisateurs.

Illustration avec la sélection d'une caméra parmi 3 dans une maison de rêve (pas la mienne, c'est juste un exemple, dommage...).

![Affichage conditionnelle](img/selection-camera.jpg)

Je n'irai pas dans le détail dans ce tuto et je donne un rapide aperçu du fonctionnement :

On va créer un `input_text` qui contient le nom de la caméra à afficher (plage, garage, piscine).

Les boutons mettent la bonne valeur dans l'`input_text` quand ils sont sélectionnés. La couleur change également. Voici le code des boutons (basé sur des [custom:button-card](https://github.com/custom-cards/button-card), intégration disponible sur HACS).

```yaml
type: grid
cards:
  - type: custom:button-card
    name: Plage
    entity: input_text.selection_camera
    show_icon: true
    color_type: card
    icon: mdi:beach
    color: var(--bouton-gris)
    state:
      - value: Plage
        color: var(--bouton-orange)
    tap_action:
      action: call-service
      service: input_text.set_value
      service_data:
        entity_id: input_text.selection_camera
        value: "Plage"
  - type: custom:button-card
    name: Garage
    entity: input_text.selection_camera
    show_icon: true
    color_type: card
    icon: mdi:car
    color: var(--bouton-gris)
    state:
      - value: Garage
        color: var(--bouton-orange)
    tap_action:
      action: call-service
      service: input_text.set_value
      service_data:
        entity_id: input_text.selection_camera
        value: "Garage"
  - type: custom:button-card
    name: Piscine
    entity: input_text.selection_camera
    show_icon: true
    icon: mdi:pool
    color_type: card
    color: var(--bouton-gris)
    state:
      - value: Piscine
        color: var(--bouton-orange)
    tap_action:
      action: call-service
      service: input_text.set_value
      service_data:
        entity_id: input_text.selection_camera
        value: "Piscine"
columns: 3
square: false
```

Et enfin, on va créer trois cartes (une par caméra) avec un affichage conditionnel en fonction du contenu de l'`input_text`, et donc du bouton appuyé.

Voici le code d'une carte qui s'affiche si on clique sur "Plage" :

## Un tableau de bord pour mobile et un autre pour tablette.

Vous pouvez facilement créer un tableau de bord (dashboard) dédié à votre tablette et un tableau de bord dédié aux mobiles comme celui présenté ici.

Pour cela, vous devez créer un utilisateur "Tablette", puis un utilisateur par personne de la famille.

Dans l'application "compagnon", rendez-vous dans les paramètres de l'utilisateur : vous pouvez choisir le dashboard utilisé pour l'utilisateur connecté (tablette ou mobile).

## Conclusion

Cette présentation n'est qu'une proposition d'implémentation, et chacun retiendra ce qui l'arrange. Il est possible par exemple d'utiliser des badges (dont je ne suis pas fan) qui s'afficheront en entête des sous-vues ou en haut du menu.

Bien entendu, les immenses possibilités de Home Assistant font qu'il y aura autant de type d'interface que d'utilisateurs. N'hésitez pas à proposer vos implémentations et faire vos retours.
