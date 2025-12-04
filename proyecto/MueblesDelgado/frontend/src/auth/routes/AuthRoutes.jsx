import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage } from "../pages";

export const AuthRoutes = () => {
  return (
    <Routes>
      {/* La ruta es relativa a /auth definido en AppRouter */}
      <Route path="login" element={ <AuthPage /> } />
      
      {/* Cualquier otra cosa en /auth/... redirige a login */}
      <Route path="/*" element={ <Navigate to="/auth/login" /> } />
    </Routes>
  );
};