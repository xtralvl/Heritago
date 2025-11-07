import { useState } from "react";
import '../../styles/homePageStyles/Newsletter.scss';

interface NewsletterProps {
  onClose: () => void;
}

export default function Newsletter({ onClose }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "") return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
<div className="newsletter-modal-overlay">
  <div className="newsletter-modal">
    <button className="close-btn" onClick={onClose}>
      &times;
    </button>

    <div className="newsletter-modal-content">
      {!submitted ? (
        <>
          <h3>Join Our Newsletter</h3>
          <p>
            Subscribe to get travel inspiration, park highlights, and updates
            on new features.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </>
      ) : (
        <p className="thank-you">Thanks for subscribing!</p>
      )}
    </div>
  </div>
</div>
  );
}
