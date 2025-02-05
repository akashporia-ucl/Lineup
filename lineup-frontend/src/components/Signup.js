import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { createUser } from "../service/auth";
import Container from "@mui/material/Container";
import { useTheme } from "../context/ThemeContext";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

const Signup = ({ handleAuthModeChange }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signUpError, setSignUpError] = useState(false);
    const [errorCode, setErrorCode] = useState(null);
    const [formErrors, setFormErrors] = useState({
        email: false,
        password: false,
        confirmPassword: false,
    });
    const [isRegistering, setIsRegistering] = useState(false);
    const [hasLowercase, setHasLowercase] = useState(false);
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);
    const [hasMinLength, setHasMinLength] = useState(false);
    const validateForm = () => {
        const errors = {
            email: false,
            password: false,
            confirmPassword: false,
        };

        if (!email) {
            errors.email = "Email is required";
        } else if (!email.includes("@")) {
            errors.email = "Email must contain '@'";
        }

        if (!password) {
            errors.password = "Password is required";
        }

        if (!confirmPassword) {
            errors.confirmPassword = "Confirm Password is required";
        } else if (confirmPassword !== password) {
            errors.confirmPassword = "Passwords do not match";
        }

        if (
            !hasLowercase ||
            !hasUppercase ||
            !hasNumber ||
            !hasSpecialChar ||
            !hasMinLength
        ) {
            errors.password = "Password does not meet requirements";
        }

        setFormErrors(errors);
        return !errors.email && !errors.password && !errors.confirmPassword;
    };

    const handlePasswordChange = (e) => {
        const input = e.target.value;
        setPassword(input);

        // Check for lowercase letters
        setHasLowercase(/[a-z]/.test(input));
        // Optionally, you can add other validations like uppercase, numbers, etc.
        setHasUppercase(/[A-Z]/.test(input));
        setHasNumber(/[0-9]/.test(input));
        setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(input));
        setHasMinLength(input.length >= 8);
    };

    const handleNewUser = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        console.log("Creating new user with", email, password);

        if (!isRegistering) {
            try {
                setIsRegistering(true);
                const response = await createUser(email, password);
                console.log("Sign up response: ", response);
                // Handle success case (optional)
            } catch (error) {
                setSignUpError(true);
                const statusCode = error.response?.status || null;
                setErrorCode(error.code);

                console.log("Error", error);
                console.log("Error status", statusCode);
                console.log("Error message", error.code);
            } finally {
                // Reset isRegistering whether signup succeeds or fails
                setIsRegistering(false);
            }
        }
    };

    const { theme } = useTheme();

    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "40vh",
                    maxHeight: "70vh",
                    textAlign: "center",
                    padding: 2,
                }}
            >
                <Typography
                    variant="h4"
                    id="heading"
                    style={{
                        color: theme === "light" ? "#5e17eb" : "#fff",
                        textAlign: "center",
                        marginBottom: "20px",
                    }}
                >
                    Sign up to LineUp!
                </Typography>
                <form onSubmit={handleNewUser}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.5,
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
                            helperText={formErrors.email || " "} // Non-breaking space for consistent height
                            sx={{
                                width: "300px", // Fixed width
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
                                "& .MuiFormHelperText-root": {
                                    minHeight: "1.5em", // Consistent height for helper text
                                    marginTop: "4px", // Add spacing between input and helperText
                                    color: formErrors.email
                                        ? "red"
                                        : theme === "light"
                                        ? "#5e17eb"
                                        : "#fff",
                                },
                                "& .MuiInputLabel-root": {
                                    color:
                                        theme === "light" ? "#5e17eb" : "#fff",
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color:
                                        theme === "light" ? "#5e17eb" : "#fff",
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            required
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter your password"
                            error={!!formErrors.password}
                            helperText={formErrors.password || " "} // Non-breaking space for consistent height
                            sx={{
                                width: "300px", // Fixed width
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
                                "& .MuiFormHelperText-root": {
                                    minHeight: "1.5em", // Consistent height for helper text
                                    marginTop: "4px", // Add spacing between input and helperText
                                    color: formErrors.password
                                        ? "red"
                                        : theme === "light"
                                        ? "#5e17eb"
                                        : "#fff",
                                },
                                "& .MuiInputLabel-root": {
                                    color:
                                        theme === "light" ? "#5e17eb" : "#fff",
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color:
                                        theme === "light" ? "#5e17eb" : "#fff",
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            required
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            error={!!formErrors.confirmPassword}
                            helperText={formErrors.confirmPassword || " "} // Non-breaking space for consistent height
                            sx={{
                                width: "300px", // Fixed width
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
                                "& .MuiFormHelperText-root": {
                                    minHeight: "1.5em", // Consistent height for helper text
                                    marginTop: "4px", // Add spacing between input and helperText
                                    color: formErrors.confirmPassword
                                        ? "red"
                                        : theme === "light"
                                        ? "#5e17eb"
                                        : "#fff",
                                },
                                "& .MuiInputLabel-root": {
                                    color:
                                        theme === "light" ? "#5e17eb" : "#fff",
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color:
                                        theme === "light" ? "#5e17eb" : "#fff",
                                },
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: 1,
                            padding: 2,
                            border: `1px solid ${
                                theme === "light" ? "#5e17eb" : "#fff"
                            }`,
                            borderRadius: "8px",
                            fontSize: "12px",
                        }}
                    >
                        {hasLowercase ? (
                            <Typography
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color:
                                        theme === "light" ? "#5e17eb" : "#fff",
                                    fontSize: "12px",
                                }}
                            >
                                <DoneIcon
                                    sx={{
                                        fontSize: "12px",
                                        marginRight: "4px",
                                    }}
                                />
                                Password contains lowercase
                            </Typography>
                        ) : (
                            <Typography
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#acabb0", // Gray when validation is false
                                    fontSize: "12px",
                                }}
                            >
                                <CloseIcon
                                    sx={{
                                        fontSize: "12px",
                                        marginRight: "4px",
                                    }}
                                />
                                Password doesn't contain lowercase
                            </Typography>
                        )}
                        {hasUppercase ? (
                            <Typography
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color:
                                        theme === "light" ? "#5e17eb" : "#fff",
                                    fontSize: "12px",
                                }}
                            >
                                <DoneIcon
                                    sx={{
                                        fontSize: "12px",
                                        marginRight: "4px",
                                    }}
                                />
                                Password contains uppercase
                            </Typography>
                        ) : (
                            <Typography
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#acabb0",
                                    fontSize: "12px",
                                }}
                            >
                                <CloseIcon
                                    sx={{
                                        fontSize: "12px",
                                        marginRight: "4px",
                                    }}
                                />
                                Password doesn't contain uppercase
                            </Typography>
                        )}
                        {hasNumber ? (
                            <Typography
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color:
                                        theme === "light" ? "#5e17eb" : "#fff",
                                    fontSize: "12px",
                                }}
                            >
                                <DoneIcon
                                    sx={{
                                        fontSize: "12px",
                                        marginRight: "4px",
                                    }}
                                />
                                Password contains number
                            </Typography>
                        ) : (
                            <Typography
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#acabb0",
                                    fontSize: "12px",
                                }}
                            >
                                <CloseIcon
                                    sx={{
                                        fontSize: "12px",
                                        marginRight: "4px",
                                    }}
                                />
                                Password doesn't contain number
                            </Typography>
                        )}
                        {hasSpecialChar ? (
                            <Typography
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color:
                                        theme === "light" ? "#5e17eb" : "#fff",
                                    fontSize: "12px",
                                }}
                            >
                                <DoneIcon
                                    sx={{
                                        fontSize: "12px",
                                        marginRight: "4px",
                                    }}
                                />
                                Password contains special character
                            </Typography>
                        ) : (
                            <Typography
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#acabb0",
                                    fontSize: "12px",
                                }}
                            >
                                <CloseIcon
                                    sx={{
                                        fontSize: "12px",
                                        marginRight: "4px",
                                    }}
                                />
                                Password doesn't contain special character
                            </Typography>
                        )}
                        {hasMinLength ? (
                            <Typography
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color:
                                        theme === "light" ? "#5e17eb" : "#fff",
                                    fontSize: "12px",
                                }}
                            >
                                <DoneIcon
                                    sx={{
                                        fontSize: "12px",
                                        marginRight: "4px",
                                    }}
                                />
                                Password is of minimum length
                            </Typography>
                        ) : (
                            <Typography
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#acabb0",
                                    fontSize: "12px",
                                }}
                            >
                                <CloseIcon
                                    sx={{
                                        fontSize: "12px",
                                        marginRight: "4px",
                                    }}
                                />
                                Password is not of minimum length
                            </Typography>
                        )}
                    </Box>

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
                            marginTop: "20px",
                        }}
                    >
                        Sign Up
                    </Button>
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
                        Already have an account? Log in here
                    </Button>
                    {signUpError &&
                    errorCode === "auth/email-already-in-use" ? (
                        <Alert
                            variant="filled"
                            severity="error"
                            style={{
                                maxHeight: "10px",
                            }}
                        >
                            User already exists
                        </Alert>
                    ) : null}
                    {signUpError &&
                    errorCode !== "auth/email-already-in-use" ? (
                        <Alert
                            variant="filled"
                            severity="error"
                            style={{
                                maxHeight: "10px",
                            }}
                        >
                            Some error occured, please try again.
                        </Alert>
                    ) : null}
                </Box>
            </Box>
        </Container>
    );
};

export default Signup;
