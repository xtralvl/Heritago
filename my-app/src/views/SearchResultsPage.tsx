import { useEffect, useState } from "react";
import '../styles/SearchResultsPage.scss';
import logo from '../assets/heritago-logo.png';
import profileIcon from "../assets/profile-icon.svg";
import hamburgerIcon from "../assets/hamburger-icon.svg";
import MobileMenu from '../components/homePageComponents/MobileMenu';
import LoginRegister from '../components/homePageComponents/LoginRegister';
import { useNavigate } from "react-router-dom";
import filterIcon from '../assets/filter-icon.svg';
import sortIcon from '../assets/sort-icon.svg';
import heartIconGreen from '../assets/heart-icon.svg'
import mockPic from '../assets/yellowstone-example-pic.jpg'
import downIcon from '../../src/assets/down-icon.svg'
import MobileFilterMenu from "../components/MobileFilterMenu";
import MobileSortMenu from "../components/MobileSortMenu";
import { useContext } from "react";
import { SearchedCountryOrStateContext } from "../context/SearchedCountryOrStateContext";
import { fetchParks } from "../components/API/fetchParks";
import { northAmerica } from "../components/homePageComponents/data/Countries";

export default function SearchResultsPage() {

  // ==============================
  // STATE HOOKS
  // ==============================
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginRegisterMenuOpen, setIsLoginRegisterMenuOpen] = useState(false);
  const [isMobileFilterMenuOpen, setIsMobileFilterMenuOpen] = useState(false);
  const [isMobileSortMenuOpen, setIsMobileSortMenuOpen] = useState(false);
  const [filteredFetchResults, setFilteredFetchResults] = useState<any[]>([]);

  const context = useContext(SearchedCountryOrStateContext);
  if (!context) {
    throw new Error("SearchedCountryOrStateContext must be used within SearchedCountryOrStateProvider");
  }
  const { searchedCountryOrState, setSearchedCountryOrState } = context;

  useEffect(() => {
    async function loadFilteredFetchResults() {
      const data = await fetchParks();
  
      if (!searchedCountryOrState) return;
  
      const selectedAbbr = northAmerica[searchedCountryOrState]; // full name → abbr
  
      // Some parks can have multiple states: check if any match
      const filteredResult = data.filter((park: any) =>
        park.states.split(",").includes(selectedAbbr)
      );
  
      setFilteredFetchResults(filteredResult);
    }
  
    loadFilteredFetchResults();
  }, [searchedCountryOrState]);
    
    // === DATE FOR FOOTER ===
    const date = new Date();
    const currentYear = date.getFullYear();

    const navigate = useNavigate();
  

  // ==============================
  // RENDER
  // ==============================
  return (
    <div className="search-results-page-container">
      {/* ==============================
          TOP NAV BAR
          ============================== */}
      <div className="top-row-search-results-page">
        <img src={logo} alt="Heritago Logo" className="homepage-logo" />

        {/* === MOBILE AND TAB === */}
        <div className="top-row-buttons-container-mobile">
          <button
            className="profile-button"
            onClick={() => setIsLoginRegisterMenuOpen(true)}
          >
            <img src={profileIcon} alt="Show Profile" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="hamburger-button"
          >
            <img src={hamburgerIcon} alt="Show Menu" />
          </button>
        </div>

        {/* === MOBILE MENU === */}
        {isMobileMenuOpen && (
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* === LOGIN-REGISTER MENU === */}
        {isLoginRegisterMenuOpen && (
          <LoginRegister onClose={() => setIsLoginRegisterMenuOpen(false)}
          />
        )}

        {/* === DESKTOP === */}
        <div className="top-row-buttons-container-desktop">
          <div className="about-and-help-button-container-top">
            <button className="about-button-home-top">About</button>
            <button className="help-button-home-top">
              Help
            </button>
          </div>

          <div className="sign-up-and-log-in-button-container-top">
            <button
              className="sign-up-button"
              onClick={() => setIsLoginRegisterMenuOpen(true)}
            >
              <strong>Login</strong>
            </button>
          </div>
        </div>
      </div>

       {/* ==============================
          HERO / SEARCH FORM
          ============================== */}
      <div className="hero-form-container-search-page">
        <div className="hero-text-container-search-page">
          <div className="hero-text-search-page">
            <h1>Magnificent national parks all over the United States just waiting for you to explore them!</h1>
          </div>
        </div>
    </div>

    <p className="result-paragraph-search-result-page" >{searchedCountryOrState}: {filteredFetchResults.length - 1} national parks found</p>

        <div className="search-result-page-inner-container" >

            <div className="search-result-page-filtering-options-container">
                <button onClick={() => setIsMobileFilterMenuOpen(true)} ><img src={filterIcon} alt="" />Filter</button>
                <button onClick={() => setIsMobileSortMenuOpen(true)} ><img src={sortIcon} alt="" />Sort</button>
            </div>

            {isMobileFilterMenuOpen &&
                <MobileFilterMenu onClose={() => setIsMobileFilterMenuOpen(false)} />
            }

            {isMobileSortMenuOpen &&
                <MobileSortMenu onClose={() => setIsMobileSortMenuOpen(false)} />
            }


            <hr />

            {filteredFetchResults.map(result => {
              return (
                <div className="search-result-page-listed-results-container">
                  <div className="search-result-page-listed-results-container-result" >
                    <img className="result-image" src={result.images[0].url} alt="" />
                    <h2 className="result-title" >{result.fullName}</h2>
                    <p className="result-address">{result.addresses[0].line1}{result.addresses[0].city}, {result.addresses[0].stateCode} {result.addresses[0].postalCode}</p>
                  

                  <div className="map-link-website-link-and-heart-icon-container" >
                        <div className="result-map" >
                            <a href="#"><p>Show on map</p></a>
                        </div>

                        <div className="result-website" >
                            <a href="#"><p>Website</p></a>
                        </div>

                    <button className="result-add-to-favorite-button" ><img src={heartIconGreen} alt="" /></button>
                    </div>

                    <button className="result-see-details-button" >See details</button>
                    </div>

                </div>
                
              )
            })}
            

        </div>

        <button className="search-result-page-load-more-results-button" >
                Load more results <img src={downIcon} alt="" />
        </button>

    {/* === NEWSLETTER SECTION === */}
      <div className="newsletter-section-home-container">
        <p>
          Subscribe to our monthly newsletter to receive the best travel tips
          and stay updated on the latest site improvements.
        </p>
        <a href="">
          <p>Sign up for the newsletter here</p>
        </a>
      </div>

      {/* === FOOTER === */}
      <footer>
        <div className="navigation-section-home-bottom">
          <button
            onClick={() => navigate("about")}
            className="language-button-home-bottom"
          >
            About
          </button>
          <button onClick={() => navigate("help")}>Help</button>
        </div>

        <div className="logo-and-rights-bottom-container">
          <img className="logo-bottom" src={logo} alt="Heritago logo" />
          <p>© {currentYear} Heritago | All rights reserved</p>
        </div>
      </footer>



        
    </div>
  );
}
