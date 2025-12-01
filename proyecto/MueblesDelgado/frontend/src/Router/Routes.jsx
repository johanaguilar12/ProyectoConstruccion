import { Navigate, createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { AdminRouter, AdminRoutes } from "../admin";
import { AuthRouter, AuthRoutes } from "../auth";
 
 
export const getRoutes = () => createBrowserRouter(
    [
      {
        path: "/",
        element: <PublicRoutes children={<AuthRouter />} />,
        children: AuthRoutes,
      },
      {
        path: "/admin/panel",
        element: <PrivateRoutes children={<AdminRouter />} />,
        children: AdminRoutes,
      },
      {
        path: "/*",
        element: <Navigate to={"/"} />,
      },
    ],
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );