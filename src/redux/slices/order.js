import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoint } from "../../constants";

const initialState = null;

export const getAllOrders = createAsyncThunk("getAllOrdersAction", async () => {
  const jwt = localStorage.getItem("jwt");
  const response = await axios.get(endpoint + "/orders", {
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

export const deleteOrder = createAsyncThunk("deleteOrder", async (id) => {
  const jwt = localStorage.getItem("jwt");
  await axios.delete(endpoint + "/orders/" + id, {
    headers: {
      Authorization: `Bearer ${jwt.replace(/["]/g, "")}`,
    },
  });
});

export const addOrderAction = createAsyncThunk("addOrder", async (order) => {
  const jwt = localStorage.getItem("jwt");
  const response = await axios.post(
    endpoint + "/orders/",
    {
      data: order,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt.replace(/["]/g, "")}`,
      },
    }
  );
  return { order, id: response.data.data.id };
});

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.fulfilled, (state, action) => {
        return (state = action.payload);
      })
      .addCase(addOrderAction.fulfilled, (state, action) => {
        state.push({ ...action.payload.order, id: action.payload.id });
      });
  },
});

export const { setOrders } = ordersSlice.actions;
