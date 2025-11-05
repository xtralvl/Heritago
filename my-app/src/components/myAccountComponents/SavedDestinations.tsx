import { useState } from "react";
import { Pages } from './data/Pages';
import logo from "../../assets/heritago-logo.png";
import leftIcon from "../../assets/left-icon.svg";
import museumIconBlack from "../../assets/museum-icon-black.svg";
import nationalParkIconBlack from "../../assets/national-park-icon-black.svg";
import bothIconBlack from "../../assets/both-icon-black.svg";
import "../../styles/myAccountPageStyles/SavedDestinations.scss";

// Dummy data for destinations
const destinations = [
  { id: 1, name: "Yellowstone", type: "National Park", img: "https://via.placeholder.com/150" },
  { id: 2, name: "Louvre", type: "Museum", img: "https://via.placeholder.com/150" },
  { id: 3, name: "Grand Canyon", type: "National Park", img: "https://via.placeholder.com/150" },
  { id: 4, name: "Metropolitan Museum", type: "Museum", img: "https://via.placeholder.com/150" },
];

interface SavedDestinationsProps {
    switchToPage: (page: Pages) => void;
}

export default function SavedDestinations({ switchToPage }: SavedDestinationsProps) {
    const [filter, setFilter] = useState<"Both" | "National Park" | "Museum">("Both");

    const filteredDestinations = destinations.filter(dest => 
        filter === "Both" ? true : dest.type === filter
    );

    return (
        <div className="saved-destinations-page-container">

            {/* LOGO */}
            <img
                onClick={() => switchToPage("home")}
                className="saved-destinations-page-container-logo"
                src={logo}
                alt="Logo"
            />

            {/* BACK BUTTON */}
            <div className="saved-destinations-page-back-button">
                <button onClick={() => switchToPage("my-account")} aria-label="Go back to My Account">
                    <img src={leftIcon} alt="Back" />
                    <p>My account</p>
                </button>
            </div>

            {/* HEADER */}
            <div className="saved-destinations-page-header-section">
                <div className="saved-destinations-texts">
                    <h1>Saved destinations</h1>
                    <span>Here you can find a list of all your saved/favorited destinations.</span>
                </div>
            </div>

            <hr />

            {/* TYPE FILTER BUTTONS */}
            <section className="saved-destinations-section">
                <span>Type</span>
                <div className="hero-option-buttons">
                    <button
                        className={`option-button ${filter === "Museum" ? "selected" : ""}`}
                        onClick={() => setFilter("Museum")}
                    >
                        <img src={museumIconBlack} alt="Museum" />
                        <p>Museums</p>
                    </button>

                    <button
                        className={`option-button ${filter === "National Park" ? "selected" : ""}`}
                        onClick={() => setFilter("National Park")}
                    >
                        <img src={nationalParkIconBlack} alt="National Park" />
                        <p>Nat. Parks</p>
                    </button>

                    <button
                        className={`option-button ${filter === "Both" ? "selected" : ""}`}
                        onClick={() => setFilter("Both")}
                    >
                        <img src={bothIconBlack} alt="Both" />
                        <p>Both</p>
                    </button>
                </div>
            </section>

            <hr />

            {/* DESTINATIONS LIST */}
            <section className="saved-destinations-list">
                {filteredDestinations.map(dest => (
                    <div key={dest.id} className="destination-card">
                        <img src={dest.img} alt={dest.name} />
                        <div className="destination-info">
                            <h3>{dest.name}</h3>
                            <span>{dest.type}</span>
                        </div>
                    </div>
                ))}
            </section>

        </div>
    );
}
