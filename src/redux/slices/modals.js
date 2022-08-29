import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showModalAdd: false,
}

export const modalsSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModalAdd: (state, action) => {
            const { showModalAdd } = action.payload;
            state.showModalAdd = showModalAdd;
        }
    }
});

export const { showModalAdd } = modalsSlice.actions;