# Guide de Déploiement - Musée des Civilisations Noires

## 🚀 Déploiement en Production

### Prérequis pour le déploiement

1. **Node.js 18+** installé
2. **Compte sur une plateforme de déploiement** (Vercel, Netlify, ou serveur)
3. **Nom de domaine** (optionnel mais recommandé)

## 📦 Build de Production

### 1. Préparer le build

```bash
# Installer les dépendances
npm install

# Build de production optimisé
npm run build

# Vérifier le build
npm run preview
```

Le dossier `dist/` contient tous les fichiers optimisés pour la production.

### 2. Optimisations automatiques

- ✅ **Minification** du JavaScript et CSS
- ✅ **Code splitting** par chunks
- ✅ **Tree shaking** pour supprimer le code inutilisé
- ✅ **Compression** des assets
- ✅ **Lazy loading** des images
- ✅ **PWA** prêt pour l'installation

## 🌐 Options de Déploiement

### Option 1: Vercel (Recommandé)

1. **Connecter le repository**
   ```bash
   # Installer Vercel CLI
   npm i -g vercel
   
   # Déployer
   vercel
   ```

2. **Configuration automatique**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Option 2: Netlify

1. **Via l'interface web**
   - Connecter le repository GitHub/GitLab
   - Build Command: `npm run build`
   - Publish Directory: `dist`

2. **Via CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

### Option 3: Serveur VPS/Dédié

1. **Upload des fichiers**
   ```bash
   # Copier le dossier dist/ vers le serveur
   scp -r dist/* user@server:/var/www/html/
   ```

2. **Configuration Nginx**
   ```nginx
   server {
       listen 80;
       server_name museecivilisationsnoires.sn;
       root /var/www/html;
       index index.html;

       # Gestion des routes SPA
       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache pour les assets statiques
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # Compression
       gzip on;
       gzip_types text/css application/javascript image/svg+xml;
   }
   ```

## 🔧 Configuration Post-Déploiement

### 1. Variables d'environnement

Créer un fichier `.env.production` :
```env
VITE_APP_URL=https://museecivilisationsnoires.sn
VITE_APP_NAME=Musée des Civilisations Noires
VITE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### 2. Domain et SSL

- **Acheter un nom de domaine** : `museecivilisationsnoires.sn`
- **Configurer SSL** avec Let's Encrypt (gratuit)
- **Redirection HTTPS** obligatoire

### 3. Analytics et Monitoring

Ajouter Google Analytics :
```html
<!-- Dans index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📊 Performance et SEO

### Optimisations automatiques

- ✅ **Core Web Vitals** optimisés
- ✅ **Lighthouse Score** 90+
- ✅ **SEO** avec meta tags complets
- ✅ **Schema.org** pour les moteurs de recherche
- ✅ **Sitemap** généré automatiquement

### Vérifications post-déploiement

1. **Google PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Score mobile et desktop > 90

2. **Lighthouse Audit**
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 100

3. **GTmetrix**
   - URL: https://gtmetrix.com/
   - Grade A recommandé

## 🔒 Sécurité

### Headers de sécurité

Ajouter dans la configuration serveur :
```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com
```

### HTTPS obligatoire

- Redirection automatique HTTP → HTTPS
- Certificat SSL valide
- HSTS activé

## 📱 PWA et Mobile

### Installation sur mobile

Le site est configuré comme PWA :
- ✅ **Installation** sur écran d'accueil
- ✅ **Mode offline** basique
- ✅ **Notifications** (optionnel)
- ✅ **Splash screen** personnalisé

### Test mobile

1. Ouvrir sur mobile : `https://museecivilisationsnoires.sn`
2. Ajouter à l'écran d'accueil
3. Tester le mode hors ligne

## 🚨 Monitoring et Maintenance

### Surveillance

1. **Uptime monitoring**
   - UptimeRobot (gratuit)
   - Pingdom
   - StatusCake

2. **Error tracking**
   - Sentry (gratuit jusqu'à 5K erreurs/mois)
   - LogRocket

3. **Performance monitoring**
   - Google Analytics 4
   - Hotjar (heatmaps)

### Maintenance

- **Mise à jour** des dépendances mensuelle
- **Sauvegarde** automatique du contenu
- **Monitoring** des performances
- **Tests** de régression après mises à jour

## 📈 Analytics et Métriques

### Métriques importantes

- **Visiteurs uniques** par jour/semaine/mois
- **Temps passé** sur le site
- **Pages les plus visitées**
- **Taux de rebond**
- **Conversions** (scans QR, audio play)

### KPIs du Musée

- **Engagement** : temps moyen par visite
- **Découverte** : œuvres les plus vues
- **Multilingue** : répartition par langue
- **Mobile** : % d'utilisation mobile vs desktop

## 🎯 Checklist de Déploiement

### Avant le lancement

- [ ] Build de production réussi
- [ ] Tests sur différents navigateurs
- [ ] Tests sur mobile et tablette
- [ ] Vérification des liens
- [ ] Test des fonctionnalités (QR, audio)
- [ ] Validation SEO
- [ ] Configuration analytics
- [ ] Test de performance

### Après le lancement

- [ ] Vérification uptime
- [ ] Monitoring des erreurs
- [ ] Analyse des métriques
- [ ] Feedback utilisateurs
- [ ] Optimisations basées sur les données

## 📞 Support

En cas de problème :
1. Vérifier les logs du serveur
2. Consulter Google Analytics pour les erreurs
3. Tester sur différents appareils
4. Contacter l'équipe technique

---

**Le site est maintenant prêt pour un déploiement professionnel ! 🎉**

