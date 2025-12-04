import { Navigate, Route, Routes } from "react-router-dom";
import { 
    DeliveryRoutes, 
    DeliveryTruckAdmin, 
    InventoryAdmin, 
    SearchFurniture 
} from "../pages";
import { 
    CreateAccountForm, 
    DeleteAccountForm, 
    FormAddOrder, 
    FormAssignmnetOrderToTruck, 
    OrderAdministration, 
    RegisterDriverForm, 
    RegisterTruckForm,
    SideBar // 1. IMPORTANTE: Importar el SideBar
} from "../components";

export const AdminRoutes = () => {
  return (
    // 2. CONTENEDOR PRINCIPAL (Flexbox)
    // Esto pone el Sidebar a la izquierda y el contenido a la derecha
    <div className="flex h-screen bg-gray-100 overflow-hidden">
        
        {/* BARRA LATERAL FIJA */}
        <SideBar />

        {/* ÁREA DE CONTENIDO (Con scroll propio) */}
        <div className="flex-1 overflow-y-auto p-8">
            <Routes>
                {/* Ruta principal del panel */}
                <Route path="panel" element={ <InventoryAdmin /> } />
                
                {/* Resto de rutas... */}
                <Route path="deliveryroutes" element={ <DeliveryRoutes /> } />
                <Route path="searchfurniture" element={ <SearchFurniture /> } />
                <Route path="createaccount" element={ <CreateAccountForm /> } />
                <Route path="deleteaccount" element={ <DeleteAccountForm /> } />
                <Route path="registerdriver" element={ <RegisterDriverForm /> } />
                <Route path="registertruck" element={ <RegisterTruckForm /> } />
                <Route path="deliveryAdmin" element={ <DeliveryTruckAdmin /> } />
                <Route path="orderassignment" element={ <FormAssignmnetOrderToTruck /> } />
                
                {/* Si usas FormAddOrder suelto, descomenta: */}
                {/* <Route path="addorder" element={ <FormAddOrder /> } /> */}
                
                <Route path="orderadministration" element={ <OrderAdministration /> } />

                {/* Redirecciones por defecto */}
                <Route path="/" element={ <Navigate to="panel" /> } />
                <Route path="*" element={ <Navigate to="panel" /> } />
            </Routes>
        </div>
    </div>
  );
};