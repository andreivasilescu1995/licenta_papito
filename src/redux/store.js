import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";
import { employeesSlice } from "./slices/employees";
import { snackbarSlice } from "./slices/snackbar";
import { modalsSlice } from "./slices/modals";
import { calendarSlice } from "./slices/calendar";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        employees: employeesSlice.reducer,
        snackbar: snackbarSlice.reducer,
        modals: modalsSlice.reducer,
        calendar: calendarSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});