import { useDispatch, useSelector } from "react-redux";
import mueblesDelgadoApi from "../api/mueblesDelgadoApi";
import { clearErrorMessage, onChecking, onLogin, onLogout, onSetAccounts } from "../store";
import { useAdmin } from "./useAdmin";

export const useAuthStore = () => {
      const {startCommand, finishedCommand} = useAdmin();
      const { status, user, errorMessage } = useSelector((state) => state.auth);
      const dispatch = useDispatch();

      const startLogin = async ({ username, password }) => {
        dispatch(onChecking());
        try {
          // Petición a /auth/login
          const { data } = await mueblesDelgadoApi.post("/auth/login", {
            name: username,
            password,
          });
          
          // Guardamos token
          localStorage.setItem("token", data.token);
          localStorage.setItem("token-init-date", new Date().getTime());

          // Guardamos usuario (data.user es el nombre, data.uid es el ID)
          dispatch(onLogin({ name: data.user, uid: data.uid }));

        } catch (error) {
          dispatch( onLogout('Credenciales incorrectas') );
          setTimeout(() => { dispatch( clearErrorMessage() ); }, 10);
        }
      };

      const checkAuthToken = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          dispatch(onLogout());
          return;
        }

        try {
          // Petición a /auth/renew
          const { data } = await mueblesDelgadoApi.get("/auth/renew");
          
          // CORRECCIÓN: data ahora es un objeto { token, user, uid }
          localStorage.setItem("token", data.token);
          
          // Actualizamos el usuario en el estado
          dispatch(onLogin({ name: data.user, uid: data.uid }));

        } catch (error) {
          localStorage.clear();
          dispatch(onLogout());
        }
      }

      // --- REGISTRAR CUENTA (Admin) ---
      const startRegisterAccount = async (newAccount) => {
          try {
              startCommand();
              // El endpoint correcto en tu controller es /register
              await mueblesDelgadoApi.post("/auth/register", newAccount);
              
              // Recargamos la lista
              await startGetAccounts();
              
              finishedCommand();
          } catch (error) {
              finishedCommand();
              console.log(error);
              throw new Error(error.response?.data?.msg || "Error al registrar cuenta");
          }
      }

      // --- OBTENER CUENTAS ---
      const startGetAccounts = async () => {
          try {
              // No ponemos startCommand aquí si es una carga silenciosa, 
              // pero si quieres bloqueo de pantalla déjalo.
              const { data } = await mueblesDelgadoApi.get("/auth/admins");
              dispatch(onSetAccounts(data));
          } catch (error) {
              console.log(error);
              // No lanzamos error fatal para no romper la app si falla la lista
          }
      }

      // --- ELIMINAR CUENTA ---
      const startDeleteAccount = async (id) => {
          try {
              startCommand();
              await mueblesDelgadoApi.delete(`/auth/admins/${id}`);
              await startGetAccounts();
              
              finishedCommand();
          } catch (error) {
              finishedCommand();
              console.log(error);
              throw new Error("Error al eliminar la cuenta");
          }
      }

      const startLogout = () => {
          localStorage.clear();
          dispatch(onLogout());
      };

      return {
          //* Propiedades
          status,
          user,
          errorMessage,

          //* Métodos
          startLogin,
          checkAuthToken,
          startLogout,
          startRegisterAccount,
          startDeleteAccount,
          startGetAccounts,
      };
  };