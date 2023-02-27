---
folder: release-HA-22-9
title: "Home Assistant Core 2022.8 ! : Répare le"
type: news
visibleInCMS: true
draft: true
date: 2023-01-03
lastmod: 2023-02-03 - McFly
description: Sortie de la version 2022.8 de Home Assistant, traduction française
  de la communauté Francophone HACF
tags:
  - traduction
  - release
url_hacf: https://forum.hacf.fr/t/home-assistant-2022-8-tu-peux-le-reparer/15217
url_haoff: https://www.home-assistant.io/blog/2022/08/03/release-20228/
socialshare: true
image: null
---
![Fonction réparation de Home Assistant 2022.8](img/ha2022_8_repairs.png "Fonction réparation de Home Assistant 2022.8")

Alors que beaucoup d'entre vous profitent de vacances bien méritées à cette époque, il semble que cela n'ait pas ralenti le développement/contributions apportées à Home Assistant. C'est encore une fois une version magnifiquement emballée !

Je suis très heureux de l'ajout du support Bluetooth, qui ouvre un tout nouveau monde de périphériques à Home Assistant. Je suis encore plus excité par les nouvelles fonctions de réparation et de prise en charge des marques. Elles vont être d'une grande aide 😃.

Savez-vous ce qui est vraiment génial dans cette version ? Toutes les principales fonctionnalités et modifications annoncées dans cette version sont un pas en avant vers notre objectif actuel : rationaliser les expériences.

Profitez de cette version !

../Frenck

## Présentation de Repairs : Vous pouvez le réparer !

Une toute nouvelle fonctionnalité qui, nous l'espérons, va vous plaire : **Les réparations !** 👷

Le tableau de bord des réparations se trouve dans le menu des paramètres et c'est un endroit où Home Assistant peut vous notifier des problèmes que vous pouvez (et devez) réparer !

Des problèmes actuels détectés sur votre système aux problèmes futurs, par exemple, causés par l'utilisation d'une fonctionnalité qui sera supprimée, et tout ce qui se trouve entre les deux. Les problèmes signalés par le tableau de bord de réparation peuvent faire l'objet d'une action et être résolus par vous.

Ces problèmes réparables signalés peuvent être n'importe quoi et sont spécifiquement adaptés à votre instance de Home Assistant. En cliquant sur un problème, vous obtiendrez plus d'informations à son sujet et vous saurez ce que vous devez faire pour le résoudre.

Parfois, cela nécessite une intervention manuelle, par exemple en mettant à jour votre configuration YAML. D'autres fois, le système corrigera automatiquement un problème pour vous après vous avoir demandé de le confirmer ou après vous avoir demandé de faire un choix.

![Aide sur le probleme detecté par la fonction Réparation de Home Assistant 2022.8](img/ha2022_8_repairs-issue-details.png "Aide sur le probleme detecté par la fonction Réparation de Home Assistant 2022.8")


Cette version peut maintenant détecter environ 25 problèmes et, en outre, si une [alerte de l'Home Assistant](https://www.home-assistant.io/integrations/homeassistant_alerts) correspondant à votre système est trouvée, elle apparaîtra également dans le tableau de bord des réparations.

Il existe de nombreux cas d'utilisation de la nouvelle fonction de réparation, et vous pouvez vous attendre à ce qu'elle soit beaucoup plus étendue, avec davantage de détections de problèmes, dans un avenir proche.

## Un support Bluetooth de premier ordre

Aujourd'hui, nous sommes fiers d'annoncer que Home Assistant dispose désormais d'un support Bluetooth de premier ordre ! 🥇

Une toute nouvelle [intégration Bluetooth](https://www.home-assistant.io/integrations/bluetooth) a été ajoutée, qui fournit un support Bluetooth absolument incroyable à Home Assistant, notamment la découverte automatique de nouveaux appareils et la possibilité de pousser les mises à jour des appareils.

Les intégrations qui mettent en œuvre la prise en charge des périphériques peuvent facilement être construites au-dessus de ces fonctionnalités, ce qui signifie que nous avons maintenant une base solide dans Home Assistant pour débloquer la prise en charge de nombreux périphériques Bluetooth existants !

La capture d'écran ci-dessous montre que l'intégration Bluetooth est configurée et qu'elle a découvert un nouveau périphérique. Dans ce cas, il a découvert un capteur de soins floraux Mi Flora.

![Nouvelle fonction intégration Bluetooth home assistant 2022.8](img/ha2022_8_bluetooth.png "Nouvelle fonction intégration Bluetooth Home Assistant 2022.8")


L'intégration de [SwitchBot](https://www.home-assistant.io/integrations/switchbot) en est un bon exemple. Elle a été mise à jour pour prendre en charge la nouvelle intégration Bluetooth et, de ce fait, est désormais une intégration basée sur le mode "push", offrant une expérience beaucoup plus stable.

Cette version ajoute cinq intégrations construites sur cette base : [SensorPush](https://www.home-assistant.io/integrations/sensorpush), [Govee](https://www.home-assistant.io/integrations/govee_ble), [INKBIRD](https://www.home-assistant.io/integrations/inkbird), [Moat](https://www.home-assistant.io/integrations/moat) et [Xiaomi BLE](https://www.home-assistant.io/integrations/xiaomi_ble). Cette dernière offre également un support pour les capteurs de plantes Mi Flora, raisonnablement populaires.

Supposons que vous utilisez le système d'exploitation Home Assistant sur un Raspberry Pi 3 ou 4, ou que vous utilisez un [adaptateur Bluetooth pris en charge](https://www.home-assistant.io/integrations/bluetooth#installing-a-usb-bluetooth-adapter). Dans ce cas, l'intégration Bluetooth fonctionnera d'emblée pour les nouvelles installations et sera automatiquement découverte sur les configurations existantes.

Un grand merci à [@bdraco](https://github.com/bdraco) pour la création de ce fantastique nouvel ajout, à [@Ernst79](https://github.com/Ernst79) pour ses commentaires sur l'implémentation et son excellent travail sur l'intégration personnalisée [ble_monitor](https://github.com/custom-components/ble_monitor), qui a servi d'inspiration pour l'intégration Bluetooth. Enfin, un grand merci à [@Jc2k](https://github.com/Jc2k) pour la mise en œuvre de l'[intégration BLE de Xiaomi](https://www.home-assistant.io/integrations/xiaomi_ble) qui a grandement contribué aux tests. Merci les gars ! 🙏

## Support du Bluetooth HomeKit

Pour continuer l'histoire sur le Bluetooth, le [HomeKit Controller](https://www.home-assistant.io/integrations/homekit_controller) prend désormais en charge le Bluetooth et exploite la nouvelle intégration Bluetooth mentionnée ci-dessus 🎉.

Au cas où vous ne le sauriez pas, l'intégration [HomeKit Controller](https://www.home-assistant.io/integrations/homekit_controller) vous permet de vous connecter à des appareils compatibles HomeKit et de les intégrer directement dans Home Assistant. Vous permettant de surveiller et de contrôler ces appareils, ils prennent en charge les mises à jour basées sur le push et, surtout : Sont entièrement locaux !

Vous n'avez pas besoin de posséder ou d'avoir un téléphone ou un ordinateur Apple pour l'utiliser !

La prise en charge des appareils HomeKit compatibles Bluetooth est fantastique ! Cela rend de nombreux appareils compatibles avec Home Assistant qui n'ont aucun autre moyen de s'intégrer. Il y a beaucoup de serrures de porte, de prises murales et d'autres appareils intelligents que vous pouvez utiliser maintenant.

Merci pour votre travail sur ce sujet [@Jc2k](https://github.com/Jc2k) et [@bdraco](https://github.com/bdraco) !

## Trouver l'intégration prenant en charge votre appareil

Certaines intégrations fonctionnent avec plusieurs marques différentes. Cela peut arriver parce que, par exemple, ces appareils partagent un protocole de communication, sont en marque blanche et vendus sous de nombreux noms de marque, ou peuvent porter des noms de marque différents selon l'endroit du monde où ils sont vendus.

Par exemple, si vous avez une couverture Luxaflex, vous pouvez en fait l'utiliser en utilisant l'intégration PowerView de Hunter Douglas. Et ce n'est pas le seul exemple ; il y en a beaucoup d'autres ! Le problème est le suivant : comment le savoir ?

Pour faciliter la configuration de Home Assistant, les intégrations peuvent désormais prendre en charge plusieurs marques ! Ainsi, si vous ajoutez maintenant une intégration dans Home Assistant et que vous recherchez Luxaflex, vous en trouverez une !

![Plusieurs intégrations pour un seul appareil](img/ha2022_8_supported-brands.png "Plusieurs intégrations pour un seul appareil")


Lorsque vous ajoutez une nouvelle intégration qui est prise en charge par une autre intégration, Home Assistant vous indique quelle intégration fournit le support et vous guide pour configurer cette intégration.

## Meilleures couleurs des cartes

Les cartes affichées dans Home Assistant ont été légèrement modifiées et utilisent désormais une nouvelle palette de couleurs. Ces nouvelles couleurs offrent un contraste beaucoup plus important et améliorent considérablement leur lisibilité.

En particulier si vous utilisez le mode sombre dans l'interface utilisateur de Home Assistant, vous remarquerez une grande différence.

![Couleur de la carte Lovelace Maps](img/ha2022_8_maps-colors.png "Couleur de la carte Lovelace Maps")


Merci à [@KTibow](https://github.com/KTibow) pour avoir lancé ce projet, à [@matthiasdebaat](https://github.com/matthiasdebaat) pour ses commentaires sur l'interface utilisateur et à [@bramkragten](https://github.com/bramkragten) pour avoir effectué cette modification.

## Autres changements notables

Il y a beaucoup plus de jus dans cette version ; voici quelques-uns des autres changements notables de cette version :

* "Z-Wave JS" est maintenant affiché et connu sous le nom de "Z Wave" dans Home Assistant.
* L'élément de menu "Santé du système" a été déplacé vers le tableau de bord "Réparations", dans le menu déroulant (trois points en haut à droite).
* En arrière-plan, un projet a été lancé pour normaliser les noms des entités et des appareils. Ce travail est en cours et prendra beaucoup de temps, car chaque entité possible doit être ajustée. Mais il permettra de rationaliser les expériences !
* Vous pouvez maintenant changer l'unité de mesure affichée des entités numériques qui fournissent une température. Merci, @emontnemery !
* @frenck a mis à jour les outils de développement d'événements pour utiliser YAML au lieu de JSON et a ajouté la coloration syntaxique.
* L'intégration LIFX a fait l'objet d'une révision importante, la rendant beaucoup plus fiable. Merci pour le travail effectué sur ce sujet dans les dernières versions @bdraco et @Djelibeybi !
* Le réseau UniFi a maintenant des entités de mise à jour, vous permettant de mettre à jour le firmware des appareils UniFi directement à partir de Home Assistant. Excellent ajout @J3173 !
* Les icônes Material Design ont été mises à jour à la v7.0.96, vous donnant 100 toutes nouvelles icônes à utiliser 🤩 Merci, @goyney !
* SwitchBot supporte désormais les hygromètres (merci @murtas) et les capteurs de porte/contact (merci @bdraco) !
* @Noltari a ajouté des entités de mise à jour à l'intégration QNAP QSW ! Sympa !
* @frenck a ajouté le support de l'authentification multifactorielle pour Verisure. Vous pouvez donc désormais renforcer la sécurité de votre système d'alarme Verisure.
* HomeWizard Energy a ajouté la prise en charge des compteurs d'eau ! Merci, @DCSBL !
  *Yolink supporte désormais les portes de garage, bravo @matrixd2 !
* @simeon-simsoft pour les chargeurs Wallbox bidirectionnels, merci !
* Vous pouvez maintenant voir les détails de votre connexion réseau actuelle dans l'écran des paramètres réseau. Merci, @zsarnett !
* Lutron Caséta supporte maintenant les claviers Lutron RA3 Sunnata. Merci, @danaues !
* @mkmer a ajouté un capteur de niveau de batterie à Aladdin Connect, merci !
* L'intégration de Sensibo supporte maintenant le capteur AirQ. Merci, @gjohansson-ST !

## Nouvelles intégrations

Nous accueillons les nouvelles intégrations suivantes dans cette version :

* Bluetooth, ajouté par @bdraco
* Govee Bluetooth, ajouté par @bdraco
* Home Assistant Alerts, ajouté par @emontnemery &amp; @balloob
* INKBIRD, ajouté par @bdraco
* Moat, ajouté par @bdraco
* NextDNS, ajouté par @bieniu
* Réparations, ajouté par @emontnemery
* Rhasspy, ajouté par @balloob
* SensorPush, ajouté par @bdraco
* Xiaomi BLE, ajouté par @Jc2k

## Intégrations maintenant disponibles pour être configurées à partir de l'interface utilisateur

Les intégrations suivantes sont maintenant disponibles via l'interface utilisateur de Home Assistant :

* Récepteurs A/V Anthem, ajouté par @Hyralex
* Bose SoundTouch, réalisé par @kroimon

## Version 2022.8.1 - Août 4

* Correction des informations sur l'addon zwave_js (@MartinHjelmare - #76044) (docs hassio) (docs zwave_js)
* Passage de bleak à 0.15.1 (@bdraco - #76136) (docs bluetooth)
* Autorise le mode de fonctionnement climatique fan_only comme mode personnalisé dans Alexa (@jbouwh - #76148) (alexa docs)
* Suppression de l'attribut icon si la classe du dispositif est définie (@dgomes - #76161) (integration docs)
* Correction des entrées ignorées de flux_led qui ne sont pas respectées (@bdraco - #76173) (docs flux_led)
* Correction d'une course dans async_process_advertisements de Bluetooth (@bdraco - #76176) (docs Bluetooth)
* Ajout d'un élément de réparation pour supprimer l'intégration de Flu Near You qui ne fonctionne plus (@bachya - #76177) (flunearyou docs) (dépréciation)
* Correction de l'éloignement du bras dans Risco (@OnFreund - #76188) (risco docs)
* Correction de l'adresse IP nullable dans mikrotik (@engrbm87 - #76197) (docs mikrotik)
* Marquer le capteur binaire RPI Power comme diagnostic (@frenck - #76198) (rpi_power docs)
* Corrections de la fiabilité de l'appairage BLE pour le contrôleur HomeKit (@bdraco - #76199) (homekit_controller docs) (dépendance)
* Modification de la bibliothèque NextDNS (@bieniu - #76207) (docs nextdns)
* Passage de AIOAladdin Connect à 0.1.41 (@mkmer - #76217) (aladdin_connect docs) (dépendance)
* Correction de l'orthographe de OpenWrt dans le manifeste d'intégration de luci (@frenck - #76219) (docs luci)
* Correction de la récupération de Life360 en cas d'erreur du serveur (@pnbruckner - #76231) (docs life360)
* Appeler plus explicitement les cas spéciaux avec le code d'autorisation SimpliSafe (@bachya - #76232) (simplisafe docs)
* Activation du typage strict pour le module de flux de configuration du contrôleur HomeKit (@Jc2k - #76233) (homekit_controller docs)
* Correction de quelques avertissements de homekit_controller pylint et d'échecs de tests (locaux uniquement) (@Jc2k - #76122) (homekit_controller docs)

## Version 2022.8.2 - Août 7

* Mise à jour de gree pour utiliser le composant réseau pour définir les interfaces de découverte (@Jc2k - #75812) (docs gree)
* Utilisation des données système stockées de philips_js au démarrage (@elupus - #75981) (docs philips_js)
* S'assurer que Bluetooth récupère si Dbus est redémarré (@bdraco - #76249) (docs bluetooth)
* Correction des noms de capteurs par défaut dans l'intégration NextDNS (@bieniu - #76264) (nextdns docs)
* Modification des dépendances ZHA (@puddly - #76275) (docs zha)
* Passage de pydeconz à la v102 (@Kane610 - #76287) (docs deconz)
* Correction du support de la température de couleur de la lumière ZHA (@dmulcahey - #76305) (docs zha)
* Passage de pySwitchbot à 0.18.4 (@bdraco - #76322) (docs switchbot)
* Passage de aiobafi6 à 0.7.2 pour débloquer #76328 (@jfroy - #76330) (docs baf)
* Report de la commutation de la plateforme broadlink jusqu'à ce que l'entrée de configuration soit prête (@elupus - #76371) (broadlink docs)

## Version 2022.8.3 - Août 9

* Ajout d'une journalisation de débogage pour les erreurs inconnues de Notion (@bachya - #76395) (docs notion)
* Activation automatique des entités de restriction communes de RainMachine (@bachya - #76405) (docs rainmachine)
* Correction du bug où les états des entités RainMachine ne se remplissent pas au démarrage (@bachya - #76412) (rainmachine docs)
* Correction des thermomètres à viande Govee 5185 avec un ancien firmware qui ne sont pas découverts (@bdraco - #76414) (docs govee_ble)
* Correction des écouteurs iCloud (@epenet - #76437) (icloud docs)
* Passage de la version de pyunifiprotect à 4.0.12 (@AngellusMortis - #76465) (docs unifiprotect)
* Passage de aiohomekit à 1.2.6 (@bdraco - #76488) (docs homekit_controller)
* Correction des ibbq2s de inkbird qui s'identifient avec xbbq (@bdraco - #76492) (docs inkbird)
* Passage de govee-ble à 0.14.0 pour corriger les capteurs H5052 (@bdraco - #76497) (docs govee_ble)
* Correction de l'appariement avec les accessoires HK qui ne fournissent pas de format pour les caractères du vendeur (@bdraco - #76502) (homekit_controller docs)
* Correction #76283 (@ocalvo - #76531) (docs sms)
* Passage de aiohomekit à 1.2.8 (@bdraco - #76532) (docs homekit_controller)

## Version 2022.8.4 - Août 12

* Amélioration des dépendances ZHA (@puddly - #76565) (docs zha)
* Remplacement de aiohttp.hdrs CONTENT_TYPE par plain string pour l'intégration Swisscom (@DeeVeX - #76568) (swisscom docs)
* Correction de homekit_controller ne remarquant pas les changements d'ip et de port que zeroconf a trouvé (@Jc2k - #76570) (homekit_controller docs)
* Fixe Spotify deviding None value in current progress (@frenck - #76581) (spotify docs)
* Améliorer la qualité du code dans huawei_lte (@a-p-z - #76583) (huawei_lte docs)
* Correction du Govee 5181 avec un ancien firmware (@bdraco - #76600) (docs govee_ble)
* Correction des modes prédéfinis de evohome (@MartinHjelmare - #76606) (evohome docs)
* Ajout de _abort_if_unique_id_configured aux intégrations ble (@bdraco - #76624) (docs govee_ble) (docs sensorpush) (docs inkbird) (docs xiaomi_ble) (docs moat)
* Correction d'une coroutine non attendue dans BMW notify (@rikroe - #76664) (docs bmw_connected_drive)

## Version 2022.8.5 - Août 15

Mise à jour de systembridgeconnector vers 3.4.4 (@timmo001 - #75362) (docs system_bridge)

* 🐛 Correction de l'erreur "The request content was malformed" dans home_connect (@hansgoed - #76411) (home_connect docs)
* Passage de pySwitchbot à 0.18.5 (@bdraco - #76640) (docs switchbot)
* Passage de pySwitchbot à la version 0.18.6 pour corriger la course à la déconnexion (@bdraco - #76656) (docs switchbot)
* Passage de pySwitchbot à la version 0.18.10 pour gérer les données vides et les déconnexions (@bdraco - #76684) (docs switchbot)
* Correction de la gestion des entités désactivées du calendrier google (@allenporter - #76699) (google docs)
* Correction de OperationNotAllowed pour les stores à mouvement (@starkillerOG - #76712) (motion_blinds docs)
* Mise à jour de xknx à 1.0.0 🎉 (@marvin-w - #76734) (knx docs)
* Mise à jour de aiohomekit en 1.2.10 (@bdraco - #76738) (homekit_controller docs)
* Correction de mauvaises données avec les capteurs bbq de inkbird (@bdraco - #76739) (docs inkbird)
* Passage de bimmer_connected à 0.10.2 (@rikroe - #76751) (bmw_connected_drive docs)
* Passage de aiohue à 4.5.0 (@marcelveldt - #76757) (docs hue)
* Correction des données périmées avec les capteurs SensorPush (@bdraco - #76771) (sensorpush docs)
* Passage de homeconnect à 0.7.2 (@BraveChicken1 - #76773) (home_connect docs)
* Passage de aiohomekit à 1.2.11 (@bdraco - #76784) (homekit_controller docs)
* Correction de l'enregistrement du callback Bluetooth qui ne survit pas à un rechargement (@bdraco - #76817) (docs bluetooth)
* Correction des entités et périphériques référencés pour les déclencheurs d'événements (@emontnemery - #76818) (docs automation)
* Correction des découvertes lifx homekit qui ne sont pas ignorables ou qui ne mettent pas à jour l'IP (@bdraco - #76825) (lifx docs)

## Version 2022.8.6 - Août 17

* Correction des unités affichées pour BMW Connected Drive (@rikroe - #76613) (bmw_connected_drive docs)
* Correction de l'ordre de démarrage d'Overkiz pour éviter l'affichage d'un périphérique non nommé (@iMicknl - #76695) (overkiz docs)
* Passage de pynetgear à 0.10.7 (@starkillerOG - #76754) (netgear docs)
* Correction de la restauration des capteurs de mobile_app (@emontnemery - #76886) (docs mobile_app)
* Correction de la position d'inclinaison du couvercle de l'acmeda (@epenet - #76927) (acmeda docs)
* Correction d'une course dans la configuration de notify (@bdraco - #76954) (notify docs)
* Passez la vraie configuration pour Discord (@tkdrob - #76959) (docs discord)
* Passez la vraie configuration pour Slack (@tkdrob - #76960) (slack docs)

## Version 2022.8.7 - Août 25

* Ajout du mappage de l'unité de détection edl21 pour Hz (@StephanU - #76783) (edl21 docs)
* Changement de l'URL du serveur growatt (@coffeedave - #76824) (growatt_server docs)
* Passage de pySwitchbot à 0.18.12 (@bdraco - #77040) (docs switchbot)
* Passage de pySwitchbot à 0.18.14 (@bdraco - #77090) (docs switchbot)
* Protection contre une exception dans la plateforme climatique Shelly (@bieniu - #77102) (shelly docs)
* Modification des dépendances de ZHA (@puddly - #77125) (zha docs)
* Nettoyage mineur deCONZ (@Kane610 - #76323) (docs deconz)
* Correction des contrôles de sortie contrôlables par niveau dans deCONZ (@Kane610 - #77223) (deconz docs)
* Fixe la connexion de plusieurs portes Aladdin sur un dispositif (@mkmer - #77226) (aladdin_connect docs)
* Correction de l'unité de vitesse du vent par défaut de met_eireann (@donoghdb - #77229) (met_eireann docs)
* Mise à jour de xknx vers 1.0.1 (@farmio - #77244) (docs knx)
* Fixe l'unité grid_export_limit pour les onduleurs DT (@mletenay - #77290) (goodwe docs)
* Ajout du capteur BLE à Aladdin_connect (@mkmer - #76221) (aladdin_connect docs)

## [Breaking Changes](https://www.home-assistant.io/blog/2022/08/03/release-20228/#breaking-changes)

* Advantage Air
* Calendar
* HERE Travel Time
* HomeKit Controller
* LIFX
* Logger
* Material Design Icons
* Sonos
* SwitchBot
* Z-Wave

## Adieu à ce qui suit

Les intégrations suivantes ne sont plus disponibles à partir de cette version :

* XBee
* SoChain
* Google Play Music Desktop Player (GPMDP)

Ces trois intégrations étaient précédemment désactivées en raison d'incompatibilités et ont maintenant été supprimées.

## Tous les changements

Bien sûr, il y a beaucoup plus dans cette version. Vous pouvez trouver une liste de toutes les modifications apportées ici : [Journal complet des modifications apportées à Home Assistant Core 2022.](https://www.home-assistant.io/changelogs/core-2022.8)
