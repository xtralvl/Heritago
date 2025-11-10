import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import FontSizeProvider from './context/FontSizeContext.tsx'
import SearchedCountryOrStateProvider from './context/SearchedCountryOrStateContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <SearchedCountryOrStateProvider>
    <FontSizeProvider>
      <App />
    </FontSizeProvider>
    </SearchedCountryOrStateProvider>
    </BrowserRouter>
  </StrictMode>
);
