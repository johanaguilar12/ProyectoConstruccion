import { useEffect, useState } from "react";
import { useOrdersStore, useLogisticRoute } from "../../hooks";
import { TableRoutes } from "../components/deliveryAdmin/TableRoutes"; // Ensure this path is correct!

export const DeliveryRoutes = () => {
    const { startGetOrders, orders } = useOrdersStore();
    const { startGenerateCustomRoutes, routes, startLoadRoutes } = useLogisticRoute();
    
    const [selectedIds, setSelectedIds] = useState([]);

    // Filter orders that do NOT have a route assigned
    // Check if 'route' property exists and is not null
    const pendingOrders = orders.filter(o => !o.route);

    useEffect(() => {
        startGetOrders(); 
        startLoadRoutes(); 
    }, []);

    const handleCheckboxChange = (orderId) => {
        if (selectedIds.includes(orderId)) {
            setSelectedIds(selectedIds.filter(id => id !== orderId));
        } else {
            setSelectedIds([...selectedIds, orderId]);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(pendingOrders.map(o => o.orderID));
        } else {
            setSelectedIds([]);
        }
    };

    const handleGenerateClick = async () => {
        if (selectedIds.length === 0) return;
        
        await startGenerateCustomRoutes(selectedIds);
        
        setSelectedIds([]);
        startGetOrders(); // Reload orders to update the 'pending' list
    };

    return (
        <div className="flex flex-col items-center mt-10 gap-8 w-full pb-10">
            <h1 className="text-3xl font-bold text-customBlue">Generación de Rutas</h1>

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
                            No hay órdenes pendientes.
                        </div>
                    ) : (
                        pendingOrders.map((order) => (
                            <div key={order.orderID} className={`grid grid-cols-6 min-w-[700px] text-center border-b p-3 items-center transition-colors ${selectedIds.includes(order.orderID) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                                <div className="flex justify-center items-center">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedIds.includes(order.orderID)}
                                        onChange={() => handleCheckboxChange(order.orderID)}
                                        className="w-5 h-5 cursor-pointer accent-blue-600"
                                    />
                                </div>
                                <p className="font-bold">{order.orderID}</p>
                                <p className="col-span-2 truncate px-2" title={order.destination}>
                                    {order.destination}
                                </p>
                                <p>{order.deliveryDate}</p>
                                <p className="font-semibold text-gray-600">
                                    {Array.isArray(order.orderContent) ? order.orderContent.length : 0}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            
            {/* Table for Generated Routes */}
            <div className="w-full max-w-6xl px-4">
                <h2 className="text-xl font-bold text-gray-700 mb-4 ml-2">Rutas Planificadas</h2>
                {/* Ensure TableRoutes handles empty 'routes' array gracefully */}
                <TableRoutes routes={routes} />
            </div>
        </div>
    );
};