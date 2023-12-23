import React from "react";
import { Typography ,CircularProgress, Box } from "@mui/material";
import ListElementsFrontCard from "../containers/itemListFront";
import { useNavigate } from "react-router-dom";

//libreria Swiper
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { AppContex } from "../../Providers/contex-provider";

const styleH1 = {
  textAlign: "center",
  fontSize: "2.5rem",
  fontWeight: 600,
  margin: "2rem 0 1rem 0"
}

function SliderMostSelledCards() {
    // const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
    const swiperRef = React.useRef(null)
    const [, setId] = React.useState('')
    const [slidesPerView, setSlidesPerView] = React.useState(1)
    const navigate = useNavigate()
    const {solditems, loading} = React.useContext(AppContex)

    React.useEffect(() => { //Para limitar la cantidad de cards por view en el slider
      const handleResize = () => {
        
        const newSlides =  window.innerWidth > 1032 ? 3 : 1 // 2 es el valor cuando el mediaquery es mayor a 1032 y 1 cuando es menor a 1032
        setSlidesPerView(newSlides)
        
      }
      
      window.addEventListener('resize', handleResize)

      handleResize()
    }, [])

    const handleGoItemDetail = (id) => {//uso dos funciones dentro de una
      setId(id)
      navigate(`/product/${id}`)
    }


return (
  <>
  

    <Box sx={{display:"flex",justifyContent:"center"}}>
    <Typography className="degradado-texto" style={styleH1} fontFamily={"letters.fontM"}>Mas Vendidos</Typography> 
    </Box>
    
    <Box  className='containerSwiperMS'>
     
    <Swiper 
    ref={swiperRef}
    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
    autoplay={{delay: 5000}}
    navigation
    slidesPerView={slidesPerView}
    spaceBetween={10}
    centeredSlides={true} 
    centeredSlidesBounds={true}
    className="swiperPS"
>
    <>
    {loading ? 
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginTop={4}>
      <CircularProgress/> 
    </Box>
    : (
    solditems.slice(0, 5).map((productS, index) => ( // Limita a los primeros 5 elementos
      <SwiperSlide key={index} className="swiper-slidePS">
        <ListElementsFrontCard
        key={index}
        data={productS}
        onItemClick={handleGoItemDetail}
        />
      </SwiperSlide>
    )) 
    )}
    </>
    </Swiper>
  </Box>
  </>
)}


export default SliderMostSelledCards