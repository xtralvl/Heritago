import logo from "../../assets/heritago-logo.png";
import "../../styles/homePageStyles/About.scss";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page-container">
      <img
        onClick={() => navigate(-1)}
        className="about-page-logo"
        src={logo}
        alt="Heritago logo"
      />

      <BackButton />

      <div className="about-page-header">
        <h1>About Heritago</h1>
        <span>Learn more about our mission and the team behind it.</span>
      </div>

      <hr />

      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          Heritago was created to make exploring and preserving cultural heritage
          easier and more engaging. We connect users with thousands of historical
          landmarks, parks, and museums through a modern and user-friendly platform.
        </p>
      </section>

      <hr />

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          We aim to inspire curiosity about our shared history and make
          heritage discovery accessible to everyone. Whether you're an
          adventurer, a researcher, or a casual traveler, Heritago helps you
          uncover stories behind every place.
        </p>
      </section>

      <hr />

      <section className="about-section">
        <h2>Contact</h2>
        <p>
          Have feedback or questions? We’d love to hear from you.  
          Reach us at <a href="mailto:contact@heritago.com">contact@heritago.com</a>.
        </p>
      </section>
    </div>
  );
}
