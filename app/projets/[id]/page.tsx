"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { getProjectById } from "@/app/actions/projects"

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

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Charger le projet au montage
  useEffect(() => {
    const loadProject = async () => {
      try {
        const id = params.id as string
        const data = await getProjectById(id)
        setProject(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement du projet')
        console.error('Erreur:', err)
      } finally {
        setLoading(false)
      }
    }
    loadProject()
  }, [params.id])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false)
      } else {
        setShowNavbar(true)
      }
      setLastScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <p className="text-neutral-600">Chargement du projet...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-semibold">Projet non trouvé</h1>
          <p className="mt-2 text-neutral-600">{error || 'Le projet demandé n\'existe pas.'}</p>
          <Link
            href="/"
            className="mt-6 inline-flex border border-black/15 px-4 py-2 text-sm hover:bg-black hover:text-white transition-colors"
          >
            Retour
          </Link>
        </div>
      </div>
    )
  }

  const heroImage = project.thumbnail || project.images[0] || "/placeholder.svg"
  const highlightImage = project.highlightImage || project.images[1] || project.images[0] || heroImage
  const restImages = project.images.filter((img) => img !== highlightImage)

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-transparent border-none shadow-none transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-16 h-16 relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Image src="/logo1.jpg" alt="S.A.A ARCHI Logo" fill className="object-contain drop-shadow-md" priority />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-[0.15em] text-white group-hover:text-gray-700 transition-all">
                SAA
              </span>
              <span className="font-light tracking-[0.3em] text-white uppercase text-3xl">ARCHI</span>
            </div>
          </Link>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold font-sans hover:text-gray-200 transition-colors text-white">
              ACCUEIL
            </Link>
            <Link
              href="/#projets"
              className="text-sm font-semibold font-sans hover:text-gray-200 transition-colors text-white"
            >
              PROJET
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-semibold font-sans hover:text-gray-200 transition-colors text-white"
            >
              CONTACT
            </Link>
          </nav>

          {/* Desktop social icons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=61577686137153"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all text-white"
            >
              <Facebook className="w-6 h-6" strokeWidth={2} />
            </a>
            <a
              href="https://www.instagram.com/s.aaarchi/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all text-white"
            >
              <Instagram className="w-6 h-6" strokeWidth={2} />
            </a>
            <a
              href="https://www.linkedin.com/in/sourour-aoun-allah-736a002a/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all text-white"
            >
              <Linkedin className="w-6 h-6" strokeWidth={2} />
            </a>
          </div>
        </div>
      </header>

      <section className="relative h-screen w-full overflow-hidden">
        {/* Hero image - full screen */}
        <Image src={heroImage || "/placeholder.svg"} alt={project.title} fill className="object-cover" priority />

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

        {/* Project title and info overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 z-40 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-5xl font-light tracking-tight text-white">{project.title}</h1>
            <p className="mt-3 text-sm text-white/80">{project.date}</p>
          </div>
        </div>
      </section>

      {/* 2) Infos projet */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-4xl tracking-tight">{project.title}</h1>
        <p className="mt-2 text-sm text-neutral-600">{project.date}</p>

        <div className="mt-8 border border-black/10 p-6">
          <h2 className="text-xs font-semibold tracking-widest uppercase">Informations</h2>

          <dl className="mt-5 grid grid-cols-1 gap-3 text-sm">
            {project.areaLabel ? (
              <div className="flex items-start justify-between gap-4">
                <dt className="text-neutral-500">Surface</dt>
                <dd className="text-right">{project.areaLabel}</dd>
              </div>
            ) : null}

            {project.location ? (
              <div className="flex items-start justify-between gap-4">
                <dt className="text-neutral-500">Lieu</dt>
                <dd className="text-right">{project.location}</dd>
              </div>
            ) : null}

            {project.client ? (
              <div className="flex items-start justify-between gap-4">
                <dt className="text-neutral-500">Client</dt>
                <dd className="text-right">{project.client}</dd>
              </div>
            ) : null}

            {project.status ? (
              <div className="flex items-start justify-between gap-4">
                <dt className="text-neutral-500">Statut</dt>
                <dd className="text-right">{project.status}</dd>
              </div>
            ) : null}

            <div className="flex items-start justify-between gap-4">
              <dt className="text-neutral-500">Tags</dt>
              <dd className="text-right">{project.tags.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 3) Highlight image */}
      <section className="w-full px-4 pb-10">
        <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
          <Image
            src={highlightImage || "/placeholder.svg"}
            alt={`${project.title} - highlight`}
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* 4) Description */}
      <section className="mx-auto max-w-5xl px-4 pb-10">
        <h2 className="text-xs font-semibold tracking-widest uppercase">Description</h2>
        <div className="mt-4 text-[15px] leading-7 text-neutral-800 whitespace-pre-line">{project.description}</div>
      </section>

      {/* 5) Autres images (scroll) */}
      <section className="w-full px-4 pb-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xs font-semibold tracking-widest uppercase">Images</h2>
        </div>

        <div className="mt-5 space-y-4">
          {restImages.map((img, idx) => (
            <div key={img + idx} className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
              <Image
                src={img || "/placeholder.svg"}
                alt={`${project.title} - ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
