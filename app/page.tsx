'use client'

import { useEffect, useState, FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getProjects } from '@/app/actions/projects'
import { Facebook, Instagram, Linkedin } from 'lucide-react'

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

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedCategory, setSelectedCategory] = useState('tous')
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  // Charger les projets au montage
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error)
      } finally {
        setIsLoadingProjects(false)
      }
    }
    loadProjects()
  }, [])

  // Récupérer les catégories uniques et ajouter 'tous'
  const categories = ['tous', ...Array.from(new Set(projects.flatMap(p => p.tags)))]
  const filteredProjects = selectedCategory === 'tous' ? projects : projects.filter(p => p.tags.includes(selectedCategory))

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false)
      } else {
        setShowNavbar(true)
      }
      setLastScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage({
          type: 'success',
          text: data.message || 'Merci pour votre message ! Nous vous contacterons bientôt.',
        })
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        setSubmitMessage({
          type: 'error',
          text: data.error || 'Une erreur est survenue. Veuillez réessayer.',
        })
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Une erreur est survenue. Veuillez réessayer.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Hero Section with Video Background */}
      <section id="accueil" className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/dadmqor6r/video/upload/v1760657920/1016_1_cqgu13.mp4" type="video/mp4" />
        </video>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Fixed Header */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 bg-transparent border-none shadow-none transition-transform duration-300 ${
            showNavbar ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-16 h-16 relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Image
                  src="/logo1.jpg"
                  alt="S.A.A ARCHI Logo"
                  fill
                  className="object-contain drop-shadow-md"
                  priority
                />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-[0.15em] text-white group-hover:text-gray-300 transition-all">
                  SAA
                </span>
                <span className="font-light tracking-[0.3em] text-white uppercase text-3xl">ARCHI</span>
              </div>
            </Link>

            {/* Desktop menu */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('accueil')}
                className="text-sm font-semibold font-sans hover:text-gray-300 transition-colors text-white"
              >
                ACCUEIL
              </button>
              <button
                onClick={() => scrollToSection('projets')}
                className="text-sm font-semibold font-sans hover:text-gray-300 transition-colors text-white"
              >
                PROJET
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-sm font-semibold font-sans hover:text-gray-300 transition-colors text-white"
              >
                CONTACT
              </button>
            </nav>

            {/* Desktop social icons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/admin/login"
                className="text-xs font-semibold px-2 py-1 border border-white rounded hover:bg-white hover:text-black transition-colors text-white"
              >
                ADMIN
              </Link>
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

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-light tracking-wider text-white mb-4">
              SAA
              <br />
              ARCHI
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/90 tracking-widest">
              Du concept à la vie
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-light tracking-tight mb-8">
            Architecture Contemporaine
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Agence spécialisée dans l'Architecture contemporaine, offrant un service complet couvrant le processus de 
            création, de la conception architecturale à l'achèvement de la construction. Créé par Me. Sourour Aoun Allah 
            Mhalla depuis 1990.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Nous sommes à votre écoute pour donner vie à vos projets architecturaux.
          </p>
        </div>
      </section>

      {/* Projets Section */}
      <section id="projets" className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-light tracking-tight mb-16 text-center">NOS PROJETS</h2>

          {/* Filtres de catégories */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 pb-8 border-b border-gray-300">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-semibold tracking-widest uppercase transition-all ${
                  selectedCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoadingProjects ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Chargement des projets...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Aucun projet trouvé</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projets/${project._id}`}
                  className="group"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-light tracking-wide mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{project.date}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs uppercase tracking-widest text-gray-700 border border-gray-300 px-2 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-light tracking-tight mb-16 text-center">Contactez-nous</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-light tracking-wide mb-4">S.A.A ARCHI</h3>
                <p className="text-gray-600 leading-relaxed">
                  Agence spécialisée dans l'architecture contemporaine.<br />
                  Nous sommes à votre écoute pour donner vie à vos projets architecturaux.
                </p>
              </div>

              <div>
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a href="mailto:contact@saa-archi.com.tn" className="text-blue-600 hover:underline">
                      contact@saa-archi.com.tn
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <span className="text-2xl">📞</span>
                  <div>
                    <h4 className="font-semibold mb-1">Téléphone</h4>
                    <a href="tel:+21698407855" className="text-gray-700 hover:underline">
                      +216 98 407 855
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <h4 className="font-semibold mb-1">Localisation</h4>
                    <p className="text-gray-700">
                      Le Relais Immobilière TEKAYA, Sousse, Tunisie
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 pt-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61577686137153"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition"
                >
                  f
                </a>
                <a
                  href="https://www.instagram.com/s.aaarchi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition"
                >
                  📷
                </a>
                <a
                  href="https://www.linkedin.com/in/sourour-aoun-allah-736a002a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition"
                >
                  in
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Nom complet *</label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Téléphone</label>
                <input
                  type="tel"
                  placeholder="+216 XX XXX XXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Sujet *</label>
                <input
                  type="text"
                  placeholder="Sujet de votre message"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Message *</label>
                <textarea
                  placeholder="Décrivez votre projet..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition resize-none bg-gray-50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 transition-colors font-semibold tracking-widest uppercase"
              >
                {isSubmitting ? 'Envoi...' : 'Envoyer le message'}
              </button>

              {submitMessage && (
                <div
                  className={`p-4 text-center text-sm ${
                    submitMessage.type === 'success'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}
            </form>
          </div>

          {/* Google Map */}
          <div className="w-full h-96 border border-gray-300 overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3195.841267341945!2d10.632!3d35.825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130fe9e9e9e9e9e9%3A0x0!2sRe%CC%81lais%20Immobilie%CC%80re%20TEKAYA!5e0!3m2!1sfr!2stn!4v1234567890"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm text-gray-400">
            © 2024 SAA ARCHI. Tous droits réservés.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <a
              href="https://www.facebook.com/profile.php?id=61577686137153"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/s.aaarchi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/sourour-aoun-allah-736a002a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
