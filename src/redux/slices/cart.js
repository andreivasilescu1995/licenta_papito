import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.forEach((p, i) => {
                if (p.name == action.payload.name)
                    state.splice(i, 1);
            })
        }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;