import React, { useState, useEffect } from 'react'
import { Button, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployees, deleteEmployee } from '../redux/slices/employees';
import { show } from '../redux/slices/snackbar';
import { showModalAdd } from '../redux/slices/modals';
import { setEmployees } from '../redux/slices/employees';

import { updateEmployee } from '../api';
import ModalAdd from '../components/ModalAdd';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'department',
        headerName: 'Department',
        width: 150,
        editable: true,
    },
    {
        field: 'hired_at',
        headerName: 'Hired',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    }
];

export default function Employees() {
    const dispatch = useDispatch();
    const employees = useSelector(state => state.employees);

    const [forceRefresh, setForceRefresh] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        dispatch(getAllEmployees());
    }, []); //eslint-disable-line

    const processRowUpdate = async (row) => {
        await updateEmployee(row);
        dispatch(show({
            show: true,
            message: row.name + ' was successfully updated',
            type: 'success'
        }));
    }

    const deleteSelectedEmployees = () => {
        selectedRows.forEach(id => {
            dispatch(deleteEmployee(id));
        });

        const newEmployees = [...employees];
        const filteredEmployees = newEmployees.filter(e => !selectedRows.includes(e.id));
        dispatch(setEmployees(filteredEmployees));
    }

    const showModalAddEmployee = () => {
        dispatch(showModalAdd({ showModalAdd: true }));
    }

    const refreshTable = () => {
        setForceRefresh(new Date());
    }

    return (
        <>
            <Box display="flex" direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <div>Employees</div>
                <Box>
                    {selectedRows.length ?
                        <Button variant="contained" color="error" onClick={deleteSelectedEmployees}>Delete</Button>
                        :
                        <Button variant="contained" color="success" onClick={showModalAddEmployee}>Add</Button>
                    }
                </Box>
            </Box>
            <div style={{ height: 400 }}>
                <DataGrid
                    key={forceRefresh}
                    rows={employees}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    processRowUpdate={(row) => { processRowUpdate(row) }}
                    onProcessRowUpdateError={error => { }}
                    onSelectionModelChange={rows => { setSelectedRows(rows) }}
                />
            </div>

            <ModalAdd entityName="employee" fields={['name', 'department', 'hired_at']} refreshTable={refreshTable} />
        </>
    )
}
