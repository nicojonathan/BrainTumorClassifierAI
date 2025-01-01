// import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase-config"; // Import Firebase Auth and Provider
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "./firebase-config.js";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate for redirection and useLocation to get current location

function SignIn() {
  const navigate = useNavigate(); // Initialize the navigate function
  const location = useLocation(); // Get the current location

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const user = result.user;

      console.log("User Info:", user);

      // Save user info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastSignIn: user.metadata.lastSignInTime,
        createdAt: new Date(),
      });

      console.log("User data saved to Firestore!");

      // After successful sign-in, redirect based on the previous location
      const redirectTo = location.state?.from || "/"; // Default to homepage if no state is set
      navigate(redirectTo);
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };

  return (
    <div className="signin">
      <h2>Sign in with Google</h2>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
    </div>
  );
}

export default SignIn;
