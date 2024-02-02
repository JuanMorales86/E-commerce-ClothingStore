import { Typography } from "@mui/material";
import React from "react";

function RenderItemDetails({ items, calcTotalQuantityPerPrice }) {
  return (
    <>
      <Typography sx={{ fontWeight: "bold" }}>
        {items.producto}</Typography>
      <Typography
        sx={{
          fontSize: ".90rem",
          textAlign: ["center", "self-start"],
        }}
        color="textSecondary"
      >
        Valor Unid: ${items.pricePerUnit} Pesos
      </Typography>
      <Typography sx={{ fontSize: ".90rem" }} color="textSecondary">
        Vas a llevar: {items.quantity}
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
          textAlign: ["center", "self-start"],
        }}
        color="textSecondary"
      >
        Total P. Unidad: ${calcTotalQuantityPerPrice(items)} Pesos
        {/* calcTotalQuantityPerPrice(item) */}
      </Typography>
    </>
  );
}

export default RenderItemDetails;




