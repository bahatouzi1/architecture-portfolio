'use server'

import { revalidatePath } from 'next/cache'
import connectDB from '@/lib/mongodb'
import ProjectModel, { IProject } from '@/models/Project'

/**
 * Récupérer tous les projets
 */
export async function getProjects() {
  try {
    await connectDB()
    const projects = await ProjectModel.find({}).sort({ createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(projects))
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error)
    throw new Error('Impossible de récupérer les projets')
  }
}

/**
 * Récupérer un projet par ID
 */
export async function getProjectById(id: string) {
  try {
    await connectDB()
    const project = await ProjectModel.findById(id).lean()
    if (!project) {
      throw new Error('Projet non trouvé')
    }
    return JSON.parse(JSON.stringify(project))
  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error)
    throw new Error('Impossible de récupérer le projet')
  }
}

/**
 * Créer un nouveau projet
 */
export async function createProject(formData: {
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
}) {
  try {
    await connectDB()

    // Validation des champs obligatoires
    if (!formData.title?.trim()) {
      throw new Error('Le titre est obligatoire')
    }
    if (!formData.description?.trim()) {
      throw new Error('La description est obligatoire')
    }
    if (!formData.thumbnail?.trim()) {
      throw new Error('L\'image miniature est obligatoire')
    }
    if (!formData.images?.length) {
      throw new Error('Au moins une image est obligatoire')
    }
    if (!formData.tags?.length) {
      throw new Error('Au moins un tag est obligatoire')
    }

    // Créer le projet
    const newProject = new ProjectModel({
      title: formData.title.trim(),
      date: formData.date?.trim() || '',
      tags: formData.tags.filter(tag => tag.trim()),
      description: formData.description.trim(),
      thumbnail: formData.thumbnail.trim(),
      images: formData.images.filter(img => img.trim()),
      location: formData.location?.trim() || '',
      areaLabel: formData.areaLabel?.trim() || '',
      status: formData.status || 'En cours',
      program: formData.program?.trim() || '',
    })

    await newProject.save()

    // Revalider les caches
    revalidatePath('/admin/dashboard')
    revalidatePath('/projets')
    revalidatePath('/')

    return JSON.parse(JSON.stringify(newProject))
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error)
    throw error instanceof Error ? error : new Error('Impossible de créer le projet')
  }
}

/**
 * Mettre à jour un projet
 */
export async function updateProject(
  id: string,
  formData: {
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
  }
) {
  try {
    await connectDB()

    // Validation des champs obligatoires
    if (!formData.title?.trim()) {
      throw new Error('Le titre est obligatoire')
    }
    if (!formData.description?.trim()) {
      throw new Error('La description est obligatoire')
    }
    if (!formData.thumbnail?.trim()) {
      throw new Error('L\'image miniature est obligatoire')
    }
    if (!formData.images?.length) {
      throw new Error('Au moins une image est obligatoire')
    }
    if (!formData.tags?.length) {
      throw new Error('Au moins un tag est obligatoire')
    }

    // Mettre à jour le projet
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      id,
      {
        title: formData.title.trim(),
        date: formData.date?.trim() || '',
        tags: formData.tags.filter(tag => tag.trim()),
        description: formData.description.trim(),
        thumbnail: formData.thumbnail.trim(),
        images: formData.images.filter(img => img.trim()),
        location: formData.location?.trim() || '',
        areaLabel: formData.areaLabel?.trim() || '',
        status: formData.status || 'En cours',
        program: formData.program?.trim() || '',
      },
      { new: true }
    )

    if (!updatedProject) {
      throw new Error('Projet non trouvé')
    }

    // Revalider les caches
    revalidatePath('/admin/dashboard')
    revalidatePath('/projets')
    revalidatePath('/')

    return JSON.parse(JSON.stringify(updatedProject))
  } catch (error) {
    console.error('Erreur lors de la mise à jour du projet:', error)
    throw error instanceof Error ? error : new Error('Impossible de mettre à jour le projet')
  }
}

/**
 * Supprimer un projet
 */
export async function deleteProject(id: string) {
  try {
    await connectDB()

    const project = await ProjectModel.findByIdAndDelete(id)

    if (!project) {
      throw new Error('Projet non trouvé')
    }

    // Revalider les caches
    revalidatePath('/admin/dashboard')
    revalidatePath('/projets')
    revalidatePath('/')

    return { success: true }
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error)
    throw error instanceof Error ? error : new Error('Impossible de supprimer le projet')
  }
}
