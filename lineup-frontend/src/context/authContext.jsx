import React from "react";

const AuthContext = React.createContext();

const AuthProvider = () => {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [userLoggedIn, setUserLoggedIn] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
};

export default AuthProvider;
