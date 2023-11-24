import React from "react";

//libreria react router dom
import { useNavigate } from "react-router-dom";

//Mis Componentes
import SliderBanners from "../slider-swiper/sliderBanners";
import slidesBanners from '../sdk/slidesBanners.json'
import InfiniteScroller from "../utilities/infinitescroller";


//LibreriaMaterial-UI
import "@fontsource/roboto/400.css"; //Material
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import MostProductSelled from "../utilities/mostproductselled";



function HomePage() {
  const navigate = useNavigate()
  // const [loading,setLoading] = React.useState(false)

  const handleNavigate = (levels) => {
    navigate(`/products/${levels}`);
  };

  const styleH1 = {
    textAlign: "center",
    
    textTransform: "capitalize",
    marginTop: "2rem",
    
   
 }

  return (
    <>
    <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              {/* <Typography variant="h2" align="center" gutterBottom>
                Tu tienda siempre a tu alcance...
              </Typography> */}
              <Typography variant="h4" align="center" marginTop={4} marginBottom={4} textTransform={"capitalize"} gutterBottom>
                Las últimas tendencias de moda para ti...
              </Typography>
              <Box sx={{display:"flex", justifyContent:"center", alignItems:"center",gap:4}}>
                <SliderBanners banners={slidesBanners} onBannerClick={handleNavigate}/>
              </Box>
              <Box sx={{textAlign:"center", marginTop: 8}}>
                  <Button variant="contained" color="primary" size="large" onClick={() => handleNavigate('all')}>
                      Ver todas las prendas
                  </Button>
              </Box>
          </Grid>
        </Grid>
    </Container>

    <Box>
    <Typography variant="h4" style={styleH1}>Marcas</Typography>
    </Box>

    <Box>
      <InfiniteScroller/>
    </Box>

    <MostProductSelled/>
    </>
  )
}

export default HomePage;


