import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { LoadingElement } from "../helpers/LoadingElement";
import { useDriversStore, useInventoryStore, useOrdersStore, useTrucksStore } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { onSetTrucks, onSetDrivers, onSetPackingLists, onSetOrders, onSetOrderTruckAssignments, onSetAssignments, onSetFornitures } from "../store";
import { useAdmin } from "../hooks/useAdmin";

export const PrivateRoutes = ({ children }) => {

  const status = 'authenticated';
  // const { status, checkAuthToken } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  const {status: statusCommand} = useAdmin();
  const {startGetPackingLists, startGetFurnitures} = useInventoryStore();
  const {startGetAccounts} = useAuthStore();
  const {startGetDrivers, startGetAssignments} = useDriversStore();
  const {startGetTrucks} = useTrucksStore();
  const {startGetOrders} = useOrdersStore();

  const dispatch = useDispatch();

  useEffect(() => {
    const initializeData = async () => {
      try {
        await Promise.all([
          // checkAuthToken(),
          startGetPackingLists(),
          startGetAccounts(),
          startGetDrivers(),
          startGetTrucks(),
          startGetAssignments(),
          startGetFurnitures(),
          startGetOrders(),
        ]);
        setIsReady(true);
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    };
  
    initializeData();
  }, []);
  


  if (!isReady || status === "checking" || statusCommand === "starting") {
    return <LoadingElement />;
  }


  

  //Si esta autenticado muestra el panel de administrador y si no esta autenticado redirige al login

  return status === "authenticated" ? (
    children
  ) : (
    <Navigate to={"/"} />
  );
};