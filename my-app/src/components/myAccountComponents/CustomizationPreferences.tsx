import { useState } from "react";
import logo from "../../assets/heritago-logo.png";
import "../../styles/myAccountPageStyles/CustomizationPreferences.scss"
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton";

export default function CustomizationPreferences() {

    const navigate = useNavigate();

    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");

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

            {/* THEME CHANGER */}
            <section className="customization-preferences-section">
                <div className="customization-preferences-info">
                    <h2>Theme</h2>
                    <span>Choose light or dark theme for your account.</span>
                </div>
                <div className="customization-preferences-buttons">
                    <button 
                        className={theme === "light" ? "active" : ""}
                        onClick={() => setTheme("light")}
                    >Light</button>
                    <button 
                        className={theme === "dark" ? "active" : ""}
                        onClick={() => setTheme("dark")}
                    >Dark</button>
                </div>
            </section>

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
                        className={fontSize === "medium" ? "active" : ""}
                        onClick={() => setFontSize("medium")}
                    >Medium</button>
                    <button
                        className={fontSize === "large" ? "active" : ""}
                        onClick={() => setFontSize("large")}
                    >Large</button>
                </div>
            </section>

        </div>
    )
};
