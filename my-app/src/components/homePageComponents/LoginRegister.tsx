import React, { useState, useEffect } from "react";
import closeIcon from "../../assets/close-icon.svg";
import "../../styles/homePageStyles/LoginRegister.scss";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface LoginRegisterProps {
  onClose: () => void;
}

export default function LoginRegister({ onClose }: LoginRegisterProps) {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "">("");

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // -----------------------------
  // REGISTER
  // -----------------------------
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === "") {
      setMessage("Name is required.");
      setMessageType("error");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      setMessage("Sign up successful! Account created!");
      setMessageType("success");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setMessage("E-mail address is already registered. Please log in.");
        setMessageType("error");
      } else {
        setMessage("Registration failed. Please try again.");
        setMessageType("error");
      }
    }
  };

  // -----------------------------
  // LOGIN
  // -----------------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("");
      setMessageType("");

      navigate("/my-account");
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        setMessage(
          "E-mail or password is wrong. Please try again. If you don't have an account yet, please click sign up."
        );
        setMessageType("error");
      } else {
        setMessage("Login failed. Please try again.");
        setMessageType("error");
      }
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        <button className="auth-close-btn" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>

        <h1>{isLogin ? "Log In" : "Create Account"}</h1>

        {message && (
          <p className={`auth-message ${messageType === "error" ? "error" : "success"}`}>
            {message}
          </p>
        )}

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            onClick={isLogin ? handleLogin : handleRegister}
          >
            {isLogin ? "Log In" : "Register"}
          </button>
        </form>

        <div className="auth-toggle">
          <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
              setMessageType("");
            }}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
}
