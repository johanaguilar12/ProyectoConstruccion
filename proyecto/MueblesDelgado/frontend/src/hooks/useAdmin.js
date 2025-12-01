import { useDispatch, useSelector } from "react-redux";
import { onFinishedCommand, onStartingCommand } from "../store";


export const useAdmin = () => {
    const { status, accounts } = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const startCommand = (  ) => {
        dispatch(onStartingCommand());
    }

    const finishedCommand = (  ) => {
        dispatch(onFinishedCommand());
    }

  return {
    //*Propiedades
    status,
    accounts,

    //*Métodos
    startCommand,
    finishedCommand,
  }
}
