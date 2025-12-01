import { createSlice } from '@reduxjs/toolkit';

export const driversSlice = createSlice({
    name: 'drivers',
    initialState: {
        drivers: [],
        assignments: [],
    },
    reducers: {
        onSetDrivers: (state, { payload } ) => {
            state.drivers = payload;
        },
        onSetAssignments : (state, { payload } ) => {
            state.assignments = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { onSetDrivers, onSetAssignments } = driversSlice.actions;