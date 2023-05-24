---
folder: dev_tuto_4_config_flow
title: Développer pour Home Assistant - (4) La configuration
type: post
visibleInCMS: true
draft: false
date: 2023-05-13
lastmod: 2023-05-13
images: img/developper-4.png
description: Cet article s'adresse aux développeurs et fait partie d'une série
  de tutos visant à vous présenter comment développer en python votre propre
  intégration. L'objectif de ce quatrième tutoriel est d'ajouter une interface
  de configuration à notre intégration.
level: Avancé
version_ha: "2023.4"
categories:
  - Développement
tags:
  - developpement
  - python
author: jean-marc_collin
url_hacf: https://forum.hacf.fr/t/developper-pour-home-assistant-comment-faire/22780
workflow: published
---
L'objectif de cet article est d'ajouter une IHM de paramétrage à notre intégration lors de son installation et paramétrage.

Il s'inscrit dans la suite des articles dont le sommaire est présenté ici : [Développer pour Home Assistant - Introduction](/blog/dev_tuto_introduction/).

> 💡 Les fichiers sources complets en version finales sont en fin d'article.

## Prérequis

Avoir déroulé avec succès les trois premiers articles [tuto1](/blog/dev_tuto_1_installation/), [tuto2](/blog/dev_tuto_1_integration/) et [tuto3](/blog/dev_tuto_3_interactions/).

Vous devez donc avoir une entité avec un état qui est une mesure en secondes et une deuxième entité qui écoute la première et stocke dans son état la date heure du dernier changement.

## Les points abordés

Dans cet article, tu vas apprendre à :

1. activer l'IHM de configuration,
2. paramétrer une étape de configuration,
3. comprendre les schémas,
4. ajouter des étapes,
5. créer une entité à partir d'une configuration,
6. modifier la configuration d'une entité existante

## Contexte

Dans les tutos précédents, notre intégration et nos entités étaient paramétrées via le fichier `config/configuration.yaml` global à Home Assistant. La modification de ce fichier se fait en yaml, est complexe et est sujette à beaucoup d'erreurs : indentation stricte, syntaxe particulière, etc

Dans Home Assistant, il existe un moyen beaucoup plus "user-friendly" de paramétrer ses appareils et ses entités : le `config flow` (ou flot de configuration).

Cela correspond à toutes les fenêtres de configuration plus ou moins complexes que l'on peut trouver dans la plupart des intégrations récentes.
Exemple avec [Versatile Thermostat](https://github.com/jmcollin78/versatile_thermostat) :

![Versatile Thermostat](img/vtherm-config-main.png)

Exemple avec le panneau de configuration de Sonoff :

![Sonoff](img/sonoff-config.png)

Ces panneaux de configuration s'ouvrent lorsqu'on ajoute une intégration ou lorsqu'on veut modifier la configuration d'une intégration existante.

> 💡 Une configuration se fait potentiellement en plusieurs étapes qui s'enchainent en cliquant sur `Valider`. Chaque étape peut dépendre de ce qui a été saisi à la précédente. On arrive donc à définir un parcours de configuration (le `flow`) dont **la dernière étape est la création de l'entité** elle-même.

## Activer l'IHM de configuration

Pour utiliser cette IHM de configuration, la première chose à faire est d'indiquer à Home Assistant que notre intégration possède un flot de configuration.
Cela se passe dans le `manifest.yaml`, on indique :

```yaml
   "config_flow": true,
```

À la lecture de cet attribut, Home Assistant va chercher le code du `configFlow` dans le fichier nommé `config_flow.py` à la racine de notre intégration. Ce nom de fichier n'est pas paramétrable. Il doit impérativement s'appeler comme ça.

On va donc créer un fichier `config_flow.yaml` le plus simple possible pour l'instant :

```python
""" Le Config Flow """

import logging

from homeassistant.config_entries import ConfigFlow
from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)


class TutoHACSConfigFlow(ConfigFlow, domain=DOMAIN):
    """La classe qui implémente le config flow pour notre DOMAIN.
    Elle doit dériver de FlowHandler"""

    # La version de notre configFlow. Va permettre de migrer les entités
    # vers une version plus récente en cas de changement
    VERSION = 1
```

Vérifies les erreurs de compilation, corriges les au besoin et redémarre Home Assistant.

Lorsqu'on crée une intégration de type TutoHACS ("Paramètres / Intégrations / Ajouter une intégration") :

![Ajout intégration](img/ajout-integration.png)

on obtient la fenêtre de configuration suivante :

![ConfigFlow](img/config-flow-vide.png)

Pour rappel, dans le tuto1, lorsqu'on avait fait l'ajout de notre intégration, on avait eu le message suivant :

![ConfigFlow](img/integration-manuelle.png "ConfigFlow")

Vous êtes développeurs et souhaitez développer en python votre propre intégration. Nous avons vu dans l précédents tuto comment Home Assistant nous permet de configurer notre intégration. Mais comme aucune étape de configuration n'est codée, il ne se passe rien lorsqu'on clique sur "Fermer". Nous allons voir comment y remédier.

## Ajouter une étape de configuration

Pour ajouter une étape de configuration (`step`), il faut ajouter une méthode dans notre classe de configuration. La première étape est de créer une méthode qui va être appelée par Home Assistant. Elle doit avoir un nom fixé à l'avance et qui dépend de comment a été découverte l'intégration.

Dans notre cas, l'intégration a été ajoutée par l'utilisateur, donc la méthode qui implémente la première étape doit avoir le nom suivant : `async_step_user`.
Si notre intégration avait été découverte automatiquement par le Bluetooth par exemple, elle aurait dû s'appeler `async_step_bluetooth`.

> 💡 Cette façon de faire est assez perturbante si tu développes depuis un certain temps. Le développement dans Home Assistant fait beaucoup appel à ces noms prédéfinis de fichiers, de classes, de méthodes dont le nom est fixe et auquel on ne peut pas déroger. Bref, c'est comme ça et il faut faire avec. La [documentation de référence](https://developers.home-assistant.io/docs/creating_component_index) aide pour les trouver.

On va donc ajouter une méthode nommée `async_step_user` puisque notre intégration est ajoutée manuellement par un utilisateur :

```python
    import voluptuous as vol
    ...

    async def async_step_user(self, user_input: dict | None = None) -> FlowResult:
        """Gestion de l'étape 'user'. Point d'entrée de notre
        configFlow. Cette méthode est appelée 2 fois :
        1. une première fois sans user_input -> on affiche le formulaire de configuration
        2. une deuxième fois avec les données saisies par l'utilisateur dans user_input -> on sauvegarde les données saisies
        """
        user_form = vol.Schema({vol.Required("name"): str})

        if user_input is None:
            _LOGGER.debug(
                "config_flow step user (1). 1er appel : pas de user_input -> on affiche le form user_form"
            )
            return self.async_show_form(step_id="user", data_schema=user_form)

        # 2ème appel : il y a des user_input -> on stocke le résultat
        # TODO: utiliser les user_input
        _LOGGER.debug(
            "config_flow step user (2). On a reçu les valeurs: %s", user_input
        )
```

Comme indiqué dans le commentaire, cette méthode va être appelée 2 fois :

1. une première fois sans `user_input`. Home Assistant s'attend à ce qu'on lui donne alors le formulaire à afficher à l'utilisateur,
2. une deuxième fois, cette fois avec des données dans `user_input`. `user_input` contient alors un dictionnaire avec les valeurs du formulaire saisies par l'utilisateur. On va voir ce qu'on fait de ses valeurs ensuite. Pour l'instant, on va juste les "logger".

Note : le code qui initialise le formulaire `user_form = vol.Schema({vol.Required("name"): str})`sera expliqué ci-dessous. N'y fais pas attention pour l'instant.

Après avoir relancé Home Assistant, si on tente de créer une intégration de type *TutoHACS*, on obtient cette fois cette page de configuration :

![ConfigFlow](img/config-flow-1.png "ConfigFlow")

On est bien rentré dans le configFlow et Home Assistant nous affiche le formulaire qui contient un champ "name".

Saisis un nom dans le champ et appuie sur "Valider". Tu dois voir les 2 logs suivants :

```log
2023-04-22 10:31:15.284 DEBUG (MainThread) [custom_components.tuto_hacs.config_flow] config_flow step user (1). 1er appel : pas de user_input -> on affiche le form user_form
...
2023-04-22 10:31:19.752 DEBUG (MainThread) [custom_components.tuto_hacs.config_flow] config_flow step user (2). On a reçu les valeurs: {'name': 'xxxxxx'}
```

Si cela fonctionne bien, notre méthode `async_step_user` a bien été appelée 2 fois, une fois sans valeur et une fois avec les valeurs saisies dans le formulaire.

> 💡 Note
>
> 1. il n'est pas facile pour l'utilisateur de savoir ce qu'il doit saisir. On va ajouter juste en dessous des libellés pour notre formulaire pour y remédier,
> 2. l'appui sur "Valider" se termine avec une erreur. C'est parce-que notre méthode ne retourne rien lors du 2ème passage. On va y remédier aussi un peu en dessous. A ce stade, c'est normal.

### Ajout de libellés dans notre formulaire

On va **ajouter des libellés à ce formulaire** en ajoutant le fichier `strings.json` suivant à la racine de notre intégration :

```json
{
    "title": "TutoHACS",
    "config": {
        "flow_title": "TutoHACS configuration",
        "step": {
            "user": {
                "title": "Vos infos de connexion",
                "description": "Donnez vos infos de connexion",
                "data": {
                    "name": "Nom"
                },
                "data_description": {
                    "name": "Nom de l'intégration"
                }
            }
        }
    }
}
```

La structure est fixe et rigide.

Tu donnes dans ce fichier les différents libellés qui accompagnent les formulaires :

* `title` est le nom de l'intégration,
* le bloc `config` contient les libellés du configFlow,
* `flow_title` est le titre du flot de configuration,
* le bloc `step` contient les libellés des étapes de la configuration,
* le bloc `user` contient les libellés de l'étape `user`. Il y a la possibilité de mettre un titre et une description
* le bloc `data` contient les libellés des datas du formulaire `user`. 2 libellés sont possibles : le libellé de nos champs (ici `name`)
* le bloc `data_description` contient une description optionnelle pour chaque champ du formulaire. Dans notre exemple, il n'y a pas `name`

Ensuite, on va créer une copie de ce fichier dans un sous-répertoire de notre intégration nommé `translations`. Ce répertoire doit contenir, les traductions du fichier `strings.json` dans toutes les langues supportées par notre intégration. La langue par défaut affichée à l'utilisateur sera sa langue configurée dans Home Assistant.

On doit donc avoir l'arborescence suivante :

![Arborescence](img/arbo-tuto-hacs.png "Arborescence")

Les fichiers `strings.json` et `translations/fr.json` sont identiques. Pour une vraie intégration, il est préférable que les libellés du fichier `strings.json` soient en anglais.

On redémarre Home Assistant et on tente de recréer l'intégration.

> 💡 On constate que nos libellés **NE SONT PAS** pris en compte ! En effet, ils sont mis en cache dans le navigateur pour éviter de trop souvent interroger le serveur. Il va falloir vider ce cache (command-shift-suppr / "Images et fichiers en cache" sur Chrome sous Mac). Il arrive que cela ne fonctionne pas non plus après vider le cache. Dans ce cas, il faut relancer complètement le navigateur.

Vides le cache, recharges la page, crées l'intégration *TutoHACS* et cette fois, tu dois avoir ça :

![ConfigFlow](img/config-flow-2.png)

> ⚠️ **Attention :** en cas d'erreur de syntaxe dans un fichier de libellés, aucune erreur ne sera signalée nul part et seule la dernière version valide sera prise en compte. Combiné avec le cache navigateur qui reste aussi sur la dernière version valide, il est parfois très compliqué de comprendre pourquoi nos modifications ne pas prisent en compte.

# Comprendre les schémas

Dans le code de la fonction `async_step_user` ci-dessus, on a une ligne qui n'a pas été expliquée. Elle initialise le formulaire affiché dans l'étape `user` : 

```python
user_form = vol.Schema({vol.Required("name"): str})
```

Ce petit bout de code qui n'a l'air de rien mériterait à lui tout seul un tuto complet tellement il est puissant, mais il est difficile à appréhender et mal documenté. Je vais vous donner quelques clés pour comprendre comment il marche.

### Voluptuous

Les formulaires sont créés à partir du package Python [Voluptuous](https://github.com/alecthomas/voluptuous) qui permet de créer des schémas. **Un schéma est une librairie de validation des données d'un formulaire**. Sa première vocation est de valider syntaxiquement et sémantiquement des données reçues par un logiciel. On s'en sert ici pour décrire le formulaire qui est présenté à l'utilisateur et pour valider les données du formulaire saisies par l'utilisateur.

`vol.Schema` instancie une classe de type `Schema` du package `vol` qui est le nom donné à l'import Voluptuous : `import voluptuous as vol`.

Ce constructeur prend en argument un objet json dont chaque attribut est un élément du formulaire. Exemple :

```python
vol.Schema({
    <premier element du formulaire>,
    <deuxième element du formulaire>,
    <troisième element du formulaire>
    ...
})
```

Chaque élément de formulaire (chaque ligne), est lui-même un objet qui dit si l'élément est facultatif ou obligatoire et on lui donne un nom :

```python
vol.Schema({
    vol.Required("nom du 1er champ obligatoire"): <Validator>,
    vol.Required("nom du 2ème champ obligatoire"): <Validator>,
    vol.Optional("nom du 3ème champ optionnel"): <Validator>>
    ...
    })
```

Dans le constructeur `Required` ou `Optional`, il est possible de donner une valeur par défaut au champ (si non saisi par l'utilisateur) ainsi qu'une valeur suggérée (valeur proposée à l'utilisateur, mais qui ne sera pas retenue si l'utilisateur laisse le champ vide). **La nuance valeur par défaut / valeur suggérée** est subtile, mais importante. Un champ qui a une valeur par défaut, **ne peut pas ne pas avoir de valeur**, alors qu'en cas de valeur suggérée, l'utilisateur peut supprimer la valeur proposée et ainsi saisir la valeur vide.

```python
vol.Schema({
    vol.Required("nom du 1er champ obligatoire", default=12): <Validator>,
    vol.Required("nom du 2ème champ obligatoire", default="valeur par defaut"): <Validator>,
    vol.Optional("nom du 3ème champ optionnel", suggested_value="valeur suggérée"): <Validator>>
    ...
    })
```

Chaque champ à un type qu'il faut mettre à la place de `<Validator>` en fonction de ce qui est attendu par l'utilisateur. Un **type** est une classe proposée par le package Voluptuous lui-même.

Par exemple :

* `str` : string,
* `Boolean` : booleen,

mais il existe aussi des classes plus complexes :

* `Range` : une plage de valeurs admises. Exemple : `vol.Range(min=-90, max=90)`,
* `Coerce(type)` : permet de convertir la valeur en un type (en argument). Exemple : `vol.Coerce(float)` pour traduire le champ en `float`,
* `Match(regexp)`⁣ : le champ est valide si l'expression régulière est vraie,
* `In([])` : la valeur doit être une des valeurs du tableau donné en argument.

Et aussi des ***Validator*** qui combinent d'autres **Validator** :

* `All(list(Validator))` : est vrai si tous les `Validator` de la liste sont vérifiées. Exemple : `vol.All(vol.Coerce(float), vol.Range(min=-90, max=90)` 
* `Any(list(Validator))` : est vrai si au moins un `Validator` de la liste est vérifiée. Exemple : `vol.Any("valeur1", "valeur2")`

Exemple un peu plus complet :

```python
vol.Schema({
    # On attend un entier
    vol.Required("nom du 1er champ obligatoire", default=12): vol.Coerce(int),
    # On attend une chaine qui peut être "valeur1" ou "valeur2"
    vol.Required("nom du 2ème champ obligatoire", default="valeur1"): vol.Any("valeur1", "valeur2"),
    # On attend une longitude (un float compris entre -90° et +90°)
    vol.Optional("nom du 3ème champ optionnel", suggested_value="1.112"): vol.All(vol.Coerce(float), vol.Range(min=-90, max=90))
    ...
    })
```

### Les Helpers Home Assistant

Pour aider dans la rédaction des formulaires Home Assistant fournit le package `homeassistant.helpers.config_validation` qui contient des `Validator` prêts à l'emploi. Par exemple :

* `byte` : un octet (définit comme `vol.All(vol.Coerce(int), vol.Range(min=0, max=255))`),
* `small_float` : un float entre 0 et 1,
* `positive_int` : un entier positif,
* `latitude` : un float entre -90 et +90,
* `time` : une valeur de temps,
* `date` : une date,
* etc

Il serait impossible de tous les listés ici donc il est conseillé de regarder ce qui est contenu dans le package lui-même.

### Les "Selectors" Home Assistant

Home Assistant permet d'utiliser les `Selector` comme des `Validators`. Pour rappel, les `Selector` sont listés [ici](https://www.home-assistant.io/docs/blueprint/selectors/).
On va donc pouvoir très facilement demander à Home Assistant de valider le champ si le champ correspond bien à une entité d'un domaine par exemple. Et dans ce cas, le formulaire affichera que les entités du ou des domaines.

Exemple pour sélectionner des entités :

```python
vol.Schema({
    # On attend un entity id du domaine climate
    vol.Required("climate_id"): selector.EntitySelector(
        selector.EntitySelectorConfig(domain=CLIMATE_DOMAIN),
    ),
    # On attend un entity id d'un switch ou d'un input_boolea,
    vol.Optional("switch_id"): selector.EntitySelector(
        selector.EntitySelectorConfig(
            domain=[SWITCH_DOMAIN, INPUT_BOOLEAN_DOMAIN]
        ),
    )
})
```

> 💡 C'est très puissant mais vraiment très mal documenté. Souviens toi, en introduction de ces tutos, j'expliquais qu'il fallait aller voir ce qu'on fait les autres (**Open Source !**), c'est primodial d'appliquer cette règle ici. Fork le repo de Home Assistant : parcours le code, fais des recherches dedans et tu vas apprendre plein de choses.

Pour les curieux, voici le schéma complet de la première page de configuration du [Versatile Thermostat](https://github.com/jmcollin78/versatile_thermostat) :

```python
vol.Schema(  # pylint: disable=invalid-name
{
    vol.Required(CONF_NAME): cv.string,
    vol.Required(
        CONF_THERMOSTAT_TYPE, default=CONF_THERMOSTAT_SWITCH
    ): selector.SelectSelector(
        selector.SelectSelectorConfig(
            options=CONF_THERMOSTAT_TYPES, translation_key="thermostat_type"
        )
    ),
    vol.Required(CONF_TEMP_SENSOR): selector.EntitySelector(
        selector.EntitySelectorConfig(
            domain=[SENSOR_DOMAIN, INPUT_NUMBER_DOMAIN]
        ),
    ),
    vol.Required(CONF_EXTERNAL_TEMP_SENSOR): selector.EntitySelector(
        selector.EntitySelectorConfig(
            domain=[SENSOR_DOMAIN, INPUT_NUMBER_DOMAIN]
        ),
    ),
    vol.Required(CONF_CYCLE_MIN, default=5): cv.positive_int,
    vol.Required(CONF_TEMP_MIN, default=7): vol.Coerce(float),
    vol.Required(CONF_TEMP_MAX, default=35): vol.Coerce(float),
    vol.Optional(CONF_DEVICE_POWER, default="1"): vol.Coerce(float),
    vol.Optional(CONF_USE_WINDOW_FEATURE, default=False): cv.boolean,
    vol.Optional(CONF_USE_MOTION_FEATURE, default=False): cv.boolean,
    vol.Optional(CONF_USE_POWER_FEATURE, default=False): cv.boolean,
    vol.Optional(CONF_USE_PRESENCE_FEATURE, default=False): cv.boolean,
}
)
```

Le résultat est le suivant :

![Versatile Thermostat](img/vtherm-config-main.png "Versatile Thermostat")

## Ajouter une deuxième étape

Pour ajouter une deuxième étape de configuration, on ajoute une méthode (une méthode par étape) et on l'appelle à la fin de la première étape.

Le code ressemble à ça :

```python
    # Cette fois on est libre sur le nommage car ce n'est pas le point d'entrée
    async def async_step_2(self, user_input: dict | None = None) -> FlowResult:
        """Gestion de l'étape 2. Mêmes principes que l'étape user"""
        step2_form = vol.Schema(
            {
                # On attend un entity id du domaine sensor
                vol.Optional("sensor_id"): selector.EntitySelector(
                    selector.EntitySelectorConfig(domain=SENSOR_DOMAIN),
                )
            }
        )

        if user_input is None:
            _LOGGER.debug(
                "config_flow step2 (1). 1er appel : pas de user_input -> "
                "on affiche le form step2_form"
            )
            return self.async_show_form(step_id="2", data_schema=step2_form)

        # 2ème appel : il y a des user_input -> on stocke le résultat
        # TODO: utiliser les user_input
        _LOGGER.debug("config_flow step2 (2). On a reçu les valeurs: %s", user_input)
```

Puis en fin de la méthode `async_step_user` on va appeler le step 2 explicitement :

```python
    async def async_step_user(self, user_input: dict | None = None) -> FlowResult:
        ...
        if user_input is None:
            ...

        ...
        # On appelle le step 2 ici
        return await self.async_step_2()
```

On ajoute ensuite les imports qui manquent :

```python
from homeassistant.helpers import selector

import voluptuous as vol
import homeassistant.helpers.config_validation as cv
from homeassistant.components.sensor import DOMAIN as SENSOR_DOMAIN
```

On va corriger les erreurs et on relance Home Assistant. Si on configure une intégration, on a bien maintenant notre page 2 de la configuration après avoir cliqué sur "Valider" sur la première page :

![Config flow page 2](img/config-flow-3.png "Config flow page 2")

On constate qu'il manque quelques traductions pour notre page 2. On les ajoute dans le fichier `strings.json` qu'on recopie dans `translations/fr.json`, on redémarre, on vide le cache du navigateur et cette fois, on a la page suivante :

```json
{
    "title": "TutoHACS",
    "config": {
        ...
        "step": {
            "user": ...,
            "2": {
                "title": "Page 2",
                "description": "Une deuxième page de configuration",
                "data": {
                    "sensor_id": "Sensor"
                },
                "data_description": {
                    "sensor_id": "Le capteur permettant d'utiliser les selector dans ce beau tuto."
                }
            }
        }
    }
}
```

![Config flow page 2](img/config-flow-4.png "Config flow page 2")

> 💡 Note
>
> 1. comme au-dessus, la validation de la 2ème page de configuration génère une erreur. A ce stade, c'est normal puisque notre méthode `async_step_2` ne renvoie rien,
> 2. dans notre première méthode, lorsqu'on appelle la 2ème, **il est possible d'avoir de la logique pour router vers la page 2** ou tout autre page de notre choix. C'est comme ça qu'on va pouvoir avoir **un parcours de paramétrage différent** en fonction de la configuration que l'on veut atteindre.

## Créer une entité à partir d'une configuration

On a défini un parcours de configuration (le fameux `configFlow`) et maintenant, il va falloir créer une entité en fin de ce parcours avec les éléments saisis.

Pour cela, il faut :

1. mémoriser les éléments saisis à chaque étape,
2. créer une entrée de configuration,
3. créer les entités avec l'ensemble des éléments saisis,
4. relier les entités à un appareil (device)

### Mémoriser les éléments saisis

Pour mémoriser les éléments saisis, il faut ajouter un réceptacle des saisies de l'utilisateur :

```python
class TutoHACSConfigFlow(ConfigFlow, domain=DOMAIN):
    """La classe qui implémente le config flow pour notre DOMAIN.
    Elle doit dériver de FlowHandler"""

    ...
    # le dictionnaire qui va recevoir tous les user_input. On le vide au démarrage
    _user_inputs: dict = {}
```

et la mémorisation dans le réceptacle des user_infos à chacune de nos étapes :

```python
    async def async_step_user(self, user_input: dict | None = None) -> FlowResult:
        ...
        if user_input is None:
            ...
        
        # On mémorise les user_input
        self._user_inputs.update(user_input)

    async def async_step_2(self, user_input: dict | None = None) -> FlowResult:
        ...
        if user_input is None:
            ...
            
        # On mémorise les user_input
        self._user_inputs.update(user_input)
        _LOGGER.info(
            "config_flow step2 (2). L'ensemble de la configuration est: %s",
            self._user_inputs,
        )
```

Si on relance en l'état et qu'on ajoute une intégration Tuto HACS, on obtient le log suivant après avoir validé la dernière étape :

```log
2023-04-22 16:43:03.973 DEBUG (MainThread) [custom_components.tuto_hacs.config_flow] config_flow step2 (2). On a reçu les valeurs: {'sensor_id': 'sensor.sun_next_setting'}
2023-04-22 16:43:03.973 INFO (MainThread) [custom_components.tuto_hacs.config_flow] config_flow step2 (2). L'ensemble de la configuration est: {'name': 'le nom', 'sensor_id': 'sensor.sun_next_setting'}
```

Notre objet `_user_inputs` contient bien les 2 champs des 2 formulaires de configuration.

### Créer une entrée de configuration (ConfigEntry)

L'entrée de configuration ou ConfigEntry, est ce qui permet de rendre les configurations des intégrations persistantes dans le temps. Après une relance de Home Assistant, **toutes les entités sont créées à partir des configEntry sauvegardées sur le disque**. C'est ce qui remplace le `configuration.yaml`.
Tu peux retrouver toutes les configEntry sur ton disque dur, dans le fichier `config/.storage/core.config_entries`.

Donc à la fin du configFlow, après avoir collecté tous les éléments de configuration, on va demander à Home Assistant de créer ou de mettre à jour un configEntry. Cela se fait très simplement avec le code suivant :

```python
self.async_create_entry(title="titre de l'entrée", data=self._user_inputs)
```

On va ajouter une constante CONF_NAME qui définit le nom de l'élément de config `name` au lieu de l'avoir en dur et on va utiliser l'élément de configuration `name` comme `title` pour ce configEntry. La deuxième méthode devient donc :

```python
    async def async_step_2(self, user_input: dict | None = None) -> FlowResult:
        """Gestion de l'étape 2. Mêmes principes que l'étape user"""
        step2_form = vol.Schema(
            {
                # On attend un entity id du domaine sensor
                vol.Optional("sensor_id"): selector.EntitySelector(
                    selector.EntitySelectorConfig(domain=SENSOR_DOMAIN),
                )
            }
        )

        if user_input is None:
            _LOGGER.debug(
                "config_flow step2 (1). 1er appel : pas de user_input -> "
                "on affiche le form step2_form"
            )
            return self.async_show_form(step_id="2", data_schema=step2_form)

        # 2ème appel : il y a des user_input -> on stocke le résultat
        _LOGGER.debug("config_flow step2 (2). On a reçu les valeurs: %s", user_input)

        # On mémorise les user_input
        self._user_inputs.update(user_input)
        _LOGGER.info(
            "config_flow step2 (2). L'ensemble de la configuration est: %s",
            self._user_inputs,
        )

        return self.async_create_entry(
            title=self._user_inputs[CONF_NAME], data=self._user_inputs
        )
```

On relance Home Assistant, on crée une intégration de type Tuto HACS et on doit avoir le résultat suivant :

![Config flow réussi](img/config-flow-5.png)

On constate aussi qu'une intégration a été créée :

![Config flow échec](img/config-flow-6.png)

mais elle est en échec.

Allons voir les logs et on constate ceci :

```log
2023-04-22 20:59:40.958 DEBUG (MainThread) [custom_components.tuto_hacs.config_flow] config_flow step2 (2). On a reçu les valeurs: {'sensor_id': 'sensor.sun_next_setting'}
2023-04-22 20:59:40.958 INFO (MainThread) [custom_components.tuto_hacs.config_flow] config_flow step2 (2). L'ensemble de la configuration est: {'name': 'La première', 'sensor_id': 'sensor.sun_next_setting'}
2023-04-22 20:59:40.961 ERROR (MainThread) [homeassistant.config_entries] Error setting up entry La première for tuto_hacs
Traceback (most recent call last):
  File "/home/vscode/.local/lib/python3.11/site-packages/homeassistant/config_entries.py", line 383, in async_setup
    result = await component.async_setup_entry(hass, self)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^
AttributeError: module 'custom_components.tuto_hacs' has no attribute 'async_setup_entry'
```

La configuration s'est bien passée, mais il manque à notre module `custom_components.tuto_hacs` une fonction `async_setup_entry`. Cette fonction va servir à transformer le configEntry en entité. On va voir comment faire ça dans le chapitre suivant.

Si on ouvre le fichier `config/.storage/core.config_entries` et qu'on recherche notre configuration, on doit la trouver et elle doit ressembler à ça :

```yaml
{
  "version": 1,
  "minor_version": 1,
  "key": "core.config_entries",
  "data": {
    "entries": [
        ...
      {
        "entry_id": "e88362b08cbf7774cb2ce61bbc952de3",
        "version": 1,
        "domain": "tuto_hacs",
        "title": "La première",
        "data": {
          "name": "La première",
          "sensor_id": "sensor.sun_next_setting"
        },
        "options": {},
        "pref_disable_new_entities": false,
        "pref_disable_polling": false,
        "source": "user",
        "unique_id": null,
        "disabled_by": null
      }
    ]
  }
}
```

Ce fichier contient bien notre configEntry avec nos paramètres, notamment le `title` qui prend la valeur de `data.name`.

### Créer une entité à partir d'une entrée de configuration

Au chargement ou lors d'une création d'une nouvelle configEntry, il faut indiquer à Home Assistant, comment instancier les entités et les appareils à partir de cette configEntry. Ça se fait simplement en créant une fonction `async_setup_entry` dans le fichier `__init__.py` :

```python
async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Creation des entités à partir d'une configEntry"""

    _LOGGER.debug(
        "Appel de async_setup_entry entry: entry_id='%s', data='%s'",
        entry.entry_id,
        entry.data,
    )

    hass.data.setdefault(DOMAIN, {})

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    return True
```

Ce code positionne le domaine par défaut comme étant notre domaine, puis appel `hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)` qui comme son nom l'indique propage le configEntry à toutes les plateformes déclarées dans notre intégration.

Rappelle-toi que `PLATFORMS` contient la liste des plateformes des entités créées par notre intégration (si une intégration doit créer un `sensor` et un `switch`, `PLAFORMS` contiendra `['sensor', 'switch']`). Pour le tuto, `PLATFORM`est initialisé comme suit dans le `const.py` : `PLATFORMS: list[Platform] = [Platform.SENSOR]`.

Donc, dans notre cas, l'effet de cette instruction est d'appeler la fonction `async_setup_entry` de notre `sensor.py`. Comme elle n'existe pas, il faut la créer aussi de la façon suivante :

```python
async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
):
    """Configuration des entités sensor à partir de la configuration
    ConfigEntry passée en argument"""

    _LOGGER.debug("Calling async_setup_entry entry=%s", entry)

    entity1 = TutoHacsElapsedSecondEntity(hass, entry.data)
    entity2 = TutoHacsListenEntity(hass, entry.data, entity1)
    async_add_entities([entity1, entity2], True)

    # Add services
    platform = async_get_current_platform()
    platform.async_register_entity_service(
        SERVICE_RAZ_COMPTEUR,
        {vol.Optional("valeur_depart"): cv.positive_int},
        "service_raz_compteur",
    )
```

On constate que cette méthode est très proche de la méthode `async_setup_platform` qui initialise les entités à partir de la configuration de notre plateforme trouvée dans le fichier `configuration.yaml`. C'est bien normal puisque les deux font la même chose, mais pas à partir de la même source de configuration.

Comme, on n'a pas mis d'élément de configuration donnant le `device_id`, il va falloir qu'on modifie la façon dont ce `device_id` est initialisé. Cf. ci-dessous pour le raccordement des entités à un device.

```python
class TutoHacsElapsedSecondEntity(SensorEntity):
    ...
    def __init__(
        ...
        self._device_id = self._attr_name = entry_infos[CONF_NAME]
    ...

class TutoHacsListenEntity(SensorEntity):
    ...
    def __init__(
        ...
        # On lui donne un nom et un unique_id différent
        self._device_id = entry_infos.get(CONF_NAME)
```

Note : on verra plus bas, que cette initialisation du `device_id` avec le nom de l'intégration n'est pas très heureuse.

On peut relancer Home Assistant (après avoir corrigé les éventuelles erreurs...) et on obtient 2 entités supplémentaires ([ici](http://localhost:9123/config/entities)) :

![Config flow échec](img/entite-config-flow.png "Config flow échec")

On constate que les entités précédemment créées par le fichier `configuration.yaml` sont aussi présentes. Il est possible en effet de configurer les entités par les 2 moyens en même temps. Ça ne sert à priori à rien donc on va faire un peu de ménage et supprimer la configuration du `configuration.yaml.`

On supprime tout le bloc :

```yaml
sensor:
  - platform: tuto_hacs
  ...
```

On peut aussi supprimer les fonctions `async_setup_platform` de `__init__.py` et `sensor.py` puisqu'elles ne servent que pour les configurations du `configuration.yaml`.

Après arrêt/relance de Home Assistant, on a plus que nos nouvelles entités qui sont actives.

### Relier les entités à un appareil (device)

Un appareil peut être vu comme un regroupement d'entités chacune exposant une caractéristique d'un même appareil.

J'ai mis longtemps à comprendre qu'un appareil n'a pas de code, ni de déclaration. Il est simplement créé automatiquement lorsqu'on déclare une entité et qu'on l'a relié à un appareil.

Pour terminer cette partie, on va relier nos 2 entités à un même appareil (device). Pour cela, c'est très simple, il suffit de déclarer dans la classe de chacune des entités à quel device elle appartient.

Ça se fait en ajoutant le code suivant dans notre classe d'entité :

```python
from homeassistant.helpers.entity import DeviceInfo, DeviceEntryType

...
class TutoHacsElapsedSecondEntity(SensorEntity):
    ...
    @property
    def device_info(self) -> DeviceInfo:
        """Return the device info."""
        return DeviceInfo(
            entry_type=DeviceEntryType.SERVICE,
            identifiers={(DOMAIN, self._device_id)},
            name=self._device_id,
            manufacturer=DEVICE_MANUFACTURER,
            model=DOMAIN,
        )

class TutoHacsListenEntity(SensorEntity):
    ...
    @property
    def device_info(self) -> DeviceInfo:
        """Return the device info."""
        return DeviceInfo(
            entry_type=DeviceEntryType.SERVICE,
            identifiers={(DOMAIN, self._device_id)},
            name=self._device_id,
            manufacturer=DEVICE_MANUFACTURER,
            model=DOMAIN,
        )
```

Si on avait d'autres entités d'autres domaines, on ferait la même chose pour les relier aussi.

Le `manufacturer `est une constante définie dans le `const.py` lors du tuto3.

On redémarre le tout et on constate dans la liste des appareils (http://localhost:9123/config/devices/dashboard[](http://localhost:9123/config/devices/dashboard)), un nouvel appareil nommé "La première" (le `name` donné à l'intégration), qui contient 2 entités :

![Appareil1](img/appareil-1.png "Appareil1")

Cliques sur l'appareil pour voir ses entités :

![Appareil2](img/appareil-2.png "Appareil2")

> 💡 Il est possible de créer autant d'intégration que l'on veut. Il suffit pour cela de cliquer sur "Ajouter une intégration" et de donner les éléments de configuration.

## Modifier une configuration

Il ne nous reste plus qu'à pouvoir modifier la configuration d'une intégration et on aura fait le tour du `configFlow`. En imaginant qu'on veuille modifier une option sur une de nos intégrations, il serait dommage d'être obligé de la détruire et de la récréer.

Pour faire ça, on va ajouter un menu "Configurer" dans notre intégration ce qui permettra de dérouler un parcours de configuration. Ce parcours de configuration peut être différent du parcours de création. Le flow de modification s'appelle le "option flow".

La démarche est la suivante :

1. ajouter une classe, très proche de `TutoHACSConfigFlow`, qui va piloter l'"option flow",
2. déclarer dans la classe principale `TutoHACSConfigFlow` qu'on utilise un "option flow",
3. modifier la configEntry à la fin de notre "option flow",
4. recharger automatiquement l'entité correspondante,
5. initialiser les valeurs par défaut du formulaire.

Pour le tuto, on ne va faire qu'une seule étape qui reprend les 2 attributs : `name` et `sensor_id`.

### Ajouter une classe "option flow"

Le squelette du code est le suivant :

```python
class TutoHACSOptionsFlow(OptionsFlow):
    """La classe qui implémente le option flow pour notre DOMAIN.
    Elle doit dériver de OptionsFlow"""

    # les données de l'utilisateur
    _user_inputs: dict = {}
    # Pour mémoriser la config en cours
    config_entry: ConfigEntry = None

    def __init__(self, config_entry: ConfigEntry) -> None:
        """Initialisation de l'option flow. On a le ConfigEntry existant en entrée"""
        self.config_entry = config_entry

    async def async_step_init(self, user_input: dict | None = None) -> FlowResult:
        """Gestion de l'étape 'init'. Point d'entrée de notre
        optionsFlow. Comme pour le ConfigFlow, cette méthode est appelée 2 fois
        """
        option_form = vol.Schema(
        ...
        )

        if user_input is None:
            _LOGGER.debug(
                "option_flow step user (1). 1er appel : pas de user_input -> "
                "on affiche le form user_form"
            )
            return self.async_show_form(step_id="init", data_schema=option_form)

        # 2ème appel : il y a des user_input -> on stocke le résultat
        _LOGGER.debug(
            "option_flow step user (2). On a reçu les valeurs: %s", user_input
        )
        # On mémorise les user_input
        self._user_inputs.update(user_input)

        # On appelle le step de fin pour enregistrer les modifications
        return await self.async_end()

    async def async_end(self):
        """Finalization of the ConfigEntry creation"""
        _LOGGER.info(
            "Recreation de l'entry %s. La nouvelle config est maintenant : %s",
            self.config_entry.entry_id,
            self._user_inputs,
        )

        # Modification de la configEntry avec nos nouvelles valeurs
        #self.hass.config_entries.async_update_entry(
        #    self.config_entry, data=self._user_inputs
        #)
        return self.async_create_entry(title=None, data=self._user_inputs)
```

Comme on ne veut qu'un seul formulaire, on va initialiser `option_form` avec les infos suivantes : 

```python
        option_form = vol.Schema(
            {
                vol.Required("name"): str,
                vol.Optional("sensor_id"): selector.EntitySelector(
                    selector.EntitySelectorConfig(domain=SENSOR_DOMAIN)
                ),
            }
        )
```

Et pour avoir les nouveaux libellés de notre section "option", on doit ajouter quelques traductions dans le fichier `strings.json` et `fr.json` :

```json
{
    ...
    "config": {
    ...
    },
    "options": {
        "flow_title": "TutoHACS options",
        "step": {
            "init": {
                "title": "Config. existante",
                "description": "Modifiez éventuellement la configuration",
                "data": {
                    "name": "Nom",
                    "sensor_id": "Sensor"
                },
                "data_description": {
                    "name": "Nom de l'intégration",
                    "sensor_id": "Le capteur permettant d'utiliser les selector dans ce beau tuto."
                }
            }
        }
    }
}
```

### Déclarer l'optionFlow

Pour que cette nouvelle classe soit prise en compte, il faut la déclarer dans notre flow principal avec le code suivant :

```python
class TutoHACSConfigFlow(ConfigFlow, domain=DOMAIN):
...
    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry):
        """Get options flow for this handler"""
        return TutoHACSOptionsFlow(config_entry)
```

Si on relance Home Assistant et qu'on accède à la page de configuration des intégrations (<http://localhost:9123/config/integrations>), on obtient ceci maintenant :

![Option integration](img/options-integration.png "Option integration")

On voit apparaitre notre bouton "CONFIGURER" qui va nous permettre de lancer notre "option flow".
Cliques dessus et on voit apparaitre notre "option flow" avec les infos suivantes :

![Option flow 1](img/options-flow-1.png "Option flow 1")

Si les libellés ne s'affichent pas, n'oublies pas qu'il faut vider le cache du navigateur (command + shift + suppr) et/ou relancer le navigateur complètement si ça ne suffit pas. Oui, ces libellés sont assez capricieux. Si après arrêt / relance du navigateur, ça ne s'affiche toujours pas, il y a certainement une erreur de syntaxe dans les fichiers `string.json` ou `fr.json`. Tu peux t'aider des fichiers complets en fin d'article.

> 💡 On constate que les valeurs précédentes ne sont pas pré-renseignées. C'est normal puisqu'on ne lui a pas dit de le faire. On verra comment faire ça plus bas.

Saisis des nouvelles valeurs pour les champs `Nom` et `Sensor` et valides le formulaire.

Le message de succès doit s'afficher, nous informant que la `configEntry `a bien été modifiée :

![Option succes](img/options-succes.png "Option succes")

Appuies sur "TERMINER" pour fermer ce popup.

> 💡 Note
>
> On constate que :
>
> 1. notre entité n'a pas été modifiée. En effet, on a seulement modifié la configEntry mais l'entité n'a pas été rechargée à partir de cette configEntry. On verra ci-dessous comment faire pour recharger automatiquement l'entité correspondante.
> 2. si on arrête et on relance Home Assistant, on ne voit toujours pas nos modifications
> 3. si on regarde le fichier `config/core.config_entries` on constate la chose suivante :
>
> ```yaml
> {
>        "entry_id": "e88362b08cbf7774cb2ce61bbc952de3",
>        "version": 1,
>        "domain": "tuto_hacs",
>        "title": "La première",
>        "data": {
>          "name": "caca",
>          "sensor_id": "sensor.sun_next_dusk"
>        },
>        "options": {
>          "name": "Avec modification",
>          "sensor_id": "sensor.sun_next_noon"
>        },
>        "pref_disable_new_entities": false,
>        "pref_disable_polling": false,
>        "source": "user",
>        "unique_id": null,
>        "disabled_by": null
>      }
> ```
>
> Nos modifictions ont été ajoutées dans un objet nommé `options` mais les `data` n'ont pas été modifiée. Le fait d'ajouter des options faculatives est peut être intéressant mais ce n'est pas tout à fait ce que nous voulions faire dans ce tuto.

### Modifier la configEntry

Pour dire à Home Assistant de modifier les valeurs de la "configEntry" et non pas d'ajouter un objet `options` dans la "configEntry", il faut modifier le code de la méthode `async_end` de la façon suivante :

```python
async def async_end(self):
        """Finalization of the ConfigEntry creation"""
        _LOGGER.info(
            "Recreation de l'entry %s. La nouvelle config est maintenant : %s",
            self.config_entry.entry_id,
            self._user_inputs,
        )
        # Modification des data de la configEntry
        # (et non pas ajout d'un objet options dans la configEntry)
        self.hass.config_entries.async_update_entry(
            self.config_entry, data=self._user_inputs
        )
        # On ne fait rien dans l'objet options dans la configEntry
        return self.async_create_entry(title=None, data=None)
```

On a remplacé l'appel à `async_create_entry` par un appel à `self.hass.config_entries.async_update_entry`.

Pour info, cette partie n'est documentée nulle part (!)

Après un arrêt/relance de Home Assistant et une modification des attributs de la config, on constate cette fois que la "configEntry" a bien été modifiée (fichier `config/core.config_entries`) :

```yaml
    {
        ...
        "data": {
          "name": "Avec modification",
          "sensor_id": "sensor.sun_next_noon"
        },
        "options": {
          ...
        },
        ...
    }
```

> Note : l'objet `options` ajouté précédemment est toujours là, mais il ne sert plus.

On constate que notre entité n'est toujours pas modifiée. Par contre, après un nouvel arrêt/relance de Home Assistant - ce qui a pour effet de forcer le rechargement de la "configEntry" qui a été modifiée - les modifications sont bien prises en compte :

![Option modification](img/options-modification.png "Option modification")

> Par contre, ce n'est encore pas exactement ce que l'on voulait. Home Assistant a créé des nouvelles entités "Avec modification..." mais n'a pas vraiment reconfiguré la précédente "La première" qui existe toujours mais à l'état `indisponible`. On va voir dans le paragraphe suivant comment corriger ce problème.

### Recharger l'entité correspondante

Le défaut constaté dans le paragraphe précédent vient du fait que nos entités ont un `device_id` qui est dépendant du champ `name` :

```python
    def __init__(...):
        ...
        self._device_id = entry_infos[CONF_NAME]    <---- On identifie le device par le `name`
        ...

    @property
    def device_info(self) -> DeviceInfo:
        """Donne le lien avec le device. Non utilisé jusqu'au tuto 4"""
        return DeviceInfo(
            entry_type=DeviceEntryType.SERVICE,
            identifiers={(DOMAIN, self._device_id)},  <---- On identifie le device par le `name`
            name=self._device_id,
            manufacturer=DEVICE_MANUFACTURER,
            model=DOMAIN,
        )
```

Donc si le `name` change et donc le `device_id` et le `identifiers` change aussi. Home Assistant ne sait pas faire le lien avec le "device" (appareil) précédent et en créé un nouveau.

Pour remédier à ça, on va utiliser un attribut qui est fixe : l'attribut `entry_id` de notre `configEntry`. Cet attribut est unique et est invariant à chaque changement de la `configEntry`.

On modifie donc le code de nos sensors de la façon suivante :

```python
class TutoHacsElapsedSecondEntity(SensorEntity):

    def __init__(
        self,
        hass: HomeAssistant,  # pylint: disable=unused-argument
        # On a besoin de toute la configEntry en paramètre
        configEntry: ConfigEntry,
    ) -> None:
        ...
        self._attr_name = config_entry.data.get(CONF_NAME)
        self._device_id = config_entry.entry_id
        ...

class TutoHacsListenEntity(SensorEntity):

    def __init__(
        self,
        hass: HomeAssistant,  # pylint: disable=unused-argument
        # On a besoin de toute la configEntry en paramètre
        configEntry: ConfigEntry,
    ) -> None:
        ...
        self._attr_name = config_entry.data.get(CONF_NAME) + " Ecouteur"
        self._attr_unique_id = self._attr_name + "_ecouteur"
        self._device_id = config_entry.entry_id
        ...
```

On doit aussi changer la façon dont on instancie ces 2 classes :

```python
async def async_setup_entry(...):
    ...
    entity1 = TutoHacsElapsedSecondEntity(hass, entry)
    entity2 = TutoHacsListenEntity(hass, entry, entity1)
```

Si on relance Home Assistant et qu'on modifie l'intégration, on voit bien que cette fois, Home Assistant a bien modifié les entités sans créer un autre "device" (appareil) :

![Option new entite](img/options-new-entite.png "Option new entite")

Les nouvelles entités avec le nouveau nom (Le renouveau) ont été créées, mais dans le même "device". Les anciennes entités sont encore là, mais indisponible et doivent être supprimées à la main (=> paramètre).

#### Rechargement automatique d'une entité modifiée

Il nous manque encore une chose importante : après avoir modifié le "configEntry", les entités ne se rechargent pas automatiquement et un arrêt / relance de Home Assistant est nécessaire.

Pour améliorer ça, il faut ajouter un peu de code dans notre intégration.

Fichier `__init__.py` :

```python
async def update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Fonction qui force le rechargement des entités associées à une configEntry"""
    await hass.config_entries.async_reload(entry.entry_id)

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    ...
    # Enregistrement de l'écouteur de changement 'update_listener'
    entry.async_on_unload(entry.add_update_listener(update_listener))
```

On relance encore une fois et on constate cette fois que les entités sont immédiatement mises à jour après un changement de config de notre intégration.

### Initialiser les valeurs par défaut

Une toute dernière chose intéressante à connaitre. On a vu que lorsque que notre option flow s'affiche, les valeurs sont vides. Il peut être intéressant d'initialiser ces valeurs avec celles déjà présentes sur notre "configEntry".

Pour cela, on va créer la méthode suivante (récupérer sur une autre intégration) via le fichier `config_flow.py` :

```python
from typing import Any
import copy
from collections.abc import Mapping

def add_suggested_values_to_schema(
    data_schema: vol.Schema, suggested_values: Mapping[str, Any]
) -> vol.Schema:
    """Make a copy of the schema, populated with suggested values.

    For each schema marker matching items in `suggested_values`,
    the `suggested_value` will be set. The existing `suggested_value` will
    be left untouched if there is no matching item.
    """
    schema = {}
    for key, val in data_schema.schema.items():
        new_key = key
        if key in suggested_values and isinstance(key, vol.Marker):
            # Copy the marker to not modify the flow schema
            new_key = copy.copy(key)
            new_key.description = {"suggested_value": suggested_values[key]}
        schema[new_key] = val
    _LOGGER.debug("add_suggested_values_to_schema: schema=%s", schema)
    return vol.Schema(schema)
```

Cette fonction parcours le schéma `data_schema` et initialise la valeur suggérée avec celle éventuellement trouvée dans `suggested_values`.
Je passe le fonctionnement de cette fonction, qu'il suffit d'utiliser de la manière suivante :

```python
class TutoHACSOptionsFlow(ConfigFlow, domain=DOMAIN):
    ...
    def __init__(self, config_entry: ConfigEntry) -> None:
        """Initialisation de l'option flow. On a le ConfigEntry existant en entrée"""
        ...
        # On initialise les user_inputs avec les données du configEntry
        self._user_inputs = config_entry.data.copy()

    async def async_step_init(self, user_input: dict | None = None) -> FlowResult:

        ...
        return self.async_show_form(
                step_id="init",
                # On ajoute les user_inputs comme suggested values au formulaire
                data_schema=add_suggested_values_to_schema(
                    data_schema=option_form, suggested_values=self._user_inputs
                ),
            )
```

L'idée est de remplacer le schéma donné à la méthode `async_show_form` par celle qui est construite par `add_suggested_values_to_schema` et qui contient les valeurs suggérées.

Après arrêt / relance et modification de l'intégration, on voit bien les valeurs précédentes avant de les modifier :

![Option suggested values](img/options-suggested-values.png "Option suggested values")

## Conclusion

Ce long tuto a présenté dans le détail la **création des IHM de paramétrage de nos entités**.

Cette fonction est très puissante, mais n'est pas simple à appréhender - d'autant qu'elle est très mal documentée.

Il resterait pas mal de choses à dire sur cette fonction, mais tu as les clés pour comprendre ce que tu pourras trouver dans les intégrations existantes. Encore une fois, il est fortement conseillé de regarder ce qui a été fait par ailleurs pour s'en inspirer. Dis-toi bien que tout ce qui te manque à forcément déjà été résolu par quelqu'un avant toi.

- - -

## Listes des fichiers références de ce tuto

 (que les fichiers modifiés par rapport au tuto précédent).

### `__init__.py`

```python
"""Initialisation du package de l'intégration HACS Tuto"""
import logging

from homeassistant.core import HomeAssistant
from homeassistant.config_entries import ConfigEntry

from .const import DOMAIN, PLATFORMS

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Creation des entités à partir d'une configEntry"""

    _LOGGER.debug(
        "Appel de async_setup_entry entry: entry_id='%s', data='%s'",
        entry.entry_id,
        entry.data,
    )

    hass.data.setdefault(DOMAIN, {})

    # Enregistrement de l'écouteur de changement 'update_listener'
    entry.async_on_unload(entry.add_update_listener(update_listener))

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    return True


async def update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Fonction qui force le rechargement des entités associées à une configEntry"""
    await hass.config_entries.async_reload(entry.entry_id)
```

### `config_flow.py` :

```python
""" Le Config Flow """

import logging
from typing import Any
import copy
from collections.abc import Mapping

from homeassistant.core import callback
from homeassistant.config_entries import ConfigFlow, OptionsFlow, ConfigEntry
from homeassistant.data_entry_flow import FlowResult
from homeassistant.helpers import selector
from homeassistant.components.sensor import DOMAIN as SENSOR_DOMAIN

import voluptuous as vol

from .const import DOMAIN, CONF_NAME

_LOGGER = logging.getLogger(__name__)


def add_suggested_values_to_schema(
    data_schema: vol.Schema, suggested_values: Mapping[str, Any]
) -> vol.Schema:
    """Make a copy of the schema, populated with suggested values.

    For each schema marker matching items in `suggested_values`,
    the `suggested_value` will be set. The existing `suggested_value` will
    be left untouched if there is no matching item.
    """
    schema = {}
    for key, val in data_schema.schema.items():
        new_key = key
        if key in suggested_values and isinstance(key, vol.Marker):
            # Copy the marker to not modify the flow schema
            new_key = copy.copy(key)
            new_key.description = {"suggested_value": suggested_values[key]}
        schema[new_key] = val
    _LOGGER.debug("add_suggested_values_to_schema: schema=%s", schema)
    return vol.Schema(schema)


class TutoHACSConfigFlow(ConfigFlow, domain=DOMAIN):
    """La classe qui implémente le config flow pour notre DOMAIN.
    Elle doit dériver de ConfigFlow"""

    # La version de notre configFlow. Va permettre de migrer les entités
    # vers une version plus récente en cas de changement
    VERSION = 1
    _user_inputs: dict = {}

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry):
        """Get options flow for this handler"""
        return TutoHACSOptionsFlow(config_entry)

    async def async_step_user(self, user_input: dict | None = None) -> FlowResult:
        """Gestion de l'étape 'user'. Point d'entrée de notre
        configFlow. Cette méthode est appelée 2 fois :
        1. une première fois sans user_input -> on affiche le formulaire de configuration
        2. une deuxième fois avec les données saisies par l'utilisateur dans user_input
           -> on sauvegarde les données saisies
        """
        user_form = vol.Schema({vol.Required("name"): str})

        if user_input is None:
            _LOGGER.debug(
                "config_flow step user (1). 1er appel : pas de user_input -> "
                "on affiche le form user_form"
            )
            return self.async_show_form(
                step_id="user",
                data_schema=add_suggested_values_to_schema(
                    data_schema=user_form, suggested_values=self._user_inputs
                ),
            )

        # 2ème appel : il y a des user_input -> on stocke le résultat
        _LOGGER.debug(
            "config_flow step user (2). On a reçu les valeurs: %s", user_input
        )
        # On mémorise les user_input
        self._user_inputs.update(user_input)

        # On appelle le step 2
        return await self.async_step_2()

    async def async_step_2(self, user_input: dict | None = None) -> FlowResult:
        """Gestion de l'étape 2. Mêmes principes que l'étape user"""
        step2_form = vol.Schema(
            {
                # On attend un entity id du domaine sensor
                vol.Optional("sensor_id"): selector.EntitySelector(
                    selector.EntitySelectorConfig(domain=SENSOR_DOMAIN),
                )
            }
        )

        if user_input is None:
            _LOGGER.debug(
                "config_flow step2 (1). 1er appel : pas de user_input -> "
                "on affiche le form step2_form"
            )
            return self.async_show_form(step_id="2", data_schema=step2_form)

        # 2ème appel : il y a des user_input -> on stocke le résultat
        _LOGGER.debug("config_flow step2 (2). On a reçu les valeurs: %s", user_input)

        # On mémorise les user_input
        self._user_inputs.update(user_input)
        _LOGGER.info(
            "config_flow step2 (2). L'ensemble de la configuration est: %s",
            self._user_inputs,
        )

        return self.async_create_entry(
            title=self._user_inputs[CONF_NAME], data=self._user_inputs
        )


class TutoHACSOptionsFlow(OptionsFlow):
    """La classe qui implémente le option flow pour notre DOMAIN.
    Elle doit dériver de OptionsFlow"""

    _user_inputs: dict = {}
    # Pour mémoriser la config en cours
    config_entry: ConfigEntry = None

    def __init__(self, config_entry: ConfigEntry) -> None:
        """Initialisation de l'option flow. On a le ConfigEntry existant en entrée"""
        self.config_entry = config_entry
        # On initialise les user_inputs avec les données du configEntry
        self._user_inputs = config_entry.data.copy()

    async def async_step_init(self, user_input: dict | None = None) -> FlowResult:
        """Gestion de l'étape 'user'. Point d'entrée de notre
        optionsFlow. Comme pour le ConfigFlow, cette méthode est appelée 2 fois
        """
        option_form = vol.Schema(
            {
                vol.Required("name"): str,
                vol.Optional("sensor_id"): selector.EntitySelector(
                    selector.EntitySelectorConfig(domain=SENSOR_DOMAIN)
                ),
            }
        )

        if user_input is None:
            _LOGGER.debug(
                "option_flow step user (1). 1er appel : pas de user_input -> "
                "on affiche le form user_form"
            )
            return self.async_show_form(
                step_id="init",
                data_schema=add_suggested_values_to_schema(
                    data_schema=option_form, suggested_values=self._user_inputs
                ),
            )

        # 2ème appel : il y a des user_input -> on stocke le résultat
        _LOGGER.debug(
            "option_flow step user (2). On a reçu les valeurs: %s", user_input
        )
        # On mémorise les user_input
        self._user_inputs.update(user_input)

        # On appelle le step de fin pour enregistrer les modifications
        return await self.async_end()

    async def async_end(self):
        """Finalization of the ConfigEntry creation"""
        _LOGGER.info(
            "Recreation de l'entry %s. La nouvelle config est maintenant : %s",
            self.config_entry.entry_id,
            self._user_inputs,
        )
        # Modification des data de la configEntry
        # (et non pas ajout d'un objet options dans la configEntry)
        self.hass.config_entries.async_update_entry(
            self.config_entry, data=self._user_inputs
        )
        # Suppression de l'objet options dans la configEntry
        return self.async_create_entry(title=None, data=None)
```

### `sensor.py` :

```python
""" Implements the Tuto HACS sensors component """
import logging
from datetime import datetime, timedelta
import voluptuous as vol

from homeassistant.const import UnitOfTime, STATE_UNAVAILABLE, STATE_UNKNOWN
from homeassistant.core import HomeAssistant, callback, Event, State
from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers.entity_platform import (
    AddEntitiesCallback,
    async_get_current_platform,
)
from homeassistant.components.sensor import (
    SensorEntity,
    SensorDeviceClass,
    SensorStateClass,
)

from homeassistant.helpers.event import (
    async_track_time_interval,
    async_track_state_change_event,
)

from homeassistant.helpers.entity import DeviceInfo, DeviceEntryType

import homeassistant.helpers.config_validation as cv

from .const import (
    DOMAIN,
    DEVICE_MANUFACTURER,
    CONF_NAME,
    SERVICE_RAZ_COMPTEUR,
)

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
):
    """Configuration des entités sensor à partir de la configuration
    ConfigEntry passée en argument"""

    _LOGGER.debug("Calling async_setup_entry entry=%s", entry)

    entity1 = TutoHacsElapsedSecondEntity(hass, entry)
    entity2 = TutoHacsListenEntity(hass, entry, entity1)
    async_add_entities([entity1, entity2], True)

    # Add services
    platform = async_get_current_platform()
    platform.async_register_entity_service(
        SERVICE_RAZ_COMPTEUR,
        {vol.Optional("valeur_depart"): cv.positive_int},
        "service_raz_compteur",
    )


class TutoHacsElapsedSecondEntity(SensorEntity):
    """La classe de l'entité TutoHacs"""

    _hass: HomeAssistant

    def __init__(
        self,
        hass: HomeAssistant,  # pylint: disable=unused-argument
        config_entry: ConfigEntry,
    ) -> None:
        """Initisalisation de notre entité"""
        self._hass = hass
        self._attr_has_entity_name = True
        self._attr_name = config_entry.data.get(CONF_NAME)
        self._device_id = config_entry.entry_id
        self._attr_unique_id = self._attr_name + "_seconds"
        self._attr_native_value = 12

    @property
    def should_poll(self) -> bool:
        """Do not poll for those entities"""
        return False

    @property
    def icon(self) -> str | None:
        return "mdi:timer-play"

    @property
    def device_class(self) -> SensorDeviceClass | None:
        return SensorDeviceClass.DURATION

    @property
    def state_class(self) -> SensorStateClass | None:
        return SensorStateClass.MEASUREMENT

    @property
    def native_unit_of_measurement(self) -> str | None:
        return UnitOfTime.SECONDS

    @property
    def device_info(self) -> DeviceInfo:
        """Donne le lien avec le device. Non utilisé jusqu'au tuto 4"""
        return DeviceInfo(
            entry_type=DeviceEntryType.SERVICE,
            identifiers={(DOMAIN, self._device_id)},
            name=self._device_id,
            manufacturer=DEVICE_MANUFACTURER,
            model=DOMAIN,
        )

    @callback
    async def async_added_to_hass(self):
        """Ce callback est appelé lorsque l'entité est ajoutée à HA"""

        # Arme le timer
        timer_cancel = async_track_time_interval(
            self._hass,
            self._incremente_secondes,  # La methode à appeler périodiquement
            interval=timedelta(seconds=1),
        )
        # desarme le timer lors de la destruction de l'entité
        self.async_on_remove(timer_cancel)

    @callback
    async def _incremente_secondes(self, _):
        """Cette méthode va être appelée toutes les secondes"""
        _LOGGER.info("Appel de incremente_secondes à %s", datetime.now())

        # On incrémente la valeur de notre etat
        self._attr_native_value += 1

        # On sauvegarde le nouvel état
        self.async_write_ha_state()

        # Toutes les 5 secondes on envoie un event
        if self._attr_native_value % 5 == 0:
            self._hass.bus.fire(
                "event_changement_etat_TutoHacsElapsedSecondEnity",
                {"nb_secondes": self._attr_native_value},
            )

    async def service_raz_compteur(self, valeur_depart: int):
        """Appelée lors de l'invocation du service 'raz_compteur'
        Elle prend en argument la 'valeur_depart' qui est
        construite à partir du paramètre 'valeur_depart'
        """
        _LOGGER.info(
            "Appel du service service_raz_compteur valeur_depart: %d", valeur_depart
        )
        self._attr_native_value = valeur_depart if valeur_depart is not None else 0

        # On sauvegarde le nouvel état
        self.async_write_ha_state()


class TutoHacsListenEntity(SensorEntity):
    """La classe de l'entité TutoHacs qui écoute la première"""

    _hass: HomeAssistant
    _entity_to_listen: TutoHacsElapsedSecondEntity

    def __init__(
        self,
        hass: HomeAssistant,  # pylint: disable=unused-argument
        config_entry: ConfigEntry,
        entity_to_listen: TutoHacsElapsedSecondEntity,  # L'entité qu'on veut écouter
    ) -> None:
        """Initisalisation de notre entité"""
        self._hass = hass
        self._attr_has_entity_name = True
        # On lui donne un nom et un unique_id différent
        self._device_id = config_entry.entry_id
        self._attr_name = config_entry.data.get(CONF_NAME) + " Ecouteur"
        self._attr_unique_id = self._attr_name + "_ecouteur"
        # Pas de valeur tant qu'on n'a pas reçu
        self._attr_native_value = None
        self._entity_to_listen = entity_to_listen

    @property
    def should_poll(self) -> bool:
        """Pas de polling pour mettre à jour l'état"""
        return False

    @property
    def icon(self) -> str | None:
        return "mdi:timer-settings-outline"

    @property
    def device_class(self) -> SensorDeviceClass | None:
        """Cette entité"""
        return SensorDeviceClass.TIMESTAMP

    @property
    def device_info(self) -> DeviceInfo:
        """Donne le lien avec le device. Non utilisé jusqu'au tuto 4"""
        return DeviceInfo(
            entry_type=DeviceEntryType.SERVICE,
            identifiers={(DOMAIN, self._device_id)},
            name=self._device_id,
            manufacturer=DEVICE_MANUFACTURER,
            model=DOMAIN,
        )

    @callback
    async def async_added_to_hass(self):
        """Ce callback est appelé lorsque l'entité est ajoutée à HA"""

        # Arme l'écoute de la première entité
        listener_cancel = async_track_state_change_event(
            self.hass,
            [self._entity_to_listen.entity_id],
            self._on_event,
        )
        # desarme le timer lors de la destruction de l'entité
        self.async_on_remove(listener_cancel)

    @callback
    async def _on_event(self, event: Event):
        """Cette méthode va être appelée à chaque fois que l'entité
        "entity_to_listen" publie un changement d'état"""

        _LOGGER.info("Appel de _on_event à %s avec l'event %s", datetime.now(), event)

        new_state: State = event.data.get("new_state")
        # old_state: State = event.data.get("old_state")

        if new_state is None or new_state.state in (STATE_UNAVAILABLE, STATE_UNKNOWN):
            _LOGGER.warning("Pas d'état disponible. Evenement ignoré")
            return

        # state.last_changed.astimezone(self._current_tz)

        # On recherche la date de l'event pour la stocker dans notre état
        self._attr_native_value = new_state.last_changed

        # On sauvegarde le nouvel état
        self.async_write_ha_state()
```

### `strings.yaml` et `fr.yaml` :

```yaml
{
    "title": "TutoHACS",
    "config": {
        "flow_title": "TutoHACS configuration",
        "step": {
            "user": {
                "title": "Vos infos de connexion",
                "description": "Donnez vos infos de connexion",
                "data": {
                    "name": "Nom"
                },
                "data_description": {
                    "name": "Nom de l'intégration"
                }
            },
            "2": {
                "title": "Page 2",
                "description": "Une deuxième page de configuration",
                "data": {
                    "sensor_id": "Sensor"
                },
                "data_description": {
                    "sensor_id": "Le capteur permettant d'utiliser les selector dans ce beau tuto."
                }
            }
        }
    },
    "options": {
        "flow_title": "TutoHACS options",
        "step": {
            "init": {
                "title": "Config. existante",
                "description": "Modifiez éventuellement la configuration",
                "data": {
                    "name": "Nom",
                    "sensor_id": "Sensor"
                },
                "data_description": {
                    "name": "Nom de l'intégration",
                    "sensor_id": "Le capteur permettant d'utiliser les selector dans ce beau tuto."
                }
            }
        }
    }
}
```

### `manifest.yaml` :

```yaml
{

    "domain": "tuto_hacs",
    "name": "Tuto HACS",
    "codeowners": [
        "@jmcollin78"
    ],
    "config_flow": true,
    "documentation": "https://github.com/jmcollin78/tuto_hacs",
    "integration_type": "device",
    "iot_class": "calculated",
    "issue_tracker": "https://github.com/jmcollin78/tuto_hacs/issues",
    "quality_scale": "silver",
    "version": "3.0.0"
}
```

### `configuration.yaml` :

```yaml
# Loads default set of integrations. Do not remove.
default_config:

# Load frontend themes from the themes folder
frontend:
  themes: !include_dir_merge_named themes

# Text to speech
tts:
  - platform: google_translate

automation: !include automations.yaml
script: !include scripts.yaml
scene: !include scenes.yaml

logger:
  default: info
  logs:
    custom_components.tuto_hacs: debug

tuto_hacs:
  - not_used: non utilisé

# If you need to debug uncommment the line below (doc: https://www.home-assistant.io/integrations/debugpy/)
debugpy:
  start: true
  wait: false
  port: 5678
```