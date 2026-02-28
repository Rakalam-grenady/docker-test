# Stock Admin

Application Next.js 15.5.9 pour la gestion de stock (back-office admin).

## Technologies

- Next.js 15.5.9 (App Router)
- TypeScript
- TailwindCSS
- Zustand (gestion d'état)
- Axios (requêtes HTTP)
- React Hook Form + Zod (validation)

## Installation

```bash
npm install
```

## Démarrage

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3001](http://localhost:3001) (ou le port suivant disponible).

## Configuration API

L'API backend doit être accessible sur `http://localhost:3001`.

## Structure

```
src/
  app/
    login/          # Page de connexion
    dashboard/      # Dashboard admin
    products/       # Gestion des produits
      page.tsx      # Liste des produits
      new/          # Création d'un produit
      [id]/         # Édition d'un produit
  lib/
    api.ts          # Instance Axios configurée
    auth.ts         # Fonctions d'authentification
    types.ts        # Types TypeScript
  store/
    auth.store.ts   # Store Zustand pour l'auth
  components/
    ui/             # Composants UI réutilisables
    AdminLayout.tsx # Layout avec sidebar
```

## Fonctionnalités

- ✅ Authentification (login/logout)
- ✅ Refresh token automatique
- ✅ Protection des routes
- ✅ CRUD produits
- ✅ Interface admin avec sidebar

