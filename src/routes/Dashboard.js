import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";

import LineChart from '../components/LineChart';
import { getAllClients } from "../redux/slices/client";
import { getAllEmployees } from '../redux/slices/employees';

export default function Dashboard() {
    const dispatch = useDispatch();
    const clients = useSelector((state) => state.clients);
    const employees = useSelector(state => state.employees);

    useEffect(() => {
        dispatch(getAllClients());
        dispatch(getAllEmployees());
    }, []); //eslint-disable-line

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            Clients chart
            <LineChart data={clients} />

            Employees chart
            <LineChart data={employees} />
        </Box>
    );
}
