import React from "react";
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
  const [_, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 210,
        boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
        overflow: "visible",
        borderRadius: "10px",
        border: "solid 2px black",
        background:
          "linear-gradient(to bottom, #ffffff, #f1f1f1)" /*de blanco a grisoscuro */,
        transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover":{
          borderColor: "magenta",
          boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.3)",
          transform: "scale(1.05)",
        }
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          //animacion
          transition: "transform 0.5s ease-out", //cover, contain, fill,scale-down
          borderBottom: "2px solid black",
          "&:hover":{
            zIndex: 1,
            borderBottom: "none",
            borderRadius: "10px",
            transform: "scale(1.6)",
          },
        }}
      >
        {/* para el estilo de la imagen */}

        <CardMedia
          component="img"
          alt={data.title}
          height="200"
          image={data.thumbnail}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            objectFit: "fill",
            borderTopLeftRadius:"6px",
            borderTopRightRadius:"6px",
            width:"100%",
            height:"200px"
          }} //* para el estilo de la imagen dentro de la card
        />
      </Box>
      <CardContent sx={{maxWidth:"100%"}}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h7"
            component="div"
            fontWeight={"bold"}
            textAlign={"center"}
            sx={{
              maxHeight: "2.5rem",
              maxWidth: "100%",
              height:"3rem",//para que no se corrar el titulo y desfase las cards
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
            Codigo: {data.customid.toUpperCase()}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="h7"
            sx={{ display: "block" }}
          >
            Condición: {data.condition}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Precio: {data.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Vendidos: {data.sold_quantity} Und.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Envios: {data.addressShipping}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Zona Vendedor: {data.addressPlace}
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
