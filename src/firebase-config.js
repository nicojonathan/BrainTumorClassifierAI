// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1vrpL6qLdexEUyxA7E5vh24gsJoe2JCE",
  authDomain: "brain-tumor-classifier-w-ed810.firebaseapp.com",
  projectId: "brain-tumor-classifier-w-ed810",
  storageBucket: "brain-tumor-classifier-w-ed810.firebasestorage.app",
  messagingSenderId: "962998518202",
  appId: "1:962998518202:web:39f15bf4197b9fa0579d83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
