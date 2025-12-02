import { useDispatch, useSelector } from "react-redux";
import mueblesDelgadoApi from "../api/mueblesDelgadoApi";
import { onSetOrders, onSetPackingListOrderID, onDeleteOrder } from "../store";
import { useAdmin } from "./useAdmin";
import Swal from "sweetalert2";

export const useOrdersStore = () => {
    const { orders, packingListOrderID } = useSelector((state) => state.orders);
    const dispatch = useDispatch();
    const { startCommand, finishedCommand } = useAdmin();

    const startGetOrders = async () => {
        try {
            const { data } = await mueblesDelgadoApi.get("/orders");
            dispatch(onSetOrders(data));
        } catch (error) {
            const message = error.response?.data?.message || "Error al obtener los pedidos";
            console.error("startGetOrders Error:", message);
            console.log(message);
        }
    };

    const startCreateOrder = async (order) => {
        try {
            startCommand();
            const { data } = await mueblesDelgadoApi.post("/orders", order);
            console.log("Pedido creado exitosamente:", data);

            // Recargar la lista para ver el nuevo pedido
            await startGetOrders();
            finishedCommand();
        } catch (error) {
            finishedCommand();
            const message = error.response?.data?.message || "Error al crear el pedido";
            console.error("startCreateOrder Error:", message);
            throw new Error(message);
        }
    };

    const startUpdateOrder = async (orderId, updatedOrder) => {
        try {
            const { data } = await mueblesDelgadoApi.put(`/orders/${orderId}`, updatedOrder);
            console.log("Pedido actualizado:", data);
            startGetOrders();
        } catch (error) {
            const message = error.response?.data?.message || "Error al actualizar el pedido";
            console.error("startUpdateOrder Error:", message);
            throw new Error(message);
        }
    };

    const startRemoveOrder = async (orderId) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esto",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                await mueblesDelgadoApi.delete(`/orders/${orderId}`);
                
                dispatch(onDeleteOrder(orderId));

                Swal.fire('Eliminado!', 'El pedido ha sido eliminado.', 'success');
            }
        } catch (error) {
            const message = error.response?.data?.message || "Error al eliminar el pedido";
            console.error("startRemoveOrder Error:", message);
            Swal.fire('Error', message, 'error');
        }
    };

    const startSetOrders = async (ordersList) => {
        try {
            await mueblesDelgadoApi.post("/orders/orders", ordersList);
            console.log("Lista de pedidos establecida exitosamente");
            startGetOrders();
        } catch (error) {
            const message = error.response?.data?.message || "Error al establecer los pedidos";
            console.error("startSetOrders Error:", message);
            throw new Error(message);
        }
    };

    const setPackingListOrderID = (ordersId = []) => {
        dispatch(onSetPackingListOrderID(ordersId));
    }

    return {
        //* Propiedades
        orders,
        packingListOrderID,

        //* Métodos
        startGetOrders,
        startCreateOrder,
        startUpdateOrder,
        startRemoveOrder,
        startSetOrders,
        setPackingListOrderID,
    };
}