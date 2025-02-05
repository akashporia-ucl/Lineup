import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { signInUser } from "../service/auth";
import Container from "@mui/material/Container";
import { useTheme } from "../context/ThemeContext";

const Login = ({ handleAuthModeChange }) => {
    const { theme } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({
        email: false,
        password: false,
    });
    const [isSigningIn, setIsSigningIn] = useState(false);

    const validateForm = () => {
        const errors = { email: false, password: false };

        if (!email) {
            errors.email = "Email is required";
        } else if (!email.includes("@")) {
            errors.email = "Email must contain '@'";
        }

        if (!password) {
            errors.password = "Password is required";
        }

        setFormErrors(errors);

        return !errors.email && !errors.password;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        console.log("Logging in with", email, password);

        if (!isSigningIn) {
            setIsSigningIn(true);
            const response = await signInUser(email, password);
            console.log("Sign in response: ", response);
        }
    };

    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "50vh",
                    textAlign: "center",
                    padding: 2,
                }}
            >
                <Typography
                    variant="h4"
                    style={{
                        color: theme === "light" ? "#5e17eb" : "#fff",
                        textAlign: "center",
                        marginBottom: "20px",
                    }}
                >
                    Login to LineUp!
                </Typography>
                <form onSubmit={handleLogin}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <TextField
                            fullWidth
                            required
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            error={!!formErrors.email}
                            helperText={formErrors.email || " "}
                            sx={{
                                width: "300px",
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor:
                                            theme === "light"
                                                ? "#5e17eb"
                                                : "#fff",
                                    },
                                    "&:hover fieldset": {
                                        borderColor:
                                            theme === "light"
                                                ? "#5e17eb"
                                                : "#fff",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor:
                                            theme === "light"
                                                ? "#5e17eb"
                                                : "#fff",
                                    },
                                    "& input": {
                                        color:
                                            theme === "light"
                                                ? "#5e17eb"
                                                : "#fff",
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    color:
                                        theme === "light" ? "#5e17eb" : "#fff", // Matches the border color
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color:
                                        theme === "light" ? "#5e17eb" : "#fff", // Keep label color the same when focused
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            required
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            error={!!formErrors.password}
                            helperText={formErrors.password || " "}
                            sx={{
                                width: "300px",
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor:
                                            theme === "light"
                                                ? "#5e17eb"
                                                : "#fff",
                                    },
                                    "&:hover fieldset": {
                                        borderColor:
                                            theme === "light"
                                                ? "#5e17eb"
                                                : "#fff",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor:
                                            theme === "light"
                                                ? "#5e17eb"
                                                : "#fff",
                                    },
                                    "& input": {
                                        color:
                                            theme === "light"
                                                ? "#5e17eb"
                                                : "#fff",
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    color:
                                        theme === "light" ? "#5e17eb" : "#fff", // Matches the border color
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color:
                                        theme === "light" ? "#5e17eb" : "#fff", // Keep label color the same when focused
                                },
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "20px",
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            style={{
                                backgroundColor:
                                    theme === "light" ? "#5e17eb" : "#000",
                                fontWeight: "bold",
                                color: "#fff",
                                border: `2px solid ${
                                    theme === "light" ? "#5e17eb" : "#fff"
                                }`,
                            }}
                        >
                            Login
                        </Button>
                    </Box>
                </form>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "16px",
                    }}
                >
                    <Button
                        onClick={handleAuthModeChange}
                        style={{
                            color: theme === "light" ? "#5e17eb" : "#fff",
                            fontWeight: "bold",
                        }}
                    >
                        New user? Sign-up here
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
