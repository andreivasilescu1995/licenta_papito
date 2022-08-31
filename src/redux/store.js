import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";
import { employeesSlice } from "./slices/employees";
import { snackbarSlice } from "./slices/snackbar";
import { modalsSlice } from "./slices/modals";
import { calendarSlice } from "./slices/calendar";
import { clientsSlice } from "./slices/client";
import { ordersSlice } from "./slices/order";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    employees: employeesSlice.reducer,
    snackbar: snackbarSlice.reducer,
    modals: modalsSlice.reducer,
    calendar: calendarSlice.reducer,
    clients: clientsSlice.reducer,
    orders: ordersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
