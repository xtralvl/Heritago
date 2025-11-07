import { useNavigate } from 'react-router-dom';
import closeIcon from '../../assets/close-icon.svg';
import questionMarkIcon from '../../assets/question-mark-icon.svg';
import infoIcon from '../../assets/info-icon.svg'; 
import '../../styles/homePageStyles/MobileMenu.scss';

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const navigate = useNavigate();

  return (
    <div className="mobile-menu-container">
      {/* Close icon */}
      <div className="mobile-menu-close-icon">
        <button onClick={onClose} aria-label="Close menu">
          <img src={closeIcon} alt="Close" />
        </button>
      </div>

      <h1>More</h1>

      {/* Help */}
      <div className="help-container-mobile-menu">
        <button
          onClick={() => {
            navigate("help");
            onClose();
          }}
        >
          <img src={questionMarkIcon} alt="Help" />
          <p>Help</p>
        </button>
      </div>

      {/* About */}
      <div className="about-container-mobile-menu">
        <button
          onClick={() => {
            navigate("about");
            onClose();
          }}
        >
          <img src={infoIcon} alt="About" />
          <p>About</p>
        </button>
      </div>
    </div>
  );
}
