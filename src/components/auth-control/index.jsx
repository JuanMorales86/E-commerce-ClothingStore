import React from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../App";

import { Box } from "@mui/material";
import SignInContent from "../containers/sign-in-auth";

function AuthProvider({ children }) {
  const [isControl, setIsControl] = React.useState(false);

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      console.log("User is not signed in");
      setIsControl(false);
    } else {
      if (!isControl) {
        setIsControl(true);
        console.log("User is signed in");
      }
    }
  });

  return <Box>{isControl ? children : <SignInContent />}</Box>;
}

export default AuthProvider;
