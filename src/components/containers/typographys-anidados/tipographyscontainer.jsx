import { Typography, Box } from "@mui/material";
import React from "react";

//Componente para typography dentor del card del modals(funcion ModalSlide)
function RenderItemDetails({ items, calcTotalQuantityPerPrice }) {
  return (
    <Box className="cardModalsTypographyContainer">
      <Typography className="cardModalsTypographyTitle" sx={{ fontWeight: "bold" }}>
        {items.producto}</Typography>
      <Typography
        sx={{
          fontSize: ".90rem",
        }}
        color="textSecondary"
      >
        Precio: ${items.pricePerUnit} Pesos
      </Typography>
      <Typography sx={{ fontSize: ".90rem" }} color="textSecondary">
        Cantidad: {items.quantity}
      </Typography>
      <Typography sx={{ fontSize: ".90rem" }} color="textSecondary">
        Descuento: {items.discountSelected} %
      </Typography>
      {/* <Typography variant="body2" component="p">
                    Sin iva: {calcTotalGlobalPay()}
                  </Typography> */}
      <Typography
        sx={{
          fontSize: ".90rem",
        }}
        color="textSecondary"
      >
        Total Uni/s: ${calcTotalQuantityPerPrice(items)} Pesos
        {/* calcTotalQuantityPerPrice(item) */}
      </Typography>
    </Box>
  );
}

export default RenderItemDetails;




