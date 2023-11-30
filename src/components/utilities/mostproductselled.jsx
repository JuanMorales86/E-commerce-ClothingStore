import React from "react";
// import { AppContex } from "../../Providers/contex-provider";
import { Box, CircularProgress, Typography } from "@mui/material";
import ListElementsFrontCard from "../containers/itemListFront";
import { useNavigate } from "react-router-dom";
import { AppContex } from "../../Providers/contex-provider";



function MostProductSelled() {
  const [, setId] = React.useState('')
  const navigate = useNavigate()
  const {solditems,loading} = React.useContext(AppContex)

  const handleGoItemDetail = (id) => {//uso dos funciones dentro de una
    setId(id)
    navigate(`/product/${id}`)//puedo recuperar entonces selectProductId gracias al state
  }



  const listElementsToRender = () => {
    return (
      <React.Fragment>
      {loading ? (
      <CircularProgress/>
      ):(
        solditems.map((productS, index) => (
        <ListElementsFrontCard 
        key={index} 
        data={productS} 
        onItemClick={handleGoItemDetail}
        />
      ))
    )}
    </React.Fragment>
    )
        }


  return (
    <>
    
    <Typography sx={{display:"flex",justifyContent:"center"}}>Mas Vendidos</Typography>
    <Box sx={{display:"flex",justifyContent:"center", alignItems:"center"}}>  
    
    {/* <h1>{solditems.map((items, index) => ( <Typography key={index}>{items.brand}</Typography> ))}</h1> */}
    {listElementsToRender()}
    </Box>
    </>
  )

}

export default MostProductSelled;
