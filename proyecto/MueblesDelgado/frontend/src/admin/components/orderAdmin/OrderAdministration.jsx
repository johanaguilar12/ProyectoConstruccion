import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrdersStore } from "../../../hooks"
import { faBoxOpen, faMinus } from "@fortawesome/free-solid-svg-icons";
import { DataFurnituresOrders } from "./DataFurnituresOrders";

export const OrderAdministration = () => {
    const [isFurnituresOrderModalOpen, setIsFurnituresOrderModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState([]);
    
    const { orders, startRemoveOrder } = useOrdersStore(); 

    const handleShowFornitures = ( order ) => {
        setSelectedOrder(order || []) 
        setIsFurnituresOrderModalOpen(true);
    }

    return (
      <div className="flex flex-col justify-center items-center">
          <div className="container__admin shadow-custom w-full max-w-6xl">
              <h2 className="text-2xl font-bold text-center text-customBlue mb-6">
                  Administrar Ordenes
              </h2>

              <div className="w-full border"> 
                  <div> 
                      <div className="grid grid-cols-2 sm:grid-cols-4 text-center border [&>p]:border [&>p]:text-customBlue text-lg font-semibold"> 
                      <p>ID de la orden</p>
                      <p>Destino</p>
                      <p>Fecha de Entrega</p>
                      <p>Acciones</p>
                      </div>
                  </div>

                  <div> 
                      {orders?.map((order) => (
                      <div key={order.orderID} className="grid grid-cols-2 sm:grid-cols-4 text-center border [&>p]:border">
                          <p>{order.orderID}</p>
                          <p>{order.destination}</p>
                          {/* Muestra "Sin fecha" si viene null para evitar huecos visuales */}
                          <p>{order.deliveryDate || "Sin Fecha"}</p> 
                          <div className="flex justify-center items-center gap-2">
                          <button
                              onClick={() => handleShowFornitures(order.orderContent)}
                              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 w-[36px] h-[36px] flex items-center justify-center"
                              title="Ver Muebles"
                          >
                              <FontAwesomeIcon icon={faBoxOpen} />
                          </button>
                          
                          {/* 2. CONECTA EL BOTÓN DE ELIMINAR */}
                          <button
                              onClick={() => startRemoveOrder(order.orderID)}
                              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 w-[36px] h-[36px] flex items-center justify-center"
                              title="Eliminar orden"
                          >
                              <FontAwesomeIcon icon={faMinus} />
                          </button>

                          </div>
                      </div>
                      ))}
                  </div>
              </div> 

              {isFurnituresOrderModalOpen && (
                  <DataFurnituresOrders selectedOrder={selectedOrder} setIsFurnituresOrderModalOpen={setIsFurnituresOrderModalOpen}/>
              )}

          </div>
      </div>
    )
}