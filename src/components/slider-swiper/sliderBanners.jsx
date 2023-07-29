import React from "react";
//libreria Swiper
import { Navigation, A11y, Autoplay } from 'swiper/modules';//Pagination, Scrollbar,
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button, Box, Typography } from "@mui/material";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function SliderBanners({banners, onBannerClick}) {
    const [_, setSeeImge] = React.useState(null)

    const handleMouseOver = (index) => {
        setSeeImge(index)
    }

    const handleMouseLeave = () => {
        setSeeImge(null)
    }

  
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, A11y, Autoplay]}//Pagination, Scrollbar
      spaceBetween={10}
      slidesPerView={4}
      centeredSlides={false}
      centeredSlidesBounds={true}
      parallax={true}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="mySwiper"
      style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
    >
      {banners.map((slide, index) => (
        <SwiperSlide key={index} className="swiperslidesBanners" onMouseEnter={() => handleMouseOver(index)} onMouseLeave={handleMouseLeave}>
                <Box className="sliderImageContainer" position="relative">
                    <img className="slidercssBanners" src={slide.image} alt={slide.titled} />
                    <Box className="sliderContent" position="absolute" bottom={20} left={0} right={0} textAlign="center" color="white" width="100%">
                            <Typography textTransform={"capitalize"} variant="h4" style={{ fontWeight: "bold", fontSize: "28px" }}>{slide.titled}</Typography>
                            <Button variant="contained" className="sliderBannerButton" onClick={() => onBannerClick(slide.titled)}>Ver..</Button>
                    </Box>
                </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SliderBanners;
