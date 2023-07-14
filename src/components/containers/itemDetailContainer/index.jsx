import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
//Libreria Material
import { Box, Button } from '@mui/material'
//Libreria FireStore
import { doc, getDoc, getFirestore } from 'firebase/firestore';

//Mis Componentes
import ListElementsDetail from '../../itemDetail'
import { getProductsDetail } from '../../sdk/mercalibre'//SDK



//My renderizado desde itemlistcontainer llamando a itemlist y su vez carditem
function ListContainerDetail() {
    const [item, setItem] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const {selectedProductId} = useParams()//Hook tengo acceso a selectedproductid
    console.log(selectedProductId)

    const navigate = useNavigate()

      

        const fetchDataD = async () => {//LLamo a la BD
            
            setLoading(true)
            
            try{
                const customid = selectedProductId

            if(!customid) {
                throw new Error('No existe el producto seleccionado.')
            }
                const db = getFirestore()            
                const getDataBaseProduct = doc(db, 'productos', customid)
                const docSnapshot = await getDoc(getDataBaseProduct)
               
               
                const data = docSnapshot.data()
                setItem(data)
                console.log(data)
             
            } catch(error) {
                console.error(error)
                setError(error)
                navigate('/products/vestido')
                setLoading(false)
                
            }finally {
                setLoading(false)
            }
        }
        
        useEffect(() => {
            fetchDataD()}, [selectedProductId])
  return (
    <>
        <Box>
        {
        (item) ?
        
          <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          {error && <Button component={Link} to={'/products/all'}>Error: {error.message}</Button>}
          </Box>
          :
          <ListElementsDetail item={item} loading={loading} selectedProductId={selectedProductId}/>
        
        }
    {/* quiero entonces leer item cargar un loading y que el selectProductId me mantenga el codigo del producto para poder volver atras sin que me de error de que la base de datos no busque nada */}
    </Box>
        
    </>
    
  )
}

export default ListContainerDetail

//throw new Error("No se ha seleccionado un producto")//este tipo de instruccion termina la excepcion si no encuentra un catch cercano osea pasa el bloque de control al catch mas cercano si no termina la funcion actual 