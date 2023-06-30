import React, { useEffect, useState } from 'react'
//Mis Componentes
import ListElementsDetail from '../../listElementsDetail'
import { ListVestidos } from '../../Sdk/Vestidos'//SDK

//Libreria Material
import { Box} from '@mui/material'

function ListVestidosDetail() {
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

export default ListVestidosDetail