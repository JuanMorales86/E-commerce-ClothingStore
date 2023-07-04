import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

//Mis Componentes
import ListElementsDetail from '../../itemDetail'
import { getProductsDetail } from '../../sdk/mercalibre'//SDK
import { Box, Button } from '@mui/material'
//Libreria Material



//My renderizado desde itemlistcontainer llamando a itemlist y su vez carditem
function ListContainerDetail() {
    const [item, setItem] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const {selectedProductId} = useParams()//Hook tengo acceso a selectedproductid
    console.log(selectedProductId)


    useEffect(() => {
        setLoading(true)

        async function fetchDataD() {
            try{
            if(selectedProductId){
                const res = await getProductsDetail(selectedProductId)
                setItem(res.data)
                console.log(res.data)
            }else{
               alert('cuidado')
                console.log('error')
            }
            } catch(error) {
                console.error(error)
                setError(error)
                // alert('error en base de datos desde itemDetailContainer')
                setLoading(false)
                
            }finally {
                setLoading(false)
            }
        }
    
        fetchDataD()}, [selectedProductId])
        // console.log(item)
    

  return (
    <>
  
          <ListElementsDetail item={item} loading={loading} selectedProductId={selectedProductId}/>
        <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        {error && <Button component={Link} to={'/products/all'}>Error: {error.message}</Button>}
        </Box>
  
    {/* quiero entonces leer item cargar un loading y que el selectProductId me mantenga el codigo del producto para poder volver atras sin que me d error de que la base de datos no busque nada */}
    </>
    
  )
}

export default ListContainerDetail