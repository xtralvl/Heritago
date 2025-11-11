import { useState, useEffect, useContext } from "react";
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
import { SelectedResultIdContext } from "../context/SelectedResultIdContext";
import { fetchParks } from "../components/API/fetchParks";
import BackButton from "../components/BackButton";

export default function DetailsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginRegisterMenuOpen, setIsLoginRegisterMenuOpen] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [selectedResultDetails, setSelectedResultDetails] = useState<any>(undefined);
  const [selectedResultImages, setSelectedResultImages] = useState<any[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const { selectedResultId } = useContext(SelectedResultIdContext)!;

  useEffect(() => {
    async function loadDetails() {
      const allParks = await fetchParks();
      const foundPark = allParks.find((p: any) => p.id === selectedResultId);
      setSelectedResultDetails(foundPark);
      setSelectedResultImages(foundPark.images)
    };
    loadDetails();
  }, [selectedResultId]);
  

  const navigate = useNavigate();
  const date = new Date();
  const currentYear = date.getFullYear();

  if (!selectedResultDetails) {
    return (
      <div className="details-page-container">
        <p>Loading details…</p>
      </div>
    );
  }
  
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
            aria-label="Open profile"
          >
            <img src={profileIcon} alt="Profile" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="hamburger-button"
            aria-label="Open menu"
          >
            <img src={hamburgerIcon} alt="Menu" />
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
        <div className="top-row-buttons-container-desktop-details-page">
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

      <hr className="desktop-hr-details-page" />

      {/* ==============================
          MAIN CONTENT
          ============================== */}
      <div className="details-page-content">

        {/* BACK BUTTON */}
          <BackButton/>

        <div className="details-page-title-container">
 
        {/* Left column: title */}
        <div className="details-page-title-and-paragraph">
            <h1>{selectedResultDetails?.fullName}</h1>
            <p>
            {selectedResultDetails.addresses[0]?.line1}, {selectedResultDetails.addresses[0]?.city}, {selectedResultDetails.addresses[0]?.stateCode} {selectedResultDetails.addresses[0]?.postalCode} <span></span>
            <button className="details-page-show-on-map-button show-map-button-desktop">
                Show on map
            </button>
            </p>
        </div>

        {/* Row 2, left column: website button */}
        <div className="details-page-buttons-container">
            <button className="details-see-their-website-container"><a href={selectedResultDetails.url}>See their website</a></button>
        </div>

        {/* Row 3, right column: favorite button */}
        <button className="details-page-add-to-favorite-button-desktop" aria-label="Add to favorites">
            <img src={heartIcon} alt="Add to favorites" />
        </button>

        {/* Mobile-only favorite button remains outside */}
        <button className="details-page-add-to-favorite-button-mobile" aria-label="Add to favorites">
            <img src={heartIcon} alt="Add to favorites" />
        </button>
        </div>

        {/* === CAROUSEL === */}
        {/* mobile/tablet carousel — will be hidden on desktop via CSS */}

        {/* === MOBILE CAROUSEL === */}
        <div className="details-page-carousel-container-mobile">
          <button
            className="details-page-carousel-left-button"
            aria-label="Previous image"
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === 0 ? selectedResultImages.length - 1 : prev - 1
              )
            }
          >
            <img src={previousIcon} alt="Previous image" />
          </button>

          <img
            className=""
            src={selectedResultImages[currentImageIndex]?.url || mockPic}
            alt={selectedResultImages[currentImageIndex]?.alt || "Image"}
          />

          <button
            className="details-page-carousel-right-button"
            aria-label="Next image"
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === selectedResultImages.length - 1 ? 0 : prev + 1
              )
            }
          >
            <img src={nextIcon} alt="Next image" />
          </button>

          <div className="details-page-carousel-pic-counter">
            {currentImageIndex + 1} / {selectedResultImages.length}
          </div>
        </div>

        {/* === DESKTOP IMAGES === */}
        {/* hidden on mobile & tablet via CSS; fills their grid on desktop */}
        <div className="details-page-images-container-desktop">
          <div className="details-page-images-desktop-first-row">
            <div className="details-page-images-desktop-first-row-first-column img-wrap">
              <img src={mockPic} alt="Main view" />
            </div>

            <div className="details-page-images-desktop-first-row-second-column">
              <div className="img-wrap"><img src={mockPic} alt="Secondary 1" /></div>
              <div className="img-wrap"><img src={mockPic} alt="Secondary 2" /></div>
            </div>
          </div>

          <div className="details-page-images-desktop-second-row">
            <div className="img-wrap"><img src={mockPic} alt="Thumb 1" /></div>
            <div className="img-wrap"><img src={mockPic} alt="Thumb 2" /></div>
            <div className="img-wrap"><img src={mockPic} alt="Thumb 3" /></div>
            <div className="img-wrap"><img src={mockPic} alt="Thumb 4" /></div>
          </div>
        </div>

        {/* === FACILITIES === */}
        <section className="details-page-facilities-section">
          <h2>Facilities & Services</h2>
          <div className="details-page-facilities-and-services-container">
            

            {selectedResultDetails.activities.map((act: any) => {
              return (
                <span>{act.name}</span>
              )
            })}
          </div>
          
          {/* <button className="show-all-facilities-btn">
            Show all facilities and services
          </button> */}
        </section>
        <hr />

        {/* === ABOUT SECTION === */}
        <section className="details-page-about-container">
          <h3>About:</h3>
          <p>
            {selectedResultDetails.description}
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

      <hr />

      {/* === SIGN-UP / LOG-IN SECTION === */}
      <div className="sign-up-log-in-section-details-page-container">
        <h4>Login to access additional features</h4>
        <p>
          Unlock features like marking favorites, viewing insights, changing font size and switching to dark mode.
        </p>
        <button onClick={() => setIsLoginRegisterMenuOpen(true)}>
          <strong>Login</strong>
        </button>
      </div>

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
