import React, { useState, useEffect, useContext } from "react";
import closeIcon from "../../assets/close-icon.svg";
import "../../styles/homePageStyles/LoginRegister.scss";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { IsLoggedInContext } from "../../context/IsLoggedInContext";

interface LoginRegisterProps {
  onClose: () => void;
}

export default function LoginRegister({ onClose }: LoginRegisterProps) {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "error" | "success" | "logged-in" | "logged-out" | ""
  >("");

  const [currentUser, setCurrentUser] = useState<null | any>(null); // store Firebase User

  const [showModal, setShowModal] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);
  const [isVerificationResent, setIsVerificationResent] = useState(false);

  const { setIsLoggedIn } = useContext(IsLoggedInContext)!;

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
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredentials.user);

      setMessage(
        "Account created! We've sent you an email! Please verify your email to log in."
      );
      setMessageType("success");
      setShowModal(true);


    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setMessage("Email address is already registered. Please log in.");
      } else {
        setMessage("Registration failed. Please try again.");
      }
      setMessageType("error");
      setShowModal(true);

    }
  };

// -----------------------------
// LOGIN
// -----------------------------
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredentials.user;

    setCurrentUser(user); // store Firebase user

    if (!user.emailVerified) {
      setMessage("Your email has not been verified yet. Please check your inbox.");
      setMessageType("error");
      setShowModal(true);
      setShowResendVerification(true);
      return;
    }

    setIsLoggedIn(true);
    setMessage("You are logged in!");
    setMessageType("logged-in");
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      onClose(); // close modal after success
      setMessage("");
      setMessageType("");
    }, 2200);
  } catch (error: any) {
    setMessage("Login failed. Please try again.");
    setMessageType("error");
    setShowModal(true);
  }
};

// -----------------------------
// RESEND EMAIL
// -----------------------------
const handleResendEmailButton = async () => {
  if (!currentUser) {
    setMessage("No user available to resend verification email.");
    setMessageType("error");
    setShowModal(true);
    return;
  }

  try {
    await currentUser.reload();
    
    await sendEmailVerification(currentUser);
    setMessage("We sent you a new verification email. Please check your inbox.");
    setMessageType("success");
    setIsVerificationResent(true);
    setShowResendVerification(false);
    setShowModal(true);
  } catch (error: any) {
    console.error(error);
    if (error.code === "auth/too-many-requests") {
      setMessage("Too many requests. Try again later.")
    }
    setMessage("Failed to resend verification email. Try again later.");
    setMessageType("error");
    setShowModal(true);
  }
};
  return (
    <>
      {/* AUTH MODAL */}
      <div className="auth-overlay">
        <div className="auth-card">
          <button className="auth-close-btn" onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>

          <h1>{isLogin ? "Log In" : "Create Account"}</h1>

          

          {message && (
            <p
              className={`auth-message ${
                messageType === "error"
                  ? "error"
                  : messageType === "logged-in"
                  ? "logged-in"
                  : messageType === "logged-out"
                  ? "logged-out"
                  : "success"
              }`}
            >
              {message}
            </p>
          )}

        {showResendVerification && (
          <div className="resend-verification-email-container">
            <p>Can't find our email?</p>
            <button onClick={handleResendEmailButton}>Resend email</button>
          </div>
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
    </>
  );
}
