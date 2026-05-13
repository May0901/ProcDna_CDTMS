import { AppBar, Dialog, DialogActions, DialogContent, DialogTitle, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink, Outlet, useNavigate } from "react-router";
import Add from "@mui/icons-material/Add";
import NewClinicalTrial from "../components/NewClinicalTrial";
import CreateClinicalTrial from "../components/CreateClinicalTrial";
import { useAuthStore } from "../store";

const AppLayout = () => {
    const authState = useAuthStore(state => state.authState);
    const setAuthState = useAuthStore(state => state.setAuthState);

    const setUser = useAuthStore(state => state.setUser);
    const navigate = useNavigate()

    const signout = () => {
        setUser(null);
        setAuthState(false);
        localStorage.removeItem("token");
        navigate("/signin")
    }

    return <Box sx={{
        padding: "1rem",
        height: '100vh',
        minHeight: "100vh"
    }}>
        <AppBar  >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>
                    Clinical Trial Data Management Platform
                </Typography>
                <Box sx={{ display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
                    {
                        authState && <Button onClick={signout} sx={{ color: "#fff", backgroundColor: "#212121" }} variant="outlined">
                            Signout
                        </Button>
                    }
                </Box>
            </Toolbar>
        </AppBar>
        <Box sx={{ height: "100%", marginTop: "100px" }}>
            <Outlet />
        </Box>
    </Box >
}

export default AppLayout;