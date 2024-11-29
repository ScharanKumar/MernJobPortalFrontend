import {
    Button,
    CircularProgress,
    Container,
    Paper,
    TextField,
    Typography, Box
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        if (!username || !password) {
            setError("Username and password are required");
            setIsLoading(false);
            return;
        }

        const apiEndpoint = `${process.env.REACT_APP_API_URL}/admin/login`;

        try {
            const response = await axios.post(apiEndpoint, {username, password });
            setSuccess(response.data.message);
            
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("userRole", "admin");
            setUsername("");
            setPassword("");
            navigate("/admin-dashboard")
        } catch (error) {
            console.error("Login error:", error);
            if (error.response) {
                setError(error.response.data.message || "An error occurred during login");
            } else if (error.request) {
                setError("No response received from the server. Please try again.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserLoginButtonClick = () => {
        navigate('/')
    }
    

    return (
        <Container component="main">
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                <Button onClick={handleUserLoginButtonClick}>Go to User login page</Button>
            </Box>
            <Container maxWidth="xs" sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'100%'}}>
            <Paper elevation={6} sx={{ padding: 4, margin: 2 }}>
                
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    Welcome to JobPortal
                </Typography>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    Admin Login
                </Typography>
                
                <form onSubmit={handleLogin}>
                
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" variant="body2" align="center" gutterBottom>
                            {error}
                        </Typography>
                    )}
                    {success && (
                        <Typography color="success" variant="body2" align="center" gutterBottom>
                            {success}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : "Login"}
                    </Button>
                </form>
                <Typography variant="body2" color="textSecondary" align="center" mt={4}>
                    &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
                </Typography>
            </Paper>
            </Container>
        </Container>
    );
};

export default Login;