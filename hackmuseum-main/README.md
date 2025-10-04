# Musée des Civilisations Noires - Frontend

Application web moderne pour le Musée des Civilisations Noires, offrant une expérience digitale interactive pour découvrir le patrimoine culturel africain.

## Fonctionnalités

- **Galerie interactive** : Exploration des œuvres d'art avec descriptions multilingues
- **Support multilingue** : Français, Anglais et Wolof
- **Audio guide** : Descriptions audio pour une expérience immersive
- **Scan QR Code** : Accès rapide aux informations des œuvres
- **Design responsive** : Interface adaptée à tous les appareils

## Technologies utilisées

- **React 18** avec TypeScript
- **Vite** pour le build et le développement
- **Tailwind CSS** pour le styling
- **Radix UI** pour les composants
- **React Router** pour la navigation
- **React Query** pour la gestion d'état

## Installation et développement

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd hackmuseum-main
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:8080
   ```

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Build de production
- `npm run preview` : Prévisualise le build de production
- `npm run lint` : Vérification du code avec ESLint

## Structure du projet

```
src/
├── components/     # Composants réutilisables
├── pages/         # Pages de l'application
├── contexts/      # Contextes React (langues, etc.)
├── data/          # Données statiques (œuvres, traductions)
├── hooks/         # Hooks personnalisés
├── lib/           # Utilitaires et configurations
└── assets/        # Images et ressources statiques
```

## Déploiement

Pour déployer l'application :

1. **Build de production**
   ```bash
   npm run build
   ```

2. **Les fichiers générés** se trouvent dans le dossier `dist/`

3. **Servir les fichiers** avec un serveur web (nginx, apache, etc.)

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

Ce projet est développé pour le Musée des Civilisations Noires.