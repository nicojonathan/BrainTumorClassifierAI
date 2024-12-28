import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App.jsx";
import Signin from "./Signin.jsx";
import Interpret from "./Interpret.jsx";
import LoginCheckMechanism from "./LoginCheckMechanism.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth/signin",
    element: <Signin />,
  },
  {
    path: "/interpret",
    element: (
      <LoginCheckMechanism>
        <Interpret />
      </LoginCheckMechanism>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
