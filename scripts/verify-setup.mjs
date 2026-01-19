#!/usr/bin/env node

/**
 * Script de Vérification de Configuration
 * Vérifie que toutes les configurations nécessaires sont en place
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const checks = {
  '.env.local': {
    required: true,
    message: 'Configuration d\'environnement manquante',
    check: () => fs.existsSync('.env.local'),
  },
  'node_modules': {
    required: true,
    message: 'Dépendances non installées',
    check: () => fs.existsSync('node_modules'),
  },
  'lib/mongodb.ts': {
    required: true,
    message: 'Fichier MongoDB manquant',
    check: () => fs.existsSync('lib/mongodb.ts'),
  },
  'models/Project.ts': {
    required: true,
    message: 'Modèle Project manquant',
    check: () => fs.existsSync('models/Project.ts'),
  },
  'app/api/auth/[...nextauth]/route.ts': {
    required: true,
    message: 'Configuration NextAuth manquante',
    check: () => fs.existsSync('app/api/auth/[...nextauth]/route.ts'),
  },
  'middleware.ts': {
    required: true,
    message: 'Middleware manquant',
    check: () => fs.existsSync('middleware.ts'),
  },
  'app/actions/projects.ts': {
    required: true,
    message: 'Server Actions manquants',
    check: () => fs.existsSync('app/actions/projects.ts'),
  },
}

const envChecks = {
  MONGODB_URI: {
    required: true,
    message: 'URI MongoDB manquante',
  },
  ADMIN_EMAIL: {
    required: true,
    message: 'Email admin manquant',
  },
  ADMIN_PASSWORD: {
    required: true,
    message: 'Mot de passe admin manquant',
  },
  NEXTAUTH_SECRET: {
    required: true,
    message: 'NextAuth secret manquant',
  },
  NEXTAUTH_URL: {
    required: true,
    message: 'NextAuth URL manquante',
  },
}

console.log('\n🔍 Vérification de la Configuration\n')
console.log('=' .repeat(50))

// Vérifier les fichiers
console.log('\n📁 Vérification des Fichiers:')
let filesOk = true

Object.entries(checks).forEach(([file, check]) => {
  const exists = check.check()
  const icon = exists ? '✓' : '✗'
  const color = exists ? '\x1b[32m' : '\x1b[31m'
  console.log(`${color}${icon}\x1b[0m ${file}`)
  if (!exists && check.required) filesOk = false
})

// Vérifier les variables d'environnement
console.log('\n🔐 Vérification des Variables d\'Environnement:')
let envOk = true

if (!fs.existsSync('.env.local')) {
  console.log('\x1b[31m✗\x1b[0m Fichier .env.local manquant')
  console.log('   Créez-le en copiant .env.local.example')
  envOk = false
} else {
  const envContent = fs.readFileSync('.env.local', 'utf-8')

  Object.entries(envChecks).forEach(([key, check]) => {
    const exists = envContent.includes(`${key}=`)
    const icon = exists ? '✓' : '✗'
    const color = exists ? '\x1b[32m' : '\x1b[31m'
    console.log(`${color}${icon}\x1b[0m ${key}`)
    if (!exists && check.required) envOk = false
  })
}

// Vérifier package.json
console.log('\n📦 Dépendances Requises:')
if (fs.existsSync('package.json')) {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }

  const required = ['mongoose', 'next-auth', 'next', 'react']
  let depsOk = true

  required.forEach((dep) => {
    const exists = !!deps[dep]
    const icon = exists ? '✓' : '✗'
    const color = exists ? '\x1b[32m' : '\x1b[31m'
    console.log(`${color}${icon}\x1b[0m ${dep}`)
    if (!exists) depsOk = false
  })
}

// Résumé
console.log('\n' + '='.repeat(50))

if (filesOk && envOk) {
  console.log('\n\x1b[32m✅ Configuration OK! Vous pouvez lancer le serveur.\x1b[0m')
  console.log('\nCommande: npm run dev\n')
} else {
  console.log('\n\x1b[31m❌ Erreurs de Configuration Détectées\x1b[0m')
  console.log('\nVérifiez:')
  if (!filesOk) console.log('  - Que tous les fichiers sont présents')
  if (!envOk) console.log('  - Que le fichier .env.local est configuré correctement')
  console.log('\nConsultez QUICKSTART.md ou SETUP.md pour l\'aide\n')
  process.exit(1)
}
