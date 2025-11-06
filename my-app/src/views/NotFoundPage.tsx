import logo from "../../src/assets/heritago-logo.png";
import { useNavigate } from "react-router-dom";
import "../styles/NotFoundPage.scss";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="my-account-menu-container not-found-page">
      {/* Logo */}
      <img
        src={logo}
        alt="Heritago Logo"
        className="not-found-logo"
        onClick={() => navigate("/")}
      />

      {/* Content */}
      <h1>Page Not Found</h1>
      <p className="not-found-message">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Back to home button */}
      <button className="not-found-back-button" onClick={() => navigate("/")}>
        Go Back Home
      </button>
    </div>
  );
}
