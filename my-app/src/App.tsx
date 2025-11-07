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

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/details" element={<DetailsPage />} />

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
  );
}
