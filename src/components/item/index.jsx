import React, { useState } from "react";
import {
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material"; //Libreria Material

//My item card Principal
function CardItems({ data, onItemClick }) {
  //se agrega las props
  // console.log(data)

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
        overflow: "visible",
        borderRadius: "10px",
        border: "solid 2px black",
        background:
          "linear-gradient(to bottom, #ffffff, #f1f1f1)" /*de blanco a grisoscuro */,
      }}
    >
      <Box
        sx={{
          // borderRadius: "10%",
          overflow: "hidden",
          //animacion
          transition: "transform 0.5s ease-out", //cover, contain, fill,scale-down
          borderBottom: "2px solid black",
          "&:hover": {
            zIndex: 1,
            borderBottom: "none",
            transform: "scale(1.6)",
          },
        }}
      >
        {/* para el estilo de la imagen */}

        <CardMedia
          component="img"
          alt={data.title}
          height="140"
          image={data.imagee}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            objectFit: "contain",
            borderRadius: "10px",
          }} //* para el estilo de la imagen entro de la card
        />
      </Box>
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h7"
            component="div"
            fontWeight={"bold"}
            textAlign={"center"}
            flexWrap={"wrap"}
            sx={{
              maxHeight: "4rem",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "secondary.dark",
            }}
          >
            {data.title.toUpperCase()}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="h7"
            sx={{ display: "block" }}
          >
            Codigo: {data.id}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="h7"
            sx={{ display: "block" }}
          >
            Tipo: {data.type}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Precio: {data.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock: {data.stock}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Envios: {data.shipping}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Zona Vendedor: {data.place}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Marca: {data.brand}
          </Typography>
        </Box>
      </CardContent>
      <Box
        sx={{
          display: "grid",
          height: "auto",
          placeItems: "center",
          marginBottom: "1rem",
        }}
      >
        {/* los pongo al fondo del card con margin top */}
        <CardActions>
          <Button
            variant="contained"
            onClick={() => onItemClick(data.id)}
            size="small"
          >
            Ver mas...
          </Button>{" "}
          {/* en el evento click se llama a la funcion obItemCLick que recibe una prop */}
          <Button variant="contained" size="small">
            Favoritos
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default CardItems;
