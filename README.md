# Jangirde woɗnde — Site de formation à distance en pular (ajami harmonisé)

Plateforme d'apprentissage à distance en **pular (fulfulde)** écrit en **caractères arabes harmonisés (ajami)**.

Conçue pour les zones à connexion faible et à budget data limité :

- **Site 100 % statique** : aucun serveur, aucun framework, aucune base de données.
- **Poids total < 20 Ko** : moins qu'une seule photo. Aucune image, aucune vidéo, aucune police externe.
- **Téléchargement hors-ligne** en un clic (fichiers de 2 à 4 Ko par leçon, partageables par Bluetooth/WhatsApp).
- **Mode hors-ligne** via un service worker de 20 lignes : après activation, les visites ne consomment plus de données.
- Interface **droite-à-gauche** (`dir="rtl"`, `lang="ff-Arab"`), bilingue pular (ajami) / français.

## Structure

```
index.html              Page d'accueil + liste des leçons
guide.html              Guide d'utilisation (élèves et enseignants)
style.css               Feuille de style unique (~2 Ko)
app.js                  Mode hors-ligne (~1 Ko)
sw.js                   Service worker (~0,7 Ko)
manifest.webmanifest    Manifeste PWA minimal
lecons/
  lecon-01.html         L'alphabet ajami harmonisé
  lecon-02.html         Les salutations
  lecon-03.html         Les nombres de 1 à 10
```

## Utiliser le site

Ouvrez simplement `index.html` dans un navigateur, ou servez le dossier avec n'importe quel
serveur statique (par exemple `python3 -m http.server`). Le service worker (mode hors-ligne)
nécessite un serveur — il ne s'active pas en ouvrant le fichier directement.

## Ajouter une leçon (pour les enseignants)

1. Copiez `lecons/lecon-02.html` sous un nouveau nom, par exemple `lecons/lecon-04.html`.
2. Modifiez le titre, le contenu et les exercices avec n'importe quel éditeur de texte.
3. Ajoutez un bloc « carte » pour la nouvelle leçon dans `index.html` (copiez un bloc existant).
4. Ajoutez le chemin de la leçon dans les tableaux `PAGES` de `sw.js` et `app.js`.

## Important — contenu d'exemple

Les trois leçons fournies sont des **modèles d'exemple** : les conventions d'écriture ajami
harmonisée et les formes dialectales (Fuuta Jalon, Maasina…) varient selon les régions.
Faites valider le contenu par vos enseignants avant diffusion, puis remplacez ou complétez
les leçons en suivant la procédure ci-dessus.

## Déploiement

Le dossier peut être hébergé sur n'importe quel hébergeur statique gratuit
(GitHub Pages, Netlify, etc.). Aucune configuration nécessaire.
