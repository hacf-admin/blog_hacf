---
draft: true
folder: ha_ajouter_boitier_argon
article_ha: true
level: Débutant
authors:
  - mcfly
keywords:
  - Argon
  - Argon One Add-on
  - HassOS I2C Configurator
  - add-on ha
visibleInCMS: true
date: 20-11-22
lastmod: 2023-02-10
author: mcfly
socialshare: true
title: Installer le boitier Argon One sur Home Assistant et le controler
type: post
images: null
categories:
  - Add-on
  - Intégration
series:
  - home assistant
tags:
  - argon
hacf: null
description: Ajouter et commander son boitier Argon One M.2 avec Home Assistant
url_off: null
---
Pré-requis :

* Boitier Argon One ou Argone ONE extension
* [Activer mode Avancé](/blog/ha_installation_supervised_raspberry/#activer-les-paramètres-avancés) (pour installer l'add-on Terminal & SSH)

### Activer l'I2C

@adamoutioer nous a concocté un add-on simplifiant grandement l'activation de la liaison I2C, nommé `HAOS i2C Configurator`. Il est disponible à partir d'\[un dépôt externe](https://github.com/adamoutler/HassOSConfigurator).

![Add-on HAOS i2C Configurator](img/addon_haos_i2c_configurator.png)

* Ajouter le dépôt externe (Adresse du dépôt https://github.com/adamoutler/HassOSConfigurator)
* Recharger les dépôts ou faites `F5`,
* Installer l'add-on HAOS i2C Configurator,
* Cliquer sur `DEMARRER`.
* Vérifier les logs de l'add-on et du superviseur.
  {{< gallery folder="log1" >}}
* Redémarrer deux fois l'hôte.
  ![Log de l'add-on apres](img/log_addon_apres_redemarrage.png)
* Vérifier la présence d'I2C dans la liste de matériel `Configuration`-> `Modules complémentaires, Sauvegardes et Superviseur` -> Onglet `Système` -> Fenêtre `Host` `...` en bas à droite-> `Matériel`.
  ![Présence I2C dans la liste des matériel](img/liste_materiel_i2c.png)

Vous pouvez redémarrer l'add-on pour confirmer.
![Confirmer via l'add-on](img/log_relance_addon_i2c_configurator.png)

Il faut ajouter un nouveau `repositories` puis installer l'add-on.

Dans Home Assistant, cliquer sur `Configuration`-> `Modules complémentaires, Sauvegardes et Superviseur` -> `Boutique des modules complémentaires` ->`...` en haut à droite-> `Dépots`. 
Ajouter ce `repositories`.

{{< gallery folder="ajoutNouveauDepot" >}}

Puis installer l'add-on **HassOS I2C Configurator**

Il n'y a pas de configuration, juste le besoin de désactiver le `Protection Mode`

![I2C Configurator](img/haos_i2c_confgurator_parametre.png)
![Alerte Protection Mode](img/mode_protection_alerte.png)

### Sources

[Argon One Add-on](https://community.home-assistant.io/t/argon-one-active-cooling-addon/262598)
[Sujet HA Off addon Hassos I2C Configurator](https://community.home-assistant.io/t/add-on-hassos-i2c-configurator/264167)
[GitHub Hassos I2C Configurator](https://github.com/adamoutler/HassOSConfigurator)
