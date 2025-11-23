import { useState, useEffect } from "react";
import "../styles/DetailsPage.scss";
import logo from "../assets/heritago-logo.png";
import profileIcon from "../assets/profile-icon.svg";
import hamburgerIcon from "../assets/hamburger-icon.svg";
import heartIcon from "../assets/heart-icon.svg";
import redHeartIcon from "../assets/heart-icon-red.svg";
import previousIcon from "../assets/previous-icon.svg";
import nextIcon from "../assets/next-icon.svg";
import noImgPlaceholder from "../../src/assets/noImgPlaceholder.jpg";
import heritagoLogo from "../assets/heritago-logo.png";
import MobileMenu from "../components/homePageComponents/MobileMenu";
import LoginRegister from "../components/homePageComponents/LoginRegister";
import Newsletter from "../components/homePageComponents/Newsletter";
import { useNavigate, useParams } from "react-router-dom";
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
  const [isAllActivitiesOpen, setIsAllActivitiesOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showAddedToFavorites, setShowAddedToFavorites] = useState(false);
  const [favoritedMessage, setFavoritedMessage] = useState("");

  const { destinationId } = useParams();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  function slugify(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  }

  // Load data on mount or when destinationId changes
  useEffect(() => {
    async function loadDetails() {
      // Try National Parks
      const allParks = await fetchParks();
      const foundPark = allParks.find((p: any) => slugify(p.fullName) === destinationId);

      if (foundPark) {
        setSelectedResultDetails(foundPark);
        setSelectedResultImages(foundPark.images || []);
        return;
      }

      // Try UNESCOs
      const allUnescos = await fetchUsaUnescos();
      const foundUnesco = allUnescos.find((u: any) => slugify(u.name_en) === destinationId);

      if (foundUnesco) {
        setSelectedResultDetails(foundUnesco);
        const imagesArray = foundUnesco.images_urls
          ? foundUnesco.images_urls.split(",").map((url: string) => ({ url }))
          : [{ url: foundUnesco.main_image_url?.url || noImgPlaceholder }];
        setSelectedResultImages(imagesArray);
        return;
      }

      // Not found
      setSelectedResultDetails(null);
      setSelectedResultImages([]);
    }

    loadDetails();
  }, [destinationId]);

  useEffect(() => {
    if (!showAddedToFavorites) return;
  
    const timer = setTimeout(() => {
      setShowAddedToFavorites(false);
    }, 3500);
  
    return () => clearTimeout(timer);
  }, [showAddedToFavorites]);
  
  if (!selectedResultDetails) {
    return (
      <div className="loading-container">
        <p>Loading details…</p>
        <img src={heritagoLogo} alt="" />
      </div>
    );
  };

  // Determine type
  const isPark = selectedResultDetails?.fullName !== undefined;
  const isUnesco = selectedResultDetails?.name_en !== undefined;

  return (
    <div>
    <div className="details-page-container">
      {/* HEADER / NAV */}
      <div className="top-row-details-page">
        <img onClick={() => navigate("/")} src={logo} alt="Heritago Logo" className="homepage-logo" />

        {/* MOBILE & TABLET */}
        <div className="top-row-buttons-container-mobile">
          <button
            className="profile-button"
            onClick={() => setIsLoginRegisterMenuOpen(true)}
            aria-label="Open profile"
          >
            <img src={profileIcon} alt="Profile" />
          </button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="hamburger-button" aria-label="Open menu">
            <img src={hamburgerIcon} alt="Menu" />
          </button>
        </div>

        {isMobileMenuOpen && <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />}
        {isLoginRegisterMenuOpen && <LoginRegister onClose={() => setIsLoginRegisterMenuOpen(false)} />}

        {/* DESKTOP */}
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

      {/* MAIN CONTENT */}
      <div className="details-page-content">
        <BackButton />

        <div className="details-page-title-container">
          <div className="details-page-title-and-paragraph">
            <h1>{isPark ? selectedResultDetails.fullName : isUnesco ? selectedResultDetails.name_en : "Unknown"}</h1>

            <p>
              {isPark
                ? `${selectedResultDetails.addresses?.[0]?.line1 ?? ""}, ${selectedResultDetails.addresses?.[0]?.city ?? ""}, ${selectedResultDetails.addresses?.[0]?.stateCode ?? ""} ${selectedResultDetails.addresses?.[0]?.postalCode ?? ""}`
                : isUnesco
                ? `Located in: ${selectedResultDetails.states_names?.join(", ") ?? ""}`
                : ""}
            </p>
          </div>

          <div className="details-page-buttons-container">
            {selectedResultDetails.url && (
              <button className="details-see-their-website-container">
                <a href={selectedResultDetails.url} target="_blank" rel="noopener noreferrer">
                  See their website
                </a>
              </button>
            )}
          </div>

          <div className="add-to-fav-container-mobile" >
            <button onClick={() => {
              if (isFavorited) {
                setIsFavorited(false)
                setShowAddedToFavorites(true);
                setFavoritedMessage("Removed from favorites!")
              } else {
                setIsFavorited(true);
                setShowAddedToFavorites(true);
                setFavoritedMessage("Added to favorites!")
              }
              }}
              className="details-page-add-to-favorite-button-mobile" aria-label="Add to favorites">
            <img src={isFavorited ? redHeartIcon : heartIcon} alt="Add to favorites" />
            </button>
            {showAddedToFavorites && <span className={`favoritedText-mobile ${isFavorited ? "added-to-favorites" : "removed-from-favorites"}`} >{favoritedMessage}</span>}
            {showAddedToFavorites && <button onClick={() => navigate("/my-account/saved-destinations")} className={`see-favorites-button-mobile ${isFavorited ? "added-to-favorites" : "removed-from-favorites"}`}>See favorites</button>}
          </div>
         </div>

          <div className="add-to-fav-container-desktop" >
            <div className="add-to-fav-text-desktop" >
            {showAddedToFavorites && <span className={`favoritedText-desktop ${isFavorited ? "added-to-favorites" : "removed-from-favorites"}`} >{favoritedMessage}</span>}
            {showAddedToFavorites && <button onClick={() => navigate("/my-account/saved-destinations")} className={`see-favorites-button-desktop ${isFavorited ? "added-to-favorites" : "removed-from-favorites"}`}>See favorites</button>}
            </div>
          <button onClick={() => {
              if (isFavorited) {
                setIsFavorited(false)
                setShowAddedToFavorites(true);
                setFavoritedMessage("Removed from favorites!")
              } else {
                setIsFavorited(true);
                setShowAddedToFavorites(true);
                setFavoritedMessage("Added to favorites!")
              }
              }}
              className="details-page-add-to-favorite-button-desktop" aria-label="Add to favorites">
              <img  className={isFavorited ? "redheart" : ""} src={isFavorited ? redHeartIcon : heartIcon} alt="Add to favorites" />
            </button>
          </div>


        {/* IMAGE CAROUSEL */}
        <div className="details-page-carousel-container-mobile">
          <button
            className="details-page-carousel-left-button"
            aria-label="Previous image"
            onClick={() => setCurrentImageIndex(prev => (prev === 0 ? selectedResultImages.length - 1 : prev - 1))}
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
            onClick={() => setCurrentImageIndex(prev => (prev === selectedResultImages.length - 1 ? 0 : prev + 1))}
          >
            <img src={nextIcon} alt="Next image" />
          </button>

          <div className="details-page-carousel-pic-counter">
            {currentImageIndex + 1} / {selectedResultImages.length}
          </div>
        </div>

        {/* DESKTOP IMAGES GRID */}
        {/* DESKTOP IMAGES GRID */}
        <div className="details-page-images-container-desktop">
          <div className="row row-1">
            <div className="big-img">
              <img
                src={selectedResultImages[0]?.url || noImgPlaceholder}
                alt={selectedResultImages[0]?.altText || "Main image"}
              />
            </div>

            <div className="small-imgs">
              <img
                src={selectedResultImages[1]?.url || noImgPlaceholder}
                alt={selectedResultImages[1]?.altText || "Small image 1"}
                onError={(e) => (e.currentTarget.src = noImgPlaceholder)}
              />
              <img
                src={selectedResultImages[2]?.url || noImgPlaceholder}
                alt={selectedResultImages[2]?.altText || "Small image 2"}
                onError={(e) => (e.currentTarget.src = noImgPlaceholder)}
              />
            </div>
          </div>

          <div className="row row-2">
            {selectedResultImages.slice(3, 7).map((img, index) => (
              
              <img
                key={index}
                src={img?.url || noImgPlaceholder}
                alt={img?.altText || `Extra image ${index + 3}`}
              />
            ))}
          </div>
        </div>
        {/* ABOUT */}
        <section className="details-page-about-container">
          <h3>About:</h3>
          <p>{isPark ? selectedResultDetails.description : isUnesco ? selectedResultDetails.description_en : "No description available."}</p>
        </section>

        {/* ACTIVITIES / FACILITIES */}
        {isPark && selectedResultDetails.activities?.length > 0 && (
          <>
            <hr />
            <section className="details-page-facilities-section">
              <h2>Facilities & Services</h2>
              <div className="details-page-facilities-and-services-container">
                {!isAllActivitiesOpen && selectedResultDetails.activities.slice(0, 10).map((act: any, i: number) => (
                  <span key={i}>{act.name}</span>
                ))}

                {isAllActivitiesOpen && selectedResultDetails.activities.map((act: any, i: number) => (
                  <span key={i}>{act.name}</span>
                ))}

              {!isAllActivitiesOpen && <button onClick={() => setIsAllActivitiesOpen(true)} >Show all activities</button>}
              </div>
            </section>
          </>
        )}

        <hr />

        {/* NEWSLETTER */}
        <section className="details-page-newsletter-container">
          <p>
            Sign up to our monthly newsletter to get the best suggestions and have first-hand information on the latest innovations of the webpage.
          </p>
          <button className="newsletter-open-btn" onClick={() => setIsNewsletterModalOpen(true)}>
            Sign up to the newsletter here.
          </button>
        </section>
      </div>

      {isNewsletterModalOpen && <Newsletter onClose={() => setIsNewsletterModalOpen(false)} />}

    </div>
      {/* FOOTER */}
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
