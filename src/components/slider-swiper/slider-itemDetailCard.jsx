import { CardMedia } from '@mui/material'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

function  SlideritemDetailCard({thumbnail, title, handleMouseEnter,handleMouseLeave, isHovered}) {

    if(!thumbnail?.length){
        return null
    }
    
  
  return (
    <Swiper>
        {thumbnail.map((img,index) => {
            return (
            <SwiperSlide key={index} >
                 <CardMedia
            className='cardDetailImage'
            component="img"
            sx={{ width:["350px","480px"], height: "100%", objectFit:"cover",  borderTopRightRadius: '15px', borderBottomRightRadius: ['0', '15px'],borderTopLeftRadius: ['15px', '0'], border:'2px solid black' ,
            transition: "transform 0.5s ease",
            transform: isHovered ? 'scale(1.3)' : 'scale(1)', // Aplicar zoom solo cuando se hace hover(me parece que no funciona)
            position:"relative", 
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