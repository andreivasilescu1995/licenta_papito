import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import axios from 'axios';

const endpoint = 'http://localhost:3000';

const initialState = {
    products: [],
}

export const getProductsApi = createAsyncThunk(
    'getProductsAction',
    async () => {
        const { data: { products } } = await axios.get(endpoint + '/getProducts');
        return {
            products
        }
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductsApi.fulfilled, (state, action) => {
            return state = action.payload.products;
        })
    },
});

export const { addToCart } = productsSlice.actions;