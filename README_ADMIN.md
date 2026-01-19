# SAA ARCHI - Portfolio Architecture Admin

Système de gestion admin complet pour portfolio d'architecture avec **Next.js 15**, **MongoDB**, **NextAuth.js** et **Server Actions**.

## 🚀 Démarrage Rapide

### 1. Installation des dépendances

```bash
npm install --legacy-peer-deps
```

### 2. Configuration de l'environnement

Créez un fichier `.env.local` en copiant `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Remplissez les variables:
```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/db-name?retryWrites=true&w=majority

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password

# NextAuth Configuration
NEXTAUTH_SECRET=generate-a-random-secret-min-32-chars
NEXTAUTH_URL=http://localhost:3000
```

### 3. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez http://localhost:3000

## 📁 Architecture du Projet

```
├── app/
│   ├── page.tsx                           # Page d'accueil (liste projets)
│   ├── admin/
│   │   ├── login/page.tsx                # Page de connexion
│   │   └── dashboard/page.tsx            # Dashboard CRUD
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # Configuration NextAuth
│   │   └── contact/route.ts              # Endpoint contact
│   ├── actions/
│   │   └── projects.ts                   # Server Actions CRUD
│   └── layout.tsx
├── lib/
│   └── mongodb.ts                        # Connexion MongoDB
├── models/
│   └── Project.ts                        # Schéma Mongoose
├── middleware.ts                         # Protection des routes
└── .env.local                            # Variables d'environnement
```

## 🔐 Authentification & Sécurité

### Pages Protégées

Toutes les routes `/admin/*` sont protégées par `NextAuth.js` (sauf `/admin/login`).

```typescript
// middleware.ts
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
```

### Connexion Admin

1. Accédez à `http://localhost:3000/admin/login`
2. Utilisez les identifiants définis dans `.env.local`
3. Vous serez redirigé vers le dashboard

## 📊 Fonctionnalités CRUD

### 1. Lister les Projets

```typescript
import { getProjects } from '@/app/actions/projects'

const projects = await getProjects()
```

### 2. Créer un Projet

```typescript
import { createProject } from '@/app/actions/projects'

await createProject({
  title: 'Villa Contemporaine',
  date: 'Janvier 2025',
  tags: ['Résidentiel', 'Moderne'],
  description: 'Description...',
  thumbnail: 'https://...',
  images: ['https://...', 'https://...'],
  location: 'Tunis',
  areaLabel: '450 m²',
  status: 'En cours',
  program: 'Résidentiel'
})
```

### 3. Mettre à Jour un Projet

```typescript
import { updateProject } from '@/app/actions/projects'

await updateProject(projectId, {
  title: 'Nouveau titre',
  // ... autres champs
})
```

### 4. Supprimer un Projet

```typescript
import { deleteProject } from '@/app/actions/projects'

await deleteProject(projectId)
```

## 🗄️ Modèle de Données

### Schéma Project (MongoDB)

```typescript
{
  title: string (requis, max 200 chars)
  date: string (requis)
  tags: string[] (requis, min 1)
  description: string (requis, min 10 chars)
  thumbnail: string (requis, URL)
  images: string[] (requis, min 1 URL)
  location?: string
  areaLabel?: string
  status?: 'En cours' | 'Complété' | 'Proposé'
  program?: string
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

## 🎯 Étapes de Configuration Complète

### Étape 1: Créer une Base de Données MongoDB

1. Allez sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créez un cluster gratuit
3. Créez un utilisateur avec accès
4. Copiez l'URI de connexion

### Étape 2: Générer NEXTAUTH_SECRET

```bash
# Via Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Étape 3: Configurer les Variables

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=SecurePassword123!
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=http://localhost:3000
```

### Étape 4: Tester

- Visitez `http://localhost:3000` pour la page d'accueil
- Visitez `http://localhost:3000/admin/login` pour la connexion
- Utilisez vos identifiants pour accéder au dashboard

## 📱 Interface Admin

### Dashboard Features

✅ **Liste des projets** avec pagination
✅ **Créer un projet** - Formulaire complet
✅ **Modifier un projet** - In-line editing
✅ **Supprimer un projet** - Avec confirmation
✅ **Filtrage par statut** - En cours/Complété/Proposé
✅ **Notifications** - Succès/Erreurs
✅ **Responsive** - Mobile/Tablet/Desktop

## 🔄 Server Actions (Mutations)

Les Server Actions permettent les mutations directes sans API routes:

```typescript
'use server'

export async function createProject(formData) {
  await connectDB()
  // Validation
  // Création
  revalidatePath('/admin/dashboard')  // Revalider le cache
  revalidatePath('/projets')
}
```

### Avantages
- ✅ Pas d'API routes supplémentaires
- ✅ Type-safe
- ✅ Validations côté serveur
- ✅ Revalidation automatique du cache

## 🎨 Personnalisation

### Changer les Couleurs

Modifiez le `tailwind.config.ts` ou ajoutez des classes inline.

### Ajouter des Champs

1. Modifiez le schéma dans `/models/Project.ts`
2. Ajoutez les champs au formulaire dans `/app/admin/dashboard/page.tsx`
3. Mettez à jour les Server Actions

## 🐛 Dépannage

### Erreur de Connexion MongoDB

```
MONGODB_URI est manquant dans les variables d'environnement
```

**Solution**: Vérifiez que `.env.local` contient `MONGODB_URI`

### NextAuth Error

```
NEXTAUTH_SECRET is not set
```

**Solution**: Générez une secret et ajoutez-la à `.env.local`

### Params pas awaited

```
`params.id`. `params` should be awaited before using its properties
```

**Solution**: Utilisez `params` directement sans `await` dans les route handlers (Next.js 15)

### Les Projets ne s'Affichent pas

1. Vérifiez la connexion MongoDB
2. Vérifiez que des projets existent en base
3. Vérifiez les logs du serveur

## 📚 Ressources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [NextAuth.js](https://next-auth.js.org)
- [Mongoose](https://mongoosejs.com)
- [Tailwind CSS](https://tailwindcss.com)

## 📝 Notes Importantes

### Production

Avant de déployer:

1. **Générez NEXTAUTH_SECRET** unique pour la production
2. **Changez les identifiants admin**
3. **Utilisez une URI MongoDB sécurisée**
4. **Activez HTTPS** (NEXTAUTH_URL=https://...)
5. **Configurez les CORS** si nécessaire
6. **Sauvegardez vos secrets** dans les variables d'environnement du serveur

### MongoDB Atlas

- Configurez les IP whitelist
- Utilisez un utilisateur avec permissions limitées
- Activez l'authentification forte
- Configurez les backups automatiques

### NextAuth

- Changez `signIn` et `signOut` pages personnalisées
- Implémentez des providers additionnels si nécessaire
- Configurez les callbacks de session
- Gérez l'expiration des tokens

## 🚀 Déploiement

### Sur Vercel

```bash
git push origin main
```

Vercel déploiera automatiquement. Configurez les variables d'environnement:

1. Allez sur Vercel Dashboard
2. Settings → Environment Variables
3. Ajoutez `MONGODB_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`

### Sur d'autres Plateformes

Assurez-vous que:
- Node.js 18+ est disponible
- Les variables d'environnement sont configurées
- MongoDB Atlas est accessible
- NEXTAUTH_URL correspond à votre domaine

## 🎓 Apprendre Plus

- [Server Actions Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [MongoDB Best Practices](https://www.mongodb.com/docs/manual/administration/security-best-practices/)

---

**Créé avec ❤️ pour SAA ARCHI**
