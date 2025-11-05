import { useRef, useState, useEffect } from 'react';
import leftIcon from '../../assets/left-icon.svg';
import { Pages } from './data/Pages';
import '../../styles/myAccountPageStyles/PersonalDetails.scss';
import profilePicPlaceholder from '../../assets/prof-pic-placeholder.svg';
import profilePicEditBadge from '../../assets/prof-pic-edit-badge.svg';
import logo from "../../assets/heritago-logo.png"

interface PersonalDetailsProps {
  switchToPage: (page: Pages) => void;
}

export default function PersonalDetails({ switchToPage }: PersonalDetailsProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<string>(profilePicPlaceholder);

  // === MODALS ===
  const [isNameEditOpen, setIsNameEditOpen] = useState(false);
  const [isEmailEditOpen, setIsEmailEditOpen] = useState(false);

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // === NAME STATE ===
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tempFirstName, setTempFirstName] = useState("");
  const [tempLastName, setTempLastName] = useState("");
  const [isFirstNameError, setIsFirstNameError] = useState(false);
  const [isLastNameError, setIsLastNameError] = useState(false);

  // === EMAIL STATE ===
  const [email, setEmail] = useState("youremail@domain.com");
  const [tempEmail, setTempEmail] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);

  // === FILE CHANGE ===
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const newPicUrl = URL.createObjectURL(file);
      setProfileImage(newPicUrl);
    }
  }

  // === PREVENT SCROLL WHEN MODAL OPEN ===
  useEffect(() => {
    document.body.style.overflow = isNameEditOpen || isEmailEditOpen ? 'hidden' : '';
  }, [isNameEditOpen, isEmailEditOpen]);

  // === HANDLE SAVE ===
  const handleNameChange = () => {
    const firstEmpty = tempFirstName.trim() === "";
    const lastEmpty = tempLastName.trim() === "";

    setIsFirstNameError(firstEmpty);
    setIsLastNameError(lastEmpty);

    if (!firstEmpty && !lastEmpty) {
      setFirstName(tempFirstName);
      setLastName(tempLastName);
      setIsNameEditOpen(false);
    }
  };

  const handleEmailChange = () => {
    const empty = tempEmail.trim() === "";
    setIsEmailError(empty);
    if (!empty) {
      setEmail(tempEmail);
      setIsEmailEditOpen(false);
    }
  };

  return (
    <div className="personal-details-page-container">
      
      <img onClick={() => switchToPage("home")} className="personal-details-page-container-logo" src={logo} alt="" />

      {/* === BACK BUTTON === */}
      <div className="personal-details-page-back-button">
        <button onClick={() => switchToPage('my-account')} aria-label="Go back to My Account">
          <img src={leftIcon} alt="Back" />
          <p>My account</p>
        </button>
      </div>

      {/* === HEADER === */}
      <div className="personal-details-page-header-section">
        <div className="personal-details-texts">
          <h1>Personal details</h1>
          <span>Update your info and find out how it’s used.</span>
        </div>
        <div className="personal-details-page-prof-pic-container" onClick={() => fileInputRef.current?.click()}>
          <img src={profileImage} alt="Profile" className="personal-details-page-prof-pic" />
          <img src={profilePicEditBadge} alt="Edit badge" className="personal-details-page-prof-pic-badge" />
        </div>
        <input type="file" accept="image/*" onChange={handleFileChange} hidden ref={fileInputRef} />
      </div>

      <hr />

      {/* === NAME SECTION === */}
      <section className="personal-details-page-name-section">
        <div className="personal-details-info">
          <h2>Name</h2>
          <span>{firstName} {lastName}</span>
        </div>
        <button
          onClick={() => {
            setTempFirstName(firstName);
            setTempLastName(lastName);
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

            <label htmlFor="first-name">First Name(s)<span>*</span></label>
            <input
              id="first-name"
              type="text"
              value={tempFirstName}
              onChange={(e) => { setTempFirstName(e.target.value); if (e.target.value.trim() !== "") setIsFirstNameError(false); }}
              className={`${isFirstNameError ? "first-name-error-input" : ""}`}
            />
            {isFirstNameError && <span className='name-editing-error-msg'>Required field</span>}

            <label htmlFor="last-name">Last Name(s)<span>*</span></label>
            <input
              id="last-name"
              type="text"
              value={tempLastName}
              onChange={(e) => { setTempLastName(e.target.value); if (e.target.value.trim() !== "") setIsLastNameError(false); }}
              className={`${isLastNameError ? "last-name-error-input" : ""}`}
            />
            {isLastNameError && <span className='name-editing-error-msg'>Required field</span>}

            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setIsNameEditOpen(false)}>Cancel</button>
              <button className="save-btn" onClick={handleNameChange}>Save</button>
            </div>
          </div>
        </div>
      )}

      <hr />

      {/* === EMAIL SECTION === */}
      <section className="personal-details-page-email-section">
        <div className="personal-details-email-info">
          <h2>E-mail address</h2>
          <div className="email-top-row">
            <span className="personal-details-page-email-section-email-address">{email}</span>
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
              onChange={(e) => { setTempEmail(e.target.value); if (e.target.value.trim() !== "") setIsEmailError(false); }}
              className={`${isEmailError ? "last-name-error-input" : ""}`}
            />
            {isEmailError && <span className='name-editing-error-msg'>Required field</span>}

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
