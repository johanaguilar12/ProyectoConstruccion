import { createSlice } from '@reduxjs/toolkit';

export const trucksSlice = createSlice({
    name: 'trucks',
    initialState: {
        trucks: [],
        orderTruckAssignments: [], // Asegúrate de que esto exista
    },
    reducers: {
        onSetTrucks: (state, { payload } ) => {
            // Blindaje contra nulls
            state.trucks = Array.isArray(payload) ? payload : [];
        },
        onSetOrderTruckAssignments: (state, { payload } ) => {
            // Blindaje contra nulls
            state.orderTruckAssignments = Array.isArray(payload) ? payload : [];
        },
    }
});

// IMPORTANTE: Exportar ambas acciones aquí
export const { onSetTrucks, onSetOrderTruckAssignments } = trucksSlice.actions;