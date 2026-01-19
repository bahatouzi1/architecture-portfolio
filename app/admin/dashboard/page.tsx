'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { getProjects, deleteProject, createProject, updateProject } from '@/app/actions/projects'
import { Plus, Edit2, Trash2, LogOut, X, Save } from 'lucide-react'

interface Project {
  _id: string
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

interface FormData {
  title: string
  date: string
  tags: string
  description: string
  thumbnail: string
  images: string
  location: string
  areaLabel: string
  status: string
  program: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    title: '',
    date: '',
    tags: '',
    description: '',
    thumbnail: '',
    images: '',
    location: '',
    areaLabel: '',
    status: 'En cours',
    program: '',
  })

  // Charger les projets
  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setIsLoading(true)
      const data = await getProjects()
      setProjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement')
    } finally {
      setIsLoading(false)
    }
  }

  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      tags: '',
      description: '',
      thumbnail: '',
      images: '',
      location: '',
      areaLabel: '',
      status: 'En cours',
      program: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  // Éditer un projet
  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      date: project.date,
      tags: project.tags.join(', '),
      description: project.description,
      thumbnail: project.thumbnail,
      images: project.images.join('\n'),
      location: project.location || '',
      areaLabel: project.areaLabel || '',
      status: project.status || 'En cours',
      program: project.program || '',
    })
    setEditingId(project._id)
    setShowForm(true)
  }

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsSubmitting(true)

    try {
      // Valider les données
      if (!formData.title.trim()) throw new Error('Le titre est obligatoire')
      if (!formData.description.trim()) throw new Error('La description est obligatoire')
      if (!formData.thumbnail.trim()) throw new Error('L\'image miniature est obligatoire')
      if (!formData.images.trim()) throw new Error('Au moins une image est obligatoire')
      if (!formData.tags.trim()) throw new Error('Au moins un tag est obligatoire')

      const projectData = {
        title: formData.title.trim(),
        date: formData.date.trim(),
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        description: formData.description.trim(),
        thumbnail: formData.thumbnail.trim(),
        images: formData.images.split('\n').map(i => i.trim()).filter(Boolean),
        location: formData.location.trim(),
        areaLabel: formData.areaLabel.trim(),
        status: formData.status,
        program: formData.program.trim(),
      }

      if (editingId) {
        await updateProject(editingId, projectData)
        setSuccess('Projet mis à jour avec succès')
      } else {
        await createProject(projectData)
        setSuccess('Projet créé avec succès')
      }

      await loadProjects()
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'enregistrement')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Supprimer un projet
  const handleDelete = async (id: string) => {
    try {
      setError(null)
      setSuccess(null)
      await deleteProject(id)
      setSuccess('Projet supprimé avec succès')
      setDeleteConfirm(null)
      await loadProjects()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    }
  }

  // Déconnexion
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/admin/login' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SAA ARCHI Admin</h1>
            <p className="text-sm text-gray-600">Gestion des projets</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
            <X className="w-5 h-5" />
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            ✓ {success}
          </div>
        )}

        {/* Formulaire */}
        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Modifier le projet' : 'Ajouter un nouveau projet'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Titre *"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <textarea
                placeholder="Description *"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Localisation"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Surface"
                  value={formData.areaLabel}
                  onChange={(e) => setFormData({ ...formData, areaLabel: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>En cours</option>
                  <option>Complété</option>
                  <option>Proposé</option>
                </select>
                <input
                  type="text"
                  placeholder="Programme"
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <input
                type="text"
                placeholder="URL Image miniature *"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <textarea
                placeholder="Tags (séparés par des virgules) *"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <textarea
                placeholder="URLs des images (une par ligne) *"
                value={formData.images}
                onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Bouton Ajouter */}
        {!showForm && (
          <div className="mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter un projet
            </button>
          </div>
        )}

        {/* Liste des projets */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Chargement des projets...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600">Aucun projet trouvé</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Titre</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Date</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Statut</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Tags</th>
                  <th className="text-right px-6 py-3 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{project.title}</td>
                    <td className="px-6 py-4 text-gray-600">{project.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        project.status === 'Complété' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{project.tags.join(', ')}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(project._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal de confirmation suppression */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Confirmer la suppression</h3>
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
