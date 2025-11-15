import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/SearchResultsPage.scss';
import logo from '../assets/heritago-logo.png';
import profileIcon from "../assets/profile-icon.svg";
import hamburgerIcon from "../assets/hamburger-icon.svg";
import filterIcon from '../assets/filter-icon.svg';
import sortIcon from '../assets/sort-icon.svg';
import heartIconGreen from '../assets/heart-icon.svg';
import downIcon from '../../src/assets/down-icon.svg';
import heritagoLogo from "../assets/heritago-logo.png";
import MobileMenu from '../components/homePageComponents/MobileMenu';
import LoginRegister from '../components/homePageComponents/LoginRegister';
import MobileFilterMenu from "../components/MobileFilterMenu";
import MobileSortMenu from "../components/MobileSortMenu";
import { SearchedCountryOrStateContext } from "../context/SearchedCountryOrStateContext";
import { SearchedDestinationTypeContext } from "../context/SearchedDestinationTypeContext";
import { fetchParks } from "../components/API/fetchParks";
import { fetchUsaUnescos } from "../components/API/fetchUnescos";
import { northAmerica } from "../components/homePageComponents/data/Countries";
import BackButton from "../components/BackButton";
import { FilterContext } from "../context/FilterContext";
import { SortContext } from "../context/SortContext";

export default function SearchResultsPage() {
  // ==============================
  // STATE HOOKS
  // ==============================
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginRegisterMenuOpen, setIsLoginRegisterMenuOpen] = useState(false);
  const [isMobileFilterMenuOpen, setIsMobileFilterMenuOpen] = useState(false);
  const [isMobileSortMenuOpen, setIsMobileSortMenuOpen] = useState(false);
  const [filteredFetchResults, setFilteredFetchResults] = useState<any[]>([]);
  const [finalResult, setFinalResult] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(10);

  const countryStateContext = useContext(SearchedCountryOrStateContext);
  if (!countryStateContext) throw new Error("SearchedCountryOrStateContext must be used within SearchedCountryOrStateProvider");
  const { searchedCountryOrState } = countryStateContext;

  const destinationTypeContext = useContext(SearchedDestinationTypeContext);
  if (!destinationTypeContext) throw new Error("SearchedDestinationTypeContext must be used within SearchedDestinationTypeProvider");
  const { searchedDestinationType } = destinationTypeContext;

  const { appliedFilter } = useContext(FilterContext)!;
  const { appliedSort } = useContext(SortContext)!;

  const navigate = useNavigate();

  // ==============================
  // LOAD FETCH RESULTS
  // ==============================
  useEffect(() => {
    async function loadFilteredFetchResults() {
      if (!searchedDestinationType) return;

      try {
        if (searchedDestinationType === "UNESCO") {
          const unescoData = await fetchUsaUnescos();
          setFilteredFetchResults(unescoData);
        } else if (searchedDestinationType === "National Park") {
          const parkData = await fetchParks();
          if (!searchedCountryOrState) {
            setFilteredFetchResults(parkData);
          } else {
            const selectedAbbr = northAmerica[searchedCountryOrState];
            const filteredParks = parkData.filter((park: any) =>
              park.states.split(",").includes(selectedAbbr)
            );
            setFilteredFetchResults(filteredParks);
          }
        } else if (searchedDestinationType === "Both") {
          const parkData = await fetchParks();
          const unescoData = await fetchUsaUnescos();
          if (searchedCountryOrState) {
            const selectedAbbr = northAmerica[searchedCountryOrState];
            const filteredParks = parkData.filter((park: any) =>
              park.states.split(",").includes(selectedAbbr)
            );
            setFilteredFetchResults([...filteredParks, ...unescoData]);
          } else {
            setFilteredFetchResults([...parkData, ...unescoData]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch results", err);
        setFilteredFetchResults([]);
      }
    }

    loadFilteredFetchResults();
  }, [searchedDestinationType, searchedCountryOrState]);

  // ==============================
  // FILTER RESULTS
  // ==============================
  useEffect(() => {
    const filteredResults =
      appliedFilter.length === 0
        ? filteredFetchResults
        : filteredFetchResults.filter(result => {
            // Keep UNESCO always
            if (!result.activities) return true;

            return result.activities.some((activity: any) =>
              appliedFilter.includes(activity.name)
            );
          });

    setFinalResult(filteredResults);
  }, [appliedFilter, filteredFetchResults]);

  // ==============================
  // SORT RESULTS
  // ==============================
  useEffect(() => {
    if (!appliedSort || appliedSort.length === 0) return;

    const isParkResult = (result: any) => Boolean(result.fullName);

    const sorted = [...finalResult];

    if (appliedSort === "smallest") {
      sorted.sort((a, b) => (a.rea_hectares || 0) - (b.rea_hectares || 0));
    } else if (appliedSort === "largest") {
      sorted.sort((a, b) => (b.rea_hectares || 0) - (a.rea_hectares || 0));
    } else if (appliedSort === "date") {
      sorted.sort((a, b) => (a.date_inscribed || 0) - (b.date_inscribed || 0));
    } else if (appliedSort === "popularity") {
      sorted.sort((a, b) => {
        const aCount = isParkResult(a) && Array.isArray(a.activities) ? a.activities.length : 0;
        const bCount = isParkResult(b) && Array.isArray(b.activities) ? b.activities.length : 0;
        return bCount - aCount; // descending
      });
    }

    setFinalResult(sorted);
  }, [appliedSort, finalResult]);

  // ==============================
  // LOAD MORE RESULTS
  // ==============================
  const handleLoadMoreResultsButton = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev + 10;
      return nextIndex > finalResult.length ? finalResult.length : nextIndex;
    });
  };

  // ==============================
  // HELPER FUNCTIONS
  // ==============================
  function slugify(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  }

  const currentYear = new Date().getFullYear();

  // ==============================
  // LOADING STATE
  // ==============================
  if (filteredFetchResults.length === 0) {
    return (
      <div className="loading-container">
        {searchedDestinationType === "UNESCO" && <p>Loading UNESCO sites..</p>}
        {searchedDestinationType === "National Park" && <p>Loading National Parks..</p>}
        {searchedDestinationType === "Both" && <p>Loading UNESCO sites and National Parks..</p>}
        <img src={heritagoLogo} alt="Heritago Logo" />
      </div>
    );
  }

  // ==============================
  // RENDER
  // ==============================
  return (
    <div>
      <div className="search-results-page-container">
        {/* TOP NAV */}
        <div className="top-row-search-results-page">
          <img
            src={logo}
            alt="Heritago Logo"
            className="homepage-logo"
            onClick={() => navigate(-1)}
          />

          <div className="top-row-buttons-container-mobile">
            <button className="profile-button" onClick={() => setIsLoginRegisterMenuOpen(true)}>
              <img src={profileIcon} alt="Profile" />
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="hamburger-button">
              <img src={hamburgerIcon} alt="Menu" />
            </button>
          </div>

          {isMobileMenuOpen && <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />}
          {isLoginRegisterMenuOpen && <LoginRegister onClose={() => setIsLoginRegisterMenuOpen(false)} />}

          <div className="top-row-buttons-container-desktop">
            <div className="about-and-help-button-container-top">
              <button className="about-button-home-top">About</button>
              <button className="help-button-home-top">Help</button>
            </div>

            <div className="sign-up-and-log-in-button-container-top">
              <button className="sign-up-button" onClick={() => setIsLoginRegisterMenuOpen(true)}>
                <strong>Login</strong>
              </button>
            </div>
          </div>
        </div>
        <hr />

        {/* HERO */}
        <div className="hero-form-container-search-page">
          <div className="hero-text-container-search-page">
            <div className="hero-text-search-page">
              <h1>Magnificent destinations all over the world just waiting for you to explore!</h1>
            </div>
          </div>
        </div>

        <div className="search-result-page-inner-container">
          <BackButton />
          <div className="search-result-page-filtering-options-container">
            <button onClick={() => setIsMobileFilterMenuOpen(true)}>
              <img src={filterIcon} alt="Filter" />Filter
            </button>
            <button onClick={() => setIsMobileSortMenuOpen(true)}>
              <img src={sortIcon} alt="Sort" />Sort
            </button>
          </div>
          {isMobileFilterMenuOpen && <MobileFilterMenu onClose={() => setIsMobileFilterMenuOpen(false)} />}
          {isMobileSortMenuOpen && <MobileSortMenu onClose={() => setIsMobileSortMenuOpen(false)} />}

          <hr />

          {/* RESULTS */}
          <div className="search-results-container">
            {finalResult.length === 0 && (
              <div className="filter-no-results">
                <p>No results.</p>
                <p>Currently, filtering options are available for — and will be applied to — National Parks only.</p>
              </div>
            )}

            {finalResult.length !== 0 &&
              finalResult.slice(0, currentIndex).map((result: any) => {
                const isPark = Boolean(result.fullName);
                const imageUrl = isPark
                  ? result.images?.[0]?.url
                  : result.main_image_url?.url || result.images_urls?.split(",")[0];
                const title = isPark ? result.fullName : result.name_en;
                const address = isPark
                  ? `${result.addresses?.[0]?.line1 || ""}, ${result.addresses?.[0]?.city || ""}, ${result.addresses?.[0]?.stateCode || ""} ${result.addresses?.[0]?.postalCode || ""}`
                  : `${result.iso_codes || ""}`;

                return (
                  <div key={result.id || result.uuid}>
                    <div className="search-result-page-listed-results-container">
                      <div className="search-result-page-listed-results-container-result">
                        <img className="result-image" src={imageUrl} alt={title} />
                        <div className="title-and-badge-container">
                          <h2 className="result-title">{title}</h2>
                          {searchedDestinationType === "Both" && (
                            <div className={`${result.id ? "park-title-badge" : "unesco-title-badge"}`}>
                              <span>{result.id ? "Nat. Park" : "UNESCO"}</span>
                            </div>
                          )}
                          <p className="result-address">{address || "Location unavailable"}</p>
                        </div>
                        <hr className="results-page-grid-hr" />

                        <section className="search-results-page-facilities-section">
                          {isPark && result.activities && result.activities.length > 0 && <h2>Facilities & Services</h2>}
                          <div className="search-results-page-facilities-and-services-container">
                            {isPark && result.activities && result.activities.length > 0
                              ? result.activities.slice(0, 5).map((act: any, i: number) => <span key={i}>{act.name}</span>)
                              : <span className="no-facilities-text">See additional information by clicking "See details"</span>
                            }
                          </div>
                        </section>

                        <div className="map-link-website-link-and-heart-icon-container">
                          <div className="result-website">
                            <a href={isPark ? (result.url || "#") : `https://whc.unesco.org/en/list/${result.id_no || ""}`} target="_blank" rel="noopener noreferrer">
                              <p>Website</p>
                            </a>
                          </div>
                          <button className="result-add-to-favorite-button">
                            <img src={heartIconGreen} alt="Add to favorites" />
                          </button>
                        </div>

                        <button className="result-see-details-button" onClick={() => {
                          const slug = slugify(result.fullName || result.name_en);
                          navigate(`/details/${slug}`);
                        }}>See details</button>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
          </div>

          {finalResult.length > currentIndex && (
            <button onClick={handleLoadMoreResultsButton} className="search-result-page-load-more-results-button">
              Load more results <img src={downIcon} alt="Load more" />
            </button>
          )}

          <div className="newsletter-section-home-container">
            <p>Subscribe to our monthly newsletter to receive the best travel tips and stay updated on the latest site improvements.</p>
            <a href="#"><p>Sign up for the newsletter here</p></a>
          </div>
        </div>

        <footer>
          <div className="navigation-section-home-bottom">
            <button onClick={() => navigate("about")} className="language-button-home-bottom">About</button>
            <button onClick={() => navigate("help")}>Help</button>
          </div>
          <div className="logo-and-rights-bottom-container">
            <img className="logo-bottom" src={logo} alt="Heritago Logo" />
            <p>© {currentYear} Heritago | All rights reserved</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
