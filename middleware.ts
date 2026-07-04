const REALM = 'Koshigaya Trash Guide — Owner Only'

function unauthorized() {
  return new Response('Authentication required. This site is private.', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}"`,
    },
  })
}

export default function middleware(request: Request) {
  const expected = process.env.SITE_PASSWORD
  if (!expected) {
    return new Response('Site password is not configured.', { status: 503 })
  }

  const auth = request.headers.get('authorization')
  if (auth?.startsWith('Basic ')) {
    try {
      const decoded = atob(auth.slice(6))
      const colon = decoded.indexOf(':')
      const user = colon >= 0 ? decoded.slice(0, colon) : decoded
      const pass = colon >= 0 ? decoded.slice(colon + 1) : ''
      if (user === 'owner' && pass === expected) return
    } catch {
      /* invalid base64 */
    }
  }

  return unauthorized()
}

export const config = {
  matcher: ['/((?!_vercel).*)'],
}
