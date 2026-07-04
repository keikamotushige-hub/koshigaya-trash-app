import { useEffect, useState, type FormEvent, type ReactNode } from 'react'

const STORAGE_KEY = 'koshigaya-owner-auth-v1'

function getExpectedPassword() {
  return import.meta.env.VITE_OWNER_PASSWORD as string | undefined
}

export function AuthGate({ children }: { children: ReactNode }) {
  const expected = getExpectedPassword()
  const [authed, setAuthed] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!expected) return
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === expected) setAuthed(true)
    } catch {
      /* ignore */
    }
  }, [expected])

  if (!expected) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-6 bg-slate-100">
        <p className="text-sm text-slate-600 text-center max-w-sm">
          Owner password is not configured. Set <code className="text-xs">VITE_OWNER_PASSWORD</code> in Vercel
          environment variables, then redeploy.
        </p>
      </div>
    )
  }

  if (authed) return <>{children}</>

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (input === expected) {
      try {
        sessionStorage.setItem(STORAGE_KEY, expected)
      } catch {
        /* ignore */
      }
      setAuthed(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center p-6 bg-gradient-to-b from-sky-100 to-slate-100">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl bg-white shadow-lg border border-sky-100 p-6 space-y-4"
      >
        <div className="text-center">
          <p className="text-3xl mb-2">🔒</p>
          <h1 className="text-lg font-bold text-slate-900">Private — Owner Only</h1>
          <p className="text-sm text-slate-500 mt-1">Enter your password to open this guide.</p>
        </div>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          className="w-full rounded-xl border border-sky-200 px-4 py-3 text-base min-h-[48px]"
        />
        {error && <p className="text-sm text-red-600">Incorrect password.</p>}
        <button
          type="submit"
          className="w-full rounded-xl bg-sky-700 text-white font-bold py-3 min-h-[48px] active:scale-[0.98]"
        >
          Unlock
        </button>
      </form>
    </div>
  )
}
