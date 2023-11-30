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
  fontSize: "1.8rem",
  textTransform: "capitalize",
  fontWeight: 400,
  margin: "2rem 0 1rem 0"
}

function SliderMostSelledCards() {
    // const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
    const [, setId] = React.useState('')
    const navigate = useNavigate()
    const {solditems, loading} = React.useContext(AppContex)

    const handleGoItemDetail = (id) => {//uso dos funciones dentro de una
      setId(id)
      navigate(`/product/${id}`)
    }


return (
  <>
  

    <Box sx={{display:"flex",justifyContent:"center"}}>
    <Typography style={styleH1} fontFamily={"letters.fontM"}>Mas Vendidos</Typography> 
    </Box>
    
    <Box sx={{backgroundColor:"#F7F7F7"}}>
    <Swiper 
    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
    autoplay={{delay: 3000}}
    navigation
    slidesPerView={1}
    // spaceBetween={50}
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
    solditems.map((productS, index) => (
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