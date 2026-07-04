const REALM = 'Koshigaya Trash Guide — Owner Only'
const OWNER_EMAIL = 'keikamotushige@gmail.com'

function unauthorized() {
  return new Response('Authentication required. This site is private.', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}"`,
    },
  })
}

/** @param {Request} request */
export default function middleware(request) {
  const expected = process.env.SITE_PASSWORD
  if (!expected) {
    return new Response('This site is private. Waiting for owner password setup.', { status: 503 })
  }

  const auth = request.headers.get('authorization')
  if (auth?.startsWith('Basic ')) {
    try {
      const decoded = atob(auth.slice(6))
      const colon = decoded.indexOf(':')
      const user = colon >= 0 ? decoded.slice(0, colon) : decoded
      const pass = colon >= 0 ? decoded.slice(colon + 1) : ''
      if (user.toLowerCase() === OWNER_EMAIL && pass === expected) return
    } catch {
      /* invalid base64 */
    }
  }

  return unauthorized()
}

export const config = {
  matcher: ['/((?!_vercel).*)'],
}
