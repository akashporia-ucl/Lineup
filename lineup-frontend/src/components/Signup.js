import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { createUser } from "../service/auth";
import Container from "@mui/material/Container";

const Signup = ({ handleAuthModeChange }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formErrors, setFormErrors] = useState({
        email: false,
        password: false,
        confirmPassword: false,
    });
    const [isRegistering, setIsRegistering] = useState(false);

    const validateForm = () => {
        const errors = {
            email: false,
            password: false,
            confirmPassword: false,
        };

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

        // Check if confirmPassword is empty or doesn't match password
        if (!confirmPassword) {
            errors.confirmPassword = "Confirm Password is required";
        } else if (confirmPassword !== password) {
            errors.confirmPassword = "Passwords do not match";
        }

        setFormErrors(errors);

        // Return true if no errors, false otherwise
        return !errors.email && !errors.password && !errors.confirmPassword;
    };

    const handleNewUser = async (e) => {
        e.preventDefault();

        // Validate the form
        if (!validateForm()) {
            return; // Prevent login submission if there are validation errors
        }

        // Proceed with login (for now just log the data)
        console.log("Creating new user with", email, password);

        if (!isRegistering) {
            setIsRegistering(true);
            const response = await createUser(email, password);
            console.log("Sign in response: ", response);
        }
    };

    return (
        <Container fixed>
            <Box sx={{ bgcolor: "white", height: "50vh" }}>
                <Typography variant="h4" style={{ color: "black" }}>
                    Please sign up to LineUp!
                </Typography>
                <form onSubmit={handleNewUser}>
                    <Box
                        sx={{
                            "& .MuiTextField-root": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                        backgroundColor="white"
                    >
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
                        <TextField
                            required
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Renter your password"
                            error={!!formErrors.confirmPassword} // Check if there is an error for password
                            helperText={formErrors.confirmPassword || ""} // Display error message
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
                        Signup
                    </Button>
                </form>
                <Button onClick={handleAuthModeChange}>
                    Already a user? Please login
                </Button>
            </Box>
        </Container>
    );
};

export default Signup;
