import { configureStore } from "@reduxjs/toolkit";
import { adminSlice, authSlice, driversSlice, inventorySlice, ordersSlice, trucksSlice } from "./";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        drivers: driversSlice.reducer,
        trucks: trucksSlice.reducer,
        orders: ordersSlice.reducer,
        inventory: inventorySlice.reducer,
        admin: adminSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});