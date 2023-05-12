---
folder: dev_tuto_4_config_flow
title: Développer pour Home Assistant - (4) La configuration
type: post
visibleInCMS: true
draft: true
date: 2023-04-29
lastmod: 2023-04-29
description: L'objectif de cet article est d'ajouter une IHM de paramétrage à
  notre intégration. Il s'inscrit dans la suite des articles dont le sommaire
  est [ici](/README.md).
level: Avancé
version_ha: "2023.4"
categories:
  - Développement
tags:
  - developpement
  - ""
author: jean-marc_collin
url_hacf: https://forum.hacf.fr/t/developper-pour-home-assistant-comment-faire/22780
---
> 💡Les fichiers sources complets en version finales sont en fin d'article. Cf [Fichiers sources du tuto](#fichiers-sources-du-tuto)

# Pre-requis

Avoir déroulé avec succès les trois premiers articles [tuto1](/tuto1.md), [tuto2](/tuto2.md) et [tuto3](/tuto3.md). Vous devez donc avoir une entité avec un état qui est une mesure en secondes et une deuxième entité qui écoute la première et stocke dans son état la date heure du dernier changement.

# Contexte

Dans les tutos précédents, notre intégration et nos entités étaient paramétrées via le fichier `config/configuration.yaml` global a Home Assistant. La modification de ce fichier, se fait en yaml, est complexe et est sujette à beaucoup d'erreurs : indentation stricte, syntaxe particulière, ...

Dans Home Assistant il existe un moyen beaucoup plus "user-friendly" de paramétrer ses appareils et ses entités : le `config flow` (ou flot de configuration).

Cela correspond à toutes les fenêtres de configuration plus ou moins complexes que l'on peut trouver dans la plupart des intégrations récentes.
Exemple avec [Versatile Thermostat](https://github.com/jmcollin78/versatile_thermostat) :

![Versatile Thermostat](/images/vtherm-config-main.png?raw=true)

Exemple avec le panneau de configuration de Sonoff

![Sonoff](/images/sonoff-config.png?raw=true)

Ces panneaux de configuration s'ouvre lorsqu'on ajoute une intégration ou lorsqu'on veut modifier la configuration d'une intégration existante.

> 💡 Une configuration se fait potentiellement en plusieurs étapes qui s'enchainent en cliquant sur `Valider`. Chaque étape peut dépendre de ce qui a été saisi à la précédente. On arrive donc à définir un parcours de configuration (le `flow`) dont **la dernière étape est la création de l'entité** elle-même.

# Activer l'IHM de configuration

Pour utiliser cette IHM de configuration, la première chose à faire est d'indiquer à Home Assistant que notre intégration possède un flot de configuration.
Cela se passe dans le `manifest.yaml`, on indique :

```yaml

```

A la lecture de cet attribut, Home Assistant va chercher le code du `configFlow` dans le fichier nommé `config_flow.py` à la racine de notre intégration. Ce nom de fichier n'est pas paramétrable. Il doit impérativement s'appeler comme ça.

On va donc créer un fichier `config_flow.yaml` le plus simple possible pour l'instant :

```python

```

Vérifies les erreurs de compilation et corriges les au besoin et redémarres Home Assistant.

Lorsqu'on créé une intégration de type TutoHACS ("Paramètres / Intégrations / Ajouter une intégration") :

![Ajout intégration](/images/ajout-integration.png?raw=true)

on obtient la fenêtre de configuration suivante :

![ConfigFlow vide](/images/config-flow-vide.png?raw=true)

Pour rappel, dans le tuto1, lorsqu'on avait fait l'ajout de notre intégration, on avait eu le message suivant :

![ConfigFlow vide](/images/integration-manuelle.png?raw=true)

> 💡 A ce stade, Home Assistant nous permet de configurer notre intégration. Mais comme aucune étape de configuration n'est codée il ne se passe rien lorsqu'on clique sur "Fermer".

# Ajouter une étape de configuration

Pour ajouter une étape de configuration (`step`), il faut ajouter une méthode par étape dans notre classe de configuration. La première étape qui va être appelée par Home Assistant doit avoir un nom fixé à l'avance qui dépend de comment a été découverte l'intégration.

Dans notre cas, l'intégration a été ajoutée par l'utilisateur, donc la méthode qui implémente la première étape doit avoir le nom suivant : `async_step_user`.
Si notre intégration avait été découverte automatiquement par le bluetooth par exemple, elle aurait du s'appeler, `async_step_bluetooth`.

> 💡 Cette façon de faire est assez perturbante si tu développes depuis un certain temps. Le développement dans Home Assistant fait beaucoup appel à ces noms de fichiers, de classes, de méthodes dont le nom est fixe et auquel on ne peut pas déroger. Bref, c'est comme ça et il faut faire avec. La [documentation de référence](https://developers.home-assistant.io/docs/creating_component_index) aide pour les trouver.

On va donc ajouter une méthode nommée `async_step_user` puisque notre intégration est ajoutée manuellement par un utilisateur :

```python

```

Comme indiqué dans le commentaire, cette méthode va être appelée 2 fois :

1. une première fois sans `user_input`. Home Assistant s'attend à ce qu'on lui donne alors, le formulaire a afficher à l'utilisateur,
2. une deuxième fois, cette fois avec des données dans `user_input`. `user_input` contient alors un dictionnaire avec les valeurs du formulaire saisies par l'utilisateur. On va voir ce qu'on fait de ses valeurs ensuite. Pour l'instant, on va juste les logger.

Note : le code qui initialise le formulaire `user_form = vol.Schema({vol.Required("name"): str})`sera expliqué ci-dessous. N'y fait pas attention pour l'instant.

Après relance de Home Assistant, si on tente de créer une intégration de type TutoHACS, on obtient cette fois cette page de configuration :

![ConfigFlow vide](/images/config-flow-1.png?raw=true)

On est bien rentré dans le config flow et Home Assistant nous affiche le formulaire qui contient un champ "name".

Saisis un nom dans le champ et appuis sur "Valider". Tu dois voir les 2 logs suivants :

```log

```

Ca fonctionne bien, notre methode `async_step_user` a bien été appelée 2 fois, une fois sans valeur et une fois avec les valeurs saisies dans le formulaire.

> 💡
>
> 1. il n'est pas facile pour l'utilisateur de savoir ce qu'il doit saisir. On va ajouter juste en dessous des libellés pour notre formulaire pour y remédier,
> 2. l'appui sur "Valider" se termine avec une erreur. C'est parce-que notre méthode ne retourne rien lors du 2ème passage. On va y remédier aussi un peu en dessous. A ce stade, c'est normal.

## Ajout de libellés dans notre formulaire

On va ajouter des libellés à ce formulaire en ajoutant le fichier `strings.json` suivant à la racine de notre intégration :

```json

```

La structure est fixe et rigide.

Tu donnes dans ce fichier les différents libellés qui accompagnent les formulaires :

* `title` est le nom de l'intégration,
* le bloc `config` contient les libellés du config flow,
* `flow_title` est le titre du flot de configuration,
* le bloc `step` contient les libellés des étapes de la configuration,
* le bloc `user` contient les libellés de l'étape `user`. Il y a la possibilité de mettre un titre et une description
* le bloc `data` contient les libellés des datas du formulaire `user`. 2 libellés sont possibles : le libellé de nos champs (ici `name`)
* le bloc `data_description` contient une description optionnelle pour chaque champ du formulaire. Dans notre exemple, il n'y a pas `name`

Ensuite on va créer une copie de ce fichier dans un sous-répertoire de notre intégration nommé `translations`. Ce répertoire doit contenir, les traductions du fichier `strings.json` dans toutes les langues supportées par notre intégration. La langue par défaut affichées à l'utilisateur sera sa langue configurée dans Home Assistant.

On doit donc avoir l'arborescence suivante :

![Arborescence](/images/arbo-tuto-hacs.png?raw=true)

Les fichiers `strings.json` et `translations/fr.json` sont identiques. Pour une vraie intégration, il est préférable que les libellés du fichier `strings.json` soient en anglais.

On redémarre Home Assistant et on tente de recréer l'intégration.

> 💡 On constate que nos libellés **NE SONT PAS** pris en compte ! En effet, ils sont mis en cache dans le navigateur pour éviter de trop souvent interroger le serveur. Il va falloir vider ce cache (command-shift-suppr / "Images et fichiers en cache" sur Chrome sous Mac). Il arrive que cela ne fonctionne pas non plus après vider le cache. Dans ce cas, il faut relancer complètement le navigateur.

Vides le cache, recharges la page, crées l'intégration TutoHACS et cette fois tu dois avoir ça :

![Arborescence](/images/config-flow-2.png?raw=true)

> :warning: **Attention :** en cas d'erreur de syntaxe dans un fichier de libellés, aucune erreur ne sera signalée nul part et seule la dernière version valide sera prise en compte. Combiné avec le cache navigateur qui reste aussi sur la dernière version valide, il est parfois très compliqué de comprendre pourquoi nos modifications ne pas prisent en compte.

# Comprendre les schémas

Dans le code de la fonction `async_step_user` ci-dessus, on a une ligne qui n'a pas été expliquée. Elle initialise le formulaire affiché dans l'étape `user` : 

```python

```

Ce petit bout de code qui n'a l'air de rien mériterait à lui tout seul un tuto complet tellement il est puissant mais complexe et mal documenté. Je vais vous donner quelques clés pour comprendre comment il marche.

## Voluptuous

Les formulaires sont créés à partir du package Python [Voluptuous](https://github.com/alecthomas/voluptuous) qui permet de créer des schémas. Un schéma est une librairie de validation des données. Sa première intention est de valider syntaxiquement et sémantiquement des données reçues par un logiciel. On s'en sert ici pour décrire le formulaire qui est présenté à l'utilisateur et pour valider les données du formulaire saisies par l'utilisateur.

`vol.Schema` instancie une classe de type `Schema` du package `vol` qui est le nom de donné à l'import Voluptuous : `import voluptuous as vol`.

Ce constructeur prend en argument un objet json dont chaque attribut est un élément du formulaire. Exemple :

```python

```

Chaque élement de formulaire (chaque ligne), est lui même un objet qui dit si l'élément est faculatif ou obligatoire et on lui donne un nom :

```python

```

Dans le constructeur `Required` ou `Optional`, il est possible de donner une valeur par défaut au champ (si non saisi par l'utilisateur) ainsi qu'une valeur suggérée (valeur proposée à l'utilisateur mais qui ne sera pas retenue si l'utilisateur laisse le champ vide). **La nuance valeur par défaut / valeur suggérée** est subtile mais importante. Un champ qui a une valeur par défaut, **ne pas ne pas voir de valeur**, alors qu'en cas de valeur suggérée, l'utilisateur peut supprimer la valeur proposée et ainsi saisir la valeur vide.

```python

```

Chaque champ a un type qu'il faut mettre à la place de `<Validator>` en fonction de ce qui est attendu par l'utilisateur. Un type est une classe proposée par le package Voluptuous lui-même. Par exemple :

* `str` : string,
* `Boolean` : booleen,

mais aussi des classes plus complexes :

* `Range` : une plage de valeur admises. Exemple : `vol.Range(min=-90, max=90)`,
* `Coerce(type)` : permet de convertir la valeur en un type (en argument). Exemple: `vol.Coerce(float)` pour traduire le champ en `float`,
* `Match(regexp)`: le champ est valide si l'expression régulière est vraie,
* `In([])` : la valeur doit être une des valeurs du tableau donné en argument.

mais aussi des Validator qui combinent d'autres validator :

* `All(list(Validator))` : est vrai si tous les `Validator` de la liste sont vérifiés. Exemple: `vol.All(vol.Coerce(float), vol.Range(min=-90, max=90)` 
* `Any(list(Validator))` : est vrai si au moins un `Validator` de la liste est vérifié. Exemple: `vol.Any("valeur1", "valeur2")`

Exemple un peu plus complet :

```python

```

## Les Helpers Home Assistant

Pour aider dans la rédaction des formulaires Home Assistant fournit le package `homeassistant.helpers.config_validation` qui contient des `Validator` prêts à l'emploi. Par exemple :

* `byte` : un octet (définit comme `vol.All(vol.Coerce(int), vol.Range(min=0, max=255))`),
* `small_float` : un float entre 0 et 1,
* `positive_int` : un entier positif,
* `latitude` : un float entre -90 et +90,
* `time` : une valeur de temps,
* `date` : une date,
* etc

Il serait impossible de tous les listés ici donc il est conseillé de regarder ce qui est contenu dans le package lui-même.

## Les Selectors Home Assistant

Home Assistant permet d'utiliser les `Selector` comme des `Validators`. Pour rappel, les `Selector` sont listés [ici](https://www.home-assistant.io/docs/blueprint/selectors/).
On va donc pouvoir très facilement demander à Home Assistant de valider le champ si le champ correspond bien à une entité d'un domaine par exemple. Et dans ce cas, le formulaire affichera que les entités du ou des domaines.

Exemple pour sélectionner des entités :

```python

```

> 💡 C'est très puissant mais vraiment très mal documenté. Souviens toi, en introduction de ces tutos, je disais qu'il fallait aller voir ce qu'on fait les autres (**Open Source !**), c'est primodial d'appliquer cette règle ici. Fork le repo de Home Assistant, parcours le code, fait des recherches dedans et tu vas apprendre plein de choses.

Pour les curieux, voici le schéma complet de la prmeière page de configuration du [Versatile Thermostat](https://github.com/jmcollin78/versatile_thermostat) :

```python

```

Le résultat est le suivant :
![Versatile Thermostat](/images/vtherm-config-main.png?raw=true)

# Ajouter une deuxième étape

Pour ajouter une deuxième étape de configuration, on ajoute une méthode (une méthode par étape) et on l'appelle à la fin de la première étape. Le code ressemble à ça :

```python

```

et en fin de la méthode `async_step_user` on va appeler le step 2 explicitement :

```python

```

On ajoute les imports qui manquent :

```python

```

On corriger les erreurs et on relance Home Assistant. Si on configure une intégration, on a bien maintenant notre page 2 de la configuration après avoir "Valider" la première page :

![Config flow page 2](/images/config-flow-3.png?raw=true)

On constate qu'il manque quelques traductions pour notre page 2. On les ajoute dans le fichiers `strings.json` qu'on recopie dans `translations/fr.json`, on redémarre, on vide le cache du navigateur et cette fois, on a la page suivante :

```json

```

![Config flow page 2](/images/config-flow-4.png?raw=true)

> 💡
>
> 1. comme au-dessus, la validation de la 2ème page de configuration génère une erreur. A ce stade, c'est normal puisque notre méthode `async_step_2` ne renvoie rien,
> 2. dans notre première méthode, lorsqu'on appelle la 2ème, **il est possible d'avoir de la logique pour router vers la page 2** ou tout autre page de notre choix. C'est comme ça qu'on va pouvoir avoir **un parcours de paramétrage différent** en fonction de la configuration que l'on veut atteindre.

# Créer une entité à partir d'une configuration

On a définit un parcours de configuration (le fameux `configFlow`) et maintenant il va falloir créer une entité en fin de ce parcours avec les éléments saisis.

Pour cela, il faut :

1. mémoriser les éléments saisis à chaque étape,
2. créer une entrée de configuration,
3. créer les entités avec l'ensemble des éléments saisis,
4. relier les entités à un appareil (device)

## Mémoriser les éléments saisis

Pour mémoriser les éléments saisis, il faut ajouter un réceptacle des saisies de l'utilisateur :

```python

```

et la mémorisation dans le réceptacle des user_infos à chacune de nos étapes :

```python

```

Si on relance en l'état et qu'on ajoute une intégration Tuto HACS, on obtient le log suivant après avoir validé la dernière étape :

```log

```

Notre objet `_user_inputs` contient bien les 2 champs des 2 formulaires de configuration.

## Créer une entrée de configuration (ConfigEntry)

L'entrée de configuration ou ConfigEntry, est ce qui permet de rendre les configurations des intégrations persistantes dans le temps. Après une relance de Home Assistant, **toutes les entités sont créées à partir des configEntry sauvegardées sur le disque**. C'est ce qui remplace le `configuration.yaml`.
Tu peux retrouver toutes les configEntry sur ton disque dur, dans le fichier `config/.storage/core.config_entries`.

Donc à la fin du configFlow, après avoir collecté tous les éléments de configuration, on va demander à Home Assistant de créer ou de mettre à jour un configEntry. Cela se fait très simplement avec le code suivant :

```python

```

On va ajouter une constante CONF_NAME qui définit le nom de l'élément de config `name` au lieu de l'avoir en dur et on va utiliser l'élément de configuration `name` comme `title` pour ce configEntry. La deuxième méthode devient donc :

```python

```

On relance Home Assistant, on créé une intégration de type Tuto HACS et on doit avoir le résultat suivant :

![Config flow réussi](/images/config-flow-5.png?raw=true)

On constate aussi qu'une intégration a été créée :

![Config flow échec](/images/config-flow-6.png?raw=true)

mais elle est en échec.

Allons voir les logs et on constate ceci :

```log

```

La configuration s'est bien passée mais il manque à notre module `custom_components.tuto_hacs` une fonction `async_setup_entry`. Cette fonction va servir à transformer le configEntry en entité. On va voir comment faire ça dans le chapitre suivant.

Si on ouvre le fichier `config/.storage/core.config_entries` et qu'on recherche notre configuration, on doit la trouver et elle doit ressembler à ça :

```yaml

```

Ce fichier contient bien notre configEntry avec nos paramètres, notamment le `title` qui prend la valeur de `data.name`.

## Créer une entité à partir d'une entrée de configuration

Au chargement ou lors d'une création d'une nouvelle configEntry, il faut indiquer à Home Assistant, comment instancier les entités et les appareils à partir de cette configEntry. Ca se fait simplement en créant une fonction `async_setup_entry` dans le fichier `__init__.py` :

```python

```

Ce code positionne le domaine par défaut comme étant notre domain, puis appel `hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)` qui comme son nom l'indique propage le configEntry à toutes les plateformes déclarées dans notre intégration.

Rappelles toi que PLATFORMS contient la liste des plateformes des entités créées par notre intégration (si une intégration doit créer un `sensor` et un `switch`, `PLAFORMS` contiendra `['sensor', 'switch']`). Pour le tuto, `PLATFORM`est initialisé comme suit dans le `const.py` : `PLATFORMS: list[Platform] = [Platform.SENSOR]`.

Donc, dans notre cas, l'effet de cette instruction est d'appeler la fonction `async_setup_entry` de notre `sensor.py`. Comme elle n'existe pas, il faut la créer aussi de la façon suivante :

```python

```

On constate que cette méthode est très proche de la méthode `async_setup_platform` qui initialise les entités à partir de la configuration de notre plateforme trouvée dans le fichier `configuration.yaml`. C'est bien normal puisque les deux font la même chose mais pas à partir de la même source de configuration.

Comme, on n'a pas mis d'élément de configuration donnant le `device_id`, il va falloir qu'on modifie la façon dont ce `device_id` est initalisé. Cf. ci-dessous pour le raccordement des entités à un device.

```python

```

Note: on verra plus bas, que cette initialisation du `device_id` avec le nom de l'intégration n'est pas très heureuse.

On peut relancer Home Assistant (après avoir corriger les éventuelles erreurs...) et on obtient 2 entités supplémentaires ([ici](http://localhost:9123/config/entities)) :

![Config flow échec](/images/entite-config-flow.png?raw=true)

On constate que les entités précédemment créées par le fichier `configuration.yaml` sont aussi présentes. Il est possible en effet de configurer les entités par les 2 moyens en même temps. Ca ne sert à priori à rien donc on va faire un peu de ménage et supprimer la configuration du `configuration.yaml` :

On supprime tout le bloc :

```yaml

```

On peut aussi supprimer les fonctions `async_setup_platform` de `__init__.py` et `sensor.py` puisqu'elles ne servent que pour les configurations du `configuration.yaml`.

Après arrêt/relance de Home Assistant, on a plus que nos nouvelles entités qui sont actives.

## Relier les entités à un appareil (device)

Un appareil peut être vu comme un regroupement d'entités chacune exposant une caractéristique d'un même appareil.

J'ai mis longtemps à comprendre qu'un appareil n'a pas de code, ni de déclaration. Il est simplement créé automatiquement lorsqu'on déclare une entité et qu'on l'a relie à un appareil.

Pour terminer cette partie, on va relier nos 2 entités à un même appareil (device). Pour cela, c'est très simple, il suffit de déclarer dans la classe de chacune des entités à quel device elle appartient.

Ca se fait en ajoutant le code suivant dans notre classe d'entité :

```python

```

Si on avait d'autres entités d'autres domaines, on ferait la même chose pour les relier aussi.

Le manufacturer est une constante définie dans le `const.py` lors du tuto3.

On redémarre le tout et on constate dans la liste des appareils ([ici](http://localhost:9123/config/devices/dashboard)), un nouvel appareil nommé "La première" (le `name` donné à l'intégration), qui contient 2 entités :

![Appareil1](/images/appareil-1.png?raw=true)

Cliques sur l'appareil pour voir ses entités :

![Appareil2](/images/appareil-2.png?raw=true)

> 💡 Il est possible de créer autant d'intégration que l'on veut. Il suffit pour cela de cliquer sur "Ajouter une intégration" et de donner les éléments de configuration.

# Modifier une configuration

Il ne nous reste plus qu'à pouvoir modifier la configuration d'une intégration et on aura fait le tour du configFlow. En imaginant qu'on veuille modifier une option sur une de nos intégrations, il serait dommage d'être obligé de la détruire et de la récréer.

Pour faire ça, on va ajouter un menu "Configurer" dans notre intégration ce qui permettra de dérouler un parcours de configuration. Ce parcours de configuration peut être différent du parcours de création. Le flow de modification s'appelle le "option flow".

La démarche est la suivante :

1. ajouter une classe, très proche de `TutoHACSConfigFlow`, qui va piloter l'"option flow",
2. déclarer dans la classe principale `TutoHACSConfigFlow` qu'on utilise un "option flow",
3. modifier la configEntry à la fin de notre "option flow",
4. recharger automatiquement l'entité correspondante,
5. initialiser les valeurs par défaut du formulaire.

Pour le tuto, on ne va faire qu'une seule étape qui reprend les 2 attributs : `name` et `sensor_id`.

## Ajouter une classe "option flow"

Le squelette du code est le suivant :

```python

```

Comme on ne veut qu'un seul formulaire, on va initialiser `option_form` avec les infos suivantes : 

```python

```

Et pour avoir les nouveaux libellés de notre section "option", on doit ajouter quelques traductions dans les fichier `strings.json` et `fr.json` :

```json

```

## Déclarer l'optionFlow

Pour que cette nouvelle classe soit prise en compte il faut la déclarer dans notre flow principal avec le code suivant :

```python

```

Si on relance Home Assistant et qu'on accède à la page de configuration des intégrations ([ici](http://localhost:9123/config/integrations)), on obtient ceci maintenant :

![Option integration](/images/options-integration.png?raw=true)

On voit apparaitre notre bouton "CONFIGURER" qui va nous permettre de lancer notre "option flow".
Cliques dessus et on voit apparaitre notre option flow avec les infos suivantes :

![Option flow 1](/images/options-flow-1.png?raw=true)

Si les libellés ne s'affichent pas, n'oublies pas qu'il faut vider le cache du navigateur (command + shift + suppr) et/ou relancer le navigateur complètement si ça ne suffit pas. Oui, c'est libellés sont assez capricieux. Si après arrêt / relance du navigateur, ça ne s'affiche toujours pas, il y a certainement une erreur de syntaxe dans les fichiers `string.json` ou `fr.json`. Tu peux t'aider des fichiers complets en fin d'article.

> 💡 On constate que les valeurs précédentes ne sont pas pré-renseignées. C'est normal puisqu'on ne lui a pas dit de le faire. On verra comment faire ça plus bas.

Saisis des nouvelles valeurs pour les champs `Nom` et `Sensor` et valides le formulaire.

Le message de succès doit s'afficher, nous informant que la configEntry à bien été modifiée :

![Option succes](/images/options-succes.png?raw=true)

Appuies sur "TERMINER" pour fermer cette popup.

> 💡 On constate que :
>
> 1. notre entité n'a pas été modifiée. En effet, on a seulement modifié la configEntry mais l'entité n'a pas été rechargée à partir de cette configEntry. On verra ci-dessous comment faire pour recharger automatiquement l'entité correspondante.
> 2. si on arrête et on relance Home Assistant, on ne voit toujours pas nos modifications
> 3. si on regarde le fichier `config/core.config_entries` on constate la chose suivante :
>
> ```yaml
>
> ```
>
> Nos modifictions ont été ajoutées dans un objet nommé `options` mais les `data` n'ont pas été modifiée. Le fait d'ajouter des options faculatives est peut être intéressant mais ce n'est pas tout à fait ce que nous voulions faire dans ce tuto.

## Modifier la configEntry

Pour dire à Home Assistant de modifier les valeurs de la configEntry et non pas d'ajouter un objet `options` dans la configEntry, il faut modifier le code de la méthode `async_end` de la façon suivante :

```python

```

On a remplacé l'appel à `async_create_entry` par un appel à `self.hass.config_entries.async_update_entry`.

Pour info, cette partie n'est documentée nulle part.

Après un arrêt/relance de Home Assistant et une modification des attributs de la config, on constate cette fois que la configEntry a bien été modifiée (fichier `config/core.config_entries`) :

```yaml

```

Note: l'objet `options` ajouté précédemment est toujours là mais il ne sert plus.

On constate que notre entité n'est toujours pas modifiée. Par contre, après un nouvel arrêt/relance de Home Assistant - ce qui a pour effet de forcer la rechargement de la configEntry qui a été modifiée - les modifications sont bien prises en compte :

![Option modification](/images/options-modification.png?raw=true)

> :warning: Par contre, ce n'est encore pas exactement ce que l'on voulait. Home Assistant a créé des nouvelles entités "Avec modification..." mais n'a pas vraiment reconfiguré la précédente "La première" qui existe toujours mais à l'état `indisponible`. On va voir dans le paragraphe suivant comment corriger ce problème.

## Recharger l'entity correspondante

Le défaut constaté dans le paragraphe précédent vient du fait que nos entités ont un `device_id` qui est dépendant du champ `name` :

```python

```

Donc si le `name` change et donc le `device_id` et le `identifiers` change aussi. Home Assistant ne sait pas faire le lien avec le device précédent et en créé un nouveau.

Pour remédier à ça, on va utiliser un attribut qui est fixe : l'attribut `entry_id` de notre `configEntry`. Cet attribut est unique et est invariant à chaque changement de la `configEntry`.

On modifie donc le code de nos sensors de la façon suivante :

```python

```

On doit aussi changer la façon dont on instancie ces 2 classes :

```python

```

Si on relance Home Assistant et qu'on modifie l'intégration, on voit bien que cette fois, Home Assistant a bien modifié les entités sans créer un autre device :

![Option new entite](/images/options-new-entite.png?raw=true)

Les nouvelles entités avec le nouveau nom (Le renouveau) ont été créées mais dans le même device. Les anciennes entités sont encore là mais indisponible et doivent être supprimées à la main (paramètre).

### Rechargement automatique d'une entité modifiée

Il nous manque encore une chose importante : après avoir modifié le configEntry, les entités ne se rechargent pas automatiquement et un arrêt / relance de Home Assistant est nécessaire.

Pour améliorer ça, il faut ajouter un peu de code dans notre intégration.

Fichier `__init__.py` :

```python

```

On relance encore une fois et on constate cette fois que les entités sont immédiatement mises à jour après un changement de config de notre intégration.

## Initialiser les valeurs par défaut

Une toute dernière chose intéressante à connaitre. On a vu que lorsque que notre option flow s'affiche, les valeurs sont vides. Il peut être intéressant d'initialiser ces valeurs avec celles déjà présentes sur notre configEntry.

Pour cela, on va créer la méthode suivante (récupérer sur une autre intégration) :

Fichier `config_flow.py` :

```python

```

Cette fonction parcours le schéma `data_schema` et initalise la valeur suggérée avec celle éventuellement trouvée dans `suggested_values`.
Je passe le fonctionnement de cette fonction, qu'il suffit d'utiliser de la manière suivante :

```python

```

L'idée est de remplacer le schéma donné à la méthode `async_show_form` par celle qui est construite par `add_suggested_values_to_schema` et qui contient les valeurs suggérées.

Après arrêt / relance et modification de l'intégration, on voit bien les valeurs précédentes avant des les modifier :

![Option suggested values](/images/options-suggested-values.png?raw=true)

# Conclusion

Ce long tuto a présenté dans le détail la création des IHM de paramétrage de nos entités. Cette fonction est très puissante mais n'est pas simple à appréhender - d'autant qu'elle est très mal documentée.
Il resterait pas mal de choses à dire sur cette fonction mais tu as les clés pour comprendre ce que tu pourras trouver dans les intégrations existantes. Encore une fois, il est fortement conseillé de regarder ce qui a été fait par ailleurs pour s'en inspirer. Dis toi bien que tout ce qui te manque à forcément déjà été résolu par quelqu'un avant toi.

- - -

# Listes des fichiers références de ce tuto

 (que les fichiers modifiés par rapport au tuto précédent).

## `__init__.py`

```python

```

## `config_flow.py` :

```python

```

## `sensor.py` :

```python

```

## `strings.yaml` et `fr.yaml` :

```yaml

```

## `manifest.yaml` :

```yaml

```

## `configuration.yaml` :

```yaml

```