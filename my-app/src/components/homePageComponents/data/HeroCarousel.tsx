import '../../../styles/HeroCarousel.scss'
import { useState, useEffect } from "react";
import picOne from '../../../assets/hero-carousel-pic-1.jpg'
import picTwo from '../../../assets/hero-carousel-pic-2.jpg'
import picThree from '../../../assets/hero-carousel-pic-3.jpg'
import picFour from '../../../assets/hero-carousel-pic-4.jpg'

export const heroImages = [
    picOne,
    picTwo,
    picThree,
    picFour
];

export default function HeroCarousel() {
  const [currIndex, setCurrIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // fade out current image
      setTimeout(() => {
        setCurrIndex((prev) => (prev + 1) % heroImages.length);
        setFade(true); // fade in new image
      }, 500); // match CSS transition duration
    }, 4000); // change image every 3s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mobile-hero-bg-wrapper">
      <div
        className={`mobile-hero-bg ${fade ? "fade-in" : "fade-out"}`}
        style={{ backgroundImage: `url(${heroImages[currIndex]})` }}
        aria-hidden="true"
      />
      <h2>What would you like to visit?</h2>
      <div className="mobile-hero-overlay" /> {/* overlay */}
    </div>
  );}