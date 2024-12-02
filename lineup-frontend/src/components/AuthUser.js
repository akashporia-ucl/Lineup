import React from "react";
import Box from "@mui/material/Box";
import Signup from "./Signup";
import Login from "./Login";

const AuthUser = () => {
    const [authMode, setAuthMode] = React.useState("signup");

    const handleAuthModeChange = () => {
        setAuthMode((prevMode) => (prevMode === "signup" ? "login" : "signup"));
    };
    return (
        <Box>
            {authMode === "signup" ? (
                <Signup handleAuthModeChange={handleAuthModeChange} />
            ) : (
                <Login handleAuthModeChange={handleAuthModeChange} />
            )}
        </Box>
    );
};

export default AuthUser;
