import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    show: false,
    message: null,
    type: null
}

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        show: (state, action) => {
            // console.log('PAYLOAD: ', action);
            const { show, message, type } = action.payload;
            state.show = show;
            state.message = message;
            state.type = type;
        }
    }
});

export const { show } = snackbarSlice.actions;