import { useDispatch, useSelector } from "react-redux"
import mueblesDelgadoApi from "../api/mueblesDelgadoApi";
import { onSetFornitures, onSetPackingLists } from "../store";
import { useAdmin } from "./useAdmin";


export const useInventoryStore = () => {
    const { packinglists, furnitures } = useSelector((state) => state.inventory);
    const {startCommand, finishedCommand} = useAdmin();
    const dispatch = useDispatch();

    const startAddPackingList = async (packingList) => {
        try {
          startCommand();
          const {data} = await mueblesDelgadoApi.post("/inventory/add_furniture", packingList);
          finishedCommand();
        } catch (error) {
          finishedCommand();
          console.log(error);
          throw new Error("Error al agregar La packing List");
        }
    }

    const startGetPackingLists = async () => {
      try {
        const {data} = await mueblesDelgadoApi.get("/inventory/getpackinglist");
        dispatch(onSetPackingLists(data));
      } catch (error) {
        console.log(error);
        throw new Error("Error al obtener los packingList");
      }
  }

  const startGetFurnitures = async () => {
    try {
      const {data} = await mueblesDelgadoApi.get("/inventory/retrieve_furniture");
      dispatch(onSetFornitures(data));
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener los muebles");
    }
  }
    



  return {
    //*Propiedades
    packinglists,
    furnitures,

    //*Métodos
    startAddPackingList,
    startGetPackingLists,
    startGetFurnitures,

  }
}
