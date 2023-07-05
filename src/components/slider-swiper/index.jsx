import React, { useEffect } from 'react'

//libreria Swiper
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


//Libreria Swiper Element


 const SliderSwiper = ({slides}) => {
  
    return (
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        className='mySwiper'
      >
        {slides.map((slide) => (
              <SwiperSlide className="swiperslide"  key={slide.image}>
                <img className="slidercss" src={slide.image} alt={slide.titled}/>
              </SwiperSlide>
              // no me carga las fotos locales no se por que la direccion esta dentro src components assets correctamente 
        
        ))}
      </Swiper>
    );
  };

  export default SliderSwiper