import React from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { AppContex } from "../../Providers/contex-provider";
import CustomTheme from "../Custom-Styles/themes";
import emailjs from "@emailjs/browser";
const {paragraphs} = CustomTheme;

function Contacto({ setShowFixedImage, autoplayEnabled, setShowComponent }) {
  const refForm = React.useRef(); //es un objeto
  const { notifyToast } = React.useContext(AppContex);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 
  //Mostrar por props Componente Whastapp
  React.useEffect(() => {
    setShowComponent(true)
    return () => 
    setShowComponent(false)
  },[setShowComponent])

  //Para lograr la imagen fija
  React.useEffect(() => {//se monta
    setShowFixedImage(true); 
    return () => {//se desmonta
      setShowFixedImage(false); 
    };},[setShowFixedImage, autoplayEnabled]);

  const onSubmit = async () => {
    const serviceId = "React_Sal_&_Pimienta";
    const templateId = "template_dybd6hl"; //my React Sal & Pimienta Contact Page
    const apikey = process.env.REACT_APP_EMAILJS_KEY;
    

    //formData toma los datos de los textfield gracias al hook form
    try {
      await emailjs
        .sendForm(serviceId, templateId, refForm.current, apikey)
        .then((result) => {
          notifyToast(result.text);
          notifyToast("Formulario enviado exitosamente.");
        })
        .catch((error) => {
          console.error("Error al enviar el formulario:", error.text);
          notifyToast("Error al enviar el formulario.");
        });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      notifyToast("Error al enviar el formulario.");
    }

    reset();
  };

  return (
    <Box
    className={"in-container"}
     
      >
        <div  >
      <Typography 
      sx={paragraphs.titlesParagraphs}
      >
        Dejanos tus Inquietudes aqui:
      </Typography>
        </div>
      <Paper
        sx={{
          p: 2,
          maxWidth: ["70%" , 400  ],
          width: "600px",
          margin: [ "auto" ,"1rem auto"],
          backgroundColor: "#f0f0f0",
        }}
      >
        <form ref={refForm} onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "1rem",
            
            }}
          >
            <TextField
              label="Nombre y Apellido"
              placeholder="Nombre y Apellido..."
              variant="outlined"
              name="user_name"
              {...register("user_name", {
                required: true,
                validate: {
                  minLength: (value) => value.split("").length >= 4,
                },
              })}
              helperText={
                errors.user_name
                  ? errors.user_name.type === "required"
                    ? "Campo requerido"
                    : "Minimo 4 palabras"
                  : ""
              }
              error={Boolean(errors.user_name)}
              sx={{
                "& input": {
                  borderColor: errors.user_name ? "red" : "",
                  backgroundColor: errors.user_name ? "#ffeeee" : "",
                },
              }}
              fullWidth
            />

            <TextField
              label="Email"
              placeholder="Email..."
              variant="outlined"
              name="user_email"
              {...register("user_email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
              helperText={
                errors.user_email
                  ? "Correo electrónico inválido: algo@gmail.com"
                  : ""
              }
              error={Boolean(errors.user_email)}
              sx={{
                // Estilo para resaltar el campo cuando hay un error
                "& input": {
                  borderColor: errors.user_email ? "red" : "", // Cambiar el borde a rojo si hay error
                  backgroundColor: errors.user_email ? "#ffeeee" : "", // Cambiar el fondo a rojo claro si hay error
                },
              }}
            />

            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              label="Consultas"
              placeholder="Deja aqui tu Consulta..."
              variant="outlined"
              name="message"
              {...register("message", {
                required: true,
                validate: {
                  minLength: (value) => value.split("").length >= 5,
                },
              })}
              helperText={
                errors.message
                  ? errors.message.type === "required"
                    ? "Campo requerido"
                    : "Minimo 5 palabras"
                  : ""
              }
              error={Boolean(errors.message)}
              sx={{
                "& textarea": {
                  borderColor: errors.message ? "red" : "",
                  backgroundColor: errors.message ? "#ffeeee" : "",
                },
              }}
            />
          </Box>

          <Box sx={{ margin: "1rem auto", textAlign: "center" }}>
            <Button variant="contained" type="submit">
              Enviar
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default Contacto;
/* */