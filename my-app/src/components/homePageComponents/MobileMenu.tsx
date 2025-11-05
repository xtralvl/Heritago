import closeIcon from '../../assets/close-icon.svg';
import questionMarkIcon from '../../assets/question-mark-icon.svg';
import '../../styles/homePageStyles/MobileMenu.scss';
import { Pages } from '../myAccountComponents/data/Pages';

interface MobileMenuProps {
  onClose: () => void;
  switchToPage: (page: Pages) => void;

}

export default function MobileMenu({ onClose, switchToPage }: MobileMenuProps) {
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
        <button onClick={() => switchToPage("help")} >
          <img src={questionMarkIcon} alt="Help" />
          <p>Help</p>
        </button>
      </div>
    </div>
  );
}
