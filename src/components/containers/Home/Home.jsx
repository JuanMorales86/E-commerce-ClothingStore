import React from "react";

//libreria react router dom
import { useNavigate } from "react-router-dom";

//Mis Componentes


//LibreriaMaterial-UI
import "@fontsource/roboto/400.css"; //Material
import { Container, Grid, Typography, Button, Box } from "@mui/material";



function HomePage() {
  const navigate = useNavigate()

  const handleNavego = () => {
    navigate('/products/:levels')
  }

  return (
    <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h2" align="center" gutterBottom>
                Tu tienda de ropa siempe a tu alcance...
              </Typography>
              <Typography variant="h5" align="center" gutterBottom>
                Las últimas tendencias de moda para ti
              </Typography>
              <Box sx={{display:"flex", justifyContent:"center", alignItems:"center",gap:4}}>
                <img src="/images/home_page.jpg"/>
                <img src="/images/home_page.jpg"/>
                <img src="/images/home_page.jpg"/>
              </Box>
              <Button variant="contained" color="primary" size="large" onClick={handleNavego}>
                  Ver todas las prendas
              </Button>
          </Grid>
        </Grid>
    </Container>
  )
}

export default HomePage;
