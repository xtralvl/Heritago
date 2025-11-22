import closeIcon from '../../src/assets/close-icon.svg';
import '../styles/myAccountPageStyles/MyAccountPage.scss';
import profilePicPlaceholder from "../assets/prof-pic-placeholder.svg";
import rightArrow from "../assets/right-arrow.svg";
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IsLoggedInContext } from '../context/IsLoggedInContext';
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function MyAccountPage() {
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [name, setName] = useState<string | null>(null); // null = loading
  const [dots, setDots] = useState(""); // for loading animation

  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(IsLoggedInContext)!;

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsSignOutOpen(false);
    navigate(-1);
  };

  useEffect(() => {
    // simple loading dots animation
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    async function fetchName() {
      const user = auth.currentUser;
      if (!user) {
        setName(""); // no user logged in
        return;
      }

      await user.reload(); // refresh auth info

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        setName(data.name || "");
      } else {
        setName(user.displayName || "");
      }
    }

    fetchName();

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="my-account-menu-container">
      {/* Close icon */}
      <div className="my-account-menu-close-icon">
        <button onClick={() => navigate(-1)} aria-label="Close menu">
          <img src={closeIcon} alt="Close" />
        </button>
      </div>

      <h1>My account</h1>

      <div className='my-account-menu-name-and-pic-container'>
        <img className='my-account-menu-profile-pic' src={profilePicPlaceholder} alt="" />
        <span>
          {name === null
            ? `Loading your name${dots}`        // loading animation
            : name === "" 
            ? "Set up your name"     // no name yet
            : name                     // display fetched name
          }
        </span>
      </div>

      <section className='my-account-menu-section my-account-menu-manage-account-section'>
        <h2>Manage Account</h2>
        <div className='my-account-menu-section-buttons'>
          <button onClick={() => navigate("personal-details")}>
            Personal details <img src={rightArrow} alt="" />
          </button>
          <button onClick={() => navigate("security-settings")}>
            Security settings <img src={rightArrow} alt="" />
          </button>
        </div>
      </section>

      <section className='my-account-menu-section my-account-menu-preferences-section'>
        <h2>Preferences</h2>
        <div className='my-account-menu-section-buttons'>
          <button onClick={() => navigate("customization-preferences")}>
            Customization preferences <img src={rightArrow} alt="" />
          </button>
          <button onClick={() => navigate("saved-destinations")}>
            Saved destinations <img src={rightArrow} alt="" />
          </button>
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
