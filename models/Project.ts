import mongoose, { Document, Schema } from 'mongoose'

/**
 * Interface TypeScript pour le modèle Project
 */
export interface IProject extends Document {
  title: string
  date: string
  tags: string[]
  description: string
  thumbnail: string
  images: string[]
  location?: string
  areaLabel?: string
  status?: string
  program?: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Schéma Mongoose pour les projets
 */
const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Le titre est obligatoire'],
      trim: true,
      maxlength: [200, 'Le titre ne peut pas dépasser 200 caractères'],
    },
    date: {
      type: String,
      required: [true, 'La date est obligatoire'],
    },
    tags: {
      type: [String],
      required: [true, 'Au moins un tag est obligatoire'],
      default: [],
    },
    description: {
      type: String,
      required: [true, 'La description est obligatoire'],
      minlength: [10, 'La description doit contenir au moins 10 caractères'],
    },
    thumbnail: {
      type: String,
      required: [true, 'L\'URL de la miniature est obligatoire'],
    },
    images: {
      type: [String],
      required: [true, 'Au moins une image est obligatoire'],
      default: [],
    },
    location: {
      type: String,
      default: '',
    },
    areaLabel: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['En cours', 'Complété', 'Proposé'],
      default: 'En cours',
    },
    program: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

// Créer ou récupérer le modèle
export const ProjectModel = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema)

export default ProjectModel
