import { useRef, useState, useEffect } from 'react';
import '../../styles/myAccountPageStyles/PersonalDetails.scss';
import profilePicPlaceholder from '../../assets/prof-pic-placeholder.svg';
import profilePicEditBadge from '../../assets/prof-pic-edit-badge.svg';
import logo from "../../assets/heritago-logo.png";
import { useNavigate } from 'react-router-dom';
import BackButton from '../BackButton';
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function PersonalDetails() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [profileImage, _setProfileImage] = useState<string>(profilePicPlaceholder);

  // === MODALS ===
  const [isNameEditOpen, setIsNameEditOpen] = useState(false);
  const [isEmailEditOpen, setIsEmailEditOpen] = useState(false);

  // === NAME STATE ===
  const [name, setName] = useState<string | null>(null); // null = loading
  const [dots, setDots] = useState(""); // loading animation
  const [tempName, setTempName] = useState(""); 
  const [isNameError, setIsNameError] = useState(false);

  // === EMAIL STATE ===
  const [email, setEmail] = useState("youremail@domain.com");
  const [tempEmail, setTempEmail] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isEmailVerified, _setIsEmailVerified] = useState(false);

  // === LOAD USER DATA ON AUTH CHANGE ===
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setName(""); // no user
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || ""); // Firestore name
      } else {
        setName(""); // no Firestore data
      }

      setTempName(""); // reset tempName
    });

    return () => {
      clearInterval(interval); // cleanup interval
      unsubscribe();
    };
  }, []);

  // === PREVENT SCROLL WHEN MODAL OPEN ===
  useEffect(() => {
    document.body.style.overflow = isNameEditOpen || isEmailEditOpen ? "hidden" : "";
  }, [isNameEditOpen, isEmailEditOpen]);

  // === HANDLE NAME SAVE ===
  const handleNameChange = async () => {
    const trimmedName = tempName.trim();
    setIsNameError(trimmedName === "");
    if (!trimmedName) return;

    const user = auth.currentUser;
    if (!user) return;

    setName(trimmedName);
    await setDoc(doc(db, "users", user.uid), { name: trimmedName }, { merge: true });
    setIsNameEditOpen(false);
  };

  // === HANDLE EMAIL SAVE ===
  const handleEmailChange = () => {
    const trimmedEmail = tempEmail.trim();
    setIsEmailError(trimmedEmail === "");
    if (!trimmedEmail) return;

    setEmail(trimmedEmail);
    setIsEmailEditOpen(false);
  };

  return (
    <div className="personal-details-page-container">
      <img onClick={() => navigate(-2)} className="personal-details-page-container-logo" src={logo} alt="Logo" />
      <BackButton />

      {/* HEADER */}
      <div className="personal-details-page-header-section">
        <div className="personal-details-texts">
          <h1>Personal details</h1>
          <p>Update your info and find out how it’s used.</p>
        </div>
        <div className="personal-details-page-prof-pic-container" onClick={() => fileInputRef.current?.click()}>
          <img src={profileImage} alt="Profile" className="personal-details-page-prof-pic" />
          <img src={profilePicEditBadge} alt="Edit badge" className="personal-details-page-prof-pic-badge" />
        </div>
      </div>

      <hr />

      {/* NAME SECTION */}
      <section className="personal-details-page-name-section">
        <div className="personal-details-info">
          <h2>Name</h2>
          <p className="name-display">
            {name === null
              ? `Loading${dots}`
              : name === ""
                ? "Set up your name"
                : name
            }
          </p>
        </div>
        <button
          onClick={() => {
            setTempName(name || "");
            setIsNameEditOpen(true);
          }}
          className="personal-details-page-edit-button"
        >
          Edit
        </button>
      </section>

      {isNameEditOpen && (
        <div className="modal-overlay">
          <div className="editing-modal">
            <h3>Edit name</h3>
            <label htmlFor="name">Name<span>*</span></label>
            <input
              id="name"
              type="text"
              value={tempName}
              onChange={(e) => {
                setTempName(e.target.value);
                if (e.target.value.trim() !== "") setIsNameError(false);
              }}
              className={isNameError ? "error-input" : ""}
            />
            {isNameError && <p className="error-msg">Required field</p>}

            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setIsNameEditOpen(false)}>Cancel</button>
              <button className="save-btn" onClick={handleNameChange}>Save</button>
            </div>
          </div>
        </div>
      )}

      <hr />

      {/* EMAIL SECTION */}
      <section className="personal-details-page-email-section">
        <div className="personal-details-email-info">
          <h2>E-mail address</h2>
          <div className="email-top-row">
            <p className="personal-details-page-email-section-email-address">{email}</p>
            <span className={`personal-details-verified ${isEmailVerified ? "" : "not-verified-email"}`}>
              {isEmailVerified ? "Verified" : "Not verified"}
            </span>
          </div>
          <p>This is the e-mail address you use to sign in. It's also where we send password resets, newsletters, etc.</p>
        </div>
        <button className="personal-details-page-edit-button" onClick={() => { setTempEmail(email); setIsEmailEditOpen(true); }}>Edit</button>
      </section>

      {isEmailEditOpen && (
        <div className="modal-overlay">
          <div className="editing-modal">
            <h3>Edit email address</h3>
            <label htmlFor="email">New e-mail address<span>*</span></label>
            <input
              id="email"
              type="email"
              value={tempEmail}
              onChange={(e) => {
                setTempEmail(e.target.value);
                if (e.target.value.trim() !== "") setIsEmailError(false);
              }}
              className={isEmailError ? "error-input" : ""}
            />
            {isEmailError && <p className='error-msg'>Required field</p>}

            <p className="email-info-text">
              We’ll send a verification link to your new email address — check your inbox.
            </p>

            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setIsEmailEditOpen(false)}>Cancel</button>
              <button className="save-btn" onClick={handleEmailChange}>Save</button>
            </div>
          </div>
        </div>
      )}

      <hr />
    </div>
  );
}
