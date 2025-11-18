import './styles/App.scss';
import { Routes, Route } from "react-router-dom";
import HomePage from './views/HomePage';
import SearchResultsPage from './views/SearchResultsPage';
import DetailsPage from './views/DetailsPage';
import MyAccountPage from './views/MyAccountPage';
import PersonalDetails from './components/myAccountComponents/PersonalDetails';
import SecuritySettings from './components/myAccountComponents/SecuritySettings';
import CustomizationPreferences from './components/myAccountComponents/CustomizationPreferences';
import SavedDestinations from './components/myAccountComponents/SavedDestinations';
import About from './components/homePageComponents/About';
import Help from './components/homePageComponents/Help';
import FAQ from './components/homePageComponents/FAQ';
import NotFoundPage from './views/NotFoundPage';
import { useContext } from 'react';
import { FontSizeContext } from './context/FontSizeContext';
import { useEffect } from 'react';

export default function App() {

  const { fontSize } = useContext(FontSizeContext)!;

  useEffect(() => {
    // reset all first, then add correct one
    document.body.classList.remove("font-small", "font-large");

    if (fontSize === "small") document.body.classList.add("font-small");
    else if (fontSize === "large") document.body.classList.add("font-large");
    else document.body.classList.remove("font-small", "font-large"); // default
  }, [fontSize]);  

  return (

    <div >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/search/:searchedDestinationType/:searchedCountryOrState" element={<SearchResultsPage />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/details/:destinationId" element={<DetailsPage />} />

        {/* My Account nested routes */}
        <Route path="/my-account" element={<MyAccountPage  />} />
        <Route path="/my-account/personal-details" element={<PersonalDetails />} />
        <Route path="/my-account/security-settings" element={<SecuritySettings />} />
        <Route path="/my-account/customization-preferences" element={<CustomizationPreferences />} />
        <Route path="/my-account/saved-destinations" element={<SavedDestinations />} />

        {/* Info pages */}
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
