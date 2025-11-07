import '../../styles/Help.scss';
import BackButton from '../BackButton';
import { useNavigate } from "react-router-dom";
import logo from "../../assets/heritago-logo.png";

export default function Help() {
  const navigate = useNavigate();

  return (
    <div className="help-page-container">

        <img
        onClick={() => navigate(-1)}
        className="help-page-logo"
        src={logo}
        alt="Heritago logo"
      />
      {/* === BACK BUTTON === */}
      <BackButton />

      {/* === HEADER === */}
      <header className="help-page-header">
        <h1>Help & Support</h1>
        <p>Find answers to common questions and learn how to make the most of your account.</p>
      </header>

      <hr />

      {/* === TIPS SECTION === */}
      <section className="help-section">
        <h2>Tips for using this page</h2>
        <ul>
          <li>Click the profile picture to upload a new one.</li>
          <li>Use the “Edit” buttons next to each field to update your information.</li>
          <li>Make sure to save your changes before leaving the page.</li>
          <li>Keep your email verified to receive important updates.</li>
        </ul>
      </section>

      <hr />

      {/* === CONTACT SECTION === */}
      <section className="help-section">
        <h2>Contact support</h2>
        <p>
          Still need help? Our support team is here to assist you.  
          Reach out and we’ll get back to you shortly.
        </p>
        <button className="help-contact-button">Contact us</button>
      </section>
    </div>
  );
}
