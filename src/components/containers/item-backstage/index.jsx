import React from "react";
import { useForm } from "react-hook-form";
// eslint-disable-next-line
import {doc, collection, onSnapshot, getFirestore } from 'firebase/firestore';


import {//Libreria Material
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  TextField,
  MenuItem,
  Typography,
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

const dataspecialproduct = [true, false]

//My item card Principal
function CardBackStage({ data, onClick, onDelete, createButtonText, showDeleteButton, showResetButton }) {
  const { id, title, thumbnail, description , price, color, size, brand, condition, stock, customid, categoryType, addressShipping,addressPlace, specialproduct, discountSelected } = data //Destructuracion (es mas ordenado para saber que es lo que estoy pasando por props)
  const { register,getValues, reset, setValue} = useForm(); //Declaraciones de estado y funciones. //formState por react-hook-form contiene información sobre el estado del formulario, incluyendo si es válido o no.
  const [modifiedFields, setModiefiedFields] = React.useState({}) //para detectar cambios en los campos y agregarle un color 
  const [isHovered, setIsHovered] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState(size || "") // Inicializa con el valor de data.size o en blanco ('')
  const [errors, ] = React.useState({})


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
    const formData = getValues();//se utiliza para obtener los valores actuales de todos los campos en un formulario que está siendo gestionado por la biblioteca react-hook-form. Esta línea se usa en el contexto de tu función handleClickM para obtener los valores de los campos del formulario antes de realizar alguna operación.

    if(typeof formData.discountSelected === 'undefined'){
      // Si 'discountSelected' es undefined, establece un valor predeterminado, por ejemplo, 0.
      formData.discountSelected = 0
    }

    if(typeof formData.specialproduct === 'string'){
      // Si 'discountSelected' es undefined, establece un valor predeterminado, por ejemplo, 0.
      formData.specialproduct = true
    }

    // Verifica si 'specialproduct' está definido y es 'false', luego establece 'discountSelected' en 0
    if(formData.specialproduct === false) {
      formData.specialproduct = false;
      formData.discountSelected = 0;
    }

    if (typeof onClick === "function") {
      onClick(formData, id);
      setModiefiedFields({});
    }
  };

  const handleResetFields = (data) => {
    console.log('Botón de Limpiar presionado');
        reset({
          thumbnail: "",
          title: "",
          description: "",
          customid: "",
          price: "",
          brand: "",
          color: "",
          stock: "",
          condition: "",
          categoryType: "",
          size: "",
          addressShipping: "",
          addressPlace: "",
          specialproduct: "",
          discountSelected: "",
        });

        setValue("condition", ""); // Cambiado a cadena vacía
        setValue("categoryType", ""); // Cambiado a cadena vacía
        setValue("size", ""); // Cambiado a cadena vacía
        setValue("addressShipping", ""); // Cambiado a cadena vacía
        setValue("addressPlace", ""); // Cambiado a cadena vacía
        setValue("specialproduct", ""); // Cambiado a cadena vacía
        setValue("discountSelected", ""); // Cambiado a cadena vacía
  };

 // const handleChangeText = (e) => {
    //funcion de cambio que maneja los inputs que han sido modificados
    //setModiefiedFields((prevModifiedFiles) => ({
    //  ...prevModifiedFiles,[e.target.name]: true //object spread(...prevModifiedFiles)
   // }))
  //}

  const handleChangeText = (e) => {
    const fieldName = e.target.name
    const newValue = e.target.value

    setModiefiedFields((prevModifiedFiles) => ({
      ...prevModifiedFiles, 
      [fieldName] : isNaN(newValue) ? newValue : parseFloat(newValue) || 0
    }))
  }

  //  const handleChangeText = (e) => {
  //   const fieldName = e.target.name
  //   const newValue = e.target.value
    
  //   const parsedValue = isNaN(newValue) ? null : parseFloat(newValue)

  //   if(parsedValue !== null) {
  //     setModiefiedFields((prevModifiedFiles) => ({
  //       ...prevModifiedFiles,
  //       [fieldName]: parsedValue || 0
  //     }))

  //     setErrors((prevErrors) => ({...prevErrors, [fieldName]: ''}))
  //   } else {
  //     setErrors((prevErrors) => ({...prevErrors, [fieldName]: 'Ingrese solo numeros'}))
    
  // }
  // }



  return (
    <Card
      sx={{
        maxWidth: 300,
        boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
        overflow: "visible",
        borderRadius: "6px",
        border: "solid 1px black",
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
          alt={title}
          height="260"
          image={thumbnail}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            objectFit: "fill",
            borderRadius: "6px",
            borderBottomRightRadius:"0",
            borderBottomLeftRadius:"0",
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
            defaultValue={thumbnail}
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
            defaultValue={title}
            onChange={handleChangeText}
            inputProps={{ maxLength:35 }}
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.title ? "lightblue" : "transparent" }}
          />
          <TextField
            label="Descripción"
            variant="outlined"
            placeholder="Una Breve Descripción..."
            size="small"
            {...register("description", { required: true, 
              pattern: {
                value: /^[0-9]+$/,//Solo Numeros
                message: "Ingrese solo números"
              }
            })}
            defaultValue={description}
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
            helperText={'Minimo 5 a 10 caracteres'}
            {...register("customid", { 
              required: true,
              pattern: /^[0-9]+$/,
              minLength: 5, // Mínimo de 5 caracteres
              maxLength: 10, // Máximo de 10 caracteres
            })}
            defaultValue={customid}
            onChange={(e) => {
              const uppercaseValue = e.target.value.toUpperCase() //Se crea una nueva variable llamada uppercaseValue que almacena el resultado de convertir el valor del campo de texto a mayúsculas
              e.target.value = uppercaseValue //se asigna este nuevo valor de vuelta al campo de texto.
              handleChangeText(e)}}
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.customid ? "lightblue" : "transparent" }}
          />
          <TextField
            label="Precio $$"
            variant="outlined"
            placeholder="Precio..."
            size="small"
            {...register("price", { required: false })}
            defaultValue={price}
            onChange={handleChangeText}
            inputProps={{ type: "number" }}
            error={Boolean(errors.price)}
            helperText={errors.price}
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.price ? "lightblue" : "transparent" }}
          />
          <TextField
            label="Marca"
            variant="outlined"
            placeholder="Marca..."
            size="small"
            {...register("brand", { required: false })}
            defaultValue={brand}
            onChange={handleChangeText}
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.brand ? "lightblue" : "transparent" }}
          />
          <TextField
            label="Color"
            variant="outlined"
            placeholder="Color..."
            size="small"
            {...register("color", { required: false })}
            defaultValue={color}
            onChange={handleChangeText}
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.color ? "lightblue" : "transparent" }}
          />
          <TextField
            label="Stock"
            variant="outlined"
            placeholder="Cantidad en el Deposito..."
            size="small"
            {...register("stock", { required: false, 
              pattern: {
                value: /^[0-9]+$/,//Solo Numeros
                message: "Ingrese solo números"
              }
              })}
            inputProps={{ 
              type: "text",// Cambiado a "text" en lugar de "number"
            }}
            defaultValue={stock}
            onChange={(e) => {
              const input = e.target.value;
              // Utiliza una expresión regular para eliminar caracteres no numéricos
              const watchinput = input.replace(/[^0-9]/g, '');
              // Actualiza el valor en el campo
              e.target.value = watchinput;
              handleChangeText(e);
            }}
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.stock ? "lightblue" : "transparent" }}
          />
          <TextField
            label="Condición"
            variant="outlined"
            placeholder="Condición..."
            size="small"
            {...register("condition", { required: false })}
            defaultValue={condition || ''}
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
            label="Categoría"
            variant="outlined"
            placeholder="Tipo de categoría del producto..."
            size="small"
            {...register("categoryType", { required: true })}
            defaultValue={categoryType}
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
            label="Talle"
            variant="outlined"
            placeholder="Que talle eliges?..."
            size="small"
            {...register("size", { required: true })}
            value={selectedSize}
            onChange={(e) => {
              setSelectedSize(e.target.value)
              handleChangeText(e)  
            }}
            select
            fullWidth
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.size ? "lightblue" : "transparent" }}
          >
            {['xs','s','m','l','xl','xxl'].map((sizes) => {//array de porcentajes
            
              return (
                <MenuItem key={sizes} value={sizes}>
                {sizes}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            label="Dirección Delimitada"
            variant="outlined"
            placeholder="Hasta donde se puede entregar..."
            size="small"
            {...register("addressShipping", { required: false })}
            defaultValue={addressShipping}
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
            label="Dirección del Vendedor"
            variant="outlined"
            placeholder="Dirección del Vendedor..."
            size="small"
            {...register("addressPlace", { required: false })}
            defaultValue={addressPlace}
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

          <TextField
            label="Aplicar Descuentos"
            variant="outlined"
            placeholder="Tendra Descuento?..."
            size="small"
            {...register("specialproduct", { required: false })}
            defaultValue={specialproduct}
            onChange={handleChangeText}
            select
            fullWidth
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.specialproduct ? "lightblue" : "transparent" }}
          >
            {Object.entries(dataspecialproduct).map(([key, value]) => {//En este caso, Object.entries(dataspecialproduct) te proporciona pares [index, value] donde index representa el índice único de cada elemento y value es el valor booleano (true o false) que indica si el producto tiene descuento.
               const label = value ? 'Tiene descuento' : 'No tiene descuento';//si tiene descuento sigue siendo boolean es true si no tiene descuento es false seria la conversion en el frente de cliente
              return (
                <MenuItem key={key} value={value === true}>
                  {label}
                </MenuItem>
              );
            })}
          </TextField>

          <TextField
            label="Porcentaje de descuento"
            variant="outlined"
            placeholder="Tendra Descuento?..."
            size="small"
            {...register("discountSelected", { required: false })}
            // value={isdiscount}
            defaultValue={discountSelected || ''}
            onChange={handleChangeText}
            select
            fullWidth
            style={{ width: "250px" }}
            sx={{ backgroundColor: modifiedFields.discountSelected ? "lightblue" : "transparent" }}
            disabled={specialproduct === false}
          >
            {[0,2,3,4,5,10,12,14,16,15,20].map((discount) => {//array de porcentajes
            
              return (
                <MenuItem key={discount} value={parseInt(discount)}>
                {`${discount}%`}
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

            {/* Botón de restablecimiento */}
            {showResetButton && (
            <Button variant="contained" onClick={() => {console.log('Boton presionado'); handleResetFields();}} size="small">
              Limpiar
            </Button>
          )}

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