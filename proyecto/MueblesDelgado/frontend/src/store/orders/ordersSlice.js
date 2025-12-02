import { createSlice } from '@reduxjs/toolkit';

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [], // Siempre inicia como array vacío
        packingListOrderID: [],
        routes: [],
    },
    reducers: {
        onSetOrders: (state, { payload } ) => {
            // CORRECCIÓN CRÍTICA:
            // Si payload es null, undefined o no es un array, forzamos que sea []
            // Esto evita el error "map is not a function"
            state.orders = Array.isArray(payload) ? payload : [];
        },
        onSetPackingListOrderID: (state, { payload } ) => {
            state.packingListOrderID = payload;
        },
        onSetRoutes: (state, { payload } ) => {
            state.routes = payload;
        },
        onDeleteOrder: (state, { payload }) => {
            // Protección extra al eliminar
            if (Array.isArray(state.orders)) {
                state.orders = state.orders.filter(order => order.orderID !== payload);
            }
        },
    }
});

export const { onSetOrders, onSetPackingListOrderID, onSetRoutes, onDeleteOrder } = ordersSlice.actions;