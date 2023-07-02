import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
//Mis Componentes
import ListElementsDetail from '../../itemDetail'
import { ListVestidos } from '../../Sdk/Vestidos'//SDK

//Libreria Material
import { Box} from '@mui/material'
import { getProductsDetail } from '../../Sdk/mercalibre'

//My renderizado desde itemlistcontainer llamando a itemlist y su vez carditem
function ListContainerDetail() {
    const [item, setItem] = useState([])
    const [loading, setLoading] = useState(false)

    const {selectedProductId} = useParams()//Hook tengo acceso a selectedproductid
    console.log(selectedProductId)

    useEffect(() => {
        setLoading(true)

        async function fetchDataD() {
            try{
                const res = await getProductsDetail(selectedProductId)
                setItem(res.data)
                console.log(res.data)
            } catch(error) {
                console.error(error)
                alert('error en base de datos desde itemDetailContainer')
                setLoading(false)
                
            }finally {
                setLoading(false)
            }
        }
    
        fetchDataD()}, [selectedProductId])
        console.log(item)
    

  return (
    
    <ListElementsDetail items={item} loading={loading} />
    
  )
}

export default ListContainerDetail