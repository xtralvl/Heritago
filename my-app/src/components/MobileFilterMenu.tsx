import '../styles/MobileFilterMenu.scss';

interface MobileFilterMenuProps {
  onClose: () => void;
}

export default function MobileFilterMenu({ onClose }: MobileFilterMenuProps) {
  return (
    <div className="mobile-filter-overlay" onClick={onClose}>
      <div
        className="mobile-filter-menu"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
      >
        <div className="filter-header">
          <h2>Filters</h2>
          <button className="close-filter-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="filter-sections">
          <ul className="filter-category">
            <li className="filter-category-title">Landscape</li>
            <li>Mountains</li>
            <li>Forests</li>
            <li>Lakes</li>
            <li>Coastal</li>
          </ul>

          <ul className="filter-category">
            <li className="filter-category-title">Activities</li>
            <li>Hiking</li>
            <li>Cycling</li>
            <li>Wildlife Watching</li>
            <li>Camping</li>
          </ul>

          <ul className="filter-category">
            <li className="filter-category-title">Accessibility</li>
            <li>Wheelchair Access</li>
            <li>Guided Tours</li>
            <li>Accessible Parking</li>
          </ul>

          <ul className="filter-category">
            <li className="filter-category-title">Features</li>
            <li>Waterfalls</li>
            <li>Historic Sites</li>
            <li>Scenic Viewpoints</li>
            <li>Picnic Areas</li>
          </ul>

          <ul className="filter-category">
            <li className="filter-category-title">Facilities / Services</li>
            <li>Visitor Center</li>
            <li>Restrooms</li>
            <li>Cafeteria</li>
            <li>Parking</li>
          </ul>
        </div>

        <div className="apply-filters-container">
          <button className="apply-filters-button">Apply Filters</button>
        </div>
      </div>
    </div>
  );
}
