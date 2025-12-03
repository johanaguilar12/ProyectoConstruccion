import { useDispatch, useSelector } from "react-redux"
import mueblesDelgadoApi from "../api/mueblesDelgadoApi";
import { onSetAssignments, onSetDrivers } from "../store";
// Importar acción de camiones si la tienes, ej: onSetTrucks
import { useAdmin } from "./useAdmin";

export const useDriversStore = () => {
  const { drivers, assignments } = useSelector((state) => state.drivers);
  const {startCommand, finishedCommand} = useAdmin();
  const dispatch = useDispatch();

  const startGetDrivers = async () => {
      try {
          // Esto ahora traerá solo los DISPONIBLES gracias al cambio en el backend
          const {data} = await mueblesDelgadoApi.get("/delivery/drivers");
          dispatch(onSetDrivers(data));
      } catch (error) {
          console.log(error);
          throw new Error("Error al obtener los Conductores");
      }
  }

  // Si tienes un slice de camiones, deberías tener una función similar a esta:
  /*
  const startGetTrucks = async () => {
      try {
          const {data} = await mueblesDelgadoApi.get("/delivery/trucks");
          dispatch(onSetTrucks(data));
      } catch (error) { console.log(error); }
  }
  */

  const startAssignDriverToTruck = async (trackingNumber, name) => {
    try {
        startCommand();

        await mueblesDelgadoApi.post("/delivery/assign", null, {
          params: { p_trackingNumber: trackingNumber, p_name: name }
        });
        
        // --- ACTUALIZACIÓN ---
        // Recargamos todo para que los asignados desaparezcan de la lista
        await startGetAssignments(); 
        await startGetDrivers(); 
        // await startGetTrucks(); // Descomenta esto si tienes el hook de camiones aquí
        
        finishedCommand();
    } catch (error) {
        finishedCommand();
        // Mejoramos el mensaje de error
        throw new Error(error.response?.data?.message || "Error al asignar");
    }
  };

  // ... resto de funciones (register, getAssignments) iguales ...
  const startRegisterTruckDriver = async (truckDriver) => { /* ... */ }
  const startGetAssignments = async () => { /* ... */ }

  return {
    drivers,
    assignments,
    startGetDrivers,
    startRegisterTruckDriver,
    startAssignDriverToTruck,
    startGetAssignments,
  }
}