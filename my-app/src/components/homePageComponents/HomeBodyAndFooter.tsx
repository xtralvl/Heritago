import leftIcon from "../../assets/left-icon-green.svg";
import rightIcon from "../../assets/right-icon-green.svg";
import yellowstonePic from "../../assets/yellowstone-example-pic.jpg";
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
        <div className="carousel-destination-preview-container">
          <img src={yellowstonePic} alt="Yellowstone National Park" />
          <div className="carousel-destination-preview-name-and-review-container">
            <span className="carousel-destination-preview-name">
              Yellowstone National Park
            </span>
            <span className="carousel-destination-preview-review">4.8 / 5</span>
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
            alt="Explore icon"
          />
          <p>
            Explore hundreds of national parks <br />
            Discover world-class museums
          </p>
        </div>

        <div className="home-features home-features-second">
          <img
            className="features-icon"
            src={reviewIcon}
            alt="Review icon"
          />
          <p>
            Detailed insights and authentic reviews <br />
            Countless opinions from travelers around the world
          </p>
        </div>

        <div className="home-features home-features-third">
          <img
            className="features-icon"
            src={growingIcon}
            alt="Growing database icon"
          />
          <p>
            We are constantly expanding our database <br />
            Soon, new destinations from across the globe will be available
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
