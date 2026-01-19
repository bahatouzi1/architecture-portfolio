import { withAuth } from 'next-auth/middleware'

/**
 * Middleware de protection pour les routes admin
 * Redirige vers /admin/login si l'utilisateur n'est pas authentifié
 */
export default withAuth(
  function middleware(req) {
    // La logique personnalisée peut aller ici
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Vérifier si l'utilisateur est authentifié
        if (token) return true

        // Rediriger vers login sauf si on est déjà sur la page de login
        return req.nextUrl.pathname === '/admin/login'
      },
    },
  }
)

/**
 * Configuration du matcher: quelles routes protéger
 * Exclut la page de login et les autres routes publiques
 */
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
