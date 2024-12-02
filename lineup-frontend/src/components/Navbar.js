import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { signOutUser } from "../service/auth";
import AuthUser from "./AuthUser";
import "./Navbar.css";

const Navbar = () => {
    const { userLoggedIn } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [openModal, setOpenModal] = React.useState(false);

    const handleModelOpen = () => {
        setOpenModal(true);
    };

    const handleModelClose = () => {
        setOpenModal(false);
    };

    return (
        <AppBar
            position="static"
            className={theme === "light" ? "lightNav navBar" : "darkNav navBar"}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {/* Left Section: Logo and LineUp */}
                <Box display="flex" alignItems="center">
                    <Avatar
                        alt="LineUp"
                        src="/Lineup logo.png"
                        sx={{ marginRight: 1 }}
                    />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontWeight: "bold",
                            color: theme === "light" ? "#fff" : "#fff",
                        }}
                    >
                        {"\u00A0"}
                        {"\u00A0"}L I N E {"\u00A0"} U P
                    </Typography>
                </Box>

                {/* Right Section: Login/Logout and Theme Toggle */}
                <Box display="flex" alignItems="center">
                    {userLoggedIn ? (
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={signOutUser}
                            sx={{
                                marginRight: 2,
                                borderColor: "white",
                                color: "white",
                            }}
                        >
                            Log Out
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="outlined"
                                color="inherit"
                                onClick={handleModelOpen}
                                sx={{
                                    marginRight: 2,
                                    borderColor: "white",
                                    color: "white",
                                }}
                            >
                                Sign Up
                            </Button>
                            <Modal open={openModal} onClose={handleModelClose}>
                                <AuthUser />
                            </Modal>
                        </>
                    )}
                    <IconButton onClick={toggleTheme}>
                        {theme === "light" ? (
                            <DarkModeIcon sx={{ color: "white" }} />
                        ) : (
                            <LightModeIcon sx={{ color: "white" }} />
                        )}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
