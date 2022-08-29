import {
    Routes,
    Route,
    BrowserRouter as AppRouter,
} from "react-router-dom";
import { useSelector } from "react-redux";

import LayoutRoute from "./components/Layout";
import Dashboard from './routes/Dashboard';
import Login from "./routes/Login";
import Employees from "./routes/Employees";

export default function Router() {
    const user = useSelector((state) => state.user);

    return (
        <AppRouter>
            <Routes>
                {user.logged ?
                    <>
                        <Route path="/" element={<LayoutRoute><Dashboard /></LayoutRoute>} />
                        <Route path="/Dashboard" element={<LayoutRoute><Dashboard /></LayoutRoute>} />
                        <Route path="/Employees" element={<LayoutRoute><Employees /></LayoutRoute>} />
                        <Route path="/*" element={<LayoutRoute><Dashboard /></LayoutRoute>} />
                    </>
                    :
                    <Route path="/*" element={<Login />} />
                }
            </Routes>
        </AppRouter>
    )
}