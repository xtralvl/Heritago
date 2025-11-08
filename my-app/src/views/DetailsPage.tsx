import { useState } from "react";
import "../styles/DetailsPage.scss";
import logo from "../assets/heritago-logo.png";
import profileIcon from "../assets/profile-icon.svg";
import hamburgerIcon from "../assets/hamburger-icon.svg";
import heartIcon from "../assets/heart-icon.svg";
import previousIcon from "../assets/previous-icon.svg";
import nextIcon from "../assets/next-icon.svg";
import mockPic from "../assets/yellowstone-example-pic.jpg";
import heritagoLogo from "../assets/heritago-logo.png";
import MobileMenu from "../components/homePageComponents/MobileMenu";
import LoginRegister from "../components/homePageComponents/LoginRegister";
import Newsletter from "../components/homePageComponents/Newsletter";
import { useNavigate } from "react-router-dom";

export default function DetailsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginRegisterMenuOpen, setIsLoginRegisterMenuOpen] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  const navigate = useNavigate();
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <div className="details-page-container">
      {/* ==============================
          HEADER / NAVIGATION
          ============================== */}
      <div className="top-row-details-page">
        <img
          onClick={() => navigate(-2)}
          src={logo}
          alt="Heritago Logo"
          className="homepage-logo"
        />
        

        {/* === MOBILE & TABLET === */}
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
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
        )}

        {/* === LOGIN REGISTER === */}
        {isLoginRegisterMenuOpen && (
          <LoginRegister onClose={() => setIsLoginRegisterMenuOpen(false)} />
        )}

        {/* === DESKTOP === */}
        <div className="top-row-buttons-container-desktop">
          <div className="about-and-help-button-container-top">
            <button
              className="about-button-home-top"
              onClick={() => navigate("/about")}
            >
              About
            </button>
            <button
              className="help-button-home-top"
              onClick={() => navigate("/help")}
            >
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
          MAIN CONTENT
          ============================== */}
      <div className="details-page-content">
        <div className="details-page-title-container">

            <div className="details-page-title-and-paragraph" >
                <h1>Yellowstone National Park</h1>
                <p>2 Officers Row, Yellowstone National Park, WY 82190</p>
            </div>

          <div className="details-page-buttons-container">

            <button className="details-page-show-on-map-button">
              <p>Show on map</p>
            </button>

            <button className="details-see-their-website-container">
              <p>See their website</p>
            </button>

          </div>

          <button className="details-page-add-to-favorite-button">
              <img src={heartIcon} alt="Add to favorites" />
            </button>

        </div>

        {/* === CAROUSEL === */}
        <div className="details-page-carousel-container">
          <button className="details-page-carousel-left-button">
            <img src={previousIcon} alt="Previous image" />
          </button>
          <img src={mockPic} alt="Yellowstone National Park" />
          <button className="details-page-carousel-right-button">
            <img src={nextIcon} alt="Next image" />
          </button>
          <div className="details-page-carousel-pic-counter">1 / 6</div>
        </div>

        {/* === FACILITIES === */}
        <section className="details-page-facilities-section">
          <h2>Facilities & Services</h2>
          <div className="details-page-facilities-and-services-container">
            <span>World’s first national park</span>
            <span>Old Faithful Geyser</span>
            <span>Hiking</span>
            <span>Ranger-led programs</span>
            <span>Restrooms & Food Services</span>
          </div>
          <button className="show-all-facilities-btn">
            Show all facilities and services
          </button>
        </section>

        {/* === ABOUT SECTION === */}
        <section className="details-page-about-container">
          <h3>About this national park:</h3>
          <p>
            First in the World — Established in 1872, Yellowstone is recognized
            as the first national park on Earth. Supervolcano Below — The park
            sits atop a massive supervolcano that powers more than 10,000
            geothermal features, including geysers and hot springs. Wildlife
            Wonderland — One of the only places in the U.S. where grizzly bears,
            wolves, and bison still coexist in their natural habitat. Old
            Faithful Geyser — Erupts roughly every 90 minutes, shooting water
            over 40 meters (130 feet) high. Grand Prismatic Spring — The largest
            hot spring in the U.S., known for its rainbow-like colors caused by
            heat-loving bacteria. Massive Size — Yellowstone spans about 8,983
            km² (3,468 mi²) — larger than Delaware and Rhode Island combined.
            Ancient History — Native American tribes have lived in and around
            Yellowstone for over 11,000 years.
          </p>
        </section>

        <hr />

        {/* === NEWSLETTER SECTION === */}
        <section className="details-page-newsletter-container">
          <p>
            Sign up to our monthly newsletter to get the best suggestions and
            have first-hand information on the latest innovations of the
            webpage.
          </p>
          <button
            className="newsletter-open-btn"
            onClick={() => setIsNewsletterModalOpen(true)}
          >
            Sign up to the newsletter here.
          </button>
        </section>
      </div>

      {/* === NEWSLETTER MODAL === */}
      {isNewsletterModalOpen && (
        <Newsletter onClose={() => setIsNewsletterModalOpen(false)} />
      )}

      {/* ==============================
          FOOTER
          ============================== */}
      <footer className="details-page-footer">
        <div className="navigation-section-details-bottom">
          <button
            onClick={() => navigate("/about")}
            className="language-button-home-bottom"
          >
            About
          </button>
          <button onClick={() => navigate("/help")}>Help</button>
        </div>

        <div className="logo-and-rights-bottom-container">
          <img
            className="logo-bottom"
            src={heritagoLogo}
            alt="Heritago logo"
          />
          <p>© {currentYear} Heritago | All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
