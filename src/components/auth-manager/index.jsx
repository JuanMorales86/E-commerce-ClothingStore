import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../App"; // Importa la instancia de autenticación de Firebase

export const AuthContext = createContext();

const AuthManager = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthManager;