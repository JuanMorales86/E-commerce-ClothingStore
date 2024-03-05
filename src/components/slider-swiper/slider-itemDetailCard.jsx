import { CardMedia } from '@mui/material'
import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import CustomTheme from '../Custom-Styles/themes'
const {imagesSliders} = CustomTheme


//!No esta implementado todavia es pera hacer un slider de imagenes en itemdetailcards donde el usuario esta mirando el producto para comprarlo
function  SlideritemDetailCard({imagen, title, handleMouseEnter,handleMouseLeave, isHovered}) {

    if(!imagen?.length){
        return null
    }
    
  console.log(imagen)
  return (
    <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
    autoplay={{delay: 5000}}
    navigation={{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }}
    slidesPerView={"auto"}
    spaceBetween={1}
    centeredSlides={true} 
    
   
   
    >
        {imagen.map((img,index) => {
            return (
            <SwiperSlide key={index}>
              <CardMedia
              className='cardDetailImage'
              component="img"
              style={imagesSliders.slidersImagesStyles}//CustomThemes
              sx={{
              transform: isHovered ? 'scale(1.3)' : 'scale(1)', // Aplicar zoom solo cuando se hace hover(me parece que no funciona)
            }}
              image={img}
              alt={title}
              onMouseEnter={handleMouseEnter}//activar hover
              onMouseLeave={handleMouseLeave}//desactivar hover
            />
            </SwiperSlide>
            )
        })}
    </Swiper>
  )
}

export default  SlideritemDetailCard