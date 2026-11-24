# Ju&Jum's — site vitrine

Site statique (HTML, CSS, JavaScript natif), sans framework ni étape de compilation.
**Pour le voir : double-cliquez sur `index.html`.** Il s'ouvre directement dans le navigateur.

## Structure

```
├── index.html               Accueil
├── creations.html           Mes créations (catalogue filtrable)
├── a-propos.html            À propos
├── contact.html             Contact + formulaire de commande
├── mentions-legales.html    Mentions légales
├── confidentialite.html     Politique de confidentialité
├── cgv.html                 Conditions générales de vente
├── robots.txt / sitemap.xml Référencement
└── assets/
    ├── css/style.css        Toute la mise en forme (couleurs et polices en tête de fichier)
    ├── js/main.js           Menu, filtres, formulaire, animations, bandeau cookies
    └── images/              TOUS les médias du site (voir ci-dessous)
```

## Le logo

Le logo Ju&Jum's est en place, en deux versions sur fond transparent, dans `assets/images/logo/` :

| Fichier | Utilisation |
|---|---|
| `logo.png` | En-tête : version couleur (rose `#D4165A` et fleur orange) sur le fond `#faf8f5` |
| `logo-light.png` | En-tête de l'accueil posé sur la vidéo : version claire (lettres crème, fleur orange) |
| `logo-footer.png` | Pied de page : version bordeaux `#7F1D0E` (fleur orange) sur le fond rose `#c98f8a`, où le rose du logo ne ressortirait pas |

Pour mettre à jour le logo, remplacez ces fichiers **en gardant les mêmes noms** (PNG transparent, environ 470 × 290 px ou plus).
Si vous obtenez une version **SVG** (plus nette sur tous les écrans), enregistrez ses variantes sous `logo.svg`, `logo-light.svg` et `logo-footer.svg`, puis faites un « rechercher / remplacer » des extensions `.png` → `.svg` correspondantes dans les 7 pages.
Si un fichier manque, le nom « Ju&Jum's » s'affiche automatiquement en texte à sa place.

La hauteur d'affichage se règle dans `style.css` : `.brand__logo` (en-tête) et `.brand--footer .brand__logo` (pied de page).

Le favicon (le « J » sur fond framboise) est décliné en trois fichiers dans `assets/images/` : `favicon-32.png` (onglet du navigateur), `favicon.png` (192 px, Android et favoris) et `apple-touch-icon.png` (180 px, sans transparence, pour l'écran d'accueil iPhone). Pour le changer, remplacez ces trois fichiers en gardant les mêmes noms.

## Remplacer les images

Chaque zone d'image attend déjà un fichier précis. **Déposez une photo portant exactement ce nom, elle s'affiche toute seule.**
En attendant, la zone affiche un dégradé doux et le chemin du fichier attendu.

| Fichier à déposer dans `assets/images/` | Page | Format | Taille conseillée |
|---|---|---|---|
| `accueil/video-accueil.mp4` | Accueil, section 1 (vidéo pleine largeur) — **vidéo provisoire en place** | 16:9 | 1920 × 1080 px (voir ci-dessous) |
| `accueil/video-accueil-poster.jpg` | Accueil : image d'attente de la vidéo (facultative) | 16:9 | 1920 × 1080 px |
| `accueil/galerie-1.jpg` à `accueil/galerie-6.jpg` | Accueil, section 2 (galerie de gâteaux en mosaïque) — **en place** : 6 gâteaux de @juandjums.patisserie | 4:5 portrait | 800 × 1000 px |
| `accueil/coupe-1-entier.jpg` et `accueil/coupe-1-tranche.jpg` | Accueil, section 3, bande crème (comparateur : entremets au caramel entier / à la coupe) — **en place** : carrousel Instagram DfNUvoSkf4F | 1:1 carré, même cadrage | 1200 × 1200 px |
| `accueil/coupe-2-entier.jpg` et `accueil/coupe-2-tranche.jpg` | Accueil, section 3, bande claire (comparateur : entremets aux noix de pécan entier / à la coupe) — **en place** : carrousel Instagram DfUzT_uiOqR | 1:1 carré, même cadrage | 1200 × 1200 px |
| `accueil/banniere.jpg` | Accueil, section 4 (bannière pleine largeur) — **photo provisoire en place** : gros plan de Paris-Brest de Christian Agbede (Unsplash, crédit dans les mentions légales), 1225 × 510 px | 18:5 (recadrée en 9:4 sur mobile) | 2400 × 1000 px |
| `accueil/portrait.jpg` | Accueil, section 5 « Qui suis-je ? » (photo à droite) | 4:5 portrait | 1000 × 1250 px |
| `instagram/insta-1.jpg` à `instagram/insta-8.jpg` | Accueil, section 7 (grille Instagram, 4 × 2 ; les 6 premières sur mobile) | 1:1 carré | 800 × 800 px |
| *(aucun fichier à ajouter)* | Mes créations : les 14 cartes réutilisent les photos de l'accueil (galerie, gâteaux « à la coupe », grille Instagram) avec leurs descriptions. Pour ajouter une création, dupliquez un bloc `<article class="creation">` dans `creations.html` | 4:5 portrait | 800 × 1000 px |
| `a-propos/portrait.jpg` | À propos, haut de page — **en place** : Laurie et son gâteau aux framboises (Instagram, publication du 16 novembre 2026) | 4:5 portrait | 1000 × 1250 px |
| `a-propos/diplome-cap.jpg` | À propos, sous « Tout a commencé dans une petite cuisine » — **en place** : Laurie et son diplôme de CAP (Instagram, publication du 10 novembre 2026), recadrée pour masquer le nom complet et la date de naissance | 4:5 portrait | 664 × 830 px (original Instagram 856 px de large) |
| `a-propos/atelier-laboratoire.jpg` | À propos, « Là où tout se prépare » — **photo provisoire en place** : tartelettes meringuées de Vladyslav Tobolenko (Unsplash, crédit dans les mentions légales) | 3:4 | 900 × 1200 px |
| `a-propos/atelier-geste.jpg` | À propos, « Là où tout se prépare » — **photo provisoire en place** : garnissage à la poche de Leonardo Cirimbelli (Unsplash, crédit dans les mentions légales) | 1:1 | 1100 × 1100 px |
| `a-propos/atelier-ingredients.jpg` | À propos, « Là où tout se prépare » — **photo provisoire en place** : farine, œufs et fraises de Lauren Gray (Unsplash, crédit dans les mentions légales) | 3:4 | 900 × 1200 px |
| `og/og-image.jpg` | Aperçu lors d'un partage (réseaux sociaux) | 1,91:1 | 1200 × 630 px |

Conseils :
- Une photo qui n'a pas le bon ratio est recadrée automatiquement au centre. Gardez le sujet bien centré.
- Visez **moins de 300 Ko par image** (export JPG qualité 75–80 %, ou WebP). Si vous passez en `.webp`, modifiez l'extension dans le HTML.
- **Textes alternatifs** : chaque image a un attribut `alt` qui commence par `[ALT À COMPLÉTER]`. Recherchez ce texte dans les fichiers et remplacez-le par une description fidèle de la photo, par exemple `alt="Entremets griotte et pistache, glaçage rouge brillant, sur un plat en céramique"`.
- Pour ajouter une création : dupliquez un bloc `<article class="creation">` dans `creations.html`, puis changez son `id`, sa catégorie (`data-category` : `entremets`, `tartes`, `classiques`, `fete` ou `douceurs`), ses textes et son image. Les compteurs des filtres se mettent à jour tout seuls.

## Vidéo de l'accueil (section 1)

La première section de l'accueil est une vidéo qui occupe toute la largeur de la page, au format 16:9, sans dépasser la hauteur de l'écran sous l'en-tête. Elle démarre seule, sans son, et tourne en boucle. Un bouton rond en bas à droite permet de la mettre en pause, comme l'exigent les règles d'accessibilité.

**Vidéo en place (provisoire)** : « Glaçage à la poche » de **Los Muertos Crew**, issue de [Pexels](https://www.pexels.com/fr-fr/video/nourriture-mains-chef-dessert-8478021/) (vidéo n° 8478021, Full HD 1920 × 1080, 59 s, 6 Mo). La [licence Pexels](https://www.pexels.com/fr-fr/license/) autorise l'usage commercial gratuit, sans mention obligatoire ; le crédit figure tout de même dans les mentions légales. Comme elle montre des gâteaux qui ne sont pas les vôtres, il est conseillé de la remplacer à terme par une vidéo de vos propres créations.

Pour la remplacer :
1. Exportez la vidéo en **MP4 (H.264)**, 1920 × 1080 px, **sans piste audio**, idéalement 10 à 20 secondes conçues pour boucler, et **moins de 8 Mo** (débit d'environ 3 à 4 Mbit/s).
2. Enregistrez-la sous **`assets/images/accueil/video-accueil.mp4`**, en écrasant le fichier actuel.
3. Facultatif : exportez une image fixe tirée de la vidéo (la première image, idéalement) sous **`assets/images/accueil/video-accueil-poster.jpg`**, puis ajoutez `poster="assets/images/accueil/video-accueil-poster.jpg"` sur la balise `<video>` de `index.html`. Elle s'affiche pendant le chargement. Sans elle, c'est la première image de la vidéo qui s'affiche, y compris pour les visiteurs qui ont demandé à réduire les animations.
4. Mettez à jour le crédit dans `mentions-legales.html` (section « Conception du site »).

Si le fichier vidéo est absent, un emplacement rosé s'affiche avec le chemin attendu. La vidéo se met aussi en pause quand elle sort de l'écran, pour économiser la batterie.
Pour un autre format que le 16:9, modifiez `aspect-ratio` dans la règle `.video-hero` de `style.css`. Une vidéo d'un autre format est recadrée au centre : gardez le sujet bien centré.

## Galerie de gâteaux de l'accueil (section 2)

Sur ordinateur, six gâteaux forment une mosaïque asymétrique, avec le titre « L'atelier de Ju&Jum's » en haut à gauche. Au survol d'un gâteau, ou au clavier, la photo remonte et découvre son nom et un bouton « Commander » qui mène à la page Contact. Sur mobile et tablette, le nom et le bouton restent visibles sous chaque photo.
- **Noms à adapter** : la catégorie (`gallery-card__tag`) et le nom (`gallery-card__name`) de chaque gâteau décrivent la photo. Remplacez-les dans `index.html` par les vrais noms de vos créations, ainsi que la mention cachée qui suit « Commander » (`visually-hidden`), lue par les lecteurs d'écran.
- **Photos** : `assets/images/accueil/galerie-1.jpg` … `galerie-6.jpg`, en portrait 4:5 (800 × 1000 px). La mosaïque recadre chaque photo selon la taille de sa case, alors gardez le gâteau bien au centre.
- **Disposition** : la place de chaque case se règle dans `style.css`, avec les règles `.gallery-card:nth-of-type(…)` (grille de 14 colonnes sur 14 lignes).

## Créations « à la coupe » de l'accueil (section 3)

Deux bandes pleine largeur qui alternent : photo à gauche sur fond crème `#fbf3ea`, puis photo à droite sur fond clair `#faf8f5`, avec un titre, une phrase et un bouton « Je découvre ». Chaque photo est un **comparateur** : en faisant glisser la poignée (souris, doigt ou flèches du clavier), on passe du gâteau entier à sa coupe. À la première apparition, la poignée fait un petit aller-retour pour montrer qu'on peut la déplacer.
- **Photos** : pour chaque bande, deux photos carrées du même gâteau, l'une entière (`coupe-1-entier.jpg`), l'autre à la coupe (`coupe-1-tranche.jpg`). Prenez-les du même endroit, avec le même cadrage, pour que le passage de l'une à l'autre soit fluide (un trépied aide beaucoup).
- **Une seule photo ?** Dans `index.html`, gardez la première `<figure>` du bloc `compare` et supprimez la seconde, le curseur `<input>` et la poignée `compare__handle`.
- **Textes** : le titre, la phrase, le lien du bouton (vers la page Créations, déjà filtrée) et les descriptions des photos (`alt`) se modifient dans `index.html`.

## Avis clients de l'accueil (section 6)

Trois avis présentés en vignettes : une photo ronde, le prénom, la création commandée, l'avis et une note en macarons. Au survol (ou au clavier), la vignette grossit et passe au rose ; celle du milieu est mise en avant par défaut. Sur mobile et tablette, les vignettes se font glisser, avec des repères en dessous.
- **Les trois textes en place sont des exemples de mise en page.** Remplacez-les par de vrais avis de clients, recueillis avec leur accord. Publier des avis inventés est interdit, car c'est une pratique commerciale trompeuse.
- Pour chaque avis, modifiez dans `index.html` (bloc `review`) :
  - le texte (`review__quote`) ;
  - le prénom et l'initiale du nom (`[PRÉNOM N.]`) ;
  - la création et l'occasion (`review__order`, par exemple « Layer cake · Anniversaire »).
- **Photos rondes** : `assets/images/avis/avis-1.jpg` à `avis-3.jpg`, carrées (240 × 240 px). Photos provisoires en place, recadrées dans des photos déjà présentes sur le site ; remplacez-les par la photo du gâteau commandé ou du client (avec son accord).
- La note est de 5 macarons. Pour une autre note, retirez des `<svg class="review__macaron">` et mettez à jour `aria-label="Note : 5 sur 5"`.
- La petite mention sous les vignettes indique comment les avis sont recueillis, ce que la loi impose. Adaptez-la si votre façon de faire est différente.

## Section Instagram de l'accueil (section 7)

Huit photos carrées occupent toute la largeur de la page : 4 × 2 sur ordinateur, 2 × 3 sur mobile (les photos 7 et 8 sont alors masquées). Un encart centré invite à suivre le compte.
- **Compte relié** : [@juandjums.patisserie](https://www.instagram.com/juandjums.patisserie/). Le bouton « @juandjums.patisserie » de l'encart et le lien Instagram du pied de page des 7 pages y renvoient.
- **Photos en place** : 8 photos de pâtisseries du compte (aucune vidéo), dans `assets/images/instagram/insta-1.jpg` … `insta-8.jpg`. Elles ont été récupérées en pleine résolution puis recadrées en carré de 800 × 800 px, centré sur la pâtisserie. Chaque photo est cliquable et ouvre sa publication dans un nouvel onglet.
- Pour en changer, préparez un carré d'au moins 800 × 800 px centré sur la pâtisserie, gardez le même nom de fichier, puis mettez à jour le lien (`href`) et le texte alternatif (`alt`) du bloc `insta__tile` correspondant dans `index.html`.
- Le texte de l'encart se modifie directement dans `index.html` (bloc `insta__card`).

## Brancher le formulaire de contact

Le formulaire est validé côté navigateur. **Tant qu'il n'est relié à aucun service, il fonctionne en mode démonstration : aucun message n'est envoyé**, et le message de confirmation le dit clairement.

Pour le brancher :
1. Créez un formulaire chez un service d'envoi (Formspree, Web3Forms, Getform, Basin…) ou utilisez un script de votre hébergeur.
2. Copiez l'URL d'envoi fournie.
3. Dans `contact.html`, collez-la dans l'attribut `data-endpoint` :
   `<form class="form" ... data-endpoint="https://formspree.io/f/votre-identifiant">`

Les données sont envoyées en `POST` (format `FormData`). Les champs s'appellent : `nom`, `email`, `telephone`, `type`, `creation`, `date`, `parts`, `message`, `allergies`, `consentement`.
Un champ invisible anti-spam (`website`) bloque les robots simples.
Pensez ensuite à citer ce service dans la politique de confidentialité (section 5 « Destinataires »).

Les liens « Commander cette création » pré-remplissent le formulaire, par exemple `contact.html?creation=Grand%20Cru`.

## Cookies

Le site ne dépose **aucun cookie** : aucun bandeau n'est donc nécessaire, et aucun n'est affiché.
Un bandeau conforme aux recommandations de la CNIL est toutefois prêt. Si vous ajoutez un jour un outil de mesure d'audience :
1. Dans `assets/js/main.js`, passez `cookieBanner: false` à `true`.
2. Chargez votre outil uniquement après consentement :
   `document.addEventListener('cookies:accepted', () => { /* chargement de l'outil */ });`
3. Mettez à jour la section 9 de la politique de confidentialité.

## Polices

Le site utilise trois polices : **Bagel Fat One**, proche du lettrage du logo, pour les titres de l'accueil, de Mes créations, d'À propos et de Contact (classe `theme-accueil` sur `<body>`, partie accentuée dans le rose du logo `#D4165A`), **Lora** pour les titres des pages légales et **Poppins** pour les textes et accroches (variables `--font-display`, `--font-logo` et `--font-body` en tête de `style.css`). Elles sont chargées depuis Google Fonts. Avant la mise en ligne, **il est recommandé de les héberger sur le site**, pour qu'aucune adresse IP ne soit transmise à Google (RGPD) :
1. Téléchargez les fichiers `.woff2` de ces trois familles (par exemple avec l'outil en ligne « google-webfonts-helper »).
2. Placez-les dans `assets/fonts/` et déclarez-les avec `@font-face` en tête de `style.css`.
3. Supprimez les trois lignes `fonts.googleapis.com` / `fonts.gstatic.com` dans le `<head>` de chaque page.
4. Supprimez l'encadré « Polices de caractères » de la politique de confidentialité.

## Informations à compléter

Tout ce qui reste à fournir est balisé. Faites une recherche sur :
- `[ANNÉE]`, `[X]` : textes de présentation (le prénom, Laurie, est déjà renseigné) ;
- `[PRÉNOM N.]` : auteurs des avis clients de l'accueil, avec les textes d'exemple à remplacer (voir « Avis clients ») ;
- `[TÉLÉPHONE]` et `tel:+33000000000` : numéro de téléphone (pied de page, page Contact, CGV) ;
- `[À COMPLÉTER]`, `[À ADAPTER]`, `[JJ/MM/AAAA]`, `[ADRESSE]`, `[HORAIRES]` et les valeurs entre crochets des pages légales (SIRET, hébergeur, médiateur, acompte…) ;
- `[ALT À COMPLÉTER]` : descriptions des images restantes ;
- `https://www.votre-domaine.fr` : votre nom de domaine (balises canonical et Open Graph, `robots.txt`, `sitemap.xml`).

Déjà renseignés : l'e-mail `juandjums@gmail.com` (pied de page, page Contact, pages légales) et la localisation « Betchat (09) ».

Dans les pages, les informations à compléter apparaissent **surlignées en rose** (classe `.todo`). Une fois l'information saisie, retirez la balise `<span class="todo">`.

> Les textes (histoire, parcours) sont des propositions rédigées pour le site : adaptez-les à votre parcours réel et n'affichez que des engagements vérifiables.
> Les pages légales sont une base conforme aux exigences françaises courantes ; faites-les relire avant la mise en ligne.

## Personnaliser le design

Toutes les couleurs, polices et tailles sont des variables en tête de `assets/css/style.css` (section 1). Exemple : `--accent: #9a2c2f;` pour la couleur griotte.
