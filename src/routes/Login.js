import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { Stack } from "@mui/material";

import { loginApi } from "../redux/slices/user";

export default function Login() {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        dispatch(loginApi({ username, password }));
    };

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(#e66465, #9198e5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Paper id="paper-blur" sx={{ minWidth: 300 }}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <AccountCircleIcon sx={{ width: '100px', height: '100px' }} style={{ margin: 10 }} />
                    <form>
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <input className="login-input" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                            <input className="login-input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </Box>
                    </form>
                    <Stack direction="column" width="100%" alignItems="center">
                        <Button onClick={login} variant="contained" style={{ width: '85%', fontSize: 13, backgroundColor: '#485863', textTransform: 'capitalize', marginBottom: 10 }}>Login</Button>
                        <Button variant="text" style={{ width: '85%', fontSize: 13, color: '#000', textTransform: 'capitalize', marginBottom: 10 }}>Register</Button>
                    </Stack>
                </Box>
            </Paper>
        </div >
    )
} 