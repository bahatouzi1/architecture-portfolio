import mongoose, { Connection } from 'mongoose'

// Variable globale pour stocker la connexion (évite les connexions multiples en développement)
let cachedConnection: Connection | null = null

/**
 * Connexion à MongoDB avec cache pour les reconnexions
 */
export async function connectDB(): Promise<Connection> {
  // Vérifier si une connexion existe déjà
  if (cachedConnection) {
    console.log('✓ Utilisation de la connexion existante')
    return cachedConnection
  }

  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    throw new Error('MONGODB_URI est manquant dans les variables d\'environnement')
  }

  try {
    console.log('🔄 Connexion à MongoDB...')
    const connection = await mongoose.connect(mongoUri, {
      bufferCommands: false,
    })

    cachedConnection = connection.connection
    console.log('✓ MongoDB connecté avec succès')
    return cachedConnection
  } catch (error) {
    console.error('✗ Erreur de connexion MongoDB:', error)
    throw error
  }
}

export default connectDB
