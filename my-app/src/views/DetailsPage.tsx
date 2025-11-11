import { useState, useEffect, useContext } from "react";
import "../styles/DetailsPage.scss";
import logo from "../assets/heritago-logo.png";
import profileIcon from "../assets/profile-icon.svg";
import hamburgerIcon from "../assets/hamburger-icon.svg";
import heartIcon from "../assets/heart-icon.svg";
import previousIcon from "../assets/previous-icon.svg";
import nextIcon from "../assets/next-icon.svg";
import noImgPlaceholder from '../../src/assets/noImgPlaceholder.jpg'
import heritagoLogo from "../assets/heritago-logo.png";
import MobileMenu from "../components/homePageComponents/MobileMenu";
import LoginRegister from "../components/homePageComponents/LoginRegister";
import Newsletter from "../components/homePageComponents/Newsletter";
import { useNavigate } from "react-router-dom";
import { SelectedResultIdContext } from "../context/SelectedResultIdContext";
import { SearchedDestinationTypeContext } from "../context/SearchedDestinationTypeContext";
import { fetchParks } from "../components/API/fetchParks";
import { fetchUsaUnescos } from "../components/API/fetchUnescos";
import BackButton from "../components/BackButton";

export default function DetailsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginRegisterMenuOpen, setIsLoginRegisterMenuOpen] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [selectedResultDetails, setSelectedResultDetails] = useState<any>(undefined);
  const [selectedResultImages, setSelectedResultImages] = useState<any[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { selectedResultId } = useContext(SelectedResultIdContext)!;
  const { searchedDestinationType } = useContext(SearchedDestinationTypeContext)!;

  useEffect(() => {
    async function loadDetails() {
      if (searchedDestinationType === "National Park") {
        const allParks = await fetchParks();
        const foundPark = allParks.find((p: any) => p.id === selectedResultId);
        setSelectedResultDetails(foundPark);
        setSelectedResultImages(foundPark.images);
      } else if (searchedDestinationType === "UNESCO") {
        const allUnescos = await fetchUsaUnescos();
        const foundUnesco = allUnescos.find((u: any) => u.uuid === selectedResultId);
        setSelectedResultDetails(foundUnesco);
        // UNESCO images
        const imagesArray = foundUnesco.images_urls
          ? foundUnesco.images_urls.split(",").map((url: string) => ({ url }))
          : [{ url: foundUnesco.main_image_url?.url || noImgPlaceholder }];
        setSelectedResultImages(imagesArray);
      }
    }

    loadDetails();
  }, [selectedResultId, searchedDestinationType]);

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

  // ====== Helper variables for conditional rendering ======
  const isPark = searchedDestinationType === "National Park";

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
        {isMobileMenuOpen && <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />}

        {/* === LOGIN REGISTER === */}
        {isLoginRegisterMenuOpen && <LoginRegister onClose={() => setIsLoginRegisterMenuOpen(false)} />}

        {/* === DESKTOP === */}
        <div className="top-row-buttons-container-desktop-details-page">
          <div className="about-and-help-button-container-top">
            <button className="about-button-home-top" onClick={() => navigate("/about")}>About</button>
            <button className="help-button-home-top" onClick={() => navigate("/help")}>Help</button>
          </div>

          <div className="sign-up-and-log-in-button-container-top">
            <button className="sign-up-button" onClick={() => setIsLoginRegisterMenuOpen(true)}>
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
        <BackButton />

        <div className="details-page-title-container">
          <div className="details-page-title-and-paragraph">
            <h1>{isPark ? selectedResultDetails.fullName : selectedResultDetails.name_en}</h1>
            <p>
              {isPark
                ? `${selectedResultDetails.addresses[0]?.line1}, ${selectedResultDetails.addresses[0]?.city}, ${selectedResultDetails.addresses[0]?.stateCode} ${selectedResultDetails.addresses[0]?.postalCode}`
                : `Located in: ${selectedResultDetails.states_names.join(", ")}`}
              <span></span>
              <button className="details-page-show-on-map-button show-map-button-desktop">
                Show on map
              </button>
            </p>
          </div>

          <div className="details-page-buttons-container">
            {isPark && selectedResultDetails.url && (
              <button className="details-see-their-website-container">
                <a href={selectedResultDetails.url}>See their website</a>
              </button>
            )}
          </div>

          <button className="details-page-add-to-favorite-button-desktop" aria-label="Add to favorites">
            <img src={heartIcon} alt="Add to favorites" />
          </button>

          <button className="details-page-add-to-favorite-button-mobile" aria-label="Add to favorites">
            <img src={heartIcon} alt="Add to favorites" />
          </button>
        </div>

        {/* === IMAGE CAROUSEL === */}
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
            src={selectedResultImages[currentImageIndex]?.url || noImgPlaceholder}
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

        {/* === ABOUT SECTION === */}
        <section className="details-page-about-container">
          <h3>About:</h3>
          <p>{isPark ? selectedResultDetails.description : selectedResultDetails.description_en}</p>
        </section>

        {/* === ACTIVITIES / FACILITIES === */}
        {isPark && selectedResultDetails.activities && (
          <>
            <hr />
            <section className="details-page-facilities-section">
              <h2>Facilities & Services</h2>
              <div className="details-page-facilities-and-services-container">
                {selectedResultDetails.activities.map((act: any, i: number) => (
                  <span key={i}>{act.name}</span>
                ))}
              </div>
            </section>
          </>
        )}

        <hr />

        {/* === NEWSLETTER SECTION === */}
        <section className="details-page-newsletter-container">
          <p>
            Sign up to our monthly newsletter to get the best suggestions and
            have first-hand information on the latest innovations of the
            webpage.
          </p>
          <button className="newsletter-open-btn" onClick={() => setIsNewsletterModalOpen(true)}>
            Sign up to the newsletter here.
          </button>
        </section>
      </div>

      {isNewsletterModalOpen && <Newsletter onClose={() => setIsNewsletterModalOpen(false)} />}

      {/* ==============================
          FOOTER
      ============================== */}
      <footer className="details-page-footer">
        <div className="navigation-section-details-bottom">
          <button onClick={() => navigate("/about")} className="language-button-home-bottom">About</button>
          <button onClick={() => navigate("/help")}>Help</button>
        </div>

        <div className="logo-and-rights-bottom-container">
          <img className="logo-bottom" src={heritagoLogo} alt="Heritago logo" />
          <p>© {currentYear} Heritago | All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
