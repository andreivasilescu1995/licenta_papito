import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { endpoint } from '../../constants';

const initialState = {
    employees: null
}

export const getAllEmployees = createAsyncThunk(
    'getAllEmployeesAction',
    async () => {
        const jwt = localStorage.getItem('jwt');
        const response = await axios.get(endpoint + '/employees', {
            headers: {
                Authorization: `Bearer ${jwt.replace(/["]/g, "")}`
            }
        });
        if (response.status === 200)
            return response.data.data.map(e => {
                return {
                    ...e.attributes, id: e.id
                }
            })
    }
)

export const deleteEmployee = createAsyncThunk(
    'deleteEmployee',
    async (id) => {
        const jwt = localStorage.getItem('jwt');
        await axios.delete(endpoint + '/employees/' + id, {
            headers: {
                Authorization: `Bearer ${jwt.replace(/["]/g, "")}`
            }
        });
    }
)

export const addEmployeeAction = createAsyncThunk(
    'addEmployee',
    async (employee) => {
        const jwt = localStorage.getItem('jwt');
        const response = await axios.post(endpoint + '/employees/',
            {
                data: employee
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt.replace(/["]/g, "")}`
                }
            });
        return { employee, id: response.data.data.id };
    }
)

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployees: (state, action) => {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEmployees.fulfilled, (state, action) => {
                return state = action.payload
            })
            .addCase(addEmployeeAction.fulfilled, (state, action) => {
                state.push({ ...action.payload.employee, id: action.payload.id });
            })
    },
});

export const { setEmployees } = employeesSlice.actions;