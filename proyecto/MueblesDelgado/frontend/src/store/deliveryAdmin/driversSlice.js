import { createSlice } from '@reduxjs/toolkit';

export const driversSlice = createSlice({
    name: 'drivers',
    initialState: {
        drivers: [],
        assignments: [],
    },
    reducers: {
        onSetDrivers: (state, { payload } ) => {
            // BLINDAJE
            state.drivers = Array.isArray(payload) ? payload : [];
        },
        onSetAssignments : (state, { payload } ) => {
            // BLINDAJE
            state.assignments = Array.isArray(payload) ? payload : [];
        },
    }
});

export const { onSetDrivers, onSetAssignments } = driversSlice.actions;