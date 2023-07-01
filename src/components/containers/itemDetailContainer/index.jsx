import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
//Mis Componentes
import ListElementsDetail from '../../itemDetail'
import { ListVestidos } from '../../Sdk/Vestidos'//SDK

//Libreria Material
import { Box} from '@mui/material'

//My renderizado desde itemlistcontainer llamando a itemlist y su vez carditem
function ListContainerDetail() {
    const [item, setItem] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)

        async function fetchDataD() {
            try{
                const res = await ListVestidos()
                setItem(res.data)
                console.log(res.data)
            } catch(error) {
                console.error(error)
                alert('error en base de datos desde vestidosdetail')
                setLoading(false)
                
            }finally {
                setLoading(false)
            }
        }
    
        fetchDataD()}, [])
    

  return (
    <Box>
    { item && <ListElementsDetail item={item} loading={loading} />}
    </Box>
  )
}

export default ListContainerDetail