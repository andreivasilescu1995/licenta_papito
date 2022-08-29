import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { endpoint } from '../../constants';

const initialState = {
    logged: false
}

export const loginApi = createAsyncThunk(
    'loginAction',
    async ({ username, password }) => {
        const response = await axios.post(endpoint + '/auth/local', { identifier: username, password: password });
        if (response.status === 200) {
            localStorage.setItem('jwt', JSON.stringify(response.data.jwt));
            return {
                logged: true,
                jwt: response.data.jwt,
                ...response.data.user
            }
        }
        else
            return initialState;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutAction: (state) => {
            state.logged = false;
        },
        modifyProfileAction(state, action) {
            const { newUser, newName, newAge } = action.payload;
            if (newUser)
                state.username = newUser;
            if (newName)
                state.name = newName;
            if (newAge)
                state.age = newAge;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginApi.fulfilled, (state, action) => {
            return state = action.payload
        })
    },
});

export const { logoutAction, modifyProfileAction } = userSlice.actions;