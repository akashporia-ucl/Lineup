import React from "react";
import AppBar from "@mui/material/AppBar";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Typography, IconButton } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "../context/ThemeContext";
import Link from "@mui/material/Link";
const Footer = () => {
    const { theme } = useTheme();
    const linkedinURL = process.env.REACT_APP_LINKEDIN;
    const githubURL = process.env.REACT_APP_GITHUB;
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
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontWeight: "bold",
                            color: theme === "light" ? "#fff" : "#fff",
                        }}
                    >
                        Akash Poria &copy; {new Date().getFullYear()} {"\u00A0"}
                        | {"\u00A0"}L I N E {"\u00A0"} U P |{"\u00A0"}All Rights
                        Reserved.
                    </Typography>
                </Box>

                {/* Right Section: Login/Logout and Theme Toggle */}
                <Box display="flex" alignItems="center">
                    <Link
                        href={githubURL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <IconButton>
                            <GitHubIcon sx={{ color: "white" }} />
                        </IconButton>
                    </Link>
                    <Link
                        href={linkedinURL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <IconButton>
                            <LinkedInIcon sx={{ color: "white" }} />
                        </IconButton>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
