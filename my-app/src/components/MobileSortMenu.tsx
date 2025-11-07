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

        <div className="sort-options">
          <ul className="sort-category">
            <li>
              <label>
                <input type="checkbox" name="sort" value="rating" />
                Rating / Reviews
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="sort" value="largest" />
                Size — Largest to Smallest
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="sort" value="smallest" />
                Size — Smallest to Largest
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="sort" value="popularity" />
                Popularity of Activities
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="sort" value="date" />
                Date Established
              </label>
            </li>
          </ul>
        </div>

        <div className="apply-sort-container">
          <button className="apply-sort-button">Apply Sort</button>
        </div>
      </div>
    </div>
  );
}
