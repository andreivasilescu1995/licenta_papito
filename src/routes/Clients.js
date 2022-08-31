import React, { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllClients, deleteClient } from "../redux/slices/client";
import { show } from "../redux/slices/snackbar";
import { showModalAdd } from "../redux/slices/modals";
import { setClients } from "../redux/slices/client";

import { updateClient } from "../api";
import ModalAdd from "../components/ModalAdd";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: true,
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
    editable: true,
  },
];

export default function Clients() {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);

  const [forceRefresh, setForceRefresh] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    dispatch(getAllClients());
  }, []); //eslint-disable-line

  const processRowUpdate = async (row) => {
    await updateClient(row);
    dispatch(
      show({
        show: true,
        message: row.name + " was successfully updated",
        type: "success",
      })
    );
  };

  const deleteSelectedClients = () => {
    selectedRows.forEach((id) => {
      dispatch(deleteClient(id));
    });

    const newClients = [...clients];
    const filteredClients = newClients.filter((e) => !selectedRows.includes(e.id));
    dispatch(setClients(filteredClients));
  };

  const showModalAddClient = () => {
    dispatch(showModalAdd({ showModalAdd: true }));
  };

  const onAddedSuccessfully = () => {
    setForceRefresh(new Date());
  };

  return (
    <>
      <Box display="flex" direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <div>Clients</div>
        <Box>
          {selectedRows.length ? (
            <Button variant="contained" color="error" onClick={deleteSelectedClients}>
              Delete
            </Button>
          ) : (
            <Button variant="contained" color="success" onClick={showModalAddClient}>
              Add
            </Button>
          )}
        </Box>
      </Box>
      <div style={{ height: 400 }}>
        <DataGrid
          key={forceRefresh}
          rows={clients ? clients : []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={(row) => {
            processRowUpdate(row);
          }}
          onProcessRowUpdateError={(error) => {}}
          onSelectionModelChange={(rows) => {
            setSelectedRows(rows);
          }}
        />
      </div>

      <ModalAdd
        entityName="client"
        fields={["name", "email", "city"]}
        onAddedSuccessfully={onAddedSuccessfully}
      />
    </>
  );
}
