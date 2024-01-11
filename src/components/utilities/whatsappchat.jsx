import React from "react";
import { LogosWhatsappIcon } from "./iconowhatsapp";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import {CSSTransition} from 'react-transition-group'//importacion directa
import { Box } from "@mui/material";

const whatsappButtonCss = {
  position: "fixed",
  bottom: 20,
  right: 20,
  
};

export default function WhatsAppComponent() {
  const [isAnimated, setIsAnimate] = React.useState(true);//controla si la animación está activa o no
  const [anim, setAnim] = React.useState(true);//se usa para forzar la re-ejecución de useEffect
  const [isVisible, setIsVisible] = React.useState(true);
  const [visible, setVisible] = React.useState(true);
  const nodeRef = React.useRef(null)//Tuve un problema con findDOMNode me daba un error con el CSSTransition de react-transition-group "Ese mensaje de advertencia indica que estás usando findDOMNode dentro de un componente que está envuelto en StrictMode" . "findDOMNode permite acceder al nodo DOM subyacente de un componente React. Sin embargo, su uso generalmente se considera un anti-patrón en React, ya que rompe la abstracción del componente." "Dentro de StrictMode, findDOMNode está obsoleto y arrojará esta advertencia."

  const handleClick = () => {//handleClick abre el chat de WhatsApp al hacer click.
    const msg =  `Hola, quisiera más información sobre sus productos.Me llamo: ' ' y mi telefono es: ' '`;
    const url = `https://wa.me/5491128433076?text=${encodeURI(msg)}`; 
    window.open(url)
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 10000);
    return () => clearTimeout(timeout);
  }, [visible]);


  React.useEffect(() => {//useEffect con interval que alterna isAnimated cada 5 segundos. Esto activa/desactiva la animación.
    const interval = setInterval(() => {//desactivar y activar la animacion e un tiempo deterinado
      setIsAnimate((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, [anim]);//La dependencia [anim] hace que useEffect se vuelva a ejecutar cuando cambia anim.

  const toggleAnimation = () => {//toggleAnimation cambia el estado de anim, forzando la re-ejecución de useEffect.
    setAnim(!anim);
    setVisible(!visible)
    setIsVisible(true)
    setIsAnimate(true);//También setea isAnimated a true, reactivando la animación.
  };

  return (
    <Box style={{position:"fixed", zIndex:1000}}>
      <CSSTransition
      nodeRef={nodeRef}
        in={isVisible}
        timeout={{
        enter: 800,
        appear:800,
        exit: 800,
        enterDelay: 900,
        }}
        classNames={'fade'}>
      {isVisible ? (
        <Box ref={nodeRef}
          sx={whatsappButtonCss}
          style={{
            animation: isAnimated ? "pulseWhatsapp 2s infinite" : "none",
            }}// la animación CSS se aplica basado en el valor de isAnimated.
          onClick={handleClick}
        >
          <LogosWhatsappIcon className="whatsapp-button" onClick={toggleAnimation}/>
        </Box> 
      ) : (
        <Box ref={nodeRef}
        width="24px"
        height="60px"
        position="fixed" 
        right={1}
        bottom={20}
        borderRadius="8px 0 0 8px"
        onClick={() => {setIsVisible(true); setVisible(!visible)}}
        style={{
          backgroundColor: "#fff",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
          display:"flex",
          alignItems:"center",
          justiftContent:"center",
        }}>

        <ArrowBackIosNewOutlinedIcon 
        fontSize="small"
       
        />
        </Box>
      )}
      </CSSTransition>
    </Box>
   
  );
}


//Template string: className={`whatsapp-button ${isAnimated ? "animated" : ""}`}

//   style={{
//     animation: isAnimated ? "pulseWhatsapp 2s infinite" : "none",
//   }}


// <Box
// sx={whatsappButtonCss}
// onClick={handleClick}//handleClick abre el chat de WhatsApp al hacer click.
// style={{
//   animation: isAnimated ? "pulseWhatsapp 2s infinite" : "none",
// }}// la animación CSS se aplica basado en el valor de isAnimated.
// >
// <LogosWhatsappIcon
//   className="whatsapp-button"
//   onClick={toggleAnimation}
// />
// </Box>

// {/* <Button
// variant="contained"
// size="small"
//   onClick={() => {setIsVisible(true); setVisible(!visible)}}
//   style={{
//     position: "fixed",
//     bottom: 20,
//     right: 4  
//   }}
// >
//   <ArrowBackIosNewOutlinedIcon fontSize="small"/>
// </Button> */}


//!importante acerca de findDOMNode
// function ComponenteProblematico() {

//   return (
     // Desactivar StrictMode solo aquí
//     <React.Fragment>  

//       <CSSTransition>
//         {/* Uso de findDOMNode */}
//       </CSSTransition>

//     </React.Fragment>
//   )

// }