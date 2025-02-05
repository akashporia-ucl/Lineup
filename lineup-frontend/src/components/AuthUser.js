import React from "react";
import Box from "@mui/material/Box";
import Signup from "./Signup";
import Login from "./Login";
import { useTheme } from "../context/ThemeContext";

const AuthUser = () => {
    const [authMode, setAuthMode] = React.useState("signup");
    const { theme } = useTheme();

    const handleAuthModeChange = () => {
        setAuthMode((prevMode) => (prevMode === "signup" ? "login" : "signup"));
    };

    return (
        <Box className={theme === "light" ? "lightBox" : "darkBox"}>
            {authMode === "signup" ? (
                <Signup handleAuthModeChange={handleAuthModeChange} />
            ) : (
                <Login handleAuthModeChange={handleAuthModeChange} />
            )}
        </Box>
    );
};

export default AuthUser;
