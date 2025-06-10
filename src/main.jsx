import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {
      screen.width < 640 ? (
        <Toaster position='top-right'/>
      ): (
        <Toaster position='top-center' />
      )
    }
  </StrictMode>,
)
