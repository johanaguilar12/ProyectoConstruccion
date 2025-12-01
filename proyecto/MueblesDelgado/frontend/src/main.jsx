import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MueblesDelgadoMain } from './MueblesDelgadoMain'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MueblesDelgadoMain />
  </StrictMode>,
)
