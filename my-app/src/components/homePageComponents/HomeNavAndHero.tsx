import { useState, useEffect, useRef, useContext } from "react";
import "../../styles/homePageStyles/HomeNavAndHero.scss";
import logo from "../../assets/heritago-logo.png";
import profileIcon from "../../assets/profile-icon.svg";
import hamburgerIcon from "../../assets/hamburger-icon.svg";
import museumIconBlack from "../../assets/museum-icon-black.svg";
import nationalParkIconBlack from "../../assets/national-park-icon-black.svg";
import bothIconBlack from "../../assets/both-icon-black.svg";
import { northAmerica } from "./data/Countries";
import MobileMenu from "./MobileMenu";
import LoginRegister from "./LoginRegister";
import { useNavigate } from "react-router-dom";
import { SearchedCountryOrStateContext } from "../../context/SearchedCountryOrStateContext";
import { SearchedDestinationTypeContext } from "../../context/SearchedDestinationTypeContext";
import HeroCarousel from "./data/heroCarousel";

export default function HomeNavAndHero() {
  type category = "National Park" | "UNESCO" | "Both";

  // ==============================
  // STATE HOOKS
  // ==============================
  const [continentOpen, setContinentOpen] = useState(false);
  const [countryOrStateOpen, setCountryOrStateOpen] = useState(false);
  const [continent, setContinent] = useState("North America");
  const [countrySearch, setCountrySearch] = useState("");
  const [destinationError, setDestinationError] = useState(false);
  const [countryOrStateError, setCountryOrStateError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginRegisterMenuOpen, setIsLoginRegisterMenuOpen] = useState(false);

  const { searchedCountryOrState, setSearchedCountryOrState } =
    useContext(SearchedCountryOrStateContext)!;
  const { searchedDestinationType, setSearchedDestinationType } =
    useContext(SearchedDestinationTypeContext)!;

  const navigate = useNavigate();

  // ==============================
  // CONTINENTS DATA
  // ==============================
  const continents: string[] = [
    "North America",
    "Latin America",
    "Europe",
    "Asia",
    "Africa",
    "Australia",
  ];

  const isCountrySelectDisabled = searchedDestinationType === "UNESCO";

  const filteredCountries = Object.keys(northAmerica).filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // ==============================
  // REFS
  // ==============================
  const continentRef = useRef<HTMLDivElement | null>(null);
  const countryRef = useRef<HTMLDivElement | null>(null);

  // ==============================
  // EFFECTS
  // ==============================
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (continentRef.current && !continentRef.current.contains(e.target as Node)) {
        setContinentOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOrStateOpen(false);
        setCountrySearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ==============================
  // HANDLERS
  // ==============================
  const handleSearchButton = () => {
    const hasDestination = Boolean(searchedDestinationType);
    setDestinationError(!hasDestination);

    const requiresCountry = searchedDestinationType !== "UNESCO";
    const hasValidCountry = searchedCountryOrState && searchedCountryOrState !== "Select Country/State";

    setCountryOrStateError(requiresCountry && !hasValidCountry);

    if (hasDestination && (searchedDestinationType === "UNESCO" || hasValidCountry)) {
      navigate("/search");
    }
  };

  const handleDestinationCategory = (category: category) => {
    setSearchedDestinationType(category);
  };

  // ==============================
  // RENDER
  // ==============================
  return (
    <div className="home-nav-and-hero-container">
      {/* TOP NAV BAR */}
      <div className="top-row-home-page">
        <img src={logo} alt="Heritago Logo" className="homepage-logo" />

        {/* MOBILE AND TAB */}
        <div className="top-row-buttons-container-mobile">
          <button
            className="profile-button"
            aria-label="Open Profile Menu"
            onClick={() => setIsLoginRegisterMenuOpen(true)}
          >
            <img src={profileIcon} alt="Show Profile" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="hamburger-button"
            aria-label="Open Mobile Menu"
          >
            <img src={hamburgerIcon} alt="Show Menu" />
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />}

        {/* LOGIN-REGISTER MENU */}
        {isLoginRegisterMenuOpen && <LoginRegister onClose={() => setIsLoginRegisterMenuOpen(false)} />}

        {/* DESKTOP */}
        <div className="top-row-buttons-container-desktop">
          <div className="about-and-help-button-container-top">
            <button onClick={() => navigate("about")} className="about-button-home-top">
              About
            </button>
            <button onClick={() => navigate("help")} className="help-button-home-top">
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

      <hr className="top-hr-line-home" />

      {/* HERO / SEARCH FORM */}
      <div className="hero-form-container">
        <div className="hero-text-container">
          <div className="hero-text">
            <h1>Explore national parks and UNESCO World Heritage sites around the world!</h1>
            <p>Discover detailed insights, reviews, and information for every destination.</p>
          </div>
        </div>


        <div className="mobile-hero-subheader">
        <HeroCarousel />
        </div>

        <div className="form-outermost-container">
          <div
            className={`hero-option-buttons ${destinationError ? `home-page-form-error-button` : ""}`}
          >
            <button
              className={`option-button unesco-select-button ${
                searchedDestinationType === "UNESCO" ? "selected" : ""
              }`}
              onClick={() => handleDestinationCategory("UNESCO")}
              aria-pressed={searchedDestinationType === "UNESCO"}
            >
              <img src={museumIconBlack} alt="UNESCO Icon" />
              <p>UNESCO</p>
            </button>

            <button
              className={`option-button ${
                searchedDestinationType === "National Park" ? "selected" : ""
              }`}
              onClick={() => handleDestinationCategory("National Park")}
              aria-pressed={searchedDestinationType === "National Park"}
            >
              <img src={nationalParkIconBlack} alt="National Park Icon" />
              <p>National Parks</p>
            </button>

            <button
              className={`option-button both-select-button ${
                searchedDestinationType === "Both" ? "selected" : ""
              }`}
              onClick={() => handleDestinationCategory("Both")}
              aria-pressed={searchedDestinationType === "Both"}
            >
              <img src={bothIconBlack} alt="Both Icon" />
              <p>Both</p>
            </button>
          </div>

          {destinationError && (
            <p
              className="home-page-first-error home-page-form-error-msg"
              id="destination-error"
            >
              Please choose a category.
            </p>
          )}

          {/* LOCATION FORM */}
          <div className="hero-location-form">
            <h3 className="form-heading">Where?</h3>
            <div className="form-fields">
              {/* Continent Select */}
              <div
                className={`continent-select form-group custom-select-wrapper ${
                  countryOrStateError ? "country-or-state-error-state" : ""
                } ${isCountrySelectDisabled ? "disabled-select" : ""}`}
                ref={continentRef}
              >
                <label htmlFor="continent">Continent</label>
                {continentOpen && (
                  <ul className="custom-options" role="listbox" aria-label="Continents">
                    {continents.map((c) => {
                      const isDisabled = c !== "North America";
                      return (
                        <li
                          key={c}
                          role="option"
                          aria-selected={continent === c}
                          className={isDisabled ? "disabled" : ""}
                          onClick={() => {
                            if (isDisabled) return;
                            setContinent(c);
                            setContinentOpen(false);
                          }}
                        >
                          {c}
                          {isDisabled && <span className="soon-badge">Soon</span>}
                        </li>
                      );
                    })}
                  </ul>
                )}
                <div
                  className="custom-select"
                  role="button"
                  tabIndex={0}
                  aria-haspopup="listbox"
                  aria-expanded={continentOpen}
                  aria-label={`Select continent, currently ${continent}`}
                  onClick={() => {
                    setContinentOpen((v) => !v);
                    setCountryOrStateOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setContinentOpen((v) => !v);
                      e.preventDefault();
                    }
                  }}
                >
                  <span>{continent || "Select Continent"}</span>
                  <div className={`arrow ${continentOpen ? "open" : ""}`} />
                </div>
              </div>

              {/* Country/State Select */}
              {!isCountrySelectDisabled && (
                <div
                  className={`country-or-state-select form-group custom-select-wrapper ${
                    countryOrStateError ? "country-or-state-error-state" : ""
                  } ${isCountrySelectDisabled ? "disabled-select" : ""}`}
                  ref={countryRef}
                >
                  <label htmlFor="countryState">Country/State</label>
                  {countryOrStateOpen && (
                    <ul className="custom-options" role="listbox" aria-label="Countries or States">
                      <li className="search-row">
                        <input
                          type="text"
                          className="search-input"
                          placeholder="Type to search..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          autoFocus
                          aria-label="Search country or state"
                        />
                      </li>
                      {filteredCountries.length === 0 ? (
                        <li className="no-results">No results</li>
                      ) : (
                        filteredCountries.map((c) => (
                          <li
                            key={c}
                            role="option"
                            aria-selected={searchedCountryOrState === c}
                            onClick={() => {
                              setSearchedCountryOrState(c);
                              setCountryOrStateOpen(false);
                              setCountrySearch("");
                            }}
                          >
                            {c}
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                  <div
                    className="custom-select"
                    role="button"
                    tabIndex={0}
                    aria-haspopup="listbox"
                    aria-expanded={countryOrStateOpen}
                    aria-label={`Select country or state, currently ${searchedCountryOrState || "none"}`}
                    onClick={() => {
                      if (isCountrySelectDisabled) return;
                      setCountryOrStateOpen((v) => !v);
                      setContinentOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (isCountrySelectDisabled) return;
                      if (e.key === "Enter" || e.key === " ") {
                        setCountryOrStateOpen((v) => !v);
                        e.preventDefault();
                      }
                    }}
                  >
                    <span>
                      {isCountrySelectDisabled
                        ? "Disabled for UNESCO"
                        : searchedCountryOrState || "Select Country/State"}
                    </span>
                    <div className={`arrow ${countryOrStateOpen ? "open" : ""}`} />
                  </div>
                </div>
              )}

              <span className="unesco-only-info-home-page">
                {isCountrySelectDisabled
                  ? "Currently, there’s no option to filter by country or state when UNESCO is the only selected category."
                  : ""}
              </span>

              <span className="unesco-only-info-home-page">
                {searchedDestinationType === "Both"
                  ? "Please note that we always list all UNESCO World Heritage sites of the continent, regardless of the country or state selected."
                  : ""}
              </span>

              {countryOrStateError && (
                <p
                  className="home-page-form-error-msg"
                  id="country-error"
                  aria-live="assertive"
                >
                  {searchedDestinationType === "UNESCO" &&  "Please choose a continent."}
                </p>
              )}

              <button
                type="button"
                className="search-button"
                onClick={handleSearchButton}
                aria-describedby={`${destinationError ? "destination-error" : ""} ${countryOrStateError ? "country-error" : ""}`.trim() || undefined}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr
        className={`hr-below-form ${continentOpen || countryOrStateOpen ? "hr-hide" : ""}`}
      />
    </div>
  );
}
