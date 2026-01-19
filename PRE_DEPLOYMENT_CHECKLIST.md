# ✅ CHECKLIST PRÉ-DÉPLOIEMENT

**Avant de déployer sur Vercel, vérifier cette checklist!**

---

## 🔍 VÉRIFICATIONS LOCALES

### Code & Build

- [ ] **Build réussit**
  ```bash
  npm run build
  # Doit afficher: ✓ Build successful
  ```

- [ ] **Pas d'erreurs TypeScript**
  ```bash
  npm run build 2>&1 | grep -i error
  # Ne doit rien afficher
  ```

- [ ] **Serveur démarre**
  ```bash
  npm run dev
  # ✓ Ready in X.Xs
  ```

- [ ] **Pas d'erreurs console**
  - Ouvrir: http://localhost:3000
  - Ouvrir DevTools (F12)
  - Console ne doit avoir aucune erreur rouge

### Pages Fonctionnelles

- [ ] **Accueil charge**
  - http://localhost:3000 ✅
  - Logo visible ✅
  - Vidéo joue ✅
  - Projets affichent ✅

- [ ] **Navigation fonctionne**
  - Scroll smooth ✅
  - Filtres projets marchent ✅
  - Liens sociaux valides ✅

- [ ] **Détail projet charge**
  - Cliquer un projet ✅
  - Images affichent ✅
  - Infos complètes ✅
  - Retour fonctionne ✅

- [ ] **Admin Login accès**
  - http://localhost:3000/admin/login ✅
  - Formulaire visible ✅
  - Email/password inputs ✅

- [ ] **Admin Dashboard CRUD**
  - Login avec: admin@architecture-portfolio.com / Admin123!Secure ✅
  - Tableau projets affiche ✅
  - Bouton "Ajouter projet" ✅
  - Ajouter un projet: formulaire ✅
  - Modifier un projet: modal ✅
  - Supprimer un projet: confirmation ✅
  - Notifications succès/erreur ✅

- [ ] **Formulaire Contact**
  - Section contact visible ✅
  - Tous les champs: Nom, Email, Tel, Sujet, Message ✅
  - Validation fonctionne ✅
  - Bouton "Envoyer le message" ✅
  - Succès message ✅

### Configuration Locale

- [ ] **`.env.local` configuré**
  ```
  MONGODB_URI=mongodb+srv://...
  ADMIN_EMAIL=admin@...
  ADMIN_PASSWORD=***
  NEXTAUTH_SECRET=...
  NEXTAUTH_URL=http://localhost:3000
  ```

- [ ] **MongoDB connecté**
  - Projets chargent ✅
  - Pas de timeout ✅
  - Création projet fonctionne ✅

- [ ] **NextAuth fonctionne**
  - Login valide ✅
  - Redirection OK ✅
  - Session persiste ✅
  - Logout fonctionne ✅

---

## 🔐 SÉCURITÉ

- [ ] **Pas de secrets en git**
  ```bash
  git log --all --full-history -- ".env*"
  # Ne doit retourner rien
  ```

- [ ] **`.gitignore` correct**
  ```
  .env.local ✅
  .env*.local ✅
  node_modules/ ✅
  .next/ ✅
  ```

- [ ] **Credentials sécurisés**
  - ADMIN_PASSWORD: Minimum 12 caractères ✅
  - NEXTAUTH_SECRET: Généré (32+ chars) ✅
  - Pas de placeholders ✅

- [ ] **MongoDB sécurisé**
  - IP Whitelist: 0.0.0.0/0 (pour Vercel) ✅
  - User/Pass fournis (pas default) ✅
  - Atlas Network: Accessible ✅

---

## 📦 DÉPENDANCES

- [ ] **Dépendances installées**
  ```bash
  npm list mongoose next-auth | grep -E "mongoose|next-auth"
  # Doit afficher les versions
  ```

- [ ] **Package.json a bon format**
  ```json
  {
    "name": "my-v0-project",
    "version": "0.1.0",
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      ...
    },
    "dependencies": {
      "next": "^15.5.8",
      "react": "^19.1.0",
      "mongoose": "^8.x.x",
      "next-auth": "^5.x.x",
      ...
    }
  }
  ```

- [ ] **Node modules compilés**
  ```bash
  ls node_modules | wc -l
  # Doit avoir 248+ packages
  ```

---

## 📂 STRUCTURE

- [ ] **Fichiers essentiels présents**
  ```
  ✅ app/page.tsx
  ✅ app/layout.tsx
  ✅ app/actions/projects.ts
  ✅ app/api/auth/[...nextauth]/route.ts
  ✅ app/api/contact/route.ts
  ✅ app/projets/[id]/page.tsx
  ✅ app/admin/login/page.tsx
  ✅ app/admin/dashboard/page.tsx
  ✅ lib/mongodb.ts
  ✅ models/Project.ts
  ✅ middleware.ts
  ✅ next.config.mjs
  ✅ tsconfig.json
  ✅ tailwind.config.ts
  ✅ package.json
  ```

- [ ] **Pas de fichiers obsolètes**
  ```
  ❌ app/projets/page.tsx (doit être supprimé)
  ❌ app/projets/lib/projects.ts (doit être supprimé)
  ❌ app/admin/upload/page.tsx (doit être supprimé)
  ```

---

## 🌐 PERFORMANCES

- [ ] **Temps de build acceptable**
  ```
  npm run build
  # Doit prendre < 60 secondes
  ```

- [ ] **Image optimisées**
  - Logo: /logo1.jpg ✅
  - Projets: URLs Cloudinary ✅

- [ ] **Pas de console errors**
  - F12 → Console
  - Aucune erreur rouge ✅

---

## 📋 VERCEL SETUP

Avant de cliquer "Deploy":

- [ ] **GitHub repo créé**
  - https://github.com/USERNAME/architecture-portfolio ✅
  - Tous les fichiers pusshés ✅

- [ ] **Vercel signup complète**
  - https://vercel.com ✅
  - Connecté avec GitHub ✅

- [ ] **Projet importé**
  - "Add New Project" → Sélectionné ✅
  - Framework: Next.js ✅
  - Root Directory: ./ ✅

- [ ] **Variables d'environnement prêtes**
  ```
  MONGODB_URI = ...
  ADMIN_EMAIL = admin@architecture-portfolio.com
  ADMIN_PASSWORD = ***
  NEXTAUTH_SECRET = ...
  NEXTAUTH_URL = https://architecture-portfolio-xxx.vercel.app
  ```

---

## 🚀 DÉPLOIEMENT

- [ ] **1ère tentative**
  ```
  Cliquer "Deploy"
  ⏳ Attendre...
  ✅ Deployment successful
  ```

- [ ] **Accès URL Vercel**
  ```
  https://architecture-portfolio-xxx.vercel.app/
  ✅ Page accueil charge
  ```

- [ ] **Mettre à jour NEXTAUTH_URL**
  ```
  Vercel Settings → Environment Variables
  NEXTAUTH_URL = votre-URL-vercel
  Redéployer
  ```

---

## ✅ POST-DÉPLOIEMENT

Après déploiement sur production:

- [ ] **Tester accueil**
  - https://votre-url/
  - Logo visible ✅
  - Vidéo joue ✅
  - Projets affichent ✅

- [ ] **Tester admin**
  - https://votre-url/admin/login
  - Login avec credentials ✅
  - Dashboard accessible ✅

- [ ] **Tester CRUD**
  - Ajouter un projet ✅
  - Modifier un projet ✅
  - Supprimer un projet ✅
  - Voir changements immédiatement ✅

- [ ] **Tester contact**
  - Envoyer un message ✅
  - Succès affiché ✅

- [ ] **Vérifier logs**
  - Vercel Deployments → Logs
  - Aucune erreur ✅

- [ ] **Performance**
  - PageSpeed Insights: https://pagespeed.web.dev/
  - Score > 80 ✅

---

## 🎯 FINAL CHECK

```
Avant de cliquer "Deploy":

✅ Code build localement
✅ Pas d'erreurs
✅ CRUD fonctionne
✅ Admin login OK
✅ .env.local configué
✅ GitHub repo prêt
✅ Variables Vercel prêtes
✅ Secrets sécurisés
✅ MongoDB active
✅ Structure OK

= PRÊT À DÉPLOYER! 🚀
```

---

## 📞 Si Problème

1. **Build échoue**
   - Vérifier build local: `npm run build`
   - Lire les logs Vercel complets
   - Chercher l'erreur exacte

2. **Site blanc après deploy**
   - Vérifier logs Vercel
   - Vérifier variables .env
   - MongoDB connecté?
   - NextAuth configuré?

3. **Login ne fonctionne pas**
   - NEXTAUTH_SECRET correct?
   - NEXTAUTH_URL correct?
   - ADMIN_EMAIL/PASSWORD correct?

4. **MongoDB timeout**
   - IP whitelist 0.0.0.0/0?
   - Cluster actif?
   - URI correct?

---

**✅ Tout coché? GO! Déployez sur Vercel! 🚀**
