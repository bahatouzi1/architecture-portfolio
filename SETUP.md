# Configuration Initiale - SAA ARCHI Admin

Ce fichier vous guide à travers la configuration initiale du système admin.

## ✅ Checklist de Configuration

### 1. Dépendances
- [ ] Exécutez `npm install --legacy-peer-deps`
- [ ] Vérifiez: `npm list mongoose next-auth`

### 2. MongoDB Atlas
- [ ] Créez un compte sur [mongodb.com](https://mongodb.com)
- [ ] Créez un cluster gratuit M0
- [ ] Créez un utilisateur base de données
- [ ] Configurez Network Access (ajoutez 0.0.0.0/0 pour développement)
- [ ] Copiez l'URI de connexion

### 3. Variables d'Environnement
- [ ] Copiez `.env.local.example` → `.env.local`
- [ ] Remplissez `MONGODB_URI` avec votre URI MongoDB
- [ ] Générez `NEXTAUTH_SECRET` (voir ci-dessous)
- [ ] Définissez `ADMIN_EMAIL` et `ADMIN_PASSWORD`
- [ ] Configurez `NEXTAUTH_URL=http://localhost:3000`

### 4. Générer NEXTAUTH_SECRET

Exécutez cette commande dans un terminal:

```bash
# Windows PowerShell
$secret = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_}); Write-Host $secret

# macOS/Linux
openssl rand -hex 32
```

Copiez le résultat dans `.env.local`:
```env
NEXTAUTH_SECRET=votre_secret_généré_ici
```

### 5. Première Exécution
- [ ] Exécutez `npm run dev`
- [ ] Ouvrez http://localhost:3000
- [ ] Visitez http://localhost:3000/admin/login
- [ ] Connectez-vous avec vos identifiants
- [ ] Vérifiez que le dashboard charge

### 6. Créer un Premier Projet
- [ ] Accédez au dashboard admin
- [ ] Cliquez "Ajouter un projet"
- [ ] Remplissez le formulaire
- [ ] Soumettez
- [ ] Vérifiez qu'il s'affiche sur la page d'accueil

## 📋 Identifiants Par Défaut

### Recommandé pour Production
```env
ADMIN_EMAIL=admin@saa-archi.tn
ADMIN_PASSWORD=ChoixirUnMotDePasseForte!2025
```

### Développement Temporary
```env
ADMIN_EMAIL=test@example.com
ADMIN_PASSWORD=test123
```

## 🔗 URIs MongoDB Exemples

### Format Standard
```
mongodb+srv://username:password@cluster-name.mongodb.net/database-name?retryWrites=true&w=majority
```

### Avec Authentification
```
mongodb+srv://admin:MyPassword123@cluster0.abc123.mongodb.net/saa-archi?retryWrites=true&w=majority
```

## 🌐 Endpoints Clés

| Page | URL | Description |
|------|-----|-------------|
| Accueil | `http://localhost:3000` | Portfolio public |
| Login Admin | `http://localhost:3000/admin/login` | Page de connexion |
| Dashboard | `http://localhost:3000/admin/dashboard` | Gestion CRUD |
| Contact API | `/api/contact` | Endpoint POST pour formulaires |

## 🛠️ Commandes Utiles

```bash
# Développement
npm run dev

# Build pour production
npm run build

# Vérifier les erreurs
npm run lint

# Nettoyer node_modules
rm -rf node_modules && npm install --legacy-peer-deps
```

## 🔍 Vérification de la Configuration

### Tester MongoDB
```bash
# Créez un fichier test-mongo.js
import { connectDB } from './lib/mongodb.js'

async function test() {
  try {
    await connectDB()
    console.log('✓ MongoDB connecté')
  } catch (e) {
    console.log('✗ Erreur MongoDB:', e.message)
  }
}

test()
```

### Tester NextAuth
1. Allez sur `/admin/login`
2. Entrez vos identifiants
3. Devriez être redirigé vers `/admin/dashboard`

## ⚠️ Erreurs Courantes

### ❌ "MONGODB_URI is undefined"
```
Solution: Vérifiez .env.local et restart le serveur
```

### ❌ "NextAuth session error"
```
Solution: Vérifiez NEXTAUTH_SECRET est dans .env.local
```

### ❌ "Module not found: mongoose"
```
Solution: Exécutez: npm install mongoose --legacy-peer-deps
```

### ❌ "Cannot connect to MongoDB"
```
Solution: 
1. Vérifiez l'URI est correct
2. Vérifiez Network Access dans MongoDB Atlas
3. Testez depuis MongoDB Compass
```

## 📞 Support

Si vous rencontrez des problèmes:

1. Vérifiez tous les `.env.local`
2. Consultez les logs du serveur
3. Assurez-vous que MongoDB est accessible
4. Vérifiez que tous les ports sont libres

## 🚀 Prochaines Étapes

Après configuration initiale:

1. **Personnalisez** le logo et les couleurs
2. **Ajoutez** des projets de démonstration
3. **Configurez** le domaine personnalisé
4. **Déployez** sur Vercel ou votre serveur
5. **Sauvegardez** vos secrets en lieu sûr

## 📖 Documentation Complète

Consultez [README_ADMIN.md](./README_ADMIN.md) pour la documentation complète.

---

**Configuration réussie! Vous pouvez maintenant utiliser le panneau admin.**
