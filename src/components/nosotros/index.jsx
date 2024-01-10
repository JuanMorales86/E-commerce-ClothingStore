import React from "react";
// import ConstructionPage from '../utilities/constructionpage'
import { Box, CardMedia, Typography } from "@mui/material";
import CustomTheme from "../Custom-Styles/themes";
import bannersAboutUs from "../sdk/bannersAboutUs.json";
const { paragraphs, imagesAboutUs } = CustomTheme;



function Nosotros({setShowComponent}) {

  //Mostrar por props Componente Whastapp
  React.useEffect(() => {
    setShowComponent(true)
    return () => 
    setShowComponent(false)
  },[setShowComponent])

  return (
    <Box className="in-container">
      <Box className="in-content">
        <Box className="in-content-know-us" >
          <Typography
            style={paragraphs.titlesParagraphs}
            className="in-content-titles"
          >
            Conocenos
          </Typography>

          <Box className="paragraphs-know-us" >
          <Typography
            style={paragraphs.contentParagraphs}
            
            className="in-content-paragrahps" 
          >
            ¡Hola! Soy Johana Alcalá, la mente creativa y el corazón detrás de
            Sal & Pimienta. Aunque mi carrera está en administración, mi
            verdadera pasión siempre ha sido la moda.
            </Typography>

            <Typography
              style={paragraphs.contentParagraphs}
              className="in-content-paragrahps"
            >
              Experiencia: He complementado mi amor por la moda con cursos de
              costura, lo que me ha permitido fusionar mi habilidad
              administrativa con la creación de prendas únicas y estilizadas.
            </Typography>
          
          </Box>
        </Box>

        <Box className="in-content-img">
          <CardMedia
            component="img"
            alt={bannersAboutUs[0].titled}
            image={bannersAboutUs[0].image}
            title="Nuestro modelo"
            style={imagesAboutUs.bannersSizes}
            
          />
        </Box>

        <Box className="in-content-container-ourhistory">
          <Box className="in-content-title-paragraph-ourhistory">
          <Typography
            style={paragraphs.titlesParagraphs}
            className="in-content-titles titled-history"
          >
            Nuestra Historia
          </Typography>
          <Typography
            style={paragraphs.contentParagraphs}
            className="in-content-paragrahps , paragrahs-history"
          >
            Sal & Pimienta nació de mi deseo de compartir mi amor por la moda
            asequible y de calidad. Cada prenda que selecciono y cada detalle en
            la tienda reflejan mi dedicación y aprecio por la individualidad de
            cada mujer.
          </Typography>
          </Box>
        

          <Box className="in-content-img-ourhistory">
            <CardMedia
              component="img"
              alt={bannersAboutUs[1].titled}
              image={bannersAboutUs[1].image}
              style={imagesAboutUs.bannersSizes}
            />
          </Box>
        </Box>

        <Box className="in-content-whylist">
          <Typography
            style={paragraphs.titlesParagraphs}
            className="in-content-titles"
          >
            ¿Por qué Sal & Pimienta?
          </Typography>
          <Box style={paragraphs.contentList} className="in-content-list">
            <ul>
              <li style={paragraphs.contentLI}>
                - Pasión por la Moda: Mi enfoque va más allá de vender ropa; es
                sobre empoderar a cada mujer para que se sienta bella y segura.
              </li>
              <li style={paragraphs.contentLI}>
                - Estilo Asequible: Creo firmemente que la moda elegante no
                debería ser un lujo. Ofrezco prendas de calidad a precios
                accesibles.
              </li>
            </ul>
          </Box>
        </Box>
        <Box className="in-content-img-whylist">
          <CardMedia
            component="img"
            alt={bannersAboutUs[2].titled}
            image={bannersAboutUs[2].image}
            style={imagesAboutUs.bannersSizes}
           
          />
        </Box>

        <Box className="in-content-footer">
          <Typography style={paragraphs.contentParagraphs} className="in-content-paragrahps , footer-text">
            Gracias por ser parte de esta travesía. Sal & Pimienta no sería lo
            mismo sin ti. ¡Espero que encuentres piezas que te hagan sentir
            increíble!
          </Typography>

          <Box className="in-content-img-footer">
            <CardMedia
              component="img"
              alt={bannersAboutUs[3].titled}
              image={bannersAboutUs[3].image}
              className="in-content-footerimg"
            />
          </Box>
        </Box>

      </Box> {/*in-content */}
    </Box>//in-container
  );
}

export default Nosotros;
