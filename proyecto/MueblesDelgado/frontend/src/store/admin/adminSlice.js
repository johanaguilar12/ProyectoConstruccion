import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        status: "waiting",
        accounts: [],
    },
    reducers: {
        onStartingCommand: (state, {payload} ) => {
            state.status = "starting";
        },
        onFinishedCommand: (state, {payload} ) => {
            state.status = "finished";
        },
        onSetAccounts: (state, {payload} ) => {
            state.accounts = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { onStartingCommand, onFinishedCommand, onSetAccounts } = adminSlice.actions;    