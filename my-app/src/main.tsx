import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import FontSizeProvider from './context/FontSizeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <FontSizeProvider>
      <App />
    </FontSizeProvider>
    </BrowserRouter>
  </StrictMode>
);
