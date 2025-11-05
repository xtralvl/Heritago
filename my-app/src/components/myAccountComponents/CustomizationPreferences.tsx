import { useState } from "react";
import { Pages } from './data/Pages';
import logo from "../../assets/heritago-logo.png";
import leftIcon from "../../assets/left-icon.svg";
import "../../styles/myAccountPageStyles/CustomizationPreferences.scss"

interface CustomizationPreferencesProps {
    switchToPage: (page: Pages) => void;
};

export default function CustomizationPreferences({ switchToPage }: CustomizationPreferencesProps) {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");

    return (
        <div className={`customization-preferences-page-container font-${fontSize}`}>

            {/* LOGO */}
            <img 
                onClick={() => switchToPage("home")} 
                className="customization-preferences-page-container-logo" 
                src={logo} 
                alt="Logo" 
            />

            {/* BACK BUTTON */}
            <div className="customization-preferences-page-back-button">
                <button onClick={() => switchToPage("my-account")} aria-label="Go back to My Account">
                    <img src={leftIcon} alt="Back" />
                    <p>My account</p>
                </button>
            </div>

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
