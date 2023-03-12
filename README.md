[![Netlify Status](https://api.netlify.com/api/v1/badges/e318fb64-f86e-4572-bbc6-90598c22b842/deploy-status)](https://app.netlify.com/sites/hacf/deploys)

Site/Blog de la communauté et l'association Francophone autour de Home Assistant,  HACF.

Voici un petit guide pour y contribuer via Git.

### Introduction.

Le site est basé sur [Hugo](https://gohugo.io/), un generateur de site statique, couplé au service [NetlifyCMS](https://www.netlifycms.org/?lang=fr&hl=fr) pour lui ajouter un HeadLessCMS (comprendre un editeur d'article), le tout versionné avec GitHub et hebergé par [Netlify](https://www.netlify.com/).

Le theme a été créé de zéro avc le framwork [Boostrap](https://getbootstrap.com/) en version 5 et nous utilisons les icones [FontAwesome](https://fontawesome.com/).

## Hugo.
Hugo est un generateur de site statique codé en [Go](https://go.dev/), il beneficit d'une [grand communauté](https://discourse.gohugo.io/) (anglophone malheureusement)

Pour l'installation c'est [ici](https://gohugo.io/installation/)

Pour créer un nouveau site avec Hugo, il suffit de taper `hugo new site nom_du_site` qui créé les dossiers de l'architecture.
### l'architecture des dossiers.
**archetypes** **(*pas utile*)** Permet de créer des modeles de [Front Matter](https://gohugo.io/content-management/front-matter/) qui est l'entete des articles (avec le titre, l'auteur, la date etc etc)
Nous pouvons alors créer un article avec `hugo new posts/my-first-post.md` qui aura l'entete pre-remplit avec les informations de l'archetype par defaut.
>Nous ne l'utilisons pas.

**assets** contient le CSS, le JS, le SCSS et certaines images. Ce dossier permet d'appliquer des traitement en lot a la construction du site (postprocessing, conversion et redimension des images, etc).
C'est un equivalent au dossier `static` mais avec certain avantage.

**config** contient tous les [fichiers de configuration](https://gohugo.io/getting-started/configuration/) qui, ici, sont eclatés en plusieurs fichiers mais pourrait etre en un seul. Il peut etre en `.toml` ou `.yaml`. Nous avons les deux languages, mais un passage en `yml` permettra d'uniformiser et rester dans un language commun avec Home Assistant :wink:.

**content** contient tout le contenu (haha pas evident), series d'article, page etc etc. Voici la [documentation officielle](https://gohugo.io/content-management/organization/), nous utilisons des [dossier par thematique](https://gohugo.io/content-management/organization/#page-bundles) (articles, news, pages) et a l'interieur un dossier par article, page ou news contenant un fichier `index.md` (l'article, la news ou la page) et un dossier `img` conteznant les images associées a cette publication.

**data** est un dossier falcutatif mais son utilisation permet de stocker des données (assez figées dans le temps) intégrable dans les articles. (exemple les auteurs de publication, les entetes de liste de publication, etc).

**static** est comme le dossier `assets` mais ne permettant pas de traitements automatiques sur les fichiers.
>il y ades fichiers qui ne sont ps compatible avec le dossier `assets` qui sont donc dans ce dossier.

**layouts** (le meilleur pour la fin) est le dossier qui contient tout ce qui touche au thème (head, header, footer, template, etc), des parties de code réutilisable a souhait dans les templates (les partials) et les shortcodes qui sont comme les partials mais pour les articles.

**thèmes** Si vous importez un theme ou si vous souhaitez en créer un vous pouvez créer ce dossier (facilitant le partage et l'exploitation multisite) ou alors l'intégrer directement dans le dossier layouts qui a la meme fonction.

>le dossier thèmes et layouts peuvent être utilisé en meme temps MAIS si le meme fichier se trouve dans les deux dossiers c'est celui du dossier layouts qui écrasera (de maniere fictive) celui du thème.

>Actuellement nous avons tout mis dans layouts (et c'est un peu le bazar) mais dans un futur il faudra le mettre a part pour plus de clareté.

### le dossier layouts ou thème.
#### Les dossiers par defaut.
**_default :** Il contient les templates par defaut (si vous ne definnisez pas un template personnalisé):
* de LA PAGE en general (qu'elle soit l'index, un liste, une publication, etc) (`baseof.html`),
* des listes (`list.html`),
* d'une publication (quelqu'elle soit) (`single.html`),
* des terms (tags, catégories, etc) (`terms.html`).

Ex 1: Si nous voulons appliquer un template different pour la liste des publications d'une catégorie (un page avec tous les articles de la catégorie machin) alors il faut créer un dossier `categories` et un l'interieur ajouter un fichier `single.html` sur lequel on applique notre HTML/CSS.

Ex 2: Si nous voulons modifier l'apparence d'une page contenant toutes les catégories (pas leurs publications) alors dans ce meme dossier on ajoutera le fichier `list.html` sur lequel on applique notre HTML/CSS

On peut faire cela avec les tags, les authors, les catégories, les series, etc. Il suffit pour cela ajouter ce que l'on souhaite au fichier `hugo.toml`(anciennement config.toml) a cet endroit.

```toml
[taxonomies]
  tag = 'tags'
  category = 'categories'
  series = 'series'
  author = 'authors'
```
>Nous avons une personalisation des auteurs, des tags et des catégories.

Dans le dossier `_default` il y a aussi un dossier `_markup` ce dernier permet d'appliquer du style, des traitements, etc a certaines syntaxes markdown par defaut comme les images (`render-image.html`), les titres (`render-heading.html`), les liens (`render-link.html`) et les bloque de code (`render-codeblock.html`).
>C'est un peu comme si on appliquait un shortcode, mais en ecrivant simplement du MarkDown.

**partial :** Contient des bouts de code que l'on peut réutiliser dans n'importe quel templates via le code suivant `{{ partial "mon_partial.html" }}` ou `{{ "partial mon_dossier/mon_partial.html" }}`. Le `.html` n'est pas obligatoire.

Il est donc possible d'organiser ses partials comme on le veut dans des dossiers ou pas.

Il y a dans ce dossier des partials par defaut (`footer.html`, `head.html`, `header.html` etc) je pense que vous avez compris leurs utilités.

**shortcodes :** Les shortcodes sont utilisés dans la plupart des CMS donc je pense que vous voyez leurs fonctions. Il permettent d'intégrer dans une publication une syntaxe pouvant etre composé d'attribut qui viendrons appliquer le code et le style du shortcode.

*Exemple d'un shortcode permettant d'afficher une quote avec une couleur en fonction de l'importance.*

Shortcode : `{{< alert "Message **d'alerte**" success >}}`
* "Message **d'alerte**" est a remplacer par votre message (prenant en compte le format Markdown)
* success est a choisir parmis les options : danger/sucess/warning/info.

Le fichier `alert.html` dans le dossier `shortcodes` contient :
```html
{{- $type := default "info" (.Get 1) -}}
{{- $icons := dict "info" "info-circle" "success" "check-circle" "warning" "exclamation-triangle" "danger" "x-circle"}}
{{- $icon := default "info-circle" (index $icons $type) -}}
<div class="alert alert-{{ $type }}" role="alert">
  <i class="bi bi-{{ $icon }}"></i> {{ .Get 0 | .Page.RenderString }}
</div>
```

Il reste maintenant deux fichiers le `404.html` et le `index.html`.
Le premier permet de personaliser s page d'erreur 404 et le deuxieme est votre page d'accueil.

Apres cette petite explication vous êtes déja bien armé pour vous amusez avec Hugo.

Quelques commandes :
`hugo serve` : permt de lancer un serveur en local permettant de voir votre site une fois construit.
`hugo serve -D` : pareil mais construit aussi les articles brouillons.

## Lancer le portail communautaire en local.
Voici comment utiliser le portail communautaire chez vous.
*Les commandes sont sous linux Ubuntu*
**prérequis:**
* git d'installé `apt install git`,
* Node JS
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x -o /tmp/nodesource_setup.sh
sudo bash /tmp/nodesource_setup.sh
sudo apt-get install -y nodejs
```
>laisser bien le `x` apres la version

* Verifier avec `node -v`

**Récuperation et installation des dependances**
#####################################################
**POUR LE MOMENT NE RIEN ENVOYER SUR LA BRANCHE NETLIFY**
#####################################################
* Cloner le dépot `git clone git@github.com:hacf-admin/blog_hacf.git`,
* Rendez vous dans le dossier `cd blog_hacf`,
* Créer une branche de travail,
* Installer npm `sudo apt install npm`,
* Installer les dependances postCSS `npm install postcss-cli autoprefixer fullhuman/postcss-purgecss`,

*falcultatif si vous n'avez pas besoin de l'interface d'edition*
Dans le dossier `static`-> `admin` -> `config.yml`,
* Décocher `#local_backend: true`,

Retourner a la racine du dossier `blog_hacf`,
* Dans un terminal lancer la commande `hugo serve`,
* *facultatif* Dans un deuxieme lancer la commande `npx netlify-cms-proxy-server`,

Il y a un article de test (content -> blog -> article-test) que vous pouvez utiliser pour vos essais.

#####################################################
**POUR LE MOMENT NE RIEN ENVOYER SUR LA BRANCHE NETLIFY**
#####################################################
