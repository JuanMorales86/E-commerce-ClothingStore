import React from "react";
import { Typography ,CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

//Mis Componentes
import ListElementsSeasonFrontCard from "../containers/itemListFront/frontSeasonList";

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

function SliderSeasons() {
    // const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
    const swiperRef = React.useRef(null)
    const [, setId] = React.useState('')
    const [slidesPerView, setSlidesPerView] = React.useState(1)
    const navigate = useNavigate()
    const {seasonsTemp, nameSeason, loading} = React.useContext(AppContex)

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
    <Typography className="degradado-texto" style={styleH1} fontFamily={"letters.fontM"}>Llega el {nameSeason} </Typography> 
    </Box>
    
    <Box  className='containerSwiperSeaons'>
     
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
    seasonsTemp.map((productS, index) => ( // Limita a solo los primeros 5 elementos con seasonTemp.slice(0,5).map...
      <SwiperSlide key={index} className="swiper-slidePS">
        <ListElementsSeasonFrontCard
        key={index}
        data={productS}
        nameoftheseason={nameSeason}
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


export default SliderSeasons