---
folder: ha_installation_haos_vm
title: Installer Home Assistant OS avec Proxmox (VM).
type: post
visibleInCMS: true
draft: true
date: 2023-04-10
lastmod: 2023-04-10
description: >-
  Vous avez une machine avec un peu de puissance comme un mini PC, et vous
  voulez faire tourner dessus Home Assistant, mais pas seulement.

  Vous voulez une solution à la fois simple et évolutive, et supportant l’installation clé en main « Home Assistant OS ».

  Alors Proxmox est fait pour vous.
level: Débutant
type_install:
  - ha-os
version_ha: 2023.4.0
categories:
  - Installation
author: default
authors: []
---
Vous avez une machine avec un peu de puissance, comme un mini PC, et vous souhaitez faire tourner Home Assistant, mais pas que ?
Vous voulez une solution, à la fois simple et évolutive, supportant l’installation clé en main de Home Assistant OS ?
Alors [Proxmox](https://www.proxmox.com/en/) est fait pour vous.

### Proxmox, qu'est-ce que c'est ?

[Proxmox](https://www.proxmox.com/en/) est un hyperviseur open source, en d'autre terme, c'est une **solution** qui permet de faire de la **virtualisation**.

C'est-à-dire, 

* Faire fonctionner une ou plusieurs machines virtuelles (VM) ayant chacune son propre système d’exploitation (OS) et ses différents programmes installés. Exemple : plusieurs VM avec des OS Linux et des OS Windows
* Utiliser les LXC (des conteneurs), utilisant les ressources matérielles de l'OS hôte dans un environnement isolé, (les puristes m'excuseront pour le raccourci, mais c'est un peu comme docker
  qui d'ailleurs peut être lancé dans un conteneur ou dans un OS dédié)

**Exemple :**
Une machine physique peut faire tourner **simultanément** :

* une VM avec une instance Windows,
* une VM avec une instance Home Assistant OS de production,
* une VM avec une instance Home Assistant OS de test,
* un conteneur avec un service EMBY ou PLEX,
* un conteneur avec le service MQTT,
* un conteneur avec un service de gestion d'onduleur,
* etc.

**Nous décrivons dans cet article, l’installation de Proxmox et d’une machine virtuelle (VM) avec Home Assistant OS.**

## Prérequis

Un pc avec :

* CPU 64 bits compatible virtualisation ([Intel®](https://ark.intel.com/content/www/fr/fr/ark.html#@Processors) ou AMD)
* 4 Go de RAM **minimum** (8 Go recommandé quand on commence à accumuler les VM et/ou les conteneurs)
  128 Go de stockage **minimum** (plus si besoin).

Des micro PC d'occasion à base de I3/I5, comme les [HP EliteDesk G3 mini](https://amzn.to/41hEPwt) par exemple, font très bien l'affaire.

> Il y a de très bonnes affaires sur les sites qui font du recyclage de parc informatique comme [Amazon](https://amzn.to/41hEPwt), [PCPack](https://pcpack.fr/), [AFBShop](https://www.afbshop.fr/), [BlackMarket](https://www.backmarket.fr/) tout en offrant une garantie, mais aussi sur les sites de petite annonce ou Ebay.

**Mon conseil** (*subjectif*)

* 2 Go pour l'hyperviseur plus autant de Go affecté pour chacune des machines virtuelles et conteneurs.
  Une machine virtuelle aura généralement besoin de plus de ressources  (CPU, espace disque et Mémoire) qu'un conteneur.

**IMPORTANT**
Il n'est, à ma connaissance, **PAS POSSIBLE** de partager le même périphérique (USB comme dongle Zigbee) sur plusieurs machines virtuelles simultanément.

## Proxmox

### Installation de Proxmox.

* Télécharger la dernière version de [Proxmox sur le site officiel](https://www.proxmox.com/en/downloads/category/iso-images-pve) (Version 7.4 a date).
* Créer une clé bootable [Balena Etcher](https://www.balena.io/etcher) ou de [Ventoy](https://www.ventoy.net/en/index.html).
* Booter votre machine dédiée sur votre clé USB, chaque machine étant spécifique, je vous laisse chercher un peu (ESC, F2, F8, F10, SUPPR).

Au boot, vous devriez avoir ceci

**PEUT ÊTRE REMPLACER PAR UNE SEULE IMAGE**

![Ecran accueil de l'installation de Proxmox](img/01-promox-installation.png)

* Cliquez sur  **install proxmox**, (*ça va brasser un peu en mode terminal*),

Ecran accueil de l'installation de Proxmox



![image|690x432](upload://m3fRvXVKELlQK8njxt61b1fQYKY.png)

* Cliquer sur **I agree**,

![image|690x430](upload://jWOa1GGvvp40pzExnZQi0U69dLR.png)

**ATTENTION** Si votre machine à plusieurs disques dur, choisissez le bon, c'est **irréversible** !

(*Personnellement, je choisis le mode automatique*)

![ok1|690x433](upload://i9vIMDMaYFiEJughFVDVba8RSFI.gif)

* Renseigner un mot de passe **FORT** et une adresse email **VALIDE**,

![ok2|690x433](upload://fZ8f4aqkyzBmzkDavJZp64ck8uR.gif)

* Sélectionner votre carte réseaux (si plusieurs, éviter le Wi-Fi),
* Vérifier et noter l'adresse IP affectée à votre serveur (il est possible de la changer, mais n'oubliez pas d'affecter cette adresse sur votre routeur/box),
* Cliquer sur **INSTALL**.

![ok4|690x431](upload://sAQTeFeGP7ZLyyuFL66An0vlfbS.gif)

Si tout va bien, après redémarrage de la machine, on arrive sur un terminal, l'installation de Proxmox est alors fini.
Maintenant que votre serveur Proxmox est installé, normalement tout va se passer sur votre ordinateur principal.

![image|690x429](upload://bWFhvpFPl2v0w5nYtK0uPG6Atph.png)

### Démarrage de Proxmox.

Depuis votre navigateur préféré, 

* Connectez-vous à l'adresse suivante `https://adress_ip_proxmox:8006`

> Si vous avez oublié l'adresse IP de votre serveur, pas de panique, consultez les adresses actives sur votre routeur.

* Connectez-vous avec le login `root` et le mot de passe saisi lors de l'installation (*vous pouvez avant aussi choisir le français et enregistrer le nom d'utilisateur*).

![image|690x375](upload://1K4hqKPdb25Zx3QQQ0Dzc0BhWzY.png)

Une fois les identifiants saisis, vous devriez avoir cette boite d'information
![image|690x377](upload://3mSLpnC0d061h2QsXhjCwxN0bn0.png)

> Pas de panique, Proxmox est une solution de virtualisation opensource gratuite, mais si vous souscrivez, vous avez accès à une hotline complémentaire, c'est le prix à payer pour la gratuité.

## Home Assistant.

Nous voila enfin arrivé à l'installation de notre système domotique préfère (ou bientôt préfère si vous débutez).

La procédure officielle se trouve sur le [site de Home Assistant](https://www.home-assistant.io/installation/linux), mais nous allons utiliser un script qui simplifie grandement l'installation.

Rendez-vous sur le [site de tteck](https://tteck.github.io/Proxmox/).

### Mis a jour de Proxmox.

Pour mettre à jour Proxmox :

* Cliquez sur **Proxmox tools**,

![image|689x379](upload://9k6gkjmsGSq0kXN0Lg7wJylfgaA.png)

* Puis sur Proxmox VE 7 Post Install

![image|690x403](upload://rxAPCxRr7HjLw9Jgfo3yqEgVwob.png)

* Copiez la ligne de code affichée,
* Rendez-vous dans le Shell de Proxmox,

![ok5|690x431](upload://1hFQQFcThdm5v3ETknZCuVfLxQx.gif)

* Collez la et appuyer sur **entrer**,
* Tout valider à **yes**

Cette étape permet de mettre à jour les dépôts permettant de maintenir Proxmox et d'enlever le popup disgracieux au login de Proxmox.

### Installation de Home Assistant

Toujours dans la page de scripts :

* Choisir **Home Assistant**, 
* Home Assistant OS VM,
* Copiez la ligne de code affichée,
* Rendez-vous dans le Shell de Proxmox,
* Collez la et appuyer sur **entrer**,
* Suivez les étapes.

  > Vous pouvez laisser les paramètres par défauts ou bien les modifier.

![ok6|690x431](upload://ksqEhYDDVO20FxVzjOAfXFsAqB8.gif)

Une fois le déroulement du script terminé, retourner sur l'interface principale de Proxmox.
Vous devez voir une machine virtuelle 100 (HAOS 9.5 à date) qui doit être créé.
Cliquer sur cette machine virtuelle, vous pouvez soit consulter la page de résumé, soit accéder au Shell de la machine virtuelle (VM). Dans les deux cas, récupérer l'adresse IP de la VM qui est celle de votre Home Assistant.

![ok7|690x431](upload://4Vs8GQIJDOgcrEQQhOu1c7hZSEB.gif)

Il vous suffit de saisir cette adresse, suivie du port 8123 pour accéder au premier lancement de Home Assistant
ex: http://192.168.1.158:8123
![image|690x412](upload://lnZdRwLRRhk9Upnkvr9fQrEfItn.png)

Continuer la configuration grâce a l'article [premier configuration](/ha_installation_premier_lancement)

### Allez plus loin.

**Périphériques USB**

> **RAPPEL :** Un périphérique USB peut etre prtagé **seulement** sur **une** VM a la fois.
>
> L'association d'un périphérique peut être faite à n'importe quel moment, mais la prise en compte de ce dernier, n'aura lieu qu'après un redémarrage complet de la VM.

**Connecter votre clé USB sur votre Serveur Proxmox**
Dans la barre verticale de gauche, choisissez la VM sur laquelle vous voulez affecter votre clé USB, puis : 

* Aller dans matériel,
* Ajouter,
* Périphérique USB,
* Utiliser les identifiants USB du fabricant et du périphérique,
* Choisir le périphérique à inclure.

Cette opération est à faire autant de fois qu'il y a de clé à inclure

![ok9|618x500](upload://BYYehZYEwBPKpP4ivCRU8ASjIE.gif)

**Petit conseil**
Brancher et inclure une clé à la fois sur votre serveur.

**Vérifier la présence de vos devices USB dans Home Assistant.**
![ok11|690x251](upload://297j8cTKt4vY3mMx5eFiTHgEyX8.gif)

**Limitation a quatre USB.**
Une limitation de quatre périphériques peut être outrepassée via la [méthode suivante](https://forum.proxmox.com/threads/limit-for-usb-devices.89774/)

### Conclusion.

L'installation de Home Assistant OS sur un serveur Proxmox vous permet de bénéficier de la version la plus complète de Home Assistant (HAOS) tout en pouvant utiliser votre matériel pour d'autres applications/services.