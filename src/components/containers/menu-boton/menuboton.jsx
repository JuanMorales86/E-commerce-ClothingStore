import React from "react";
import { Box, Button } from "@mui/material";

function ButtonMenu({ handleStatusChange, setSelectedOrder, orderSe }) {
  const [isOpen, setIsopen] = React.useState(false);
  
  const handleClick = (order) => {
    setSelectedOrder(order)
  }

  const options = [
    {
      id: 1,
      name: "Pendiente",
      status: "Pendiente",
    },
    {
      id: 2,
      name: "Enviada",
      status: "Enviada",
    },
    {
      id: 3,
      name: "Entregada",
      status: "Entregada",
    },
    {
      id: 4,
      name: "Devuelta",
      status: "Devuelta",
    },
    {
      id: 5,
      name: "Cancelada",
      status: "Cancelada",
    },
  ];


  return (
    <Box className={"dropdown"} margin={"0.75rem 0"}>
      <Button
      sx={{backgroundColor:"rgb(240, 229, 231)"}}
        onClick={() => {
          setIsopen(!isOpen);
          handleClick(orderSe)
        }}
      
        className="dropbtn"
      >
        Cambiar Estado
      </Button>

      {isOpen && (
        <ul className="dropdown-content"
        onMouseLeave={() => {
          setIsopen(false);
        }}>
          {options.map((option) => (
            <Button
            sx={{width:"100%"}}
              key={option.id}
              onClick={() => {
                handleStatusChange(option.status);
                setIsopen(false)
                
              }}
            >
              {option.name}
            </Button>
          ))}
        </ul>
      )}
    </Box>
  );
}

export default ButtonMenu;
