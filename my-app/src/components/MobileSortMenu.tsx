import '../styles/MobileSortMenu.scss';

interface MobileSortMenuProps {
  onClose: () => void;
}

export default function MobileSortMenu({ onClose }: MobileSortMenuProps) {
  return (
    <div className="mobile-sort-overlay" onClick={onClose}>
      <div
        className="mobile-sort-menu"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        <div className="sort-header">
          <h2>Sort By</h2>
          <button className="close-sort-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <ul className="sort-options-list">
          <li>Rating / Reviews</li>
          <li>Size — Largest to Smallest</li>
          <li>Size — Smallest to Largest</li>
          <li>Popularity of Activities</li>
          <li>Date Established</li>
        </ul>

        <div className="apply-sort-container">
          <button className="apply-sort-button">Apply Sort</button>
        </div>
      </div>
    </div>
  );
}
