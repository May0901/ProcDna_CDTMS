import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography
} from '@mui/material';
import { useState } from 'react';
import { useAuthStore } from '../store';
import { authenticateUser } from '../services/api';
import { useNavigate } from 'react-router';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setUser = useAuthStore(state => state.setUser);
    const setAuthState = useAuthStore(state => state.setAuthState);


    // Submit action
    const submitCredential = async () => {
        const result = await authenticateUser({
            email,
            password
        });

        if (!result.success) {
            // Inform user via Dialog/Alerts
            return;
        }
        // Store token in localstorage
        localStorage.setItem("token", result.token);

        // Store user in global store
        setUser(result.user);
        setAuthState(true);
        // Navigate to dashboard page
        navigate("/dashboard", { replace: true })
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container maxWidth="sm">
                <Card
                    elevation={4}
                    sx={{
                        borderRadius: 4,
                        padding: 2
                    }}
                >
                    <CardContent>
                        <Box textAlign="center" sx={{
                            marginBottom: "1rem"
                        }}>
                            <Typography variant="h4" fontWeight="bold">
                                Clinical Trial Data Management
                            </Typography>
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3
                            }}
                        >
                            <TextField
                                value={email}
                                onChange={(evt) => setEmail(evt.target.value)}
                                label="Email"
                                type="email"
                                fullWidth
                                variant="filled"
                            />
                            <TextField
                                value={password}
                                onChange={(evt) => setPassword(evt.target.value)}
                                label="Password"
                                type="password"
                                fullWidth
                                variant="filled"
                            />
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                onClick={submitCredential}
                            >
                                Sign in
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}

export default LoginPage;