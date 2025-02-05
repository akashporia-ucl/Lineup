import React, { useEffect, useContext } from "react";
import { auth } from "../config/Firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [userLoggedIn, setUserLoggedIn] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [emailUser, setEmailUser] = React.useState(false);
    const [userId, setUserId] = React.useState(null);
    const [emailId, setEmailId] = React.useState(null);

    const initialiseUser = async (user) => {
        if (user) {
            setCurrentUser({ ...user });
            const emailUser = user.providerData.some(
                (provider) => provider.providerId === "password"
            );
            setEmailUser(emailUser);
            setUserLoggedIn(true);
            setUserId(user.uid);
            console.log("User logged in: ", user.uid);
            setEmailId(user.email);
            console.log("User email: ", user.email);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initialiseUser);
        return unsubscribe;
    }, []);

    const value = {
        userLoggedIn,
        emailUser,
        emailId,
        currentUser,
        userId,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
