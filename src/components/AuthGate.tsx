import { useEffect, useState, type FormEvent, type ReactNode } from 'react'

const STORAGE_KEY = 'koshigaya-owner-auth-v1'
const OWNER_EMAIL = 'keikamotushige@gmail.com'

function getExpectedPassword() {
  return import.meta.env.VITE_OWNER_PASSWORD as string | undefined
}

export function AuthGate({ children }: { children: ReactNode }) {
  const expected = getExpectedPassword()
  const [authed, setAuthed] = useState(false)
  const [email, setEmail] = useState(OWNER_EMAIL)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!expected) return
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === `${OWNER_EMAIL}:${expected}`) setAuthed(true)
    } catch {
      /* ignore */
    }
  }, [expected])

  if (!expected) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-6 bg-slate-100">
        <p className="text-sm text-slate-600 text-center max-w-sm leading-relaxed">
          🔒 このサイトは非公開です。設定を確認中です。
        </p>
      </div>
    )
  }

  if (authed) return <>{children}</>

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const emailOk = email.trim().toLowerCase() === OWNER_EMAIL
    if (emailOk && input === expected) {
      try {
        sessionStorage.setItem(STORAGE_KEY, `${OWNER_EMAIL}:${expected}`)
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
          <h1 className="text-lg font-bold text-slate-900">越谷ごみ分別ガイド</h1>
          <p className="text-sm text-slate-500 mt-1">オーナー専用 — メールとパスワードでログイン</p>
        </div>
        <label className="block">
          <span className="text-xs font-bold text-slate-500 mb-1 block">メール</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            className="w-full rounded-xl border border-sky-200 px-4 py-3 text-base min-h-[48px]"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-500 mb-1 block">パスワード</span>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="パスワード"
            autoComplete="current-password"
            className="w-full rounded-xl border border-sky-200 px-4 py-3 text-base min-h-[48px]"
          />
        </label>
        {error && (
          <p className="text-sm text-red-600">メールまたはパスワードが違います。もう一度お試しください。</p>
        )}
        <button
          type="submit"
          className="w-full rounded-xl bg-sky-700 text-white font-bold py-3 min-h-[48px] active:scale-[0.98]"
        >
          ログインして開く
        </button>
        <p className="text-xs text-slate-400 text-center leading-relaxed">
          一般公開は停止しています。この画面が表示されれば正常です。
        </p>
      </form>
    </div>
  )
}
