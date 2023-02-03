[![Netlify Status](https://api.netlify.com/api/v1/badges/9e92335a-6184-4519-b29d-4869dc8408ec/deploy-status)](https://app.netlify.com/sites/hacf/deploys)

Site/Blog de la communauté et l'association Francophone autour de Home Assistant,  HACF.
**__En route vers la V1:__**
* [X] Integrer juste le mail de contact (integré via JS et Shortcode Mail)
* [ ] Probleme de TOC caché.
* [ ] Mettre sans BulletPoint et a gauche le texte dans les boites Derniers ajoutés et mis à jour.
* [ ] Manque un lien à droite (comme « venez discuter » pour les articles) vers le forum ou quelqu’un pourrait faire un post pour proposer une nouvelle entrée.
* [ ] Article de référence. l'article sur "mon premier sensor" avec systeme monitor et Raspberry ?
* [ ] Supprimer Type d'installation dans les articles (ha-os, ha-core ha-container)
* [ ] Page Medias
* [ ] Integrer les balises Twitter/facebook
https://www.codeur.com/blog/integrer-open-graph-trafic-reseaux-sociaux/
http://brendan-quinn.xyz/post/working-with-hugos-internal-partial-templates-facebook-and-open-graph/
https://gohugo.io/templates/internal/#configure-open-graph
* [ ] Bouton Adherer (Accueil) dans nouvel Onglet
* [ ] Bouton Découvrer Home Assistant (Accueil) dans nouvel Onglet
* [ ] Un point d’interrogation non présent dans le CMS est resté derrière le deuxième texte du hero


## Chose a faire:
* [ ] Ajouter une recherche.
* [ ] **config.yml** *NetiflyCMS* Mettre les pattern dans collection netlifycms https://www.coderstool.com/regex-patterns
* [X] **config.yml** *NetiflyCMS* Modiier Date time sur collection blog,juste mois année pour les mises a jour. format YYYY-MM-DD mais affiché en DD-MM-YY
* [X] **config.yml** *NetiflyCMS* Modifier les fonctions de recherche Netlify CMS.
* [X] **config.yml** *NetiflyCMS* Ajouter avatar sur collection auteurs et verifier dans quelle dossier ca va (assets) **Ils vont dans static image**.
* [X] **config.yml** *NetiflyCMS* Ajouter TAG collection blog
* [ ] **config.yam** *NetlifyCMS* Ameliorer les tags avec possibilités de rechercher dans ceux deja present.https://answers.netlify.com/t/display-existing-tags-in-cms-widget/38270/2
* [X] **config.yml** *NetiflyCMS* Ajouter URL Forum collection post et news
* [X] **config.yml** *NetiflyCMS* Ajouter type collection (post, news, page, awesome)
* [x] **config.yml** *NetiflyCMS* Ameliorer les filtres de recherche pour blog/articles et actualités.

* [X] **config.yml** *NetiflyCMS* Ajouter URL Forum HACF collection Actualité et Articles
* [X] **config.yml** *NetiflyCMS* Ajouter URL Forum off collection Actualité et Articles

* [X] **~~PAS POSSIBLE AVEC DEPLOIEMENT VIA NETLIFY~~** *~~il le fait tout seul~~* Optimisation CSS (PostCSS purge plus minify.) https://purgecss.com/guides/hugo.html (https://romain.therrat.fr/posts/2020/04/hugo-supprimer-le-css-inutilise/ comment mettre des balises en liste blanche)
* * Installer NodeJS `sudo apt install nodejs` et verifier avec `nodejs -v`
* * Installer npm via `sudo apt install npm`
* * Lancer `npm install postcss postcss-cli @fullhuman/postcss-purgecss`


* [X] Ameliorer le .gitignore https://www.atlassian.com/fr/git/tutorials/saving-changes/gitignore
* [X] **PAS POSSIBLE AVEC DEPLOIEMENT VIA NETLIFY** *il le fait tout seul ?* Ajouter la compression des fichiers js
* [X] Mise en forme du code (prismJS et render-codeblock.html)
* [ ] Verifier template Séries
* [X] **Config NetliflyCMS Article** Ajouter un niveau
* * [ ] Integrer dans le template
* [X] **Config NetliflyCMS Article** Ajouter type d'installation
* * [ ] Integrer dans le template

* [X] Menu auto Hide https://bootstrap-menu.com/detail-autohide.html
* [X] Selection TOC fixed

A explorer :
https://discourse.gohugo.io/t/how-to-get-the-path-to-the-assets-directory-without-hardcoding/28217/3
https://mertbakir.gitlab.io/hugo/image-processing-in-hugo/
https://www.markusantonwolf.com/blog/guide-for-different-ways-to-access-your-image-resources/


Quelques commandes :

Supprimer un submodule Git `git rm <path-to-submodule>` puis commit, il supprimera aussi les traces dans le fichier gitsubmodule.