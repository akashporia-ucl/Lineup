import "./App.css";
import Landing from "./components/Landing";
import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./components/Home";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "./context/ThemeContext";
import { useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";

function App() {
    const { userLoggedIn } = useAuth();
    const { theme } = useTheme();
    return (
        <div className="App">
            <Paper
                key={theme}
                className={
                    theme === "light"
                        ? "lightPaper welcome"
                        : "darkPaper welcome"
                }
                elevation={3}
            >
                <Navbar />
                {userLoggedIn ? <Home /> : <Landing />}
            </Paper>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ThemeProvider>
    );
}
