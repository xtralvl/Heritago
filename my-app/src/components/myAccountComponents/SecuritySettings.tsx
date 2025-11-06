import { useState, useEffect } from 'react';
import logo from "../../assets/heritago-logo.png";
import "../../styles/myAccountPageStyles/SecuritySettings.scss";
import { useNavigate } from 'react-router-dom';
import BackButton from '../BackButton';


export default function SecuritySettings() {

  const navigate = useNavigate();

  // === MODALS ===
  const [isPasswordEditOpen, setIsPasswordEditOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // === PASSWORD STATE ===
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // === PREVENT SCROLL WHEN MODAL OPEN ===
  useEffect(() => {
    document.body.style.overflow = isPasswordEditOpen || isDeleteModalOpen ? 'hidden' : '';
  }, [isPasswordEditOpen, isDeleteModalOpen]);

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    // Password change logic here
    setPasswordError("");
    setIsPasswordEditOpen(false);
  };

  const handleDeleteAccount = () => {
    // Delete account logic here
    setIsDeleteModalOpen(false);
    alert("Account deleted (mock)");
  };

  return (
    <div className="security-settings-page-container">
      <img
        onClick={() => navigate(-2)}
        className="security-settings-page-container-logo"
        src={logo}
        alt="Logo"
      />

      {/* BACK BUTTON */}
        <BackButton/>

      {/* HEADER */}
      <div className="security-settings-page-header-section">
        <div className="security-settings-texts">
          <h1>Security settings</h1>
          <span>Change your password or delete your account.</span>
        </div>
      </div>

      <hr />

      {/* PASSWORD CHANGE */}
      <section className="security-settings-section">
        <div className="security-settings-info">
          <h2>Password</h2>
          <span>Change your password regularly to keep your account safe.</span>
        </div>
        <button className="security-settings-edit-button" onClick={() => setIsPasswordEditOpen(true)}>
          Change
        </button>
      </section>

      {isPasswordEditOpen && (
        <div className="modal-overlay">
          <div className="editing-modal">
            <h3>Change Password</h3>

            <label htmlFor="current-password">Current Password<span>*</span></label>
            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <label htmlFor="new-password">New Password<span>*</span></label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label htmlFor="confirm-password">Confirm Password<span>*</span></label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {passwordError && <span className="modal-error-msg">{passwordError}</span>}

            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setIsPasswordEditOpen(false)}>Cancel</button>
              <button className="save-btn" onClick={handlePasswordChange}>Save</button>
            </div>
          </div>
        </div>
      )}

      <hr />

      {/* DELETE ACCOUNT */}
      <section className="security-settings-section">
        <div className="security-settings-info">
          <h2>Delete account</h2>
          <span>Once you delete your account, all your data will be permanently removed.</span>
        </div>
        <button className="security-settings-delete-button" onClick={() => setIsDeleteModalOpen(true)}>
          Delete
        </button>
      </section>

      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="editing-modal">
            <h3>Delete Account</h3>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
              <button className="delete-btn" onClick={handleDeleteAccount}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <hr />
    </div>
  );
}
