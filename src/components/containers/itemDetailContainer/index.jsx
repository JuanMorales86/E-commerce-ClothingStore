import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
//Libreria Material
import { Box, Button } from '@mui/material'
//Libreria FireStore
import { doc, getDoc, getFirestore } from 'firebase/firestore';

//Mis Componentes
import ListElementsDetail from '../itemDetail'
import { useCallback } from 'react';

//My renderizado desde itemlistcontainer llamando a itemlist y su vez carditem
function ListContainerDetail() {
    const [item, setItem] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    

    const {id} = useParams()//Hook tengo acceso a id
   

    const navigate = useNavigate()

      

        const fetchDataD = useCallback(async () => {//LLamo a la BD (llamo a useCallback para memorizar fecthdata para que no se cree a cada rato, para que se mantenga igual entre renderizaciones)
            
            setLoading(true)
            
            try{
            if(!id) {
                throw new Error('No existe el producto seleccionado.')
            }
                const db = getFirestore()            
                const getDataBaseProduct = doc(db, 'productos', id)
                const docSnapshot = await getDoc(getDataBaseProduct)
                const clothes = {
                    id:docSnapshot.id,
                    ...docSnapshot.data()
                }
                setItem(clothes)
             
            } catch(error) {
                console.error(error)
                setError(error)
                navigate('/products/all')
                setLoading(false)
                
            }finally {
                setLoading(false)
            }
        }, [id, navigate])
        
            useEffect(() => {
                fetchDataD()}, [id, fetchDataD])
return (
    <>
        <Box>
        {
        (item) ? 
            <ListElementsDetail item={item} loading={loading} selectedProductId={id}/>
            // quiero entonces leer item cargar un loading y que el selectProductId me mantenga el codigo del producto para poder volver atras sin que me de error de que la base de datos no busque nada
            :
            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            {error && <Button component={Link} to={'/products/all'}>Error: {error.message}</Button>}
            </Box>
            
            }
        </Box>
    </>
        )
}
export default ListContainerDetail         

//throw new Error("No se ha seleccionado un producto")//este tipo de instruccion termina la excepcion si no encuentra un catch cercano osea pasa el bloque de control al catch mas cercano si no termina la funcion actual 