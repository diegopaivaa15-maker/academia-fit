import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Seleciona a raiz e garante largura total sem margens nativas
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="w-full min-h-screen m-0 p-0 bg-slate-950">
      <App />
    </div>
  </StrictMode>,
)