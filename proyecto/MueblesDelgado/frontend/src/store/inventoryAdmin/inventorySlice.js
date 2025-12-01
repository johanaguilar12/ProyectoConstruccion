import { createSlice } from '@reduxjs/toolkit';

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        packinglists: [],
        furnitures: [],
    },
    reducers: {
        onSetPackingLists: (state, { payload } ) => {
            state.packinglists = payload;
        },
        onSetFornitures: (state, { payload } ) => {
            state.furnitures = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { onSetPackingLists, onSetFornitures } = inventorySlice.actions;