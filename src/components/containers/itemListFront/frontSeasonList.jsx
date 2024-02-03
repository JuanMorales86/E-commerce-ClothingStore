import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Button, Typography, Box } from '@mui/material';
import { Fade } from "react-awesome-reveal";
// import { Bounce } from 'react-awesome-reveal';
// import MaterialSymbolsSell from '../../utilities/yesiconsolarflameicon';



function ListElementsSeasonFrontCard({data, onItemClick, nameoftheseason}) {
  const [, setIsHovered] = React.useState(true);
  const handleItemClick = (productId) => {//se crea la funcion handleclick que maneja  otra funcion onitemclick y dentro se le pasa la propiedad productId en el boton
    onItemClick(productId)
    }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
    <Box sx={{display:"flex", justifyContent:"space-around", alignItems:"left"}}>

    <Card
    sx={{
      maxWidth: 225,
      boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      overflow: "visible",
      borderRadius: "10px",
      border: "solid 2px black",
      background: "linear-gradient(to bottom, #ffffff, #f1f1f1)",
      transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
      "&:hover": {
        borderColor: "green",
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.3)",
        transform: "scale(1)",
      }
    }}
    className='swiper-cardMS'
  >
    <Box
      sx={{
        overflow: "hidden",
        transition: "transform 0.5s ease-out",
        borderBottom: "2px solid black",
        position: "relative",
        zIndex: 0,
        "&:hover": {
          zIndex: 1,
          // borderBottom: "none",
          // borderRadius: "10px",
          transform: "scale(1)"
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      //className={"cursorIconStyleContainer"}
    >
      {/* Estilo de la imagen */}
      <CardMedia
        component="img"
        alt={data.title}
        onClick={() => handleItemClick(data.id)}
        height={200}
        image={data.thumbnail}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          objectFit: "scale-down",
          borderTopLeftRadius: "7px",
          borderTopRightRadius: "7px",
          width: "100%",
          height: "100%",
          background: "transparent", // Fondo transparente
        }}
      />

      {/* Icono de "Más Vendido" en la esquina superior derecha */}
      {/* {data.discountSelected && (
        <Fade>

        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            fontSize: "1.5rem",
            color: "red",
          }}
        >
          🔥
        </Box>
        </Fade>
      )} */}

      {data.discountSelected !== 0 ? (
        <Fade>

        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            fontSize: "1.5rem",
            color: "red",
          }}
        >
          🔥
        </Box>
        </Fade>
      ) : (
        <Fade cascade damping={1}>
        
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            fontSize: "1.5rem",
          }}
        >
           🏖️
        </Box>
        </Fade>
      )}

      {/* Icono de cursor */}
      {/* {isHovered && (
          <>
        
          {data.discountSelected && (
              <Fade cascade className='cursorIconStyle'>
              <Typography>En Oferta</Typography>
              </Fade>
          )}
        </>
      )} */}
      {/* cursorIconStyle */}

    </Box>
    <CardContent sx={{ maxWidth: "100%" }}>
      <Box sx={{ flexGrow: 1 }}>
        

        {/* Otras propiedades */}
        <Box display={"flex"} width={"100%"} justifyContent={"center"}>
        <Typography
          gutterBottom
          variant="inherit"
          color={"aliceblue"}
          fontWeight={"bold"}
          textAlign={"center"}
          sx={{ display: "block", backgroundColor:"steelblue", borderRadius:"5px", width:"100%" }}
        >
        😎  {nameoftheseason} 🌞 
        </Typography>
        {/* En este caso, el operador ternario se encuentra en {data.discountSelected && (...)}. Esto asegura que el contenido dentro del bloque {...} solo se renderice si data.discountSelected tiene un valor. De lo contrario, ese bloque se omite y solo se mostrará el precio. */}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
          
          
          <span style={{ fontSize: "1.8rem" }}>${data.price}</span>
          {data.discountSelected !==0 ? (
            <span style={{ fontSize: "0.8rem", color: "green" }}>
              {` ${data.discountSelected}% OFF`}
            </span>
          ):(
            <span style={{ fontSize: "0.8rem", color: "green" }}>
              {`Pesos`}
            </span>
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign={"left"}>
          {data.soldquantity ? `Vendidos: ${data.soldquantity}` : `Vendidos: no especificado.`}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign={"left"}>
          {data.discountSelected !==0 ? (
            `Envios Gratis: ${data.addressShipping}`
          ):(
            `Envios: ${data.addressShipping}`
          )}
        </Typography>
        <Typography 
          
          variant="inherit"
          fontWeight={"bold"}
          textAlign={"left"}
          
          sx={{
            maxHeight: "100%",
            maxWidth: "100%",
            height: "3rem",
            maxInlineSize:"auto",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "secondary.dark",
          }}
        >
          {data.title ? `${data.title.charAt(0).toUpperCase() + data.title.slice(1).toLowerCase()}` : 'Titulo no especificado.'}
        </Typography >
      </Box>
    </CardContent>
    <Box
      sx={{
        display: "grid",
        height: "auto",
        placeItems: "center",
        marginTop: 0,
        marginBottom: "0.5rem",
        
      }}
    >
      <CardActions>
        {/* Botones adicionales */}
        <Button
          variant="contained"
          onClick={() => {
            handleItemClick(data.id)}}
          size="small"
        >
          Ir...
        </Button>{" "}
        
      </CardActions>
    </Box>
  </Card>
    </Box>
 
    </>
);
};


export default ListElementsSeasonFrontCard