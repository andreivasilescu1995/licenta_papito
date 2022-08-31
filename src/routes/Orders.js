import React, { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, deleteOrder } from "../redux/slices/order";
import { show } from "../redux/slices/snackbar";
import { showModalAdd } from "../redux/slices/modals";
import { setOrders } from "../redux/slices/order";

import { updateOrder } from "../api";
import ModalAdd from "../components/ModalAdd";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "date",
    headerName: "Date",
    width: 150,
    editable: true,
  },
  {
    field: "total",
    headerName: "Total",
    width: 150,
    editable: true,
  },
  {
    field: "client_id",
    headerName: "Client",
    width: 150,
    editable: true,
  },
];

export default function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const [forceRefresh, setForceRefresh] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []); //eslint-disable-line

  const processRowUpdate = async (row) => {
    await updateOrder(row);
    dispatch(
      show({
        show: true,
        message: row.name + " was successfully updated",
        type: "success",
      })
    );
  };

  const deleteSelectedOrders = () => {
    selectedRows.forEach((id) => {
      dispatch(deleteOrder(id));
    });

    const newOrders = [...orders];
    const filteredOrders = newOrders.filter((e) => !selectedRows.includes(e.id));
    dispatch(setOrders(filteredOrders));
  };

  const showModalAddOrder = () => {
    dispatch(showModalAdd({ showModalAdd: true }));
  };

  const onAddedSuccessfully = () => {
    setForceRefresh(new Date());
  };

  return (
    <>
      <Box display="flex" direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <div>Orders</div>
        <Box>
          {selectedRows.length ? (
            <Button variant="contained" color="error" onClick={deleteSelectedOrders}>
              Delete
            </Button>
          ) : (
            <Button variant="contained" color="success" onClick={showModalAddOrder}>
              Add
            </Button>
          )}
        </Box>
      </Box>
      <div style={{ height: 400 }}>
        <DataGrid
          key={forceRefresh}
          rows={orders ? orders : []}
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
        entityName="order"
        fields={["date", "total", "client_id"]}
        onAddedSuccessfully={onAddedSuccessfully}
      />
    </>
  );
}
