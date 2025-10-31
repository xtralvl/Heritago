import logo from "../../assets/heritago-logo.png";
import profileIcon from "../../assets/profile-icon.svg";
import hamburgerIcon from "../../assets/hamburger-icon.svg";

import museumIconBlack from "../../assets/museum-icon-black.svg";
import nationalParkIconBlack from "../../assets/national-park-icon-black.svg";
import bothIconBlack from "../../assets/both-icon-black.svg";

import "../../styles/homePageStyles/HomeNavAndHero.scss";

export default function HomeNavAndHero() {
  return (
    <div className="home-nav-and-hero-container">
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

      <div className="hero-form-container">
        <div className="hero-text-container">
          <h1>Explore the national parks and museums all over the world!</h1>
          <p>See the details, reviews and insights for all.</p>
        </div>

        <h2 className="mobile-hero-subheader">What would you like to visit?</h2>

        <div className="hero-option-buttons">
          <button className="museum-select-button">
            <img src={museumIconBlack} alt="Museum Icon" />
            <p>Museums</p>
          </button>

          <button className="national-park-select-button">
            <img src={nationalParkIconBlack} alt="National Park Icon" />
            <p>National Parks</p>
          </button>

          <button className="both-select-button">
            <img src={bothIconBlack} alt="Both Icon" />
            <p>Both</p>
          </button>
        </div>
      </div>
    </div>
  );
}
