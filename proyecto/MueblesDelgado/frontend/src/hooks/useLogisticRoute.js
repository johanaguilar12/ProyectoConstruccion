import { useDispatch, useSelector } from "react-redux"
import mueblesDelgadoApi from "../api/mueblesDelgadoApi";
import { onSetRoutes } from "../store"; // Asegúrate de tener esta acción en tu slice
import { useAdmin } from "./useAdmin";
import Swal from "sweetalert2";

export const useLogisticRoute = () => {
    // Obtenemos las rutas del estado
    const { routes } = useSelector((state) => state.orders); // O state.routes, depende de tu store
    const { startCommand, finishedCommand } = useAdmin();
    const dispatch = useDispatch();

    const startGenerateCustomRoutes = async (selectedOrderIds) => {
        try {
            startCommand();
            await mueblesDelgadoApi.post("/logistics/generate-custom-routes", selectedOrderIds);
            
            // ¡AQUÍ ESTÁ LA CLAVE! Recargar las rutas después de generar
            await startLoadRoutes(); 
            
            finishedCommand();
            Swal.fire('Éxito', 'Rutas generadas correctamente', 'success');
        } catch (error) {
            finishedCommand();
            console.error(error);
            const msg = error.response?.data?.message || "Error al generar rutas";
            Swal.fire('Error', msg, 'error');
        }
    }

    // NUEVA FUNCIÓN: Cargar rutas desde la BD
    const startLoadRoutes = async () => {
         try {
            const { data } = await mueblesDelgadoApi.get("/logistics/routes");
            // Guardamos en Redux para que la tabla lo vea
            dispatch(onSetRoutes(data));
         } catch (error) {
             console.error("Error cargando rutas:", error);
         }
    }

    return {
        routes, // Exportamos la variable para la tabla
        startGenerateCustomRoutes,
        startLoadRoutes // Exportamos la función
    }
}