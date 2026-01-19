# 🚀 Installation Rapide - 5 Minutes

## Étape 1: Cloner et Installer (1 min)

```bash
cd votre-projet
npm install --legacy-peer-deps
```

## Étape 2: MongoDB Atlas (2 min)

1. Allez sur https://www.mongodb.com/cloud/atlas
2. Créez un compte gratuit
3. Créez un cluster M0 (gratuit)
4. Allez à "Database Access" → Créez un utilisateur
5. Allez à "Network Access" → Ajoutez 0.0.0.0/0
6. Cliquez "Connect" → "Connect your application"
7. Copiez l'URI et remplacez `<password>` par votre mot de passe

## Étape 3: Configuration .env.local (1 min)

Créez `.env.local`:

```env
# Copiez votre URI MongoDB (ajustez username et password)
MONGODB_URI=mongodb+srv://admin:YourPassword@cluster0.abc123.mongodb.net/saa-archi?retryWrites=true&w=majority

# Admin credentials (changez ces valeurs!)
ADMIN_EMAIL=admin@saa-archi.tn
ADMIN_PASSWORD=YourSecurePassword123!

# Générez une secret aléatoire
NEXTAUTH_SECRET=your-generated-secret-32-chars-here

# Configuration NextAuth
NEXTAUTH_URL=http://localhost:3000
```

## Étape 4: Lancer le Serveur (1 min)

```bash
npm run dev
```

## Étape 5: Accéder à l'Admin

1. **Page d'accueil**: http://localhost:3000
2. **Admin Login**: http://localhost:3000/admin/login
3. **Dashboard**: Connectez-vous avec vos identifiants

---

## ✅ Prêt à l'emploi!

Vous pouvez maintenant:
- ✅ Ajouter des projets
- ✅ Modifier des projets
- ✅ Supprimer des projets
- ✅ Voir les projets publiquement

---

### 🎓 Pour Plus d'Informations

Consultez les fichiers:
- [`README_ADMIN.md`](./README_ADMIN.md) - Documentation complète
- [`SETUP.md`](./SETUP.md) - Guide de configuration détaillé
- [`.env.local.example`](./.env.local.example) - Template variables d'env
