[![Netlify Status](https://api.netlify.com/api/v1/badges/e318fb64-f86e-4572-bbc6-90598c22b842/deploy-status)](https://app.netlify.com/sites/hacf/deploys)

Site/Blog de la communauté et l'association Francophone autour de Home Assistant,  HACF.

Voici un petit guide pour y contribuer via Git.

### Introduction.

Le site est basé sur [Hugo](https://gohugo.io/), un générateur de site statique, couplé au service [StaticCMS](https://www.staticcms.org/) pour lui ajouter un HeadLessCMS (comprendre un éditeur d'article), le tout versionné avec GitHub et hébergé par [Netlify](https://www.netlify.com/).

Le thème a été créé de zéro avec le framework [Boostrap](https://getbootstrap.com/) en version 5 et nous utilisons les icônes [FontAwesome](https://fontawesome.com/).

*Pour une petite presentation d'Hugo c'est [plus bas](#hugo)*

## Lancer le portail communautaire en local.
Voici comment utiliser le portail communautaire chez vous.
*Les commandes sont sous linux Ubuntu*
**prérequis :**
* git d'installé `apt install git`,
* Node JS
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x -o /tmp/nodesource_setup.sh
sudo bash /tmp/nodesource_setup.sh
sudo apt-get install -y nodejs
```
>laisser bien le `x` apres la version

* Vérifier avec `node -v`

**Récupération et installation des dépendances**
#####################################################
**CREER VOTRE PROPRE BRANCHE, NE RIEN ENVOYER SUR LA BRANCHE NETLIFY**
#####################################################
* Cloner le dépôt `git clone git@github.com:hacf-admin/blog_hacf.git`,
* Rendez-vous dans le dossier `cd blog_hacf`,
* Créer une branche de travail `git switch -c votre_branche`,
* Installer npm `sudo apt install npm`,
* Installer les dépendances postCSS `npm install postcss-cli autoprefixer fullhuman/postcss-purgecss`,

*Facultatif si vous avez besoin de l'interface d'édition*
Dans le dossier `static`-> `admin` -> `config.yml`,
* Décommenter `#local_backend: true`,

Retourner à la racine du dossier `blog_hacf`,
* Dans un terminal, lancer la commande `hugo serve`,
* *facultatif sauf si vous voulez l'interface d'édition* Dans un deuxième lancer la commande `npx @staticcms/proxy-server`,

Il y a un article de test (content -> blog -> article-test) que vous pouvez utiliser pour vos essais.

#####################################################
**CREER VOTRE PROPRE BRANCHE, NE RIEN ENVOYER SUR LA BRANCHE NETLIFY**
#####################################################

## Hugo.
Hugo est un générateur de site statique codé en [Go](https://go.dev/), il bénéficie d'une [grande communauté](https://discourse.gohugo.io/) (anglophone malheureusement)

Pour l'installation c'est [ici](https://gohugo.io/installation/)

Pour créer un nouveau site avec Hugo, il suffit de taper `hugo new site nom_du_site` qui créé les dossiers de l'architecture.
### l'architecture des dossiers.
**archetypes** **(*pas utile*)** Permet de créer des modèles de [Front Matter](https://gohugo.io/content-management/front-matter/) qui est l'entête des articles (avec le titre, l'auteur, la date etc)
Nous pouvons alors créer un article avec `hugo new posts/my-first-post.md` qui aura l'entête préremplit avec les informations de l'archétype par défaut.
>Nous ne l'utilisons pas.

**assets** contient le CSS, le JS, le SCSS et certaines images. Ce dossier permet d'appliquer des traitements en lot à la construction du site (postprocessing, conversion et redimensionnement des images, etc).
C'est un équivalent au dossier `static` mais avec certain avantage.

**config** contient tous les [fichiers de configuration](https://gohugo.io/getting-started/configuration/) qui, ici, sont éclatés en plusieurs fichiers, mais pourrait être en un seul. Il peut être en `.toml` ou `.yaml`. Nous avons les deux langages, mais un passage en `yml` permettra d'uniformiser et rester dans un langage commun avec Home Assistant :wink:.

**content** contient tout le contenu (haha pas évident), série d'articles, page etc, etc. Voici la [documentation officielle](https://gohugo.io/content-management/organization/), nous utilisons des [dossiers par thématiques](https://gohugo.io/content-management/organization/#page-bundles) (articles, news, pages) et à l'intérieur un dossier par article, page ou news contenant un fichier `index.md` (l'article, la news ou la page) et un dossier `img` contenant les images associées à cette publication.

**data** est un dossier facultatif, mais son utilisation permet de stocker des données (souvent figées dans le temps) intégrables dans les articles. (exemple les auteurs de publication, les entêtes de liste de publication, etc).

**static** est comme le dossier `assets`, mais ne permet pas de traitements automatiques sur les fichiers.
>il y a des fichiers qui ne sont pas compatible avec le dossier `assets` qui sont donc dans ce dossier.

**layouts** (le meilleur pour la fin) est le dossier qui contient tout ce qui touche au thème (head, header, footer, template, etc), des parties de code réutilisable a souhait dans les templates (les partials) et les shortcodes qui sont comme les partials mais pour les articles.

**thèmes** Si vous importez un thème ou si vous souhaitez en créer un, vous pouvez créer ce dossier (facilitant le partage et l'exploitation multi-site) ou alors l'intégrer directement dans le dossier layouts qui a la même fonction.
>Le dossier `layouts` a la racine du site ecrasera le dossier `layouts` se trouvant dans le dossier `thèmes`.

>Actuellement nous avons tout mis dans layouts (et c'est un peu le bazar) mais dans un futur il faudra le mettre a part pour plus de clareté.

### le dossier layouts ou thème.
#### Les dossiers par défaut.
**_default :** Il contient les templates par défaut (si vous ne définissez pas un template personnalisé) :
* de LA PAGE en général (qu'elle soit l'index, une liste, une publication, etc) (`baseof.html`),
* des listes (`list.html`),
* d'une publication (quelqu'elle soit) (`single.html`),
* des terms (tags, catégories, etc) (`terms.html`).

Ex 1 : Si nous voulons appliquer un template différent pour la liste des publications d'une catégorie (un page avec tous les articles de la catégorie machin) alors, il faut créer un dossier `categories` et à l'intérieur ajouter un fichier `single.html` sur lequel on applique notre HTML/CSS.

Ex 2 : Si nous voulons modifier l'apparence d'une page contenant toutes les catégories (pas leurs publications) alors dans ce même dossier, on ajoutera le fichier `list.html` sur lequel on applique notre HTML/CSS

On peut faire cela avec les tags, les auteurs, les catégories, les séries, etc. Il suffit pour cela d'ajouter ce que l'on souhaite au fichier `hugo.toml`(anciennement config.toml) se trouvant dans le dossier `config`.

```toml
[taxonomies]
  tag = 'tags'
  category = 'categories'
  series = 'series'
  author = 'authors'
```
>Nous avons une personalisation des auteurs, des tags et des catégories.

Dans le dossier `_default` il y a aussi un dossier `_markup` ce dernier permet d'appliquer du style, des traitements, etc à certaines syntaxes Markdown par défaut comme les images (`render-image.html`), les titres (`render-heading.html`), les liens (`render-link.html`) et les bloque de code (`render-codeblock.html` et / `render-codeblock-yaml.html` pour appliquer des choses differentes pour du yaml ou autres languages.).
>C'est un peu comme si on appliquait un shortcode, mais en ecrivant simplement du MarkDown.

**partial :** Contient des bouts de code que l'on peut réutiliser dans n'importe quel templates via le code suivant `{{ partial "mon_partial.html" }}` ou `{{ "partial mon_dossier/mon_partial.html" }}`. Le `.html` n'est pas obligatoire.

Il est donc possible d'organiser ses partials comme on le veut dans des dossiers ou pas.

Il y a dans ce dossier des partials par défaut (`footer.html`, `head.html`, `header.html` etc) je pense que vous avez compris leurs utilités.

**shortcodes :** Les shortcodes sont utilisés dans la plupart des CMS, de ce fait, je pense que vous voyez leurs fonctions. Ils permettent d'intégrer dans une publication une syntaxe pouvant être composé d'attributs qui viendront appliquer le code et le style du shortcode.

*Exemple d'un shortcode permettant d'afficher une quote avec une couleur en fonction de l'importance.*

Shortcode : `{{< alert "Message **d'alerte**" success >}}`
* "Message **d'alerte**" est à remplacer par votre message (prenant en compte le format Markdown)
* success est à choisir parmi les options : danger/sucess/warning/info.

Le fichier `alert.html` dans le dossier `shortcodes` contient :
```html
{{- $type := default "info" (.Get 1) -}}
{{- $icons := dict "info" "info-circle" "success" "check-circle" "warning" "exclamation-triangle" "danger" "x-circle"}}
{{- $icon := default "info-circle" (index $icons $type) -}}
<div class="alert alert-{{ $type }}" role="alert">
  <i class="bi bi-{{ $icon }}"></i> {{ .Get 0 | .Page.RenderString }}
</div>
```

Il reste maintenant deux fichiers, le `404.html` et le `index.html`.
Le premier permet de personnaliser la page d'erreur 404 et le deuxième est votre page d'accueil.

Après cette petite explication, vous êtes déjà bien armé pour vous amuser avec Hugo.

Quelques commandes :
`hugo serve` : permet de lancer un serveur en local permettant de voir votre site une fois construit.
`hugo serve -D` : pareil mais construit aussi les articles brouillons.