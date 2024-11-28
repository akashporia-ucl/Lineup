import { auth } from "../config/Firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

export const createUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        return userCredential;
    } catch (error) {
        return error;
    }
};

export const signInUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        return userCredential;
    } catch (error) {
        return error;
    }
};

export const signInUserWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result;
    } catch (error) {
        return error;
    }
};

export const signOutUser = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        return error;
    }
};
