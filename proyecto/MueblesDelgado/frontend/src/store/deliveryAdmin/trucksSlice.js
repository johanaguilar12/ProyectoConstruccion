import { createSlice } from '@reduxjs/toolkit';

export const trucksSlice = createSlice({
    name: 'trucks',
    initialState: {
        trucks: [],
        orderTruckAssignments: [],
    },
    reducers: {
        onSetTrucks: (state, { payload } ) => {
            state.trucks = payload;
        },
        onSetOrderTruckAssignments: (state, { payload } ) => {
            state.orderTruckAssignments = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { onSetTrucks, onSetOrderTruckAssignments } = trucksSlice.actions;