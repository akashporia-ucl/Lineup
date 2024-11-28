import "./App.css";
import Landing from "./components/Landing";
import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./components/Home";

function App() {
    const { userLoggedIn } = useAuth();
    console.log(userLoggedIn);
    const t = false;
    console.log(t);
    return <div className="App">{userLoggedIn ? <Home /> : <Landing />}</div>;
}

export default function AppWrapper() {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}
