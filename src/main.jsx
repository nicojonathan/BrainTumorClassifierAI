import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import Signin from "./SignIn.jsx";
import Interpret from "./Interpret.jsx";
import LoginCheckMechanism from "./LoginCheckMechanism.jsx";
import MyMriPage from "./MyMriPage.jsx";
import MriDetailPage from "./MriDetailPage.jsx";
// import { BrowserRouter } from "react-router-dom";
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
    element: <LoginCheckMechanism>{({ user }) => <Interpret user={user} />}</LoginCheckMechanism>,
  },
  {
    path: "/my/mri",
    element: <LoginCheckMechanism>{({ user }) => <MyMriPage user={user} />}</LoginCheckMechanism>,
  },
  {
    path: "/my/mri/:id",
    element: <LoginCheckMechanism>{({ user }) => <MriDetailPage user={user} />}</LoginCheckMechanism>,
  },
  // {
  //   basename: "/BrainTumorClassifierAI", // Set the basename directly in createBrowserRouter
  // },
]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter basename="/BrainTumorClassifierAI">
//       <RouterProvider router={router} />
//     </BrowserRouter>
//   </StrictMode>
// );

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
