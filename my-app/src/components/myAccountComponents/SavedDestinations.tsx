import { useState } from "react";
import logo from "../../assets/heritago-logo.png";
import museumIconBlack from "../../assets/museum-icon-black.svg";
import nationalParkIconBlack from "../../assets/national-park-icon-black.svg";
import bothIconBlack from "../../assets/both-icon-black.svg";
import "../../styles/myAccountPageStyles/SavedDestinations.scss";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton";
import mockPic from '../../assets/yosemite-national-park-river-forest-autumn-scenery-5120x2880-3967.jpg'

// Dummy data for destinations
const destinations = [
  { id: 1, name: "Yellowstone", type: "UNESCO", img: mockPic },
  { id: 1, name: "Yellowstone", type: "National Park", img: mockPic },
  { id: 1, name: "Yellowstone", type: "National Park", img: mockPic },
  { id: 1, name: "Yellowstone", type: "National Park", img: mockPic },
  { id: 1, name: "Yellowstone", type: "National Park", img: mockPic },
  { id: 1, name: "Yellowstone", type: "National Park", img: mockPic },
  { id: 1, name: "Yellowstone", type: "National Park", img: mockPic },
  { id: 1, name: "Yellowstone", type: "National Park", img: mockPic },
  { id: 1, name: "Yellowstone", type: "National Park", img: mockPic },
  { id: 1, name: "Yellowstone", type: "National Park", img: mockPic },


];


export default function SavedDestinations() {

    const navigate = useNavigate();

    const [filter, setFilter] = useState<"Both" | "National Park" | "UNESCO">("Both");

    const filteredDestinations = destinations.filter(dest => 
        filter === "Both" ? true : dest.type === filter
    );

    return (
        <div className="saved-destinations-page-container">

            {/* LOGO */}
            <img
                onClick={() => navigate(-2)}
                className="saved-destinations-page-container-logo"
                src={logo}
                alt="Logo"
            />

            {/* BACK BUTTON */}
            <BackButton/>

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
                        className={`option-button ${filter === "UNESCO" ? "selected" : ""}`}
                        onClick={() => setFilter("UNESCO")}
                    >
                        <img src={museumIconBlack} alt="Museum" />
                        <p>UNESCOs</p>
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
