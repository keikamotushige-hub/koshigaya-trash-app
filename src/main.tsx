import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthGate } from './components/AuthGate.tsx'
import { I18nProvider } from './i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthGate>
      <I18nProvider>
        <App />
      </I18nProvider>
    </AuthGate>
  </StrictMode>,
)
