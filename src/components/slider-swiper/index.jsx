import React from 'react'

//libreria Swiper
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


//Libreria Swiper Element


 const SliderSwiper = ({slides, showFixedImage  }) => {

    return (
      <Swiper
        // instalar Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        centeredSlides={"true"}
        centeredSlidesBounds={"true"}
        autoplay={true}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        
      >

        {showFixedImage && (
        <SwiperSlide className='swiperslide'>
          <img className='slidercss' src='http://drive.google.com/uc?export=view&id=1vd-BPqwzO7o1DgXdSS5oN1WAqnEptMXa' alt='Imagen Fija' />
        </SwiperSlide>
        )}
        

        {!showFixedImage && 
        slides.map((slide) => (
              <SwiperSlide className="swiperslide"  key={slide.image}>
                  
                      <img className='slidercss' src={slide.image} alt={slide.titled} />
                  
              </SwiperSlide>
              
        
        ))}
      </Swiper>
    );
  };

  export default SliderSwiper