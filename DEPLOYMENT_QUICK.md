# 🚀 VERCEL DÉPLOIEMENT - ÉTAPES EXACTES

## ⏱️ Temps Total: 15 minutes

---

## ÉTAPE 1: GitHub Setup (5 min)

### Sur votre PC (PowerShell)

```powershell
# 1. Aller dans votre dossier projet
cd c:\Users\Azuz\Downloads\architecture-portfolio

# 2. Initialiser Git
git init

# 3. Ajouter tous les fichiers
git add .

# 4. Premier commit
git commit -m "Initial commit: Architecture portfolio"

# 5. Renommer branche
git branch -M main
```

### Sur GitHub.com (5 min)

1. **Créer compte**: https://github.com/signup (si pas déjà fait)

2. **Créer nouveau repository**:
   - Aller à https://github.com/new
   - **Repository name**: `architecture-portfolio`
   - **Description**: Architecture Portfolio avec MongoDB
   - **Visibility**: Public ✅
   - **Cliquer**: "Create repository"

3. **Ajouter votre repo**:
   ```powershell
   git remote add origin https://github.com/VOTRE_USERNAME/architecture-portfolio.git
   git push -u origin main
   ```
   
   *Remplacer `VOTRE_USERNAME` par votre nom d'utilisateur GitHub*

4. **Vérifier**: Rafraîchir votre repo sur github.com
   - ✅ Vous devez voir vos fichiers

---

## ÉTAPE 2: Vercel Deploy (5 min)

### 1. Créer compte Vercel

- Aller à: https://vercel.com/signup
- Cliquer: **"Continue with GitHub"**
- Autoriser Vercel à accéder GitHub

### 2. Importer votre projet

- Cliquer: **"Add New Project"**
- Dans "Import Git Repository":
  - Chercher: `architecture-portfolio`
  - Cliquer sur votre repo

### 3. Configurer Project

La page devrait ressembler à:
```
✅ Root Directory: ./
✅ Framework: Next.js
✅ Node.js Version: 18.x
```

Cliquer: **"Continue"**

### 4. Ajouter Variables d'Environnement

**IMPORTANT**: Cette étape est cruciale!

Dans "Environment Variables", ajouter exactement:

#### Variable 1: MONGODB_URI
```
Name: MONGODB_URI
Value: mongodb+srv://portfoliouser:NfeVvNjwbdf08IRb@cluster0.wf2d5ri.mongodb.net/?appName=Cluster0
```

#### Variable 2: ADMIN_EMAIL
```
Name: ADMIN_EMAIL
Value: admin@architecture-portfolio.com
```

#### Variable 3: ADMIN_PASSWORD
```
Name: ADMIN_PASSWORD
Value: Admin123!Secure
```

#### Variable 4: NEXTAUTH_SECRET
```
Name: NEXTAUTH_SECRET
Value: c7bECY06YXOdOoYH4RQmeX90TPWXW/6nbIBkW47HBKw=
```

#### Variable 5: NEXTAUTH_URL
```
Name: NEXTAUTH_URL
Value: https://architecture-portfolio-YOUR_ID.vercel.app
```

*Note: Vous obtiendrez l'URL exacte après le premier déploiement*

Cliquer: **"Deploy"**

### 5. Attendre le Déploiement

```
⏳ Building...
⏳ Deploying...
✅ Success! Deployment complete
```

**URL de votre site**:
```
https://architecture-portfolio-xxx123.vercel.app/
```

---

## ÉTAPE 3: Vérifier le Déploiement ✅

### 1. Test Accueil
```
https://architecture-portfolio-xxx.vercel.app/
✅ La page doit charger
✅ Vidéo en fond doit jouer
✅ Projets doivent afficher
```

### 2. Test Admin Login
```
https://architecture-portfolio-xxx.vercel.app/admin/login

Email: admin@architecture-portfolio.com
Password: Admin123!Secure

✅ Vous devez pouvoir vous connecter
✅ Redirection vers dashboard
```

### 3. Test CRUD
```
Dashboard: Ajouter un projet
✅ Formulaire doit s'afficher
✅ Projet créé doit apparaître
✅ Projets modifiable/supprimable
```

### 4. Test Contact Form
```
Accueil → Section Contact → Envoyer message
✅ Validation des champs
✅ Message de succès
```

---

## ÉTAPE 4: Configurer Domaine Custom (Optionnel - 10 min)

### Option A: GoDaddy/Namecheap (Recommandé)

#### Sur GoDaddy/Namecheap:
1. Acheter domaine: `saa-archi.com`
2. Aller à DNS settings
3. Modifier les nameservers avec ceux de Vercel:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

#### Sur Vercel:
1. Aller à votre Project Settings
2. Cliquer "Domains"
3. Ajouter domaine: `saa-archi.com`
4. Suivre les instructions

4. Attendre 24-48h pour propagation DNS

### Option B: Vercel DNS (Plus facile)

1. Acheter domaine sur Vercel:
   - Project Settings → Domains
   - "Purchase New Domain"
   - Suivre les instructions

2. Vercel gère automatiquement tout

---

## 🎯 RÉSUMÉ RAPIDE

| Étape | Durée | Action |
|-------|-------|--------|
| 1 | 5 min | Git + GitHub |
| 2 | 5 min | Vercel deploy |
| 3 | 3 min | Vérifier |
| 4 | 2 min | Tester |
| **TOTAL** | **15 min** | **✅ Live!** |

---

## ✅ Après le Déploiement

### Mettre à jour NEXTAUTH_URL

Après le premier déploiement:

1. Aller à Vercel Dashboard
2. Copier votre URL: `https://architecture-portfolio-xxx.vercel.app`
3. Mettre à jour la variable `NEXTAUTH_URL` avec cette URL
4. Redéployer
5. ✅ Prêt!

---

## 🔄 Déploiement Automatique

À partir de maintenant, **TOUT EST AUTOMATIQUE**:

```
Vous faites: git push origin main
↓
GitHub reçoit votre code
↓
Vercel détecte le push
↓
Vercel build et déploie
↓
Votre site est à jour ✅
```

---

## 💡 Tips

### Annuler un déploiement
- Vercel Dashboard → Deployments
- Cliquer sur le déploiement problématique
- Cliquer "Rollback"

### Voir les logs
- Vercel Dashboard → Deployments
- Cliquer sur le déploiement
- Cliquer "Logs"

### Redéployer
- Vercel Dashboard → Deployments
- 3 dots menu → "Redeploy"

---

## ❌ Problèmes Courants

### Site blanc (erreur)
```
✅ Solution: Vérifier les logs Vercel
✅ Souvent: Variable .env manquante
✅ Fix: Ajouter variable manquante → Redeploy
```

### MongoDB timeout
```
✅ Solution: Vérifier MONGODB_URI
✅ Solution: IP whitelist (ajouter 0.0.0.0/0)
✅ Solution: Vérifier cluster MongoDB actif
```

### NextAuth erreur login
```
✅ Solution: NEXTAUTH_SECRET correct?
✅ Solution: NEXTAUTH_URL correct?
✅ Solution: Redéployer après fix
```

---

## 📞 Support Vercel

- 📧 **Email**: support@vercel.com
- 📖 **Docs**: https://vercel.com/docs
- 💬 **Discord**: https://discord.gg/vercel

---

## 🎉 PRÊT À DÉPLOYER?

**Allez-y! Suivez simplement les 4 étapes et c'est bon! 🚀**

Temps total: **15 minutes**
Coût: **0€** (Vercel gratuit)

**Après**: Vous avez un site live en production! ✅
