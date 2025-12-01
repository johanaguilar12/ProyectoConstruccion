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
      const { data } = await mueblesDelgadoApi.post("/auth", {
        name: username,
        password,
      });
      localStorage.setItem("token", data.token);
      dispatch(onLogin(data.user));
    } catch (error) {
      dispatch( onLogout('Credenciales incorrectas') );

      setTimeout(() => {
        dispatch( clearErrorMessage() );
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(onLogout());
      return;
    }

    try {
      const { data } = await mueblesDelgadoApi.get("/auth/renew");
      localStorage.setItem("token", data);
      dispatch(onLogin(data.user));

    } catch (error) {
        localStorage.clear();
      dispatch(onLogout());
    }
  }

  const startRegisterAccount = async ( newAccount ) => {
    try {
      startCommand();
      const { data } = await mueblesDelgadoApi.post("/auth/register", newAccount);
      startGetAccounts();
      
      finishedCommand();
    } catch (error) {
      finishedCommand();
      console.log(error);
      throw new Error("Error al registrar al Conductor");
    }
  }

  const startGetAccounts = async () => {
    try {
      startCommand();
      const { data } = await mueblesDelgadoApi.get("/auth/admins");
      dispatch(onSetAccounts(data));
      
      finishedCommand();
    } catch (error) {
      finishedCommand();
      console.log(error);
      throw new Error("Error obtener cuentas");
    }
  }

  const startDeleteAccount = async (id) => {
    try {
      startCommand();
      const { data } = await mueblesDelgadoApi.delete(`/auth/admins/${id}`);
      startGetAccounts();
      
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