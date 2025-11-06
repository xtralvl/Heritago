import { useNavigate } from 'react-router-dom';
import closeIcon from '../../assets/close-icon.svg';
import questionMarkIcon from '../../assets/question-mark-icon.svg';
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

      <div className="help-container-mobile-menu">
        <button onClick={() => navigate("help")} >
          <img src={questionMarkIcon} alt="Help" />
          <p>Help</p>
        </button>
      </div>
    </div>
  );
}
