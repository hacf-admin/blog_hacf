[![Netlify Status](https://api.netlify.com/api/v1/badges/9e92335a-6184-4519-b29d-4869dc8408ec/deploy-status)](https://app.netlify.com/sites/hacf/deploys)

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
* [ ] **render-img.html** *Render Hook img* Differencier image et liens URL pour autoriser les import d'image via URL. https://github.com/gohugoio/hugo/releases/tag/v0.91.0
```
{{ resource := "" }}
{{ if (urls.Parse $url).IsAbs }}
 {{ $resource = resources.GetRemote $url }}
{{ else }}
 {{ $resource = resources.Get $url }}
{{ end }}
```

* [ ] **config.yml** *NetiflyCMS* Mettre les pattern dans collection netlifycms https://www.coderstool.com/regex-patterns
* [ ] **config.yml** *NetiflyCMS* Modiier Date time sur collection blog,juste mois année pour les mises a jour.
* [ ] **config.yml** *NetiflyCMS* Modifier les fonctions de recherche Netlify CMS.
* [X] **config.yml** *NetiflyCMS* Ajouter avatar sur collection auteurs et verifier dans quelle dossier ca va (assets) **Ils vont dans static image**.
* [X] **config.yml** *NetiflyCMS* Ajouter TAG collection blog
* [ ] **config.yam** *NetlifyCMS* Ameliorer les tags avec possibilités de rechercher dans ceux deja present.https://answers.netlify.com/t/display-existing-tags-in-cms-widget/38270/2
* [ ] **config.yml** *NetiflyCMS* Ajouter URL Forum collection blog
* [ ] **config.yml** *NetiflyCMS* Ajouter type ? collection blog
* [ ] **config.yml** *NetiflyCMS* Ameliorer les filtres de recherche pour blog/articles et actualités.

* [X] **config.yml** *NetiflyCMS* Ajouter URL Forum HACF collection Actualité et Articles
* [X] **config.yml** *NetiflyCMS* Ajouter URL Forum off collection Actualité et Articles

* [ ] **PAS POSSIBLE AVEC DEPLOIEMENT VIA NETLIFY** *il le fait tout seul* Optimisation CSS (PostCSS purge plus minify.) https://purgecss.com/guides/hugo.html (https://romain.therrat.fr/posts/2020/04/hugo-supprimer-le-css-inutilise/ comment mettre des balises en liste blanche)
* * Installer NodeJS `sudo apt install nodejs` et verifier avec `nodejs -v`
* * Installer npm via `sudo apt install npm`
* * Lancer `npm install postcss postcss-cli @fullhuman/postcss-purgecss`


* Ameliorer le .gitignore https://www.atlassian.com/fr/git/tutorials/saving-changes/gitignore
* [ ] **PAS POSSIBLE AVEC DEPLOIEMENT VIA NETLIFY** *il le fait tout seul ?* Ajouter la compression des fichiers js

* [X] **Config NetliflyCMS Article** Ajouter un niveau
* * [ ] Integré dans le template
* [X] **Config NetliflyCMS Article** Ajouter type d'installation
* * [ ] Integré dans le template

A explorer :
https://discourse.gohugo.io/t/how-to-get-the-path-to-the-assets-directory-without-hardcoding/28217/3
https://mertbakir.gitlab.io/hugo/image-processing-in-hugo/
https://www.markusantonwolf.com/blog/guide-for-different-ways-to-access-your-image-resources/


Quelques commandes :

Supprimer un submodule Git `git rm <path-to-submodule>` puis commit, il supprimera aussi les traces dans le fichier gitsubmodule.
