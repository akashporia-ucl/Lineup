import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Signup from "./Signup";
import Login from "./Login";

const Landing = () => {
    const [authMode, setAuthMode] = React.useState("signup");

    const handleAuthModeChange = () => {
        setAuthMode((prevMode) => (prevMode === "signup" ? "login" : "signup"));
    };

    return (
        <Box
            sx={{
                display: "flex", // Use flexbox for centering
                justifyContent: "center", // Center horizontally
                alignItems: "center", // Center vertically
                height: "100vh", // Full height of the viewport
                width: "100vw", // Full width of the viewport
                backgroundColor: "#030303", // Set the background color of the Box to black
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: "97%",
                    height: "92.7%",
                    padding: 2,
                    backgroundColor: "#000",
                    color: "white",
                }}
            >
                <div className="container">
                    <Typography variant="h1" className="heading" align="center">
                        Welcome to LineUp!
                    </Typography>
                    <div>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            className="paragraph-text"
                            align="center"
                            style={{
                                marginTop: "20px",
                                color: "#fefefe",
                                fontSize: "1rem",
                            }}
                        >
                            LineUp is a simple to-do list application built with
                            React and Material UI for the frontend. The backend
                            is powered by Firebase for real-time database
                            management and Spring Boot (Java) for handling API
                            logic and server-side operations. Users can add,
                            delete, and view their to-do list items with
                            seamless integration between the frontend and
                            backend.
                        </Typography>
                    </div>
                    <Box>
                        {authMode === "signup" ? (
                            <Signup
                                handleAuthModeChange={handleAuthModeChange}
                            />
                        ) : (
                            <Login
                                handleAuthModeChange={handleAuthModeChange}
                            />
                        )}
                    </Box>
                </div>
            </Paper>
        </Box>
    );
};

export default Landing;
