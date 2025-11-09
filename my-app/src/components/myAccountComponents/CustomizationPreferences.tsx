import { useContext } from "react";
import logo from "../../assets/heritago-logo.png";
import "../../styles/myAccountPageStyles/CustomizationPreferences.scss"
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton";
import { FontSizeContext } from "../../context/FontSizeContext";

export default function CustomizationPreferences() {

    const { fontSize, setFontSize } = useContext(FontSizeContext)!;

    const navigate = useNavigate();

    return (
        <div className={`customization-preferences-page-container font-${fontSize}`}>

            {/* LOGO */}
            <img 
                onClick={() => navigate(-2)} 
                className="customization-preferences-page-container-logo" 
                src={logo} 
                alt="Logo" 
            />

            {/* BACK BUTTON */}
            <BackButton/>

            {/* HEADER */}
            <div className="customization-preferences-page-header-section">
                <div className="customization-preferences-texts">
                    <h1>Customization preferences</h1>
                    <span>Personalize your account to meet your needs.</span>
                </div>
            </div>

            <hr />

            {/* FONT SIZE */}
            <section className="customization-preferences-section">
                <div className="customization-preferences-info">
                    <h2>Font size</h2>
                    <span>Adjust the font size for better readability.</span>
                </div>
                <div className="customization-preferences-buttons">
                    <button
                        className={fontSize === "small" ? "active" : ""}
                        onClick={() => setFontSize("small")}
                    >Small</button>
                    <button
                        className={fontSize === "default" ? "active" : ""}
                        onClick={() => setFontSize("default")}
                    >Default</button>
                    <button
                        className={fontSize === "large" ? "active" : ""}
                        onClick={() => setFontSize("large")}
                    >Large</button>
                </div>
            </section>

        </div>
    )
};
