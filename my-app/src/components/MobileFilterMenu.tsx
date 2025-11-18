import { FilterContext } from '../context/FilterContext';
import '../styles/MobileFilterMenu.scss';
import { useContext, useEffect, useState } from 'react';
import infoIcon from '../assets/info-icon.svg'

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
  };

  const handleClose = () => {
    setTemporaryFilter([]); // reset temp
    onClose();
  };

  useEffect(() => {
    console.log('Applied filter:', appliedFilter);
    console.log('Temporary filter:', temporaryFilter);
  }, [appliedFilter, temporaryFilter]);

  // Values EXACTLY as they appear in the API
  const activitiesBlocks = [
    [
      { value: "Food", label: "Food" },
      { value: "Shopping", label: "Shopping" }
    ],
    [
      { value: "Guided Tours", label: "Guided Tours" },
      { value: "Junior Ranger Program", label: "Junior Ranger Program" }
    ],
    [
      { value: "Arts and Crafts", label: "Arts and Crafts" }
    ],
    [
      { value: "Scenic Driving", label: "Scenic Driving" },
      { value: "Stargazing", label: "Stargazing" },
      { value: "Wildlife Watching", label: "Wildlife Watching" }
    ],
    [
      { value: "Camping", label: "Camping" },
      { value: "Hiking", label: "Hiking" },
      { value: "Auto and ATV", label: "Auto and ATV" }
    ],
    [
      { value: "Road Biking", label: "Road Biking" },
      { value: "Mountain Biking", label: "Mountain Biking" },
      { value: "Horseback Riding", label: "Horseback Riding" }
    ]
  ];

  return (
    <div className="mobile-filter-overlay" onClick={onClose}>
      <div className="mobile-filter-menu" onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className="filter-header">
          <h2>Filters</h2>
          <button className="close-filter-button" onClick={handleClose}>✕</button>
        </div>
        <div className='filter-no-results-mobile-filter-menu'>
          <img src={infoIcon} alt="" />
          <p>Currently, filtering options are available for — and will be applied to — National Parks only.</p>  
        </div>

        {/* FILTER SECTIONS */}
        <div className="filter-sections">
          <div className="filter-category">
            <h3>Activities</h3>

            {activitiesBlocks.map((block, index) => (
              <div className="filter-block" key={index}>
                {block.map(activity => (
                  <label key={activity.value}>
                    <input
                      type="checkbox"
                      value={activity.value}
                      checked={temporaryFilter.includes(activity.value)}
                      onChange={handleClick}
                    />
                    {activity.label}
                  </label>
                ))}
              </div>
            ))}

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
