# Se lancer dans la construction d'un site statique avec le generateur Hugo et Netlify CMS comme HeadLess

Base de site Hugo très simple avec intégration Netlify CMS permettant la rédaction d'article en ligne (en dehors d'un editeur de code). Destiné à servir de point de départ pour créer votre propre site avec une intégration Netlify CMS prête à l'emploi.


## Installation

Utilisez le bouton de déploiement pour obtenir votre propre copie du référentiel.

[![Déployer avec Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/McFlyPartages/hugo-starter-netlify-cms)

Ceci va configurer tout ce qui est nécessaire pour faire fonctionner le CMS :

* Un nouveau dépôt dans votre compte GitHub avec le code.
* Déploiement continu complet sur le réseau CDN mondial de Netlify.
* Contrôlez les utilisateurs et l'accès avec Netlify Identity
* Gérer le contenu avec Netlify CMS

Une fois la construction initiale terminée, vous pouvez vous inviter en tant qu'utilisateur. Allez dans l'onglet Identité de votre nouveau site, cliquez sur "Inviter" et envoyez-vous une invitation.

YVous pouvez maintenant ajouter et modifier du contenu en naviguant sur your.app/admin.

## Développement local

* Clonez ce Dépot,
* Se rendre a l'interieur du dossier du dépot,
* lancer la commande suivante `npx netlify-cms-proxy-server`,
* Démarrez le serveur de développement avec `hugo serve`,


Le fichier de configuration du CMS Netlify se trouve dans `static/admin/config.yml`.


## Aller plus loin

Pour en savoir plus sur la création de thèmes dans Hugo, reportez-vous à la documentation sur les [modèles de Hugo (EN)](https://gohugo.io/templates/).

Pour en savoir plus sur Netlify CMS, veuillez vous référer à la [documentation (EN)](https://www.netlifycms.org/docs/intro/).

Si vous souhaitez en savoir plus sur l'utilisation de Netlify CMS avec Hugo, il y  une  [vidéo expliquant comment procéder (EN)](https://www.youtube.com/watch?v=ZyIiY2m7OpY).

Sources :

Ceci est un fork du dépot officiel de [Eric Murphy](https://github.com/ericmurphyxyz/hugo-starter-netlify-cms)


## Chose a faire:
Mettre les pattern dans collection netlifycms https://www.coderstool.com/regex-patterns
Date time juste mois année pour les mises a jour.