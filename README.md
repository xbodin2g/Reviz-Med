# Réviz'Med 🩺 — Carnet de révisions PASS / L.AS

Tableaux interactifs pour réviser en vue de l'examen :
- **Tronc commun (vert)** : Histologie, Biomol, SHS, Anat TC, Physiologie
- **Options (rouge)** : Bio-cellulaire, Anat OS, Biophysique, Chimie
- Par matière : **Annales 2020→2026**, **Contrôles 1–4**, **EBC 1–3**, **Q supp 1–4**
- **10 cases de notes par devoir** : note ≥ seuil → **vert**, note < seuil → **rouge hachuré**, vide → neutre
- **Seuil critique paramétrable** en direct (global + spécifique par matière)

Application **installable** (PWA), **hors-ligne**, **données 100 % locales** (localStorage).
Export/import JSON, export CSV, annulation (Ctrl+Z), recherche, filtres, tri, historique par devoir.

## Déploiement sur GitHub Pages (5 minutes)

1. Créez un dépôt, par exemple `reviz-med` (public).
2. Déposez à la racine les 5 fichiers : `index.html`, `sw.js`, `manifest.webmanifest`, `icon.svg`, `README.md`.
3. **Settings → Pages → Build and deployment** : Source = *Deploy from a branch*, branche `main`, dossier `/ (root)`, puis **Save**.
4. Après ~1 minute, l'app est disponible sur `https://VOTRE-PSEUDO.github.io/reviz-med/`.

## Installation sur vos appareils

- **Android (Chrome)** : bannière « Installer » ou menu ⋮ → *Installer l'application*.
- **iPhone / iPad (Safari)** : bouton **Partager** → **Sur l'écran d'accueil**.
- **PC (Chrome / Edge)** : icône d'installation dans la barre d'adresse ou bouton « Installer ».

Une fois installée, l'app fonctionne sans connexion.

## Vos données

- Stockées uniquement sur chaque appareil (aucun serveur, aucun compte).
- Pour passer du PC au téléphone : **Réglages → Exporter JSON**, puis **Importer** sur l'autre appareil.
- Au premier lancement, des notes de démonstration sont pré-remplies : bouton **« Effacer la démo »** pour partir de zéro.

## Mise à jour

Modifiez `index.html`, et incrémentez `V` dans `sw.js` (ex. `revizmed-v1.0.1`) pour que les appareils installés récupèrent la nouvelle version.
