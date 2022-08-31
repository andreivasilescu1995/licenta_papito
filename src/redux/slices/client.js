import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoint } from "../../constants";

const initialState = null;

export const getAllClients = createAsyncThunk("getAllClientsAction", async () => {
  const jwt = localStorage.getItem("jwt");
  const response = await axios.get(endpoint + "/clients", {
    headers: {
      Authorization: `Bearer ${jwt.replace(/["]/g, "")}`,
    },
  });
  if (response.status === 200)
    return response.data.data.map((e) => {
      return {
        ...e.attributes,
        id: e.id,
      };
    });
});

export const deleteClient = createAsyncThunk("deleteClient", async (id) => {
  const jwt = localStorage.getItem("jwt");
  await axios.delete(endpoint + "/clients/" + id, {
    headers: {
      Authorization: `Bearer ${jwt.replace(/["]/g, "")}`,
    },
  });
});

export const addClientAction = createAsyncThunk("addClient", async (client) => {
  const jwt = localStorage.getItem("jwt");
  console.log(jwt);

  const response = await axios.post(
    endpoint + "/clients/",
    {
      data: client,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt.replace(/["]/g, "")}`,
      },
    }
  );
  return { client, id: response.data.data.id };
});

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllClients.fulfilled, (state, action) => {
        return (state = action.payload);
      })
      .addCase(addClientAction.fulfilled, (state, action) => {
        state.push({ ...action.payload.client, id: action.payload.id });
      });
  },
});

export const { setClients } = clientsSlice.actions;
