import { Navigate } from "react-router-dom";
import { AuthPage } from "../pages";

export const AuthRoutes = [
    {
      index: true,
      element: <AuthPage />,
    },
    {
      path: "/*",
      element: <Navigate to={"/"} />,
    },
];