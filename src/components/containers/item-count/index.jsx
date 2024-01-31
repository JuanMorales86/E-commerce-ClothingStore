import React, { useState } from "react";
//React Router
import { useNavigate } from "react-router-dom";

//Contex
import { AppContex } from "../../../Providers/contex-provider";

//Libreria Material
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox"; //Minus icon
import AddBoxIcon from "@mui/icons-material/AddBox"; //Add icon
import { Button, Typography, Box, Tooltip } from "@mui/material";
import { SignedIn, SignedOut } from "@clerk/clerk-react";//useSignIn
// import { auth } from "../../../App";
// import { onAuthStateChanged } from "firebase/auth";
import UseAuth from "../../../Providers/auth-useauth/useAuth";

function ItemCount({ stock, addHandleToTrolley }) {
  const { notifyToastContainer, notifyToastAdd } = React.useContext(AppContex);
  const [score, setScore] = useState(1);
  const [showButton, setShowButton] = React.useState(false)
  const {user} = UseAuth()  
  //const { signedIn } = useClerk()
  // const { signedIn } = useSignIn(); console.log('Logeo',signedIn);
  const {toggleModal} = React.useContext(AppContex)

  // React.useEffect(() => {
  //     const getUser = onAuthStateChanged(auth, (user) => {
  //       if(!user){
  //         setShowButton(false)
  //       } else {
  //         setShowButton(true)
  //       }
  //     })
  //     return getUser
  //   })

  React.useEffect(() => {
    if(!user){
      setShowButton(false)
    } else {
      setShowButton(true)
    }
  },[user])

  React.useEffect(() => {
    //un estado para remover y montar la clase highlight-animation
    if (boxRef.current) {
      boxRef.current.classList.add("highlight-animation");
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      animationTimeoutRef.current = setTimeout(() => {
        if (boxRef.current) {
          boxRef.current.classList.remove("highlight-animation");
        }
      }, 1000); // Se Ajusta el tiempo a la duración de la animación
    }
  }, [score]);
 
  const getBackGroundColor = () => {
    const colorMap = {
      1: "lightblue",
      2: "lightgreen",
      3: "lightpink",
      4: "lightyellow",
      5: "lavender",
      6: "lightcoral",
      7: "lightsalmon",
      8: "lightseagreen",
      9: "lightsteelblue",
      10: "lightcyan",
      11: "lightgoldenrodyellow",
      12: "lightgray",
      13: "lightpink",
      14: "lightskyblue",
    };

    return colorMap[score] || "red";
  };

  const backColor = getBackGroundColor();

  //Animacion en el score
  const boxRef = React.useRef(null);
  const animationTimeoutRef = React.useRef(score);


  const navigate = useNavigate();

  const addHandleCount = () => {
    if (score < stock) {
      setScore(score + 1);
    }
  };

  const minusHandleCount = () => {
    if (score <= 1) {
      return;
    }
    setScore(score - 1);
  };

  //Parte de cart
  const handleTrollyCount = () => {
    addHandleToTrolley(score, stock);
    setScore(1); //resetaer el score despues de tomar los datos en 1
    notifyToastAdd("🛒 Producto Agregado al Carrito");
  };




  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button variant="text" size="small" onClick={minusHandleCount}>
            <IndeterminateCheckBoxIcon fontSize="small" />
          </Button>
          <Box
            ref={boxRef}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "30px",
              height: "auto",
              borderRadius: "50%",
              backgroundColor: backColor,
              transition: "background-color 0.3 ease",
            }}
          >
            <Typography
              color={score < 15 ? "black" : "whitesmoke"}
              fontSize={"1rem"}
              fontWeight={"bold"}
            >
              {score}
            </Typography>
          </Box>
          <Button variant="text" size="small" onClick={addHandleCount}>
            <AddBoxIcon fontSize="small" />
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1rem",
            marginBottom: "1rem",
            gap: 1,
          }}
        >
          <SignedIn>
            {showButton &&
            <Button
              variant="contained"
              size="small"
              onClick={handleTrollyCount}
            >
              Agregar
            </Button>
            }
          </SignedIn>

          <SignedOut>
            <Tooltip title="Login de Clientes">
            <Button
              variant="contained"
              size="small"
              onClick={toggleModal}
            >
              Logearse
            </Button>
            </Tooltip>
          </SignedOut>

          {showButton && 
              <Button
              variant="contained"
              size="small"
              onClick={handleTrollyCount}
            >
              Agregar
            </Button>
          }

          <Button
            variant="contained"
            size="small"
            onClick={() => navigate("/products/all")}
          >
            Volver
          </Button>
          {notifyToastContainer()}
        </Box>
      </Box>
    </>
  );
}

export default ItemCount;
