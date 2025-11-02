import leftIcon from "../../assets/left-icon-green.svg";
import rightIcon from "../../assets/right-icon-green.svg";
import yellowstonePic from "../../assets/yellowstone-example-pic.jpg";
import yosemitePic from "../../assets/yosemitePic.avif";
import grandTetonPic from "../../assets/grandTetonPic.jpg";

import "../../styles/homePageStyles/HomeBodyAndFooter.scss";
import exploreIcon from "../../assets/explore-icon.svg";
import reviewIcon from "../../assets/review-icon.svg";
import growingIcon from "../../assets/growing-icon-blue.svg";
import downIcon from "../../assets/down-icon.svg";
import heritagoLogo from "../../assets/heritago-logo.png";


export default function HomeBodyAndFooter() {
  return (
    <div className="home-body-container">
      {/* === HEADER SECTION === */}
      <div className="home-body-header-and-paragraph-container">
        <h3>Trending Destinations</h3>
        {/* Later: Filter destinations based on the selected continent (Redux hook state) */}
        <p>Most popular travel choices among our visitors.</p>
      </div>

      {/* === TRENDING DESTINATIONS CAROUSEL === */}
      <div className="trending-destinations-carousel-container">
        <button className="stepper-button-carousel carousel-left-button">
          <img src={leftIcon} alt="Previous destination" />
        </button>

        {/* Later: Replace with API-driven destination data */}
        <div className="carousel-destination-preview-container-mobile">
          <img src={yellowstonePic} alt="Yellowstone National Park" />
          <div className="carousel-destination-preview-name-and-review-container">
            <span className="carousel-destination-preview-name">
              Yellowstone National Park
            </span>
            <span className="carousel-destination-preview-review">4.8 / 5</span>
          </div>
        </div>

      <div className="carousel-destination-preview-container-desktop-container">

        <div className="carousel-destination-preview-container-desktop">
          <img src={yellowstonePic} alt="Yellowstone National Park" />
          <div className="carousel-destination-preview-name-and-review-container">
            <span className="carousel-destination-preview-name">
              Yellowstone National Park
            </span>
            <span className="carousel-destination-preview-review">4.8 / 5</span>
          </div>
        </div>

        <div className="carousel-destination-preview-container-desktop">
          <img src={yosemitePic} alt="Yellowstone National Park" />
          <div className="carousel-destination-preview-name-and-review-container">
            <span className="carousel-destination-preview-name">
              Yosemite National Park
            </span>
            <span className="carousel-destination-preview-review">4.3 / 5</span>
          </div>
        </div>

        <div className="carousel-destination-preview-container-desktop">
          <img src={grandTetonPic} alt="Yellowstone National Park" />
          <div className="carousel-destination-preview-name-and-review-container">
            <span className="carousel-destination-preview-name">
              Grand Teton National Park
            </span>
            <span className="carousel-destination-preview-review">4.4 / 5</span>
          </div>
        </div>

      </div>

        <button className="stepper-button-carousel carousel-right-button">
          <img src={rightIcon} alt="Next destination" />
        </button>
      </div>

      <hr />

      {/* === FEATURE SECTION === */}
      <div className="home-features-container">
      <div className="home-features home-features-first">
      <img
        className="features-icon"
        src={exploreIcon}
        alt="Destination icon"
      />
      <p>
        Explore hundreds of breathtaking parks <br />
        Discover inspiring museums around the world
      </p>
    </div>

    <div className="home-features home-features-second">
      <img
        className="features-icon"
        src={reviewIcon}
        alt="Review icon"
      />
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

      {/* === SIGN-UP / LOG-IN SECTION (Visible only if user not logged in) === */}
      <div className="sign-up-log-in-section-home-container">
        <h4>Sign up to access additional features</h4>
        <p>
          Unlock features like marking favorites, viewing insights, leaving
          reviews, and switching to dark mode.
        </p>
        <div className="sign-up-and-log-in-button-container">
          <button>
            <strong>Sign up</strong>
          </button>
          <button>Log in</button>
        </div>
      </div>

      <hr />

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

      {/* === FOOTER - BOTTOM NAVIGATION SECTION */}
      <footer>
      <div className="navigation-section-home-bottom">
        <button className="language-button-home-bottom">
          EN <img src={downIcon} alt="Select language" />
        </button>
        <button>Help</button>
      </div>

        <div className="logo-and-rights-bottom-container" >
        <img className="logo-bottom" src={heritagoLogo} alt="" />
        <p>© 2025 Heritago | All rights reserved</p>
        </div>
        
      </footer>
    </div>


  );
}
