# Commandes MongoDB Utiles

## Connection avec MongoDB Compass

1. Téléchargez [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Ouvrez l'application
3. Collez votre URI de connexion MongoDB Atlas
4. Cliquez "Connect"

## Requêtes Utiles

### Visualiser les Projets

Dans MongoDB Compass ou via `mongosh`:

```javascript
// Voir tous les projets
db.projects.find()

// Voir les projets avec le statut "Complété"
db.projects.find({ status: "Complété" })

// Voir les projets avec un tag spécifique
db.projects.find({ tags: "Résidentiel" })

// Compter les projets
db.projects.countDocuments()

// Voir les projets créés en janvier 2025
db.projects.find({ 
  createdAt: { 
    $gte: new Date("2025-01-01"), 
    $lt: new Date("2025-02-01") 
  }
})
```

### Manipuler les Données

```javascript
// Ajouter un projet manuellement
db.projects.insertOne({
  title: "Projet Test",
  date: "Janvier 2025",
  tags: ["Test"],
  description: "Description test",
  thumbnail: "https://example.com/thumb.jpg",
  images: ["https://example.com/img.jpg"],
  status: "En cours",
  program: "Test",
  createdAt: new Date(),
  updatedAt: new Date()
})

// Mettre à jour un projet (remplacer PROJECT_ID)
db.projects.updateOne(
  { _id: ObjectId("PROJECT_ID") },
  { $set: { title: "Nouveau Titre" } }
)

// Supprimer un projet
db.projects.deleteOne({ _id: ObjectId("PROJECT_ID") })

// Supprimer TOUS les projets (⚠️ Attention!)
db.projects.deleteMany({})

// Réinitialiser les statuts
db.projects.updateMany(
  {},
  { $set: { status: "Proposé" } }
)
```

### Agrégations Utiles

```javascript
// Compter les projets par statut
db.projects.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
])

// Compter les projets par tag
db.projects.aggregate([
  { $unwind: "$tags" },
  { $group: { _id: "$tags", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])

// Projets les plus récents
db.projects.find().sort({ createdAt: -1 }).limit(10)

// Projets avec plus de 3 images
db.projects.find({ 
  "images": { $size: { $gte: 3 } }
})
```

## Sauvegarder/Restaurer

### Exporter les Projets

```bash
# En JSON
mongoexport --uri "MONGODB_URI" --collection projects --out projects.json

# En CSV
mongoexport --uri "MONGODB_URI" --collection projects --type=csv --out projects.csv
```

### Importer les Projets

```bash
# Depuis JSON
mongoimport --uri "MONGODB_URI" --collection projects --file projects.json

# Depuis CSV
mongoimport --uri "MONGODB_URI" --collection projects --type=csv --file projects.csv --headerline
```

## Dépannage

### Vérifier la Connexion

```bash
# Tester la connexion
mongosh "MONGODB_URI"

# Si OK, vous verrez le prompt: >
```

### Voir les Collections

```javascript
show collections

// Doit afficher: projects
```

### Voir les Statistiques

```javascript
// Taille totale
db.projects.stats()

// Index
db.projects.getIndexes()
```

## Indexes (Performance)

### Créer des Indexes

```javascript
// Index sur title (recherche rapide)
db.projects.createIndex({ title: 1 })

// Index sur tags (filtrage rapide)
db.projects.createIndex({ tags: 1 })

// Index sur createdAt (tri rapide)
db.projects.createIndex({ createdAt: -1 })

// Index composé
db.projects.createIndex({ status: 1, createdAt: -1 })
```

### Voir les Indexes

```javascript
db.projects.getIndexes()
```

### Supprimer un Index

```javascript
db.projects.dropIndex("title_1")
```

## Valider les Données

### Vérifier les Doublons

```javascript
db.projects.aggregate([
  { $group: { 
      _id: "$title", 
      count: { $sum: 1 } 
    } 
  },
  { $match: { count: { $gt: 1 } } }
])
```

### Vérifier les Champs Vides

```javascript
// Projets sans description
db.projects.find({ description: { $in: ["", null] } })

// Projets sans images
db.projects.find({ images: { $size: 0 } })
```

### Corriger les Données

```javascript
// Ajouter un champ manquant
db.projects.updateMany(
  { program: { $exists: false } },
  { $set: { program: "À définir" } }
)

// Trim les espaces
db.projects.updateMany(
  {},
  [
    { $set: { 
        title: { $trim: { input: "$title" } },
        description: { $trim: { input: "$description" } }
      }
    }
  ]
)

// Convertir minuscule → majuscule
db.projects.updateMany(
  {},
  [{ $set: { title: { $toUpper: "$title" } } }]
)
```

## Sauvegarder en Sécurité

```javascript
// Créer une collection de backup avant suppression
db.projects.aggregate([{ $out: "projects_backup" }])

// Récupérer depuis backup
db.projects_backup.find()
```

## Monitoring

### Voir les Opérations en Cours

```javascript
db.currentOp()
```

### Tuer une Opération

```javascript
db.killOp(opId)
```

### Performances

```javascript
// Expliquer une requête
db.projects.find({ status: "Complété" }).explain("executionStats")
```

---

**Notes:**
- ⚠️ Soyez prudent avec les commandes de suppression
- 💾 Sauvegardez avant des modifications massives
- 🔒 Ne partagez jamais votre URI MongoDB
- 📊 Utilisez les indexes pour les requêtes fréquentes
