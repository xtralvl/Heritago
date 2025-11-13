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
import downIcon from '../../src/assets/down-icon.svg'
import MobileFilterMenu from "../components/MobileFilterMenu";
import MobileSortMenu from "../components/MobileSortMenu";
import { useContext } from "react";
import { SearchedCountryOrStateContext } from "../context/SearchedCountryOrStateContext";
import { SearchedDestinationTypeContext } from "../context/SearchedDestinationTypeContext";
import { fetchParks } from "../components/API/fetchParks";
import { fetchUsaUnescos } from "../components/API/fetchUnescos";
import { northAmerica } from "../components/homePageComponents/data/Countries";
import BackButton from "../components/BackButton";

export default function SearchResultsPage() {

  // ==============================
  // STATE HOOKS
  // ==============================
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginRegisterMenuOpen, setIsLoginRegisterMenuOpen] = useState(false);
  const [isMobileFilterMenuOpen, setIsMobileFilterMenuOpen] = useState(false);
  const [isMobileSortMenuOpen, setIsMobileSortMenuOpen] = useState(false);
  const [filteredFetchResults, setFilteredFetchResults] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(10);

  const countryStateContext = useContext(SearchedCountryOrStateContext);
  if (!countryStateContext) {
    throw new Error("SearchedCountryOrStateContext must be used within SearchedCountryOrStateProvider");
  }
  const { searchedCountryOrState } = countryStateContext;


  const destinationTypeContext = useContext(SearchedDestinationTypeContext);
  if (!destinationTypeContext) {
    throw new Error("SearchedDestinationTypeContext must be used within SearchedDestinationTypeProvider");
  }
  const { searchedDestinationType } = destinationTypeContext;


  useEffect(() => {
    async function loadFilteredFetchResults() {
      if (!searchedDestinationType) return;
  
      if (searchedDestinationType === "UNESCO") {
        const unescoData = await fetchUsaUnescos();
        setFilteredFetchResults(unescoData);
        console.log(unescoData)

      } else if (searchedDestinationType === "National Park") {
        const parkData = await fetchParks();
        if (!searchedCountryOrState) return;
  
        const selectedAbbr = northAmerica[searchedCountryOrState];
        const filteredParks = parkData.filter((park: any) =>
          park.states.split(",").includes(selectedAbbr)
        );
        setFilteredFetchResults(filteredParks);

      } else if (searchedDestinationType === "Both") {
        const parkData = await fetchParks();
        const unescoData = await fetchUsaUnescos();
        let combinedResults: any[] = [];
  
        if (searchedCountryOrState) {
          const selectedAbbr = northAmerica[searchedCountryOrState];
          const filteredParks = parkData.filter((park: any) =>
            park.states.split(",").includes(selectedAbbr)
          );
          combinedResults = [...filteredParks, ...unescoData];
        } else {
          combinedResults = [...parkData, ...unescoData];
        }
  
        setFilteredFetchResults(combinedResults);
      }
    }
  
    loadFilteredFetchResults();
  }, [searchedDestinationType, searchedCountryOrState]);
  


  const handleLoadMoreResultsButton = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev + 10;
      return nextIndex > filteredFetchResults.length
      ? filteredFetchResults.length
      : nextIndex;
    });
  };

   function slugify(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  }
  

 
    // === DATE FOR FOOTER ===
    const date = new Date();
    const currentYear = date.getFullYear();

    const navigate = useNavigate();
  

  // ==============================
  // RENDER
  // ==============================

  if (filteredFetchResults.length === 0) {
    return (
      <div className="details-page-container">
        <p>Loading results…</p>
      </div>
    );
  }

  return (
    <div className="search-results-page-container">
      {/* ==============================
          TOP NAV BAR
          ============================== */}
      <div className="top-row-search-results-page">
        <img src={logo} alt="Heritago Logo" className="homepage-logo" onClick={() => navigate(-1)} />

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

    <p className="result-paragraph-search-result-page" >
    {/* {searchedDestinationType === "National Park" | "UNESCO" ? {searchedCountryOrState} {filteredFetchResults.length} {searchedDestinationType}"found" : */}
    </p>
    <div className="search-result-page-inner-container">

    <BackButton />


<div className="search-result-page-filtering-options-container">
  <button onClick={() => setIsMobileFilterMenuOpen(true)}>
    <img src={filterIcon} alt="" />Filter
  </button>
  <button onClick={() => setIsMobileSortMenuOpen(true)}>
    <img src={sortIcon} alt="" />Sort
  </button>
</div>

{isMobileFilterMenuOpen && (
  <MobileFilterMenu onClose={() => setIsMobileFilterMenuOpen(false)} />
)}

{isMobileSortMenuOpen && (
  <MobileSortMenu onClose={() => setIsMobileSortMenuOpen(false)} />
)}

<hr />

{/* ========== RESULTS ========== */}
{filteredFetchResults.slice(0, currentIndex).map((result: any) => {
  const isPark = searchedDestinationType === "National Park" || result.fullName;
  const imageUrl = isPark
    ? result.images?.[0]?.url
    : result.main_image_url?.url || result.images_urls?.split(",")[0];
  const title = isPark ? result.fullName : result.name_en;
  const address = isPark
    ? `${result.addresses?.[0]?.line1 || ""}, ${result.addresses?.[0]?.city || ""}, ${
        result.addresses?.[0]?.stateCode || ""
      } ${result.addresses?.[0]?.postalCode || ""}`
    : `${result.iso_codes || ""}`;

  return (
    <div key={result.id || result.uuid}>
      <div className="search-result-page-listed-results-container">
        <div className="search-result-page-listed-results-container-result">
          <img className="result-image" src={imageUrl} alt={title} />
          <div className="title-and-badge-container" >
          <h2 className="result-title">{title}</h2> {searchedDestinationType === "Both" && <div  className={`${result.id ? "park-title-badge" : "unesco-title-badge"}`} ><span >{result.id ? "nat.park" : "unesco"}</span></div>}
          </div>
          <p className="result-address">{address || "Location unavailable"}</p>

          <div className="map-link-website-link-and-heart-icon-container">
            <div className="result-map">
              {/* For UNESCO: you can generate Google Maps link from coordinates */}
              {isPark ? (
                <a href="#">
                  <p>Show on map</p>
                </a>
              ) : result.coordinates ? (
                <a
                  href={`https://www.google.com/maps?q=${result.coordinates.lat},${result.coordinates.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>Show on map</p>
                </a>
              ) : (
                <p>Show on map</p>
              )}
            </div>

            <div className="result-website">
              <a
                href={
                  isPark
                    ? result.url || "#"
                    : `https://whc.unesco.org/en/list/${result.id_no || ""}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>Website</p>
              </a>
            </div>

            <button className="result-add-to-favorite-button">
              <img src={heartIconGreen} alt="Add to favorites" />
            </button>
          </div>

          <button
          className="result-see-details-button"
            onClick={() => {
              const slug = slugify(result.fullName || result.name_en);
              navigate(`/details/${slug}`);
            }}
          >
            See details
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
})}
</div>


      {filteredFetchResults.length > currentIndex && 
        <button onClick={handleLoadMoreResultsButton} className="search-result-page-load-more-results-button" >
          Load more results <img src={downIcon} alt="" />
        </button>

      }

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
