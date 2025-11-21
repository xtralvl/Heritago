import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.scss';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import FontSizeProvider from './context/FontSizeContext.tsx';
import SearchedCountryOrStateProvider from './context/SearchedCountryOrStateContext.tsx';
import SearchedDestinationTypeProvider from './context/SearchedDestinationTypeContext.tsx';
import FilterProvider from './context/FilterContext.tsx';
import SortProvider from './context/SortContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SearchedCountryOrStateProvider>
        <SearchedDestinationTypeProvider>
          <FontSizeProvider>
            <FilterProvider>
              <SortProvider>
                <App />
              </SortProvider>
            </FilterProvider>
          </FontSizeProvider>
        </SearchedDestinationTypeProvider>
      </SearchedCountryOrStateProvider>
    </BrowserRouter>
  </StrictMode>
);
