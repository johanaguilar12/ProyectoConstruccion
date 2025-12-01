import { createSlice } from '@reduxjs/toolkit';

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        packingListOrderID: [],
        routes: [],
    },
    reducers: {
        onSetOrders: (state, { payload } ) => {
            state.orders = payload;
        },
        onSetPackingListOrderID: (state, { payload } ) => {
            state.packingListOrderID = payload;
        },
        onSetRoutes: (state, { payload } ) => {
            state.routes = payload;
        },
        onDeleteOrder: (state, { payload }) => {
            state.orders = state.orders.filter(order => order.orderID !== payload);
        },
    }
});

export const { onSetOrders, onSetPackingListOrderID, onSetRoutes, onDeleteOrder } = ordersSlice.actions;