import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import FontSizeProvider from './context/FontSizeContext.tsx'
import SearchedCountryOrStateProvider from './context/SearchedCountryOrStateContext.tsx'
import { SelectedResultIdProvider } from './context/SelectedResultIdContext.tsx'
import SearchedDestinationTypeProvider from './context/SearchedDestinationTypeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <SelectedResultIdProvider>
    <SearchedCountryOrStateProvider>
    <SearchedDestinationTypeProvider>
    <FontSizeProvider>
      <App />
    </FontSizeProvider>
    </SearchedDestinationTypeProvider>
    </SearchedCountryOrStateProvider>
    </SelectedResultIdProvider>
    </BrowserRouter>
  </StrictMode>
);
