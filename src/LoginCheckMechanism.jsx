import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config.js";

// eslint-disable-next-line react/prop-types
const LoginCheckMechanism = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false); // Update loading state

      if (currentUser) {
        // A user is logged in, currentUser will contain user details
        console.log(currentUser); // {uid, email, displayName, etc.}
      } else {
        // No user is logged in, currentUser is null
        console.log("No user is logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display while authentication state is being determined
  }

  if (!user) {
    // Pass the current location as state
    return <Navigate to="/auth/signin" state={{ from: window.location.pathname }} />;
  }

  return children;
};

export default LoginCheckMechanism;
