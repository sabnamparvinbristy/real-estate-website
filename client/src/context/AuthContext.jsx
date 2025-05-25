

export {createContext} from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = use



    return(
        <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
    )
}