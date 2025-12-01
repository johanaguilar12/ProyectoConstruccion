import { useDispatch, useSelector } from "react-redux"
import mueblesDelgadoApi from "../api/mueblesDelgadoApi";
import { onSetAssignments, onSetDrivers } from "../store";
import { useAdmin } from "./useAdmin";


export const useDriversStore = () => {
  const { drivers, assignments } = useSelector((state) => state.drivers);
  const {startCommand, finishedCommand} = useAdmin();
  const dispatch = useDispatch();

  const startGetDrivers = async () => {
      try {
          const {data} = await mueblesDelgadoApi.get("/delivery/drivers");
          dispatch(onSetDrivers(data));
      } catch (error) {
          console.log(error);
          throw new Error("Error al obtener a los Conductores");
      }
  }

  const startRegisterTruckDriver = async ( truckDriver = {name: '', licenseNumber: '' }) => {
    try {
      startCommand()
      const {data} = await mueblesDelgadoApi.post("/delivery/driver", truckDriver);
      startGetDrivers();

      finishedCommand();
      return data;
    } catch (error) {
      finishedCommand();
      console.log(error);
      throw new Error("Error al registrar al Conductor");
    }
  }

  const startAssignDriverToTruck = async (trackingNumber, name) => {
    console.log(trackingNumber, name);
    try {
        startCommand();

        await mueblesDelgadoApi.post("/delivery/assign", null, {
          params: {
              p_trackingNumber: trackingNumber,
              p_name: name
          }
      });
        startGetAssignments();
        finishedCommand();
    } catch (error) {
        finishedCommand();
        throw new Error("Error al asignar el conductor al camión");
    }
  };

  const startGetAssignments = async () => {
    try {

      const {data} = await mueblesDelgadoApi.get("/delivery/assignments");
      dispatch(onSetAssignments(data)); 
      
    } catch (error) {
      throw new Error("Error al asignar el conductor al camión");
    }
  
  }



  return {
    //*Propiedades
    drivers,
    assignments,

    //*Métodos
    startGetDrivers,
    startRegisterTruckDriver,
    startAssignDriverToTruck,
    startGetAssignments,

  }
}
