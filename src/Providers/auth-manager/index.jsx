import React, { createContext } from "react";
//import { auth } from "../../App"; // Importa la instancia de autenticación de Firebase
import UseAuth from "../auth-useauth/useAuth";

export const AuthContext = createContext();

const AuthManager = ({ children }) => {
  const {user} = UseAuth()
  

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthManager;