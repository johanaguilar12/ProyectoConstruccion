import { useEffect, useState } from "react";
import { useOrdersStore } from "../../../hooks";
import { DataFurnituresOrders } from "./DataFurnituresOrders";
import { FormAddOrder } from "./FormAddOrder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

export const OrderAdministration = () => {
    const { startGetOrders, startRemoveOrder, orders } = useOrdersStore();
    
    // Solo necesitamos el modal para ver muebles
    const [isFurnituresModalOpen, setIsFurnituresModalOpen] = useState(false);
    const [selectedOrderContent, setSelectedOrderContent] = useState([]);
    
    const safeOrders = Array.isArray(orders) ? orders : [];

    useEffect(() => {
        startGetOrders();
    }, []);

    const handleViewFurnitures = (order) => {
        setSelectedOrderContent(order.orderContent || []);
        setIsFurnituresModalOpen(true);
    };

    const handleDeleteOrder = (id) => {
        startRemoveOrder(id);
    }

    return (
        <div className="flex flex-col items-center justify-center mt-10 gap-8 w-full">
            <h1 className="text-3xl font-bold text-customBlue">Administración de Órdenes</h1>
            
            {/* Formulario Maestro (Crear/Editar) */}
            <div className="w-full max-w-6xl px-4">
               <FormAddOrder />
            </div>

            <div className="container__admin shadow-custom w-full max-w-6xl px-4 mb-10">
                <h2 className="text-2xl font-bold text-center text-customBlue mb-4 pt-4">
                    Listado de Órdenes Activas
                </h2>
                <div className="w-full border overflow-x-auto">
                    <div className="grid grid-cols-5 min-w-[600px] text-center border-b bg-gray-100 font-bold p-2">
                        <p>ID</p>
                        <p>Destino</p>
                        <p>Fecha Entrega</p>
                        <p>Contenido</p>
                        <p>Acciones</p>
                    </div>

                    {safeOrders.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">No hay órdenes registradas</div>
                    ) : (
                        safeOrders.map((order) => (
                            <div key={order.orderID} className="grid grid-cols-5 min-w-[600px] text-center border-b p-2 items-center hover:bg-gray-50">
                                <p className="font-bold text-lg">{order.orderID}</p>
                                
                                <p className={order.destination && order.destination.includes("pendiente") ? "text-orange-600 font-semibold" : ""}>
                                    {order.destination}
                                </p>
                                
                                <p>{order.deliveryDate}</p>
                                
                                <div>
                                    <button 
                                        onClick={() => handleViewFurnitures(order)}
                                        className="text-blue-600 hover:text-blue-800 underline flex items-center justify-center gap-1 mx-auto"
                                    >
                                        <FontAwesomeIcon icon={faBoxOpen} />
                                        Ver ({Array.isArray(order.orderContent) ? order.orderContent.length : 0})
                                    </button>
                                </div>
                                
                                <div className="flex justify-center gap-4">
                                    {/* SOLO BOTÓN ELIMINAR */}
                                    <button 
                                        onClick={() => handleDeleteOrder(order.orderID)}
                                        className="text-red-500 hover:text-red-700 transition-transform hover:scale-110"
                                        title="Eliminar Orden"
                                    >
                                        <FontAwesomeIcon icon={faTrash} size="lg"/>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal para ver/borrar muebles */}
            {isFurnituresModalOpen && (
                <DataFurnituresOrders 
                    selectedOrder={selectedOrderContent} 
                    setIsFurnituresOrderModalOpen={setIsFurnituresModalOpen}
                />
            )}
        </div>
    );
};