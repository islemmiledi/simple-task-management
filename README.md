# ✨ Task Manager - Application de Gestion de Tâches

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/NestJS-Latest-E0234E?logo=nestjs" alt="NestJS"/>
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC?logo=tailwind-css" alt="TailwindCSS"/>
  <img src="https://img.shields.io/badge/Status-En développement-green" alt="Status"/>
</p>

Une application moderne et élégante de gestion de tâches construite avec React et NestJS. Gérez vos tâches quotidiennes avec style et efficacité ! 🚀

## 🌟 Fonctionnalités

- ✅ **Gestion complète des tâches** : Création, modification et suppression
- 🔄 **Statuts personnalisables** : À faire, En cours, Terminé
- 🎯 **Système de priorités** : Basse, Moyenne, Haute
- 📅 **Dates d'échéance** : Planifiez vos tâches dans le temps
- 🔍 **Tri intelligent** : Par priorité ou date d'échéance
- 📊 **Tableau de bord** : Visualisez vos statistiques en temps réel
- 💫 **Interface moderne** : Design épuré et animations fluides
- 🌐 **Architecture REST** : API robuste et évolutive

## 🛠️ Technologies Utilisées

### Frontend

- **React 18** - Framework UI moderne
- **TailwindCSS** - Styling utilitaire
- **React Query** - Gestion d'état et cache
- **HeadlessUI** - Composants accessibles
- **Axios** - Client HTTP
- **React Hot Toast** - Notifications élégantes

### Backend

- **NestJS** - Framework Node.js progressif
- **TypeScript** - Typage statique
- **JSON Storage** - Stockage de données léger
- **Class Validator** - Validation des données

## 🚀 Installation

### Prérequis

- Node.js (v16 ou supérieur)
- Yarn ou npm

### Configuration du Backend

```bash
cd task-manager-backend
yarn install
yarn start:dev
```

Le serveur démarrera sur `http://localhost:4000`

### Configuration du Frontend

```bash
cd task-manager-frontend
yarn install
yarn start
```

L'application sera accessible sur `http://localhost:3000`

## 📁 Structure du Projet

```
task-manager/
├── task-manager-frontend/    # Application React
│   ├── src/
│   │   ├── components/      # Composants React
│   │   ├── services/        # Services API
│   │   ├── constants/       # Constants & configurations
│   │   └── config/         # Configuration de l'application
│   └── public/             # Assets statiques
│
└── task-manager-backend/    # Serveur NestJS
    ├── src/
    │   ├── dto/            # Objets de transfert de données
    │   ├── enums/          # Énumérations
    │   └── storage/        # Gestion du stockage
    └── data/               # Données JSON
```

## 🔄 API Endpoints

### Tâches

- `GET /tasks` - Récupérer toutes les tâches
- `GET /tasks/:id` - Récupérer une tâche spécifique
- `POST /tasks` - Créer une nouvelle tâche
- `PUT /tasks/:id` - Mettre à jour une tâche
- `DELETE /tasks/:id` - Supprimer une tâche

## 🙏 Resources

- [NestJS](https://nestjs.com/) pour le framework backend
- [React](https://reactjs.org/) pour le framework frontend
- [TailwindCSS](https://tailwindcss.com/) pour le système de design
- Et tous les autres packages open source utilisés dans ce projet

---

<p align="center">
  Fait avec ❤️ pour la productivité
</p>
