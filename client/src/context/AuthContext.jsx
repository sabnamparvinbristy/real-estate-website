
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        // Safely parse the user data from localStorage
        try {
            const userData = localStorage.getItem("user");
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error("Failed to parse user data from localStorage", error);
            return null;
        }
    });


    const updateUser =(data)=>{
        setCurrentUser(data);
    };


    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])
    return (
        <AuthContext.Provider value={{ currentUser,updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};