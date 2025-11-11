import { useState, useEffect } from "react";
import leftIcon from "../../assets/left-icon-green.svg";
import rightIcon from "../../assets/right-icon-green.svg";
import "../../styles/homePageStyles/HomeBodyAndFooter.scss";
import exploreIcon from "../../assets/explore-icon.svg";
import reviewIcon from "../../assets/review-icon.svg";
import growingIcon from "../../assets/growing-icon-blue.svg";
import heritagoLogo from "../../assets/heritago-logo.png";
import LoginRegister from "./LoginRegister";
import { useNavigate } from "react-router-dom";
import DesktopCarousel from "./DesktopCarousel";
import { fetchTopSixParks } from "../API/fetchParks";
import Newsletter from "./Newsletter";

export default function HomeBodyAndFooter() {
  const navigate = useNavigate();

  const [isLoginRegisterMenuOpen, setIsLoginRegisterMenuOpen] = useState(false);
  const [topSixNationalParks, setTopSixNationalParks] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  // === FETCH TOP DESTINATIONS ===
  useEffect(() => {
    async function loadTheSixParks() {
      const data = await fetchTopSixParks();
      setTopSixNationalParks(data);
    }
    loadTheSixParks();
  }, []);

  // === CAROUSEL NAVIGATION ===
  const handlePrev = () => {
    if (topSixNationalParks.length === 0) return;
    setCurrentIndex((prev) =>
      prev === 0 ? topSixNationalParks.length - 3 : prev - 1
    );
  };

  const handleNext = () => {
    if (topSixNationalParks.length === 0) return;
    setCurrentIndex((prev) =>
      prev >= topSixNationalParks.length - 3 ? 0 : prev + 1
    );
  };

  // === DATE FOR FOOTER ===
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <div className="home-body-container">
      {/* === HEADER SECTION === */}
      <div className="home-body-header-and-paragraph-container">
        <h3>Trending Destinations</h3>
        <p>Most popular travel choices among travelers.</p>
      </div>

      {/* === LOGIN-REGISTER MENU === */}
      {isLoginRegisterMenuOpen && (
        <LoginRegister onClose={() => setIsLoginRegisterMenuOpen(false)} />
      )}

      {/* === TRENDING DESTINATIONS CAROUSEL === */}
      <div className="trending-destinations-carousel-container">
        <button
          onClick={handlePrev}
          className="stepper-button-carousel carousel-left-button"
        >
          <img src={leftIcon} alt="Previous destination" />
        </button>

        {/* === MOBILE / TABLET === */}
        <div className="carousel-destination-preview-container-mobile">
          <img
            src={topSixNationalParks[currentIndex]?.images?.[0]?.url}
            alt={
              topSixNationalParks[currentIndex]?.images?.[0]?.altText ||
              topSixNationalParks[currentIndex]?.fullName
            }
          />
          <div className="carousel-destination-preview-name-and-review-container">
            <span className="carousel-destination-preview-name">
              {topSixNationalParks[currentIndex]?.fullName}
            </span>
          </div>
        </div>

        {/* === DESKTOP === */}
        <div className="carousel-destination-preview-container-desktop-container">
          <div className="carousel-destination-preview-container-desktop">
            <DesktopCarousel
              parks={topSixNationalParks}
              startIndex={currentIndex}
            />
          </div>
        </div>

        <button
          onClick={handleNext}
          className="stepper-button-carousel carousel-right-button"
        >
          <img src={rightIcon} alt="Next destination" />
        </button>
      </div>

      <hr />

      {/* === FEATURE SECTION === */}
      <div className="home-features-container">
        <div className="home-features home-features-first">
          <img className="features-icon" src={exploreIcon} alt="Destination icon" />
          <p>
            Explore hundreds of breathtaking parks <br />
            Discover inspiring museums around the world
          </p>
        </div>

        <div className="home-features home-features-second">
          <img className="features-icon" src={reviewIcon} alt="Review icon" />
          <p>
            Read detailed insights and honest reviews <br />
            Find opinions shared by travelers worldwide
          </p>
        </div>

        <div className="home-features home-features-third">
          <img
            className="features-icon"
            src={growingIcon}
            alt="Growing database icon"
          />
          <p>
            We’re constantly expanding our database <br />
            Soon, new destinations will join from every region
          </p>
        </div>
      </div>

      <hr />

      {/* === SIGN-UP / LOG-IN SECTION === */}
      <div className="sign-up-log-in-section-home-container">
        <h4>Login to access additional features</h4>
        <p>
          Unlock features like marking favorites, viewing insights, changing font size and switching to dark mode.
        </p>
        <button onClick={() => setIsLoginRegisterMenuOpen(true)}>
          <strong>Login</strong>
        </button>
      </div>

      <hr />

      {/* === NEWSLETTER SECTION === */}
      <div className="newsletter-section-home-container">
        <p>
          Subscribe to our monthly newsletter to receive the best travel tips
          and stay updated on the latest site improvements.
        </p>
        <button
          className="newsletter-open-btn"
          onClick={() => setIsNewsletterModalOpen(true)}
        >
          <p>Sign up for the newsletter here</p>
        </button>
      </div>

      {isNewsletterModalOpen && (
        <Newsletter onClose={() => setIsNewsletterModalOpen(false)} />
      )}
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
          <img className="logo-bottom" src={heritagoLogo} alt="Heritago logo" />
          <p>© {currentYear} Heritago | All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
