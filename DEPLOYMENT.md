# 🚀 Guide Complet de Déploiement

**Date**: 19 Janvier 2026
**Projet**: Architecture Portfolio (Next.js 15 + MongoDB + NextAuth)

---

## 🎯 Options de Déploiement

### 📊 Comparaison

| Platform | Coût | Setup | Performance | Recommandé |
|----------|------|-------|-------------|-----------|
| **Vercel** | Gratuit* | 5 min | Excellent | ⭐⭐⭐⭐⭐ |
| **Railway** | $5/mois | 10 min | Très bon | ⭐⭐⭐⭐ |
| **Docker** | Varie | 20 min | Bon | ⭐⭐⭐⭐ |
| **DigitalOcean** | $6/mois | 30 min | Excellent | ⭐⭐⭐⭐ |

**Recommandation**: **VERCEL** (créateur de Next.js)

---

## 1️⃣ VERCEL (Recommandé ⭐⭐⭐⭐⭐)

### Avantages
✅ Gratuit pour les projets petits/moyens
✅ Deploy en 1 clic depuis GitHub
✅ Optimisé pour Next.js
✅ Déploiement automatique à chaque push
✅ Support NextAuth intégré
✅ Performance exceptionnelle

### Étapes de Déploiement

#### Étape 1: GitHub Setup (5 min)

```bash
# 1. Initialiser Git (si pas déjà fait)
cd c:\Users\Azuz\Downloads\architecture-portfolio
git init

# 2. Ajouter fichiers
git add .

# 3. Premier commit
git commit -m "Initial commit: Architecture portfolio with MongoDB & NextAuth"

# 4. Créer repo sur GitHub
# Aller à https://github.com/new
# Créer repo: architecture-portfolio
# NE PAS initialiser avec README

# 5. Ajouter remote
git remote add origin https://github.com/VOTRE_USERNAME/architecture-portfolio.git

# 6. Push
git branch -M main
git push -u origin main
```

#### Étape 2: Vercel Setup (5 min)

1. **Aller sur** https://vercel.com/signup
   - S'inscrire avec GitHub

2. **Importer le projet**
   - Cliquer "Add New Project"
   - Sélectionner votre repo GitHub
   - Cliquer "Import"

3. **Configurer les variables d'environnement**
   - Dans "Environment Variables", ajouter:

```
MONGODB_URI = mongodb+srv://portfoliouser:NfeVvNjwbdf08IRb@cluster0.wf2d5ri.mongodb.net/?appName=Cluster0

ADMIN_EMAIL = admin@architecture-portfolio.com

ADMIN_PASSWORD = Admin123!Secure

NEXTAUTH_SECRET = c7bECY06YXOdOoYH4RQmeX90TPWXW/6nbIBkW47HBKw=

NEXTAUTH_URL = https://votre-domaine.com
```

**Important**: Remplacer `votre-domaine.com` par votre URL Vercel

4. **Déployer**
   - Cliquer "Deploy"
   - Attendre ~2-3 minutes

#### Étape 3: Vérifier le Déploiement

```
✅ Deployment successful!
🌐 URL: https://architecture-portfolio-abc123.vercel.app/
📊 Dashboard: https://vercel.com/...
```

#### Étape 4: Configuration Domaine (Optionnel)

1. Acheter domaine (ex: **saa-archi.com**)
   - GoDaddy, Namecheap, ou autre registrar

2. Ajouter domaine dans Vercel
   - Project Settings → Domains
   - Ajouter votre domaine
   - Suivre les instructions DNS

---

## 2️⃣ RAILWAY (Alternative Simple)

### Avantages
✅ $5/mois (crédit $5/mois gratuit initialement)
✅ Très facile setup
✅ Support MongoDB
✅ Interface intuitive

### Étapes

1. **Signup**: https://railway.app/
   - S'inscrire avec GitHub

2. **New Project**
   - Cliquer "New Project"
   - "Deploy from GitHub repo"
   - Sélectionner votre repo

3. **Configurer Variables**
   - Ajouter .env.local variables dans Railway

4. **Déployer**
   - Railway déploie automatiquement

---

## 3️⃣ DOCKER (Contrôle Total)

### Avantages
✅ Fonctionne partout
✅ Contrôle complet
✅ Production-ready

### Création du Dockerfile

Créer fichier `Dockerfile` à la racine:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

ENV NODE_ENV=production
ENV NEXTAUTH_URL=http://localhost:3000

CMD ["npm", "start"]
```

### Build & Run Local

```bash
# Build image
docker build -t architecture-portfolio .

# Run container
docker run -p 3000:3000 \
  -e MONGODB_URI="..." \
  -e ADMIN_EMAIL="..." \
  -e ADMIN_PASSWORD="..." \
  -e NEXTAUTH_SECRET="..." \
  architecture-portfolio
```

### Déployer sur Docker Hub

```bash
# Login
docker login

# Tag image
docker tag architecture-portfolio:latest username/architecture-portfolio:latest

# Push
docker push username/architecture-portfolio:latest
```

---

## 4️⃣ DIGITALOCEAN (VPS)

### Avantages
✅ $6/mois (Droplet)
✅ Contrôle complet
✅ Performance excellente

### Étapes

1. **Créer Droplet**
   - https://cloud.digitalocean.com
   - Ubuntu 22.04 + App Platform
   - Région: Europe (si clients en Europe)

2. **SSH sur Droplet**
```bash
ssh root@IP_ADDRESS
```

3. **Setup Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Clone & Deploy**
```bash
git clone https://github.com/username/architecture-portfolio.git
cd architecture-portfolio

npm install --legacy-peer-deps
npm run build

# Setup PM2 pour production
npm install -g pm2
pm2 start npm --name "portfolio" -- start
pm2 startup
pm2 save
```

5. **Setup Nginx**
```bash
sudo apt-get install nginx
# Configurer reverse proxy vers port 3000
```

---

## ✅ CHECKLIST PRÉ-DÉPLOIEMENT

Avant de déployer, vérifier:

### Code
- [ ] `npm run build` fonctionne localement
- [ ] Pas d'erreurs TypeScript
- [ ] Pas d'erreurs build
- [ ] Tous les tests passent

### Configuration
- [ ] `.env.local` configuré correctement
- [ ] MONGODB_URI valide
- [ ] ADMIN_EMAIL/PASSWORD sécurisés
- [ ] NEXTAUTH_SECRET généré (32+ chars)
- [ ] NEXTAUTH_URL configuré

### Database
- [ ] MongoDB Atlas cluster actif
- [ ] IP whitelist vérifié (ajouter 0.0.0.0/0 ou IP serveur)
- [ ] Backup activé
- [ ] Accès DB testé

### Security
- [ ] Pas de secrets en git
- [ ] .gitignore correct
- [ ] HTTPS configuré
- [ ] CORS configuré

### Performance
- [ ] Images optimisées
- [ ] CSS minifié
- [ ] JavaScript minifié
- [ ] Cache headers configurés

---

## 🎯 RECOMMANDATION: VERCEL (Pas à pas)

### Phase 1: GitHub (10 min)

```bash
# 1. Initialiser Git
cd c:\Users\Azuz\Downloads\architecture-portfolio
git init
git add .
git commit -m "Initial commit"

# 2. Créer repo sur github.com
# https://github.com/new
# Créer: architecture-portfolio

# 3. Ajouter remote
git remote add origin https://github.com/VOTRE_USERNAME/architecture-portfolio.git
git branch -M main
git push -u origin main
```

### Phase 2: Vercel (5 min)

```
1. Aller à https://vercel.com
2. Cliquer "Sign Up" → "Continue with GitHub"
3. Connecter votre compte GitHub
4. Cliquer "Add New Project"
5. Sélectionner "architecture-portfolio"
6. Cliquer "Import"
7. Ajouter les 5 variables d'environnement
8. Cliquer "Deploy"
9. Attendre 2-3 min
10. ✅ Prêt!
```

### Phase 3: Domaine (15 min optionnel)

```
1. Acheter domaine: saa-archi.com
2. Ajouter domaine dans Vercel
3. Configurer DNS
4. Attendre propagation (24-48h)
5. ✅ Domaine configuré!
```

---

## 📊 Coûts Estimés

### Option 1: Vercel (Gratuit)
- Vercel: **$0** (gratuit pour < 100GB)
- MongoDB: **$0** (free tier)
- Domaine: **~€10/an**
- **TOTAL: ~€10/an** ✅

### Option 2: Railway ($5/mois)
- Railway: **$5/mois** (après crédit gratuit)
- MongoDB: **$0** (free tier)
- Domaine: **~€10/an**
- **TOTAL: ~€70/an**

### Option 3: DigitalOcean ($6/mois)
- Droplet: **$6/mois**
- MongoDB Atlas: **$0** (free tier)
- Domaine: **~€10/an**
- **TOTAL: ~€82/an**

---

## 🔐 Sécurité en Production

### ✅ À Faire

```bash
# 1. Variables sensibles
# ✅ Stocker dans Vercel/.env, pas en git

# 2. HTTPS
# ✅ Automatique avec Vercel

# 3. Domaine
# ✅ Utiliser domaine custom, pas Vercel default

# 4. MongoDB
# ✅ IP Whitelist
# ✅ Backup régulier
# ✅ Monitoring actif

# 5. Admin Password
# ✅ Changer en production
# ✅ Minimum 12 caractères
# ✅ Caractères spéciaux
```

### ✅ À Tester Après Deploy

```bash
# 1. Accueil charge
https://votre-domaine.com ✅

# 2. Projets affichent
Cliquer sur un projet ✅

# 3. Admin login
https://votre-domaine.com/admin/login ✅

# 4. CRUD fonctionne
Ajouter/modifier/supprimer projet ✅

# 5. Contact form
Tester le formulaire ✅

# 6. Performances
Vérifier Core Web Vitals ✅
```

---

## 🆘 Troubleshooting

### ❌ Build Échoue
```bash
# Vérifier logs
npm run build

# Solutions:
- npm install --legacy-peer-deps
- Vérifier Node version (18+)
- Vérifier dépendances
```

### ❌ MongoDB ne Connecte pas
```bash
# Vérifier:
- MONGODB_URI correct
- IP whitelist (0.0.0.0/0)
- Cluster actif
- Credentials corrects
```

### ❌ NextAuth Erreur
```bash
# Vérifier:
- NEXTAUTH_SECRET généré
- NEXTAUTH_URL correct
- ADMIN_EMAIL/PASSWORD configurés
```

### ❌ Images ne Chargent pas
```bash
# Vérifier:
- URLs Cloudinary valides
- Cloudinary actif
- CORS configuré
```

---

## 📞 Support Post-Déploiement

### Monitoring
- ✅ Vercel Dashboard: Performance, Logs
- ✅ MongoDB Atlas: Status, Backups
- ✅ Uptime Monitor: https://uptime.com

### Maintenance
- ✅ Vérifier logs régulièrement
- ✅ Tester CRUD mensuellement
- ✅ Backup MongoDB automatiques
- ✅ Mettre à jour dépendances

### Escalade (si problèmes)
1. Vérifier les logs Vercel
2. Vérifier MongoDB Atlas
3. Vérifier les variables .env
4. Redéployer si nécessaire

---

## 🎉 Prochaines Étapes

1. **Maintenant**: Lire ce guide
2. **Demain**: Créer compte Vercel
3. **Demain**: GitHub + Vercel setup
4. **J+2**: Tester production
5. **J+3**: Acheter domaine (optionnel)
6. **J+4**: Domaine configuré

---

## 📋 Récapitulatif

**Meilleure Option**: **VERCEL**
- Gratuit
- Rapide (5 min)
- Optimisé Next.js
- Auto-déploiement
- Support excellent

**Coût Total Minimal**:
- Vercel: Gratuit ✅
- MongoDB: Gratuit (free tier) ✅
- Domaine: €10/an (optionnel)

**URL de Déploiement**:
```
https://architecture-portfolio-abc123.vercel.app/
(ou votre-domaine.com)
```

---

**Prêt à déployer? Commencez par VERCEL! 🚀**
