import {
    Routes,
    Route,
    BrowserRouter as AppRouter,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Home from './routes/Home';
import Login from "./routes/Login";

export default function Router() {
    const user = useSelector((state) => state.user);

    return (
        <AppRouter>
            <Routes>
                {user.logged ?
                    <Route path="/" element={<Home />} />
                    :
                    <Route path="/*" element={<Login />} />
                }
            </Routes>
        </AppRouter>
    )
}