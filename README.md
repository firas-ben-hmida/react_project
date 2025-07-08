# react_project
# Projet de Restauration

Un projet web moderne pour la gestion d'un restaurant, développé avec React, Tailwind CSS et Vite, avec un serveur JSON pour la gestion des données.

## 🚀 Technologies Utilisées

- **React** - Bibliothèque JavaScript pour l'interface utilisateur
- **Tailwind CSS** - Framework CSS utilitaire
- **Vite** - Outil de build rapide pour le développement
- **JSON Server** - Serveur REST API simulé
- **JSON Server Auth** - Authentification pour JSON Server

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- Node.js (version 16 ou supérieure)
- npm

## 🛠️ Installation

### 1. Création du projet React avec Vite

```bash
# Créer un nouveau projet avec Vite
npm create vite@latest

# Suivre les instructions :
# - Nom du projet : [nom-de-votre-projet]
# - Framework : React
# - Variant : JavaScript

# Se déplacer dans le dossier du projet
cd nom-de-votre-projet

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

### 2. Installation et configuration de Tailwind CSS

```bash
# Installer Tailwind CSS et ses dépendances
npm install tailwindcss @tailwindcss/vite
```

#### Configuration de Tailwind CSS

1. **Modifier le fichier `app.css`** :
@import "tailwindcss";

2. **Ajouter Tailwind à votre fichier CSS principal** (`src/index.css`) :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. **Configurer Vite** (dans `vite.config.js`) :
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### 3. Configuration du serveur JSON

#### Étape 1 : Créer le fichier `data.json`

#### Étape 2 : Créer le fichier `server.js`
#### Étape 3 : Initialiser le package.json pour le serveur

```bash
# Initialiser le package.json
npm init -y

# Installer les dépendances du serveur
npm install json-server json-server-auth

# Démarrer le serveur
npm start
```
## 🚀 Démarrage du projet

### 1. Démarrer le serveur JSON (Terminal 1)
```bash
# Dans le dossier racine du projet
npm start
```
Le serveur sera disponible à l'adresse : `http://localhost:3000`

### 2. Démarrer l'application React (Terminal 2)
```bash
# Dans le dossier du projet React
npm run dev
```
L'application sera disponible à l'adresse : `http://localhost:5173`

## 📁 Structure du projet

```
projet-restaurant/
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── CartButton.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── navbar.jsx
│   │   │   └── ProductCardsList.jsx
│   │   ├── pages/
│   │   │   ├── AddProduct.jsx
│   │   │   ├── AdminCategories.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Categories.jsx
│   │   │   ├── CategoryProducts.jsx
│   │   │   ├── EditProduct.jsx
│   │   │   ├── login.jsx
│   │   │   └── register.jsx
│   │   ├── utils/
│   │   │   └── controleDesaisie.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
├── server/
│   ├── node_modules/
│   ├── data.json
│   ├── package-lock.json
│   ├── package.json
│   └── server.js

```
##  Captures d'ecrans
![Capture d'écran 2025-07-08 051236](https://github.com/user-attachments/assets/56fa68c7-fc85-490a-ad1a-eb2f094ed1b9)
![Capture d'écran 2025-07-08 051251](https://github.com/user-attachments/assets/0ac2725c-1076-4b18-a9fe-cf9055bcbe62)
![Capture d'écran 2025-07-08 051132](https://github.com/user-attachments/assets/c361d274-4555-4f25-a7ef-32b3431c72ff)
![Capture d'écran 2025-07-08 051146](https://github.com/user-attachments/assets/8c369678-4d46-45bf-971e-f45f8374cb47)
![image](https://github.com/user-attachments/assets/27d0f112-8625-4f92-b3fa-143377733d5a)
![Capture d'écran 2025-07-08 051051](https://github.com/user-attachments/assets/31a86dce-fb15-4e1d-a66b-b68c8e36e987)





**Bon développement ! 🍽️**
