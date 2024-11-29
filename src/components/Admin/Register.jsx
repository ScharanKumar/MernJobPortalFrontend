import {
    Button,
    CircularProgress,
    Container,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
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

        if (!name || !username || !password) {
            setError("Name, Username and password are required");
            setIsLoading(false);
            return;
        }

        const apiEndpoint = `${process.env.REACT_APP_API_URL}/admin/create`;
        console.log("API",apiEndpoint)

        try {
            const response = await axios.post(apiEndpoint, {name, username, password });
            setSuccess(response.data.message);
            
            localStorage.setItem("token", response.data.token);
            setName("")
            setUsername("");
            setPassword("");
            navigate("/login")
        } catch (error) {
            console.error("Register error:", error);
            if (error.response) {
                setError(error.response.data.message || "An error occurred during Register");
            } else if (error.request) {
                setError("No response received from the server. Please try again.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    

    return (
        <Container component="main" maxWidth="xs" sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'100%'}}>
            <>
            <Paper elevation={6} sx={{ padding: 4, margin: 2 }}>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    Welcome to JobPortal
                </Typography>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    Register
                </Typography>
                
                <form onSubmit={handleLogin}>
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                        {isLoading ? <CircularProgress size={24} /> : "Register"}
                    </Button>
                </form>
                <Typography variant="body2" color="textSecondary" align="center" mt={4}>
                    &copy; {new Date().getFullYear()} SuperTeacher. All rights reserved.
                </Typography>
            </Paper>
            </>
        </Container>
    );
};

export default Register;