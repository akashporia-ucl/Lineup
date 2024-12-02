import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { signInUser } from "../service/auth";
import Container from "@mui/material/Container";

const Login = ({ handleAuthModeChange }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({
        email: false,
        password: false,
    });
    const [isSigningIn, setIsSigningIn] = useState(false);

    const validateForm = () => {
        const errors = { email: false, password: false };

        // Check if email is empty or doesn't contain '@'
        if (!email) {
            errors.email = "Email is required";
        } else if (!email.includes("@")) {
            errors.email = "Email must contain '@'";
        }

        // Check if password is empty
        if (!password) {
            errors.password = "Password is required";
        }

        setFormErrors(errors);

        // Return true if no errors, false otherwise
        return !errors.email && !errors.password;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validate the form
        if (!validateForm()) {
            return; // Prevent login submission if there are validation errors
        }

        // Proceed with login (for now just log the data)
        console.log("Logging in with", email, password);

        if (!isSigningIn) {
            setIsSigningIn(true);
            const response = await signInUser(email, password);
            console.log("Sign in response: ", response);
        }
    };

    return (
        <Container>
            <Typography variant="h4" style={{ color: "black" }}>
                Welcome back to LineUp!
            </Typography>
            <form onSubmit={handleLogin}>
                <Box
                    sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {/* Email Field */}
                    <TextField
                        required
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        error={!!formErrors.email} // Check if there is an error for email
                        helperText={formErrors.email || ""} // Display error message
                        InputLabelProps={{
                            style: {
                                color: "black", // Always black, even when focused or empty
                            },
                        }}
                        InputProps={{
                            style: {
                                color: "black", // Always black text color
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "black", // Set border color to black
                                },
                                "&:hover fieldset": {
                                    borderColor: "black", // Keep border black on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "black", // Keep border black when focused
                                },
                            },
                            // Add red color for error message
                            "& .MuiFormHelperText-root": {
                                color: "red", // Red color for helper text (error message)
                            },
                        }}
                    />

                    {/* Password Field */}
                    <TextField
                        required
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        error={!!formErrors.password} // Check if there is an error for password
                        helperText={formErrors.password || ""} // Display error message
                        InputLabelProps={{
                            style: {
                                color: "black", // Always black, even when focused or empty
                            },
                        }}
                        InputProps={{
                            style: {
                                color: "black", // Always black text color
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "black", // Set border color to black
                                },
                                "&:hover fieldset": {
                                    borderColor: "black", // Keep border black on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "black", // Keep border black when focused
                                },
                            },
                            // Add red color for error message
                            "& .MuiFormHelperText-root": {
                                color: "red", // Red color for helper text (error message)
                            },
                        }}
                    />
                </Box>

                {/* Login Button */}
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    style={{
                        color: "#fff",
                        borderColor: "#000",
                        fontWeight: "bold",
                        marginTop: "5px",
                        backgroundColor: "#000",
                    }}
                >
                    Login
                </Button>
            </form>
            <Button onClick={handleAuthModeChange}>
                New user? Signup here
            </Button>
        </Container>
    );
};

export default Login;
