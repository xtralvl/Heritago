import '../styles/MobileFilterMenu.scss';

interface MobileFilterMenuProps {
  onClose: () => void;
}

export default function MobileFilterMenu({ onClose }: MobileFilterMenuProps) {
  return (
    <div className="mobile-filter-overlay" onClick={onClose}>
      <div
        className="mobile-filter-menu"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <div className="filter-header">
          <h2>Filters</h2>
          <button className="close-filter-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="filter-sections">
          <div className="filter-category">
            <h3>Landscape</h3>
            <label><input type="checkbox" /> Mountains</label>
            <label><input type="checkbox" /> Forests</label>
            <label><input type="checkbox" /> Lakes</label>
            <label><input type="checkbox" /> Coastal</label>
          </div>

          <div className="filter-category">
            <h3>Activities</h3>
            <label><input type="checkbox" /> Hiking</label>
            <label><input type="checkbox" /> Cycling</label>
            <label><input type="checkbox" /> Wildlife Watching</label>
            <label><input type="checkbox" /> Camping</label>
          </div>

          <div className="filter-category">
            <h3>Accessibility</h3>
            <label><input type="checkbox" /> Wheelchair Access</label>
            <label><input type="checkbox" /> Guided Tours</label>
            <label><input type="checkbox" /> Accessible Parking</label>
          </div>

          <div className="filter-category">
            <h3>Features</h3>
            <label><input type="checkbox" /> Waterfalls</label>
            <label><input type="checkbox" /> Historic Sites</label>
            <label><input type="checkbox" /> Scenic Viewpoints</label>
            <label><input type="checkbox" /> Picnic Areas</label>
          </div>

          <div className="filter-category">
            <h3>Facilities / Services</h3>
            <label><input type="checkbox" /> Visitor Center</label>
            <label><input type="checkbox" /> Restrooms</label>
            <label><input type="checkbox" /> Cafeteria</label>
            <label><input type="checkbox" /> Parking</label>
          </div>
        </div>

        <div className="apply-filters-container">
          <button className="apply-filters-button">Apply Filters</button>
        </div>
      </div>
    </div>
  );
}
