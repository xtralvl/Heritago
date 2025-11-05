import { useState, useEffect } from 'react';
import closeIcon from '../../assets/close-icon.svg';
import '../../styles/homePageStyles/LoginRegister.scss';
import { Pages } from '../myAccountComponents/data/Pages';


interface LoginRegisterProps {
  onClose: () => void;
  switchToPage: (page: Pages) => void;

}

export default function LoginRegister({ onClose, switchToPage }: LoginRegisterProps) {
  const [isLogin, setIsLogin] = useState(true);
  const toggleMode = () => setIsLogin((prev) => !prev);


  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  
  
  return (
    <div className="auth-overlay">
      <div className="auth-card">
        <button className="auth-close-btn" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>

        <h1>{isLogin ? 'Log In' : 'Create Account'}</h1>

        <form className="auth-form" onSubmit={e => e.preventDefault()} >
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your name" />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" />
          </div>

          <button onClick={() => switchToPage("my-account")} type="submit" className="auth-submit-btn">
            {isLogin ? 'Log In' : 'Register'}
          </button>
        </form>

        <div className="auth-toggle">
          <p>{isLogin ? "Don't have an account?" : 'Already have an account?'}</p>
          <button onClick={toggleMode}>
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>

      </div>
    </div>
  );
}
