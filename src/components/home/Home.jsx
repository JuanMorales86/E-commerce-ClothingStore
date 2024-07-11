import React from "react";


//libreria react router dom
import { useNavigate } from "react-router-dom";

//Mis Componentes
import SliderBanners from "../slider-swiper/sliderBanners";
import slidesBanners from "../sdk/slidesBanners.json";
import InfiniteScroller from "../utilities/infinitescroller";
import TextEffectLoop from "../utilities/texteffectloop";
//import TextEffectLoop from "../utilities/textloopeffectfade";

//LibreriaMaterial-UI
import "@fontsource/roboto/400.css"; //Material
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import SliderMostSelledCards from "../slider-swiper/sliderMostSelledCards";
import SliderSeasons from "../slider-swiper/sliderSeasons";
// import IfiniteScrollerCard from "../utilities/infinitescrollerCards";

function HomePage({ setShowComponent }) {
  const navigate = useNavigate();
  const handleNavigate = (levels) => {
    navigate(`/products/${levels}`);
  };

  const text = "Renueva tu armario y encuentra tu look ideal entre nuestra gran variedad de Indumentaria";

  //Mostrar por props Componente Whastapp
  React.useEffect(() => {
    setShowComponent(true);
    return () => setShowComponent(false);
  }, [setShowComponent]);
  

  const especialstyleH1 = {
    fontSize: { xs: "2.7rem", md: "3rem" },
    width: {
      xs: "100%",
      md: "100%",
    },
    fontWeight: "500",
    fontFamily: "letters.fontM",
    // margin: "0.5rem 0 1rem 0",
    boder: "2px solid black",
    lineHeight: 1,
    textAlign: {xs: "center", md: "left"},
    display: "flex",

    
  };
  const styleH2 = {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "500",
    fontFamily: "letters.fontM",
    margin: "2rem 0 1rem 0",
  };

  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={0.1}
          justifyContent="center"
          alignItems="center"
          margin={"1rem 0"}
        >
          <Grid item xs={12}>
            <Box
              sx={{
                display: { xs: "column", md: "flex" },
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: 0, md: 5 },
              }}
            >
              <Typography
                className="degradado-texto"
                sx={especialstyleH1}
                marginTop={4}
                marginBottom={4}
                gutterBottom
                
              >
               

                <TextEffectLoop text={text} speed={30} timeout={5000} speedFadeOut={50} fadeOutDelay={30000}/>
          
              </Typography>
              <SliderBanners
                banners={slidesBanners}
                onBannerClick={handleNavigate}
              />
            </Box>
            <Box sx={{ textAlign: "center", marginTop: 8 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => handleNavigate("all")}
              >
                Ver todas las prendas
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      
      <Box className="sliderBoxHomeMS">
        <SliderSeasons />
      </Box>

      <Box className="sliderBoxHomeMS">
        <SliderMostSelledCards />
      </Box>
      
      <Box style={{ textAlign: "center", margin:"2rem 0 1rem 0"}}>
        <Typography className="degradado-texto" style={styleH2}>
          Marcas
        </Typography>
        <InfiniteScroller />
      </Box>
    </>
  );
}

export default HomePage;
