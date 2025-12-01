import { useDispatch, useSelector } from "react-redux"
import mueblesDelgadoApi from "../api/mueblesDelgadoApi";
import { onSetFornitures, onSetPackingLists, onSetRoutes } from "../store";
import { useAdmin } from "./useAdmin";


export const useLogisticRoute = () => {
    const { routes } = useSelector((state) => state.orders);
    const {startCommand, finishedCommand} = useAdmin();
    const dispatch = useDispatch();

    const startPlanRoutes = async (orders) => {
        try {
          startCommand();
          
          const { data } = await mueblesDelgadoApi.post("/logistics/planRoutes", orders);

          dispatch(onSetRoutes(data));

          finishedCommand();
        } catch (error) {
          finishedCommand();
          console.log(error);
          throw new Error("Error al Crear Las rutas");
        }
    }
    



  return {
    //*Propiedades
    routes,

    //*Métodos
    startPlanRoutes,

  }
}
