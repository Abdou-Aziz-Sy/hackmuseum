# Guide d'Installation - Musée des Civilisations Noires

## Prérequis

Avant de commencer, vous devez installer les outils suivants :

### 1. Node.js (Version 18 ou supérieure)

**Option A : Téléchargement direct**
1. Allez sur [nodejs.org](https://nodejs.org/)
2. Téléchargez la version LTS (Long Term Support)
3. Exécutez l'installateur et suivez les instructions

**Option B : Via Chocolatey (Windows)**
```powershell
# Dans PowerShell en tant qu'administrateur
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Puis installer Node.js
choco install nodejs
```

**Option C : Via winget (Windows 10/11)**
```powershell
winget install OpenJS.NodeJS
```

### 2. Vérification de l'installation

Ouvrez un terminal (PowerShell, Command Prompt, ou Terminal) et vérifiez :

```bash
node --version
npm --version
```

Vous devriez voir des numéros de version (ex: v18.17.0 et 9.6.7)

## Installation du projet

### 1. Naviguer vers le dossier du projet

```bash
cd "C:\Users\mfofa\hackmuseum-front\hackmuseum-main"
```

### 2. Installer les dépendances

```bash
npm install
```

Cette commande va :
- Lire le fichier `package.json`
- Télécharger toutes les dépendances nécessaires
- Créer un dossier `node_modules`

### 3. Lancer le serveur de développement

```bash
npm run dev
```

Le serveur va démarrer et vous verrez quelque chose comme :
```
  VITE v5.4.19  ready in 1234 ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://192.168.1.100:8080/
```

### 4. Ouvrir dans le navigateur

Ouvrez votre navigateur et allez sur : `http://localhost:8080`

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement avec rechargement automatique
- `npm run build` : Crée une version optimisée pour la production dans le dossier `dist/`
- `npm run preview` : Prévisualise la version de production
- `npm run lint` : Vérifie le code pour les erreurs

## Dépannage

### Erreur "npm n'est pas reconnu"
- Vérifiez que Node.js est bien installé
- Redémarrez votre terminal
- Ajoutez Node.js au PATH système si nécessaire

### Erreur de permissions
- Sur Windows, lancez PowerShell en tant qu'administrateur
- Sur Mac/Linux, utilisez `sudo` si nécessaire

### Port déjà utilisé
- Changez le port dans `vite.config.ts`
- Ou arrêtez l'application qui utilise le port 8080

### Problèmes de cache
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

## Structure du projet

```
hackmuseum-main/
├── public/                 # Fichiers statiques
├── src/
│   ├── components/        # Composants réutilisables
│   ├── pages/            # Pages de l'application
│   ├── contexts/         # Contextes React (langues, etc.)
│   ├── data/             # Données (œuvres, traductions)
│   ├── hooks/            # Hooks personnalisés
│   ├── lib/              # Utilitaires
│   └── assets/           # Images et ressources
├── package.json          # Configuration du projet
├── vite.config.ts        # Configuration Vite
└── tailwind.config.ts    # Configuration Tailwind
```

## Support

Si vous rencontrez des problèmes :
1. Vérifiez que Node.js est installé et à jour
2. Supprimez `node_modules` et réinstallez avec `npm install`
3. Vérifiez les logs d'erreur dans le terminal
4. Consultez la documentation de [Vite](https://vitejs.dev/) ou [React](https://react.dev/)

## Fonctionnalités du projet

- ✅ **Galerie interactive** avec œuvres d'art
- ✅ **Support multilingue** (Français, Anglais, Wolof)
- ✅ **Design responsive** adapté mobile/desktop
- ✅ **Animations fluides** et transitions
- ✅ **Audio guide** intégré
- ✅ **Scan QR Code** pour accès rapide
- ✅ **Navigation intuitive** entre les pages

Le projet est maintenant prêt à être utilisé localement !
