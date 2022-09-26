# McFly-Hugo-theme
Theme Hugo basé sur Bootstrap 5, Font-Awesome et sur le respect des données.

Pas de JavaScript, de traceurs, etc.

### Gestion.
* [X] Bootstrap local
* [X] Réduire le CSS Bootstrap ou le packager.
https://romain.therrat.fr/posts/2020/04/hugo-supprimer-le-css-inutilise/ (FR)
https://zwbetz.com/how-to-use-purgecss-with-hugo/ 
https://gohugo.io/hugo-pipes/postprocess/ 
https://www.tzeyiing.com/posts/adding-postcss-to-a-hugo-static-site/
https://ricard.dev/how-to-add-purgecss-to-hugo/
https://janaksingh.com/blog/hugo-css-concat-minify-purgecss-tutorial/
https://romain.therrat.fr/posts/2020/04/hugo-supprimer-le-css-inutilise/
* [X] Font Awesome local (A nettoyer)
* [X] Workflow : Géneration, transfert vers FTP/SFTP.
* [X] Multi Author (https://codingnconcepts.com/hugo/multiple-authors-hugo/)
* [ ] Ajout menu social de l'auteur
* [ ] Ajouter la description de l'auteur dans la page par auteur.
* [ ] Lightbox en local ou a remplacer. (gallery)

### Optimisation & SEO.
* [ ] Organiser le theme.
* [ ] Nettoyer les fichiers FontAwesome en gardant le strict besoin.
* [ ] Travailler sur les branch de Github.
* [X] Suppression du JS pour le Menu principal (https://www.viralpatel.net/bootstrap-navbar-menu-without-javascript/, https://freakspot.net/en/barra-de-navegacion-de-bootstrap-sin-javascript/)
* [X] single : Ajout du Head personalisé en fonction de la page (description et mots clés)
* [X] single : Correction de l'affichage des keywords (suppression [] remplacé par une ", ")
* [X] Ajouter Favicon.
* [X] Titre : Ancrage pour sommaire (https://gohugo.io/getting-started/configuration-markup)
* [X] link : Render Hook Link https://gohugo.io/templates/render-hooks/
* [ ] Code : Mise en forme via Render Hooks https://gohugo.io/templates/render-hooks/#render-hooks-for-code-blocks
* [X] Créé plusieurs tailles  et propose la plus adaptée.
* [X] Convertir les images en WebP
* [ ] Image : voir pour redimenssiomner au max de la taille d'origine et non argrandir.(https://laurakalbag.com/processing-responsive-images-with-hugo/; https://www.cgfootman.com/2020/06/06/add-responsive-images-to-a-hugo-site/ ; https://www.scien.cx/2018/12/13/processing-responsive-images-with-hugo/) https://webdesign.tutsplus.com/tutorials/quick-tip-how-to-use-html5-picture-for-responsive-images--cms-21015
* [X] Ajouter site propulsé dans footer
* [X] Ajouter la modification via GitHub

* [X] Categories : hauteur constante (`classe="h-100"` ATTENTION non dispo pour `<a>`)
* [X] single: Page Article : Afficher HeroImg du Front Matter ou image par defaut 
* [ ] HeroImg : Voir pour crop l'image ou adapter avec une autre image
* [ ] single : Ajouter les [articles en relation](https://bout2code.fr/tutos/creer-un-site-avec-hugo/comment-creer-un-site-avec-hugo-partie-7-ajouter-du-contenu-en-relation/)
* [X] list : Afficher HeroImg du Front Matter
* [ ] serie : Ajouter template Séries https://onebite.dev/series-of-article-in-hugo-website/
* [X] Tabe des matieres (TOC)
* [X] Correction Date et Mise a jour. {{ partial "helpers/date.html" . }}
  
#### Confidentialité
* [X] link : Ajouter target_blank dans partial RS rel="noreferrer"
* [ ] Vérifier les cookies. *Aucun pour le moment*
* [ ] Analyse via [Matomo](https://fr.matomo.org/) présentation [ici](https://zestedesavoir.com/tutoriels/2508/matomo-analytics/)

#### Non urgent
* [ ] theme : Ajouter les options (affichage menu etc [ici](https://github.com/razonyang/hugo-theme-bootstrap/tree/master/layouts/partials/sidebar))
* [ ] Redimensionner Avatar (automatiquement)
* [ ] Integrer le resize image sur data/section.(Voir dans Assets https://mertbakir.gitlab.io/hugo/image-processing-in-hugo/)
* [ ] Dynamique twitter card https://onebite.dev/how-to-make-dynamic-twitter-card-for-hugo/
* [ ] Live search https://onebite.dev/add-live-search-in-hugo-website/

### Shortcodes
#### Commun
* [X] Images : Ajouter shortcodes Gallery + image processing `{{< gallery folder="infos" >}}` infos=le nom du dossier contenant les images
* [X] single : Shortcode Alerte. `{{< alert "Message **d'alerte**" success >}}` options possibles : danger/sucess/warning/info.
* [X] single : Shortcode de citation `{{< quote "Message **citation**" "artiste **anonyme**" "align" >}}` align : left (par defaut), center, right.
* [X] Shortcodes Bouton `{{< button "text" "liens">}}`
* [X] Shortcode Bouton contact `{{< buttoncontact >}}` qui redirige vers le lien du formulaire défini dans `config.toml` `params.contact`

#### HACF/McFlyPartages
* [X] Shortcode lien Forum HACF. 
```
Simple lien : 
{{< forumhacf "lien_vers_forum" "Titre_du_post">}} 
Multi liens : 
{{< multiforumhacf >}}
    {{< forumhacf "lien_vers_forum" "Titre_du_post">}}
    {{< forumhacf "lien_vers_forum" "Titre_du_post">}}
{{< /multiforumhacf >}}
```
* [X] Shortcode liens HA repositories et BluePrint `{{< haautoconfig bp "url" >}}` option `bp` pour blueprint ou `depot` pour repositories.
* [X] Shortcode user HACF et HACF `{{< userha "user" haoff >}}` option `hacf` ou `haoff`.


* [X] Ajouter Modification GitHub pour Submodule.

A VOIR

##https://forestry.io/blog/how-to-use-hugo-s-image-processing-with-forestry/
##https://alexlakatos.com/web/2020/07/17/hugo-image-processing/
https://adityatelange.in/blog/hugo-watermarking-images/
https://gist.github.com/HenrySkup/fa8abe26ac387f139f04f256cf28629e
https://gist.github.com/adityatelange/376cd56ee2c94aaa2e8b93200f2ba8b5
