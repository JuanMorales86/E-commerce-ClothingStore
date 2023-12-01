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
import SliderMostSelledCards from "../slider-swiper/sliderMostSelledCards";
// import IfiniteScrollerCard from "../utilities/infinitescrollerCards";




function HomePage() {
  const navigate = useNavigate()
  // const [loading,setLoading] = React.useState(false)

  const handleNavigate = (levels) => {
    navigate(`/products/${levels}`);
  };

  const styleH1 = {
    textAlign: "center",
    fontSize: "1.8rem",
    textTransform: "capitalize",
    fontWeight: "400",
    fontFamily: "letters.fontM",
    margin: "2rem 0 1rem 0"
 }

  return (
    <>
    <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center" alignItems="center" >
            <Grid item xs={12}>
              <Typography   style={styleH1} align="center" marginTop={4} marginBottom={4} textTransform={"capitalize"} gutterBottom >
                Inspira tu estilo con nuestras prendas...
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


   
    
   
    <Box className="sliderBoxHomeMS" >
    <SliderMostSelledCards/>
    </Box>
    <Box>
    <Typography  style={styleH1}>Marcas</Typography>
      <InfiniteScroller/>
    </Box>
    
    </>
  )
}

export default HomePage;


