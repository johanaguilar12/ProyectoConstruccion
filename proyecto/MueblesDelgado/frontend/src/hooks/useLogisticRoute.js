import { useDispatch, useSelector } from "react-redux"
import mueblesDelgadoApi from "../api/mueblesDelgadoApi";
import { onSetRoutes } from "../store"; 
import { useAdmin } from "./useAdmin";
import Swal from "sweetalert2";

export const useLogisticRoute = () => {
    // Ensure this matches your store structure. 
    // If 'routes' is inside the 'orders' slice:
    const { routes } = useSelector((state) => state.orders); 
    
    const { startCommand, finishedCommand } = useAdmin();
    const dispatch = useDispatch();

    const startGenerateCustomRoutes = async (selectedOrderIds) => {
        try {
            startCommand();
            await mueblesDelgadoApi.post("/logistics/generate-custom-routes", selectedOrderIds);
            
            // Reload routes immediately
            await startLoadRoutes(); 
            
            finishedCommand();
            Swal.fire('Success', 'Routes generated successfully', 'success');
        } catch (error) {
            finishedCommand();
            console.error(error);
            const msg = error.response?.data?.message || "Error generating routes";
            Swal.fire('Error', msg, 'error');
        }
    }

    const startLoadRoutes = async () => {
         try {
            const { data } = await mueblesDelgadoApi.get("/logistics/routes");
            // Ensure data is an array before dispatching
            dispatch(onSetRoutes(Array.isArray(data) ? data : []));
         } catch (error) {
             console.error("Error loading routes:", error);
         }
    }

    return {
        routes, 
        startGenerateCustomRoutes,
        startLoadRoutes 
    }
}