import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth"; // Import Firebase Auth and signOut
import { auth } from "./firebase-config.js";
import "./styles/Nav.css";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // State to hold user data

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event) => {
    if (!event.target.closest(".nav-menu")) {
      setIsOpen(false);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Set user data when it changes
      console.log(currentUser.photoURL);
    });

    window.addEventListener("click", closeDropdown);

    return () => {
      unsubscribe(); // Clean up listener on unmount
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  // Handle user sign-out
  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setUser(null); // Clear user data from state after sign-out
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <>
      <nav>
        <div className="logo">
          <h2>
            BrainTumorClassifier<span>AI</span>
          </h2>
        </div>

        <div className="nav-menu">
          <a className="cta-btn" href="/interpret">
            Interpret
          </a>
          {user ? (
            <div className="profile-icon" onClick={toggleDropdown}>
              <img src={user.photoURL || "./assets/img/user.png"} className="profile-image" />
            </div>
          ) : (
            <a href="/auth/signin">Sign In</a>
          )}
          {isOpen && (
            <div className="dropdown-menu">
              <a href="#">My MRIs</a>
              <a href="#" onClick={handleSignOut}>
                Sign Out
              </a>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Nav;
