import { FilterContext } from '../context/FilterContext';
import '../styles/MobileFilterMenu.scss';
import { useContext, useEffect, useState } from 'react';

interface MobileFilterMenuProps {
  onClose: () => void;
}

export default function MobileFilterMenu({ onClose }: MobileFilterMenuProps) {
  const { appliedFilter, setAppliedFilter } = useContext(FilterContext)!;
  const [temporaryFilter, setTemporaryFilter] = useState<string[]>(appliedFilter);

  const handleClick = (e: any) => {
    const checkbox = e.target as HTMLInputElement;
    const currentValue = checkbox.value;

    if (temporaryFilter.includes(currentValue)) {
      setTemporaryFilter(prev => prev.filter(p => p !== currentValue));
    } else {
      setTemporaryFilter(prev => [...prev, currentValue]);
    }
  };

  const handleApplyFilterButton = () => {
    setAppliedFilter(temporaryFilter);
    onClose();
  }

  const handleClose = () => {
    setTemporaryFilter([]); // reset temp
    onClose();
  }

  useEffect(() => {
    console.log('Applied filter:', appliedFilter);
    console.log('Temporary filter:', temporaryFilter);
  }, [appliedFilter, temporaryFilter]);

  return (
    <div className="mobile-filter-overlay">
      <div className="mobile-filter-menu" onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className="filter-header">
          <h2>Filters</h2>
          <button className="close-filter-button" onClick={handleClose}>✕</button>
        </div>

        {/* FILTER SECTIONS */}
        <div className="filter-sections">
          <div className="filter-category">
            <h3>Activities</h3>

            <div className="filter-block">
              <label>
                <input type="checkbox" value="food" checked={temporaryFilter.includes("food")} onChange={handleClick}/> Food
              </label>
              <label>
                <input type="checkbox" value="shopping" checked={temporaryFilter.includes("shopping")} onChange={handleClick}/> Shopping
              </label>
            </div>

            <div className="filter-block">
              <label>
                <input type="checkbox" value="guided tours" checked={temporaryFilter.includes("guided tours")} onChange={handleClick}/> Guided Tours
              </label>
              <label>
                <input type="checkbox" value="junior-ranger-program" checked={temporaryFilter.includes("junior-ranger-program")} onChange={handleClick}/> Junior Ranger Program
              </label>
            </div>

            <div className="filter-block">
              <label>
                <input type="checkbox" value="arts-and-crafts" checked={temporaryFilter.includes("arts-and-crafts")} onChange={handleClick}/> Arts and Crafts
              </label>
            </div>

            <div className="filter-block">
              <label>
                <input type="checkbox" value="scenic-driving" checked={temporaryFilter.includes("scenic-driving")} onChange={handleClick}/> Scenic Driving
              </label>
              <label>
                <input type="checkbox" value="stargazing" checked={temporaryFilter.includes("stargazing")} onChange={handleClick}/> Stargazing
              </label>
              <label>
                <input type="checkbox" value="wildlife-watching" checked={temporaryFilter.includes("wildlife-watching")} onChange={handleClick}/> Wildlife Watching
              </label>
            </div>

            <div className="filter-block">
              <label>
                <input type="checkbox" value="camping" checked={temporaryFilter.includes("camping")} onChange={handleClick}/> Camping
              </label>
              <label>
                <input type="checkbox" value="hiking" checked={temporaryFilter.includes("hiking")} onChange={handleClick}/> Hiking
              </label>
              <label>
                <input type="checkbox" value="auto-and-atv" checked={temporaryFilter.includes("auto-and-atv")} onChange={handleClick}/> Auto and ATV
              </label>
            </div>

            <div className="filter-block">
              <label>
                <input type="checkbox" value="road-biking" checked={temporaryFilter.includes("road-biking")} onChange={handleClick}/> Road Biking
              </label>
              <label>
                <input type="checkbox" value="mountain-biking" checked={temporaryFilter.includes("mountain-biking")} onChange={handleClick}/> Mountain Biking
              </label>
              <label>
                <input type="checkbox" value="horseback-riding" checked={temporaryFilter.includes("horseback-riding")} onChange={handleClick}/> Horseback Riding
              </label>
            </div>

          </div>
        </div>

        {/* APPLY BUTTON */}
        <div className="apply-filters-container">
          <button onClick={handleApplyFilterButton} className="apply-filters-button">Apply Filters</button>
        </div>
      </div>
    </div>
  );
}
