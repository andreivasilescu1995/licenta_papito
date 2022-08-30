import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { endpoint } from '../../constants';

const initialState = {
    events: []
}

export const addEvent = createAsyncThunk(
    'addEvent',
    async (event) => {
        const jwt = localStorage.getItem('jwt');
        const user = JSON.parse(localStorage.getItem('user'));
        const newEvent = { start: event.start, end: event.end, title: event.title, users_permissions_user: user.id };
        await axios.post(endpoint + '/events/',
            {
                data: newEvent
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt.replace(/["]/g, "")}`
                }
            });
        return newEvent;
    }
)

export const getUserEvents = createAsyncThunk(
    'getUserEvents',
    async () => {
        const jwt = localStorage.getItem('jwt');
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get(endpoint + '/events?filters[users_permissions_user][id][$eq]=' + user.id, {
            headers: {
                Authorization: `Bearer ${jwt.replace(/["]/g, "")}`
            }
        });
        if (response.status === 200)
            return response.data.data.map(event => {
                return {
                    start: event.attributes.start,
                    end: event.attributes.end,
                    title: event.attributes.title
                }
            })
    }
)

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addEvent.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(getUserEvents.fulfilled, (state, action) => {
                return state = action.payload;
            })
    }
});