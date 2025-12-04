import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { AdminRoutes } from '../admin/routes/AdminRoutes';
import { useAuthStore } from '../hooks/useAuthStore';
import { LoadingElement } from '../helpers/LoadingElement';

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if ( status === 'checking' ) {
    return <LoadingElement />
  }

  return (
    <Routes>
        {
            (status === 'not-authenticated')
            ? (
                /* Rutas Públicas */
                <>
                    <Route path="/auth/*" element={ <AuthRoutes /> } />
                    <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                </>
            )
            : (
                /* Rutas Privadas */
                <>
                    {/* 1. Montamos las rutas de admin bajo el prefijo "/admin" */}
                    <Route path="/admin/*" element={ <AdminRoutes /> } />
                    
                    {/* 2. Cualquier otra cosa redirige a /admin/panel */}
                    <Route path="/*" element={ <Navigate to="/admin/panel" /> } />
                </>
            )
        }
    </Routes>
  )
}