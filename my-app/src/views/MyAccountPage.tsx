import closeIcon from '../../src/assets/close-icon.svg';
import '../styles/myAccountPageStyles/MyAccountPage.scss';
import profilePicPlaceholder from "../assets/prof-pic-placeholder.svg"
import rightArrow from "../assets/right-arrow.svg"
import { Pages } from '../components/myAccountComponents/data/Pages';
import { useState } from 'react';

interface MyAccountPageProps {
  switchToPage: (page: Pages) => void;
};

export default function MyAccountPage({ switchToPage }: MyAccountPageProps) {

  const [isSignOutOpen, setIsSignOutOpen] = useState(false);

  const handleSignOut = () => {
    setIsSignOutOpen(false);
    switchToPage("home");
  }

  return (
    <div className="my-account-menu-container">
      {/* Close icon */}
      <div className="my-account-menu-close-icon">
        <button onClick={() => switchToPage("home")} aria-label="Close menu">
          <img src={closeIcon} alt="Close" />
        </button>
      </div>

      <h1>My account</h1>

      <div className='my-account-menu-name-and-pic-container'>
        <img className='my-account-menu-profile-pic' src={profilePicPlaceholder} alt="" />
        <span>Your name</span>
      </div>

      <section className='my-account-menu-section my-account-menu-manage-account-section'>
        <h2>Manage Account</h2>
        <div className='my-account-menu-section-buttons'>
          <button onClick={() => switchToPage("personal-details")}>Personal details <img src={rightArrow} alt="" /></button>
          <button onClick={() => switchToPage("security-settings")}>Security settings <img src={rightArrow} alt="" /></button>
        </div>
      </section>

      <section className='my-account-menu-section my-account-menu-preferences-section'>
        <h2>Preferences</h2>
        <div className='my-account-menu-section-buttons'>
          <button onClick={() => switchToPage("customization-preferences")}>Customization preferences <img src={rightArrow} alt="" /></button>
          <button onClick={() => switchToPage("saved-destinations")}>Saved destinations <img src={rightArrow} alt="" /></button>
        </div>
      </section>

      <button
        className='my-account-menu-preferences-section-sign-out-button'
        onClick={() => setIsSignOutOpen(true)}
      >
        Sign out
      </button>

      {/* === SIGN OUT MODAL === */}
      {isSignOutOpen && (
        <div className="modal-overlay">
          <div className="editing-modal">
            <h3>Sign out</h3>
            <p>Are you sure you want to sign out?</p>

            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setIsSignOutOpen(false)}>Cancel</button>
              <button className="delete-btn" onClick={handleSignOut}>Sign out</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
