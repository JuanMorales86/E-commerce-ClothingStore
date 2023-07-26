import React, { useState } from "react";
//Libreria react hook form
import { useForm, Controller } from "react-hook-form";
//Libreria Material
import {
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";
import { Category } from "@mui/icons-material";

const originCategory = [
  "sweater",
  "ropainterior",
  "campera",
  "deportiva",
  "vestido",
  "bath",
];

const dataListPlacesCABA = [
  "Agronomía",
  "Almagro",
  "Balvanera",
  "Barracas",
  "Belgrano",
  "Boedo",
  "Caballito",
  "Chacarita",
  "Coghlan",
  "Colegiales",
  "Constitución",
  "Flores",
  "Floresta",
  "La Boca",
  "La Paternal",
  "Liniers",
  "Mataderos",
  "Monte Castro",
  "Montserrat",
  "Nueva Pompeya",
  "Nuñez",
  "Palermo",
  "Parque Avellaneda",
  "Parque Chacabuco",
  "Parque Chas",
  "Parque Patricios",
  "Puerto Madero",
  "Recoleta",
  "Retiro",
  "Saavedra",
  "San Cristóbal",
  "San Nicolás",
  "San Telmo",
  "Versalles",
  "Villa Crespo",
  "Villa Devoto",
  "Villa General Mitre",
  "Villa Lugano",
  "Villa Luro",
  "Villa Ortúzar",
  "Villa Pueyrredón",
  "Villa Real",
  "Villa Riachuelo",
  "Villa Santa Rita",
  "Villa Soldati",
  "Villa Urquiza",
  "Villa del Parque",
  "Vélez Sarsfield",
];

const dataListPlacesOutside = ["P. Buenos Aires", "Caba"];

const conditions = ["Nuevo", "Usado", "Detalles"];

//My item card Principal
function CardBackStage({ data, onClick, onDelete, createButtonText, showDeleteButton }) {
  const { register,getValues, reset, control, formState: { errors, isValid }} = useForm(); //Declaraciones de estado y funciones. //formState por react-hook-form contiene información sobre el estado del formulario, incluyendo si es válido o no.

  const [_, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    //Para la imagen
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    //Para la imagen
    setIsHovered(false);
  };

  const handleClickM = () => {
    //click que maneja el form y obtine los valores
    if (typeof onClick === "function") {
      const formData = getValues();
      console.log(formData);
      onClick(formData, data.id);
      reset();
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
        overflow: "visible",
        borderRadius: "10px",
        border: "solid 2px black",
        background: "linear-gradient(to bottom, #ffffff, #f1f1f1)",
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          //animacion
          transition: "transform 0.5s ease-out",
          borderBottom: "solid black",
          "&:hover": {
            zIndex: 0,
            border: "solid black 2px",
            borderStyle: "double",
            objectFit: "cover",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          },
        }}
      >
        <CardMedia
          component="img"
          alt={data.title}
          height="140"
          image={data.thumbnail}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            objectFit: "contain",
            borderRadius: "10px",
          }}
        />
      </Box>
      
      <CardContent>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            flexFlow: "column wrap",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            label="Imagen"
            variant="outlined"
            placeholder="Imagen..."
            size="small"
            {...register("thumbnail", { required: false })}
            defaultValue={data.thumbnail}
            style={{ width: "250px" }}
          />
          <TextField
            label="Titulo"
            variant="outlined"
            placeholder="Titulo..."
            size="small"
            {...register("title", { required: false })}
            defaultValue={data.title}
            inputProps={{ maxLength:35 }}
            style={{ width: "250px" }}
          />
             <TextField
            label="Descripcion"
            variant="outlined"
            placeholder="Una Breve Descripcion..."
            size="small"
            {...register("description", { required: false })}
            defaultValue={data.description}
            inputProps={{ maxLength:80 }}
            style={{ width: "250px" }}
          />
          <TextField
            label="Id Personalizable"
            variant="outlined"
            placeholder="Id Personalizable..."
            size="small"
            {...register("customid", { required: false })}
            defaultValue={data.customid}
            style={{ width: "250px" }}
          />
          <TextField
            label="Condicion"
            variant="outlined"
            placeholder="Condicion..."
            size="small"
            {...register("condition", { required: false })}
            defaultValue={data.condition || ''}
            select
            fullWidth
            style={{ width: "250px" }}
          >
            {conditions?.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            label="Precio $$"
            variant="outlined"
            placeholder="Precio..."
            size="small"
            {...register("price", { required: false, 
            pattern: {
              value: /^[0-9]+$/,//Solo Numeros
              message: "Ingrese solo números"
            }
            })}
            defaultValue={data.price}
            inputProps={{ type: "number" }}
            style={{ width: "250px" }}
          />
          <TextField
            label="Categoria"
            variant="outlined"
            placeholder="Tipo de categoria del producto..."
            size="small"
            {...register("categoryType", { required: false })}
            defaultValue={data.categoryType}
            select
            fullWidth
            style={{ width: "250px" }}
          >
            {originCategory.map((category) => {
              return (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            label="Stock"
            variant="outlined"
            placeholder="Cantidad en el Deposito..."
            size="small"
            {...register("stock", { required: false })}
            defaultValue={data.stock}
            style={{ width: "250px" }}
          />
          <TextField
            label="Marca"
            variant="outlined"
            placeholder="Marca..."
            size="small"
            {...register("brand", { required: false })}
            defaultValue={data.brand}
            style={{ width: "250px" }}
          />
          <TextField
            label="Direccion Delimitada"
            variant="outlined"
            placeholder="Hasta donde se puede entregar..."
            size="small"
            {...register("addressShipping", { required: false })}
            defaultValue={data.addressShipping}
            select
            fullWidth
            style={{ width: "250px" }}
          >
            {dataListPlacesOutside?.map((zones) => {
              return (
                <MenuItem key={zones} value={zones}>
                  {zones}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            label="Direccion del Vendedor"
            variant="outlined"
            placeholder="Direccion del Vendedor..."
            size="small"
            {...register("addressPlace", { required: false })}
            defaultValue={data.addressPlace}
            select
            fullWidth
            style={{ width: "250px" }}
          >
            {dataListPlacesCABA?.map((zones) => {
              return (
                <MenuItem key={zones} value={zones}>
                  {zones}
                </MenuItem>
              );
            })}
          </TextField>
        </Box>
      </CardContent>
      
      {/* Botones */}
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
        
          <Button variant="contained" onClick={handleClickM} size="small">
          {createButtonText ? createButtonText : "Modificar"}
          {/*cambio el texto segun la funcion*/}
          </Button>
          {/* en el evento click se llama a la funcion obItemCLick que recibe una prop */}
          {showDeleteButton && (
          <Button variant="contained" onClick={onDelete} size="small">
            Eliminar
          </Button>
          )}
        </CardActions>
      </Box>
    </Card>
  );
}

export default CardBackStage;

//El getValues() es una función proporcionada por el hook useForm de react-hook-form, y se utiliza para obtener los valores de los campos del formulario registrados con el hook. Cuando utilizas el hook register para registrar un TextField, este se vincula automáticamente con el getValues(). De esta manera, cuando llamas a getValues(), obtendrás un objeto con los valores actuales de todos los campos registrados.
