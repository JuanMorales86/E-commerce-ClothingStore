import { CardMedia } from "@mui/material";
import React from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CustomTheme from "../Custom-Styles/themes";
const { imagesSliders } = CustomTheme;

//!slider de imagenes en itemdetailcards donde el usuario esta mirando el producto
function SlideritemDetailCard({ imagen, title, resetTransform }) {
  const [hovered, setIsHovered] = React.useState(false); //estado para el hover
  const [, setShowZoomMessage] = React.useState(false); //estado para el mensage de hacer zoom

  const onMouseEnter = () => {
    setIsHovered(true);
    setShowZoomMessage(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => {
      resetTransform();
      setShowZoomMessage(false);
    }, 5000);
  };

  if (!imagen?.length) {
    return null;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      autoplay={{ delay: 5000 }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      pagination={{
        clickable: true,
        type: "fraction",
      }}
      slidesPerView={"auto"}
      spaceBetween={1}
      centeredSlides={true}
      
    >
      
      {imagen.map((img, index) => {
        return (
          <SwiperSlide
            key={index}
            onMouseEnter={onMouseEnter} //activar hover
            onMouseLeave={onMouseLeave} //desactivar hover
          >
            <CardMedia
              className="cardDetailImage"
              component="img"
              style={imagesSliders.slidersImagesStyles} //CustomThemes
              sx={{
                transform: hovered ? "scale(1.025)" : "scale(1)", // Aplicar zoom solo cuando se hace hover
              }}
              image={img}
              alt={title}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SlideritemDetailCard;
