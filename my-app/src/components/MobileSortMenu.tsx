import '../styles/MobileSortMenu.scss';
import { useContext, useEffect, useState } from 'react';
import { SortContext } from '../context/SortContext';


interface MobileSortMenuProps {
  onClose: () => void;
}

export default function MobileSortMenu({ onClose }: MobileSortMenuProps) {

    const { appliedSort, setAppliedSort } = useContext(SortContext)!;
    const [temporarySort, setTemporarySort] = useState<string | undefined>(appliedSort);
    const [sortedResults, setSortedResults] = useState([]);

    const handleClick = (e: any) => {
    const checkbox = e.target as HTMLInputElement;
    const currentValue = checkbox.value;

      setTemporarySort("");
      setTemporarySort(currentValue);
  };

  const handleApplySortButton = () => {
    setAppliedSort(temporarySort);
    onClose();
  };

  const handleClose = () => {
    setTemporarySort(""); // reset temp
    onClose();
  };

  useEffect(() => {
    console.log('Applied filter:', appliedSort);
    console.log('Temporary filter:', temporarySort);
  }, [appliedSort, temporarySort]);


  return (
    <div className="mobile-sort-overlay" onClick={onClose}>
      <div
        className="mobile-sort-menu"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        <div className="sort-header">
          <h2>Sort By</h2>
          <button className="close-sort-button" onClick={handleClose}>
            ✕
          </button>
        </div>

        <div className="sort-options">
          <ul className="sort-category">
            <li>
              <label>
                <input type="checkbox" name="sort" value="largest" checked={temporarySort?.includes("largest")} onChange={handleClick}/>
                {"Size — Largest to Smallest (appliest to UNESCO only)"}
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="sort" value="smallest" checked={temporarySort?.includes("smallest")} onChange={handleClick}/>
                {"Size — Smallest to Largest (applies to UNESCO only)"}
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="sort" value="date" checked={temporarySort?.includes("date")} onChange={handleClick}/>
                {"Date Inscribed (applies to UNESCO only)"}
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="sort" value="popularity" checked={temporarySort?.includes("popularity")} onChange={handleClick}/>
                {"Popularity of Activities - Highest to Lowest (applies to Nat. Parks only)"}
              </label>
            </li>
          </ul>
        </div>

        <div className="apply-sort-container">
          <button onClick={handleApplySortButton} className="apply-sort-button">Apply Sort</button>
        </div>
      </div>
    </div>
  );
}
