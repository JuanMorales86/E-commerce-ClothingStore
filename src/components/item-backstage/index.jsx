import React, { useState } from "react";
//Libreria react hook form
import { useForm } from "react-hook-form";
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
  Typography
} from "@mui/material";


const originCategory = [
  "sweater",
  "ropainterior",
  "campera",
  "deportiva",
  "vestido",
  "remera",
  "trajesdebaño",
  "camisas",
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
  const { register,getValues} = useForm(); //Declaraciones de estado y funciones. //formState por react-hook-form contiene información sobre el estado del formulario, incluyendo si es válido o no.
  const [modifiedFields, setModiefiedFields] = React.useState({})
  const [isHovered, setIsHovered] = useState(false);
  
  
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
    const formData = getValues();
    if (typeof onClick === "function") {
      onClick(formData, data.id);
      setModiefiedFields({});
      
    }
  };

  const handleChangeText = (e) => {
    //cambio que maneja los inputs que han sido modificados
    setModiefiedFields((prevModifiedFiles) => ({
      ...prevModifiedFiles,[e.target.name]: true //object spread(...prevModifiedFiles)
    }))
  }

  return (
    <Card
      sx={{
        maxWidth: 300,
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
          position:"relative",
          //animacion
          transition: "transform 0.5s ease-out",
          borderBottom: "solid black",
          "&:hover": {
            // zIndex: 0,
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
          height="260"
          image={data.thumbnail}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            objectFit: "fill",
            "&:hover":{
              transform:"scale(1)",
              filter: "blur(1px)",
            }
          }}
        />
             {isHovered && (
          <Typography
            sx={{
              position: "absolute",
              // top: "50%",
              // left: "50%",
              // transform: "translate(-50%, -50%)",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              zIndex: 1,
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "8px",
              borderRadius: "4px",
              pointerEvents: "none",
            }}
          >
            Modificacion de Productos
          </Typography>
        )}
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
            onChange={handleChangeText}
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.thumbnail ? "lightblue" : "transparent" }}
          />
          <TextField
            label="Titulo"
            variant="outlined"
            placeholder="Titulo..."
            size="small"
            {...register("title", { required: false })}
            defaultValue={data.title}
            onChange={handleChangeText}
            inputProps={{ maxLength:35 }}
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.title ? "lightblue" : "transparent" }}
          />
             <TextField
            label="Descripcion"
            variant="outlined"
            placeholder="Una Breve Descripcion..."
            size="small"
            {...register("description", { required: false })}
            defaultValue={data.description}
            onChange={handleChangeText}
            inputProps={{ maxLength:80 }}
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.description ? "lightblue" : "transparent" }}
          />
          <TextField
            label="Id Personalizable"
            variant="outlined"
            placeholder="Id Personalizable..."
            size="small"
            {...register("customid", { required: false })}
            defaultValue={data.customid}
            onChange={handleChangeText}
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.customid ? "lightblue" : "transparent" }}
          />
          <TextField
            label="Condicion"
            variant="outlined"
            placeholder="Condicion..."
            size="small"
            {...register("condition", { required: false })}
            defaultValue={data.condition || ''}
            onChange={handleChangeText}
            select
            fullWidth
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.condition ? "lightblue" : "transparent" }}
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
            onChange={handleChangeText}
            inputProps={{ type: "number" }}
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.price ? "lightblue" : "transparent" }}
          />
          <TextField
            label="Categoria"
            variant="outlined"
            placeholder="Tipo de categoria del producto..."
            size="small"
            {...register("categoryType", { required: false })}
            defaultValue={data.categoryType}
            onChange={handleChangeText}
            select
            fullWidth
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.categoryType ? "lightblue" : "transparent" }}
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
            onChange={handleChangeText}
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.stock ? "lightblue" : "transparent" }}
          />
          <TextField
            label="Marca"
            variant="outlined"
            placeholder="Marca..."
            size="small"
            {...register("brand", { required: false })}
            defaultValue={data.brand}
            onChange={handleChangeText}
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.brand ? "lightblue" : "transparent" }}
          />
          <TextField
            label="Direccion Delimitada"
            variant="outlined"
            placeholder="Hasta donde se puede entregar..."
            size="small"
            {...register("addressShipping", { required: false })}
            defaultValue={data.addressShipping}
            onChange={handleChangeText}
            select
            fullWidth
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.addressShipping ? "lightblue" : "transparent" }}
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
            onChange={handleChangeText}
            select
            fullWidth
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.addressPlace ? "lightblue" : "transparent" }}
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
