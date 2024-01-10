import React from 'react'

//libreria Swiper
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { Box } from '@mui/material';


//Libreria Swiper Element


const SliderSwiper = ({ type, slides, showFixedImage, isAdmin, isOrderPage  }) => {
  
  // Calcular alturas de antemano
  const heights = slides.map((slide) => {
    const img = new Image()
    img.src = slide.image
    return img.height
  })

  const sliderConfigurations = {
    normal: {
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
      spaceBetween: 50,
      centeredSlides: true,
      centeredSlidesBounds: true,
      autoplay: { delay: slides[0].interval },
      slidesPerView: 1,
      navigation: true,
      pagination: { clickable: true },
      scrollbar: { draggable: true },
    },

    contacto: {
      modules: [Navigation, Pagination, A11y],
      cssMode: false,
      spaceBetween: 1,
      centeredSlides: false,
      centeredSlidesBounds: false,
      autoplay: false,
      slidesPerView: 1,
      navigation: false,
      pagination: { clickable: false },
      scrollbar: { draggable: false },
    }
  }

    const config = sliderConfigurations[type] || sliderConfigurations.normal

    const slidesWithInterval = slides.map((slide, index) => {
      const titled = slide.subtitled
      // const autoplayer = config.autoplay.delay
      const mycustomIndex = slide.interval
      const interval = mycustomIndex  ;


      return {
        ...slide,
        interval: interval,
        buttonName: titled,
        index: index, // Agregamos el índice a cada objeto slide
      };
    });

    // const configIntervals = slidesWithInterval
        
    return (
      <Swiper {...config}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        autoplay={{delay: slidesWithInterval.interval || config.autoplay.delay}}
        pagination={{ clickable: true }}
        navigation
        scrollbar={false}
        autoHeight={true}
      >
        {showFixedImage ? (
        <SwiperSlide  type="contacto" className='swiperslide'>
          <img className='slider-css'  src='https://i.imgur.com/5b1xfZC.jpg' alt='Imagen Contacto' loading='lazy' />
        </SwiperSlide>
        ) : isAdmin ? (
          <SwiperSlide  type="contacto" className='swiperslide'>
          <img className='slider-css'  src='https://i.imgur.com/lLyPJiq.png' alt='Imagen Contacto' loading='lazy' />
        </SwiperSlide>
        ) : isOrderPage ? (
          <SwiperSlide  type="contacto" className='swiperslide'>
          <img className='slider-css'  src='https://i.imgur.com/lQbPiqk.png' alt='Imagen Contacto' loading='lazy' />
        </SwiperSlide>
        ):(
        slidesWithInterval.map((slide, index) => (
        <SwiperSlide   className="swiperslide"  key={index} height={heights[index]}>
          <Box className='slider-content'>
          <img rel='preload' as='image' className='slider-css' src={slide.image} alt={slide.titled} loading='lazy'/> 
          
          </Box>
        </SwiperSlide>
        )))}
        </Swiper>
    );
  };

  export default SliderSwiper