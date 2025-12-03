import { useEffect, useState } from "react";
import { useOrdersStore, useLogisticRoute } from "../../hooks";
// Asegúrate de importar tu tabla de rutas si ya la tienes
import { TableRoutes } from "../components/deliveryAdmin/TableRoutes"; 

export const DeliveryRoutes = () => {
    const { startGetOrders, orders } = useOrdersStore();
    const { startGenerateCustomRoutes, routes, startLoadRoutes } = useLogisticRoute();
    
    // Estado local para los IDs seleccionados con el checkbox
    const [selectedIds, setSelectedIds] = useState([]);

    // --- FILTRO IMPORTANTE ---
    // Solo mostramos las órdenes donde el campo 'route' es null (o false/undefined)
    const pendingOrders = orders.filter(order => !order.route);

    useEffect(() => {
        // Cargamos todas las órdenes al entrar para poder filtrar
        startGetOrders(); 
        
        // Cargamos las rutas ya hechas para verlas abajo (si tienes el endpoint listo)
        // startLoadRoutes(); 
    }, []);

    // Checkbox individual
    const handleCheckboxChange = (orderId) => {
        if (selectedIds.includes(orderId)) {
            setSelectedIds(selectedIds.filter(id => id !== orderId));
        } else {
            setSelectedIds([...selectedIds, orderId]);
        }
    };

    // Checkbox "Seleccionar Todo" (Solo de las pendientes)
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(pendingOrders.map(o => o.orderID));
        } else {
            setSelectedIds([]);
        }
    };

    const handleGenerateClick = async () => {
        if (selectedIds.length === 0) return;
        
        // Enviamos los IDs al backend
        await startGenerateCustomRoutes(selectedIds);
        
        // Limpiamos la selección
        setSelectedIds([]);
        
        // Recargamos las órdenes: Las que acabamos de procesar ahora tendrán ruta
        // y desaparecerán automáticamente de la lista 'pendingOrders' gracias al filtro.
        startGetOrders(); 
        
        // startLoadRoutes(); // Recargar tabla de rutas de abajo
    };

    return (
        <div className="flex flex-col items-center mt-10 gap-8 w-full pb-10">
            <h1 className="text-3xl font-bold text-customBlue">Generación de Rutas</h1>

            {/* SECCIÓN 1: Selección de Órdenes Pendientes */}
            <div className="container__admin shadow-custom w-full max-w-6xl px-4 p-6 bg-white rounded-lg">
                
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-700">
                        Órdenes Pendientes ({pendingOrders.length})
                    </h2>
                    <button 
                        onClick={handleGenerateClick}
                        disabled={selectedIds.length === 0}
                        className={`px-6 py-2 rounded text-white font-bold transition-all shadow-md
                            ${selectedIds.length > 0 
                                ? 'bg-green-600 hover:bg-green-700 transform hover:scale-105' 
                                : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                        Generar Ruta ({selectedIds.length})
                    </button>
                </div>

                <div className="w-full border overflow-x-auto rounded-lg">
                    <div className="grid grid-cols-6 min-w-[700px] text-center border-b bg-gray-100 font-bold p-3 text-customBlue text-sm">
                        <div className="flex justify-center items-center">
                            <input 
                                type="checkbox" 
                                onChange={handleSelectAll} 
                                checked={pendingOrders.length > 0 && selectedIds.length === pendingOrders.length}
                                className="w-5 h-5 cursor-pointer accent-blue-600"
                            />
                        </div>
                        <p>ID Orden</p>
                        <p className="col-span-2">Destino</p>
                        <p>Fecha Entrega</p>
                        <p>Muebles</p>
                    </div>

                    {pendingOrders.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 italic bg-gray-50">
                            ¡Todo al día! No hay órdenes pendientes de ruta.
                        </div>
                    ) : (
                        pendingOrders.map((order) => (
                            <div 
                                key={order.orderID} 
                                className={`grid grid-cols-6 min-w-[700px] text-center border-b p-3 items-center transition-colors 
                                ${selectedIds.includes(order.orderID) ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex justify-center items-center">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedIds.includes(order.orderID)}
                                        onChange={() => handleCheckboxChange(order.orderID)}
                                        className="w-5 h-5 cursor-pointer accent-blue-600"
                                    />
                                </div>
                                <p className="font-bold text-gray-800">{order.orderID}</p>
                                <p className="col-span-2 truncate px-2 text-sm" title={order.destination}>
                                    {order.destination}
                                </p>
                                <p className="text-sm">{order.deliveryDate}</p>
                                <p className="font-semibold text-gray-600">
                                    {Array.isArray(order.orderContent) ? order.orderContent.length : 0}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            
            {/* SECCIÓN 2: Tabla de Rutas Generadas (Historial) */}
            <div className="w-full max-w-6xl px-4">
                <h2 className="text-xl font-bold text-gray-700 mb-4 ml-2">Rutas Planificadas</h2>
                {/* Aquí se mostrarán las rutas que acabas de generar */}
                <TableRoutes routes={routes} />
            </div>
        </div>
    );
};