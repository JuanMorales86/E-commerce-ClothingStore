import React from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
// import { AppContex } from "../../Providers/contex-provider";
import { Box, CircularProgress } from "@mui/material";
import ListElementsFrontCard from "../containers/itemListFront";

function MostProductSelled() {
  const [solditems, setSoldItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // const { notifyToastBD } = React.useContext(AppContex);

  console.log(solditems)

  React.useEffect(() => {
    const selledProducts = async () => {
      const db = getFirestore();
      const productSelledRef = collection(db, 'productos');
      const soldProductsQuery = query(
        productSelledRef,
        where("soldquantity", ">", 0)
      );

      try {
        const queryPromise = await getDocs(soldProductsQuery);
        const soldProducts = queryPromise.docs.map((doc) => doc.data());
        // Realiza alguna acción con los productos obtenidos
        setSoldItems(soldProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error obteniendo productos vendidos:", error);
        setLoading(false);
      }
    };

    selledProducts(); // Llama a la función asíncrona inmediatamente
  }, []); // El segundo argumento del useEffect indica que solo debe ejecutarse una vez al montarse el componente

  const listElementsToRender = () => {
    return (

      (loading) ? 
      <CircularProgress/>
      :
        solditems.map((productS, index) => (
        <ListElementsFrontCard key={index} data={productS}/>
        
      ))
    )
    
  }

  return (
    <Box sx={{display:"flex", justifyContent:"center", alignItems:"centr"}}>
    {/* <h1>{solditems.map((items, index) => ( <Typography key={index}>{items.brand}</Typography> ))}</h1> */}
    {listElementsToRender()}
    </Box>
  )

}

export default MostProductSelled;
