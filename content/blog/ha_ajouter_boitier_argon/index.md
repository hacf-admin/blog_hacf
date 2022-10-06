---
draft: false
article_ha: true
authors:
  - mcfly
keywords:
  - Argon
  - Argon One Add-on
  - HassOS I2C Configurator
  - add-on ha
title: "Installer le boitier Argon One sur Home Assistant et le controler"
date: 2022-01-07
lastmod: null
socialshare: true
tags:
  - argon
  - Argon One Add-on
  - HassOS I2C Configurator
  - add-on ha
series:
  - home assistant
author:
  - mcfly
type: null
categories:
  - Add-on
  - Intégration
hacf: null
description: Ajouter et commander son boitier Argon One M.2 avec Home Assistant
url_off: null
---

Pré requis :
* Boitier Argon One ou Argone ONE extension
* [Activer mode Avancé](./../ha_installation_supervised_raspberry/#activer-les-paramètres-avancés) (pour installer l'add-on Terminal & SSH)


### Activer l'I2C
@adamoutioer nous a concocter un add-on simplifiant grandement l'activation de la liason I2C, nommé HAOS i2C Configurator. Il est disponnible a partir d'[un dépot externe](#URL ARTICLE ADDON).

![Add-on HAOS i2C Configurator](img/addon_haos_i2c_configurator.png)



* Ajouter le dépot externe via l'image ci-dessous ou manuellement. Adresse du dépot https://github.com/adamoutler/HassOSConfigurator
LIENS HA AJOUT DEPOT
* Recharger les dépots ou faites `F5`,
* Installer l'add-on HAOS i2C Configurator,
* Cliquer sur `DEMARRER`.
* Verifier les logs de l'add-on et du supervisor.
{{< gallery folder="log1" >}}
* Redémarrer deux fois l'hote.
![Log de l'add-on apres](img/log_addon_apres_redemarrage.png)
* Vérifier la présence d'I2C dans la liste de matériel `Configuration`-> `Modules complémentaires, Sauvegardes et Superviseur` -> Onglet `Système` -> Fenetre `Host` `...` en bas à droite-> `Matériel`.
![Présence I2C dans la liste des matériel](img/liste_materiel_i2c.png)

Vous pouvez redemarer l'add-on pour confirmer.
![Confirmer via l'add-on](img/log_relance_addon_i2c_configurator.png)

Il faut ajouter un nouveau `repositories` puis installer l'add-on.

Dans Home Assistant, cliquer sur `Configuration`-> `Modules complémentaires, Sauvegardes et Superviseur` -> `Boutique des modules complémentaires` ->`...` en haut à droite-> `Dépots`. 
Ajouter ce `repositories`.

{{< gallery folder="ajoutNouveauDepot" >}}

Puis installer l'add-on **HassOS I2C Configurator**

Il n' y a pas de configuration juste le besoin de désactiver le `Protection Mode`

![I2C Configurator](img/haos_i2c_confgurator_parametre.png)
![Alerte Protection Mode](img/mode_protection_alerte.png)

### Sources
[Argon One Add-on](https://community.home-assistant.io/t/argon-one-active-cooling-addon/262598)
[Sujet HA Off addon Hassos I2C Configurator](https://community.home-assistant.io/t/add-on-hassos-i2c-configurator/264167)
[GitHub Hassos I2C Configurator](https://github.com/adamoutler/HassOSConfigurator)