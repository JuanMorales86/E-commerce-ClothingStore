import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Link, useNavigate, Navigate } from 'react-router-dom'
//Mis Componentes
import ListElementsDetail from '../../itemDetail'
import { ListVestidos } from '../../sdk/Vestidos'//SDK
import { getProductsDetail } from '../../sdk/mercalibre'
//Libreria Material
import { Box} from '@mui/material'


//My renderizado desde itemlistcontainer llamando a itemlist y su vez carditem
function ListContainerDetail() {
    const [item, setItem] = useState([])
    const [loading, setLoading] = useState(false)

    const {selectedProductId} = useParams()//Hook tengo acceso a selectedproductid
    // console.log(selectedProductId)

    const location = useLocation()//Hook para obtener la ubicacion actual y cualquier estado pasado atraves de la ruta
    const selectedProductFromLocation  = location.state?.selectedProductId //accedo al estado selectedProductId que paso atraves de la ubicacion

    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)

        async function fetchDataD() {
            try{
            if(selectedProductFromLocation){
                const res = await getProductsDetail(selectedProductFromLocation)
                setItem(res.data)
                console.log(res.data)
            }else{
                navigate("/products/all")//si no me devuelve nada selectedProductFromLocation me devuelva al componente itemListContainer
                console.log(Navigate)
            }
            } catch(error) {
                console.error(error)
                alert('error en base de datos desde itemDetailContainer')
                setLoading(false)
                
            }finally {
                setLoading(false)
            }
        }
    
        fetchDataD()}, [selectedProductFromLocation])
        // console.log(item)
    

  return (
    <>
    <ListElementsDetail item={item} loading={loading} selectedProductId={selectedProductId}/>
    {/* quiero entonces leer item cargar un loading y que el selectProductId me mantenga el codigo del producto para poder volver atras sin que me d error de que la base de datos no busque nada */}
    </>
    
  )
}

export default ListContainerDetail