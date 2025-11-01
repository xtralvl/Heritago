import { useState, useEffect, useRef } from "react";
import "../../styles/homePageStyles/HomeNavAndHero.scss";
import logo from "../../assets/heritago-logo.png";
import profileIcon from "../../assets/profile-icon.svg";
import hamburgerIcon from "../../assets/hamburger-icon.svg";
import museumIconBlack from "../../assets/museum-icon-black.svg";
import nationalParkIconBlack from "../../assets/national-park-icon-black.svg";
import bothIconBlack from "../../assets/both-icon-black.svg";
import { northAmerica } from "../homePageComponents/Countries";

export default function HomeNavAndHero() {

  // ==============================
  // STATE HOOKS
  // ==============================
  const [destinationCategory, setDestinationCategory] = useState<string>(""); // Selected destination category: Museums, National Parks, Both
  const [continentOpen, setContinentOpen] = useState(false); // Dropdown open/close state for continent
  const [countryOrStateOpen, setCountryOrStateOpen] = useState(false); // Dropdown open/close state for country/state
  const [continent, setContinent] = useState("North America"); // Currently selected continent
  const [countryOrState, setCountryOrState] = useState(""); // Currently selected country or state
  const [countrySearch, setCountrySearch] = useState(""); // Search input inside country/state dropdown
  const [destinationError, setDestinationError] = useState(false); // Error state if destination not selected
  const [countryOrStateError, setCountryOrStateError] = useState(false); // Error state if country/state not selected

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
  ]; // List of all continents

  // Filter the list of countries based on search input
  const filteredCountries = northAmerica.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // ==============================
  // REFS
  // ==============================
  const continentRef = useRef<HTMLDivElement | null>(null); // Ref for continent dropdown container
  const countryRef = useRef<HTMLDivElement | null>(null); // Ref for country/state dropdown container

  // ==============================
  // EFFECTS
  // ==============================
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (continentRef.current && !continentRef.current.contains(e.target as Node)) {
        setContinentOpen(false); // Close continent dropdown
      }
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOrStateOpen(false); // Close country/state dropdown
        setCountrySearch(""); // Reset search input
      }
    }

    document.addEventListener("mousedown", handleClickOutside); // Listen for clicks outside
    return () => document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener
  }, []);

  // ==============================
  // HANDLERS
  // ==============================
  /**
   * Validate mandatory fields and set error states
   */
  const handleSearchButton = () => {
    setDestinationError(destinationCategory.length === 0); // Show error if no category selected
    setCountryOrStateError(
      countryOrState === "" || countryOrState === "Select Country/State" // Show error if country/state not selected
    );
  };

  // ==============================
  // RENDER
  // ==============================
  return (
    <div className="home-nav-and-hero-container">

      {/* ==============================
          TOP NAV BAR
          ============================== */}
      <div className="top-row-home-page">
        <img src={logo} alt="Heritago Logo" className="homepage-logo" />
        <div className="top-row-buttons-container">
          <button className="profile-button">
            <img src={profileIcon} alt="Show Profile" />
          </button>
          <button className="hamburger-button">
            <img src={hamburgerIcon} alt="Show Menu" />
          </button>
        </div>
      </div>

      <hr />

      {/* ==============================
          HERO / SEARCH FORM
          ============================== */}
      <div className="hero-form-container">

        {/* Hero Text */}
        <div className="hero-text-container">
          <h1>Explore the national parks and museums all over the world!</h1>
          <p>See the details, reviews and insights for all.</p>
        </div>

        <h2 className="mobile-hero-subheader">What would you like to visit?</h2>

        {/* Destination Category Buttons */}
        <div className={`hero-option-buttons ${destinationError ? `home-page-form-error-button` : ""}`}>
          {/* Museums */}
          <button
            className={`option-button ${
              destinationCategory === "Museums" ? "selected" : ""
            }`}
            onClick={() => setDestinationCategory("Museums")}
          >
            <img src={museumIconBlack} alt="Museum Icon" />
            <p>Museums</p>
          </button>

          {/* National Parks */}
          <button
            className={`option-button ${
              destinationCategory === "National Parks" ? "selected" : ""
            }`}
            onClick={() => setDestinationCategory("National Parks")}
          >
            <img src={nationalParkIconBlack} alt="National Park Icon" />
            <p>National Parks</p>
          </button>

          {/* Both */}
          <button
            className={`option-button ${
              destinationCategory === "Both" ? "selected" : ""
            }`}
            onClick={() => setDestinationCategory("Both")}
          >
            <img src={bothIconBlack} alt="Both Icon" />
            <p>Both</p>
          </button>
        </div>

        {/* Show error message if no category selected */}
        {destinationError &&
          <p className="home-page-form-error-msg">
            Choose a category.
          </p>
        }

        {/* ==============================
            LOCATION FORM
            ============================== */}
        <div className="hero-location-form">
          <h3 className="form-heading">Where?</h3>

          <div className="form-fields">

            {/* Continent Select */}
            <div className="form-group custom-select-wrapper" ref={continentRef}>
              <label htmlFor="continent">Continent</label>

              {/* Dropdown options */}
              {continentOpen && (
                <ul className="custom-options">
                  {continents.map((c) => {
                    const isDisabled = c !== "North America"; // Only North America enabled
                    return (
                      <li
                        key={c}
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

              {/* Dropdown button */}
              <div
                className="custom-select"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setContinentOpen((v) => !v);
                  setCountryOrStateOpen(false); // Close other dropdown
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
            <div
              className={`form-group custom-select-wrapper ${countryOrStateError ? "country-or-state-error-state" : ""}`}
              ref={countryRef}
            >
              <label htmlFor="countryState">Country/State</label>

              {/* Dropdown options */}
              {countryOrStateOpen && (
                <ul className="custom-options">
                  {/* Search input */}
                  <li className="search-row">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Type to search..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      autoFocus
                    />
                  </li>

                  {/* Display filtered countries */}
                  {filteredCountries.length === 0 ? (
                    <li className="no-results">No results</li>
                  ) : (
                    filteredCountries.map((c) => (
                      <li
                        key={c}
                        onClick={() => {
                          setCountryOrState(c);
                          setCountryOrStateOpen(false); // Close dropdown
                          setCountrySearch(""); // Reset search
                        }}
                      >
                        {c}
                      </li>
                    ))
                  )}
                </ul>
              )}

              {/* Dropdown button */}
              <div
                className="custom-select"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setCountryOrStateOpen((v) => !v);
                  setContinentOpen(false); // Close other dropdown
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setCountryOrStateOpen((v) => !v);
                    e.preventDefault();
                  }
                }}
              >
                <span>{countryOrState || "Select Country/State"}</span>
                <div className={`arrow ${countryOrStateOpen ? "open" : ""}`} />
              </div>
            </div>

            {/* Show error message if country/state not selected */}
            {countryOrStateError &&
              <p className="home-page-form-error-msg">Choose a Country/State.</p>
            }

            {/* Search Button */}
            <button
              type="button"
              className="search-button"
              onClick={handleSearchButton}
            >
              Search
            </button>

          </div>
        </div>
      </div>

      <hr />
    </div>
  );
}
