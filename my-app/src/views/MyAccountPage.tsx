import closeIcon from '../../src/assets/close-icon.svg';
import '../styles/myAccountPageStyles/MyAccountPage.scss';
import profilePicPlaceholder from "../assets/prof-pic-placeholder.svg"

interface MyAccountPageProps {
  onClose: () => void;
}

export default function MyAccountPage({ onClose }: MyAccountPageProps) {
  return (
    <div className="my-account-menu-container">
      {/* Close icon */}
      <div className="my-account-menu-close-icon">
        <button onClick={onClose} aria-label="Close menu">
          <img src={closeIcon} alt="Close" />
        </button>
      </div>

      <h1>My account</h1>

      <div className='my-account-menu-name-and-pic-container' >
        <img className='my-account-menu-profile-pic' src={profilePicPlaceholder} alt="" />
        <span>Your name</span>
      </div>
      
      <section className='my-account-menu-section my-account-menu-manage-account-section' >
        <h2>Manage Account</h2>
        <div className='my-account-menu-section-buttons'>
        <button>Personal details</button>
        <button>Security settings</button>
        </div>
      </section>

      <section className='my-account-menu-section my-account-menu-preferences-section' >
        <h2>Preferences</h2>
        <div className='my-account-menu-section-buttons'>
        <button>Customization preferences</button>
        <button>Saved destinations</button>
        </div>
      </section>

      <button className='my-account-menu-preferences-section-sign-out-button'  >
        Sign out
      </button>
    </div>
  );
}
