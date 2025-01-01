import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import Signin from "./SignIn.jsx";
import Interpret from "./Interpret.jsx";
import LoginCheckMechanism from "./LoginCheckMechanism.jsx";
import MyMriPage from "./MyMriPage.jsx";
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
  {
    path: "/my/mri",
    element: <MyMriPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
