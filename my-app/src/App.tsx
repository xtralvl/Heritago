import './styles/App.scss';

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
import Newsletter from './components/homePageComponents/Newsletter';

import { Pages } from './components/myAccountComponents/data/Pages';
import { useState } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Pages>("home");

  const switchToPage = (page: Pages) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage
        switchToPage={switchToPage}
        />;
      case "search":
        return <SearchResultsPage
        />;
      case "details":
        return <DetailsPage
        />;
      case "my-account":
        return <MyAccountPage
        switchToPage={switchToPage}
        />;
      case "personal-details":
        return <PersonalDetails
        switchToPage={switchToPage}
        />;
      case "security-settings":
        return <SecuritySettings
        switchToPage={switchToPage}
        />;
      case "customization-preferences":
        return <CustomizationPreferences
        switchToPage={switchToPage}
        />;
      case "saved-destinations":
        return <SavedDestinations
        switchToPage={switchToPage}
        />;
      case "about":
        return <About
        />;
      case "help":
        return <Help
        />;
      case "faq":
        return <FAQ
        />;
      case "newsletter":
        return <Newsletter
        />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <>
      {renderPage()}
    </>
  );
}
