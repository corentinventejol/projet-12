# SportSee - Frontend

Ce projet est le frontend de l'application SportSee, un tableau de bord d'analyse sportive permettant de visualiser les données d'activité, de nutrition et de performance des utilisateurs.

## Description

L'application permet aux utilisateurs de consulter leurs statistiques sportives via une interface web moderne et intuitive. Elle consomme une API REST (backend fourni séparément) pour afficher les données en temps réel ou utiliser des données mockées en local.

## Installation

### Prérequis

- [Node.js](https://nodejs.org/) (version 16 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) (installé avec Node.js)

### Étapes

1. **Installer les dépendances :**
   
   npm install
   

2. **Configurer les variables d'environnement :**
   - Copier le fichier `exemple.env` en `.env` et adapter si besoin :
     
     cp exemple.env .env
     
   - Par défaut, l'API est attendue sur `http://localhost:3000`.

3. **Lancer le projet en mode développement :**
   
   npm run dev
   
   L'application sera accessible sur [http://localhost:5173](http://localhost:5173) (ou le port affiché dans le terminal).

## Spécifications techniques

- **Gestion des routes** : [react-router-dom](https://reactrouter.com/)
- **Graphiques** : [Recharts](https://recharts.org/)
- **Gestion des variables d'environnement** : `.env` (Vite)
- **Appels API** : [Axios](https://axios-http.com/)

## Scripts npm

- `npm run dev` : Démarre le serveur de développement Vite

## Remarques

- Pour utiliser les données mockées, mettre `VITE_USE_API=false` dans le fichier `.env`.
- Pour utiliser l'API, assure-toi que le backend tourne sur le port défini dans `VITE_API_URL`.