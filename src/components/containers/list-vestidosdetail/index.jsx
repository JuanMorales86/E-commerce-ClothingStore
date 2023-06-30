import React, { useEffect, useState } from 'react'
//Mis Componentes
import ListElementsDetail from '../../listElementsDetail'
import { ListVestidos } from '../../Sdk/Vestidos'//SDK

//Libreria Material
import { Box} from '@mui/material'

function ListVestidosDetail() {
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        async function fetchData() {
            try{
                const res = await ListVestidos()
                setItem(res.data)
            } catch(error) {
                console.error(error)
                alert('error en base de datos desde sectionVestidos')
                setLoading(false)
                
            }finally {
                setLoading(false)
            }
        }
    
        fetchData()}, [])
    

  return (
    <Box>
    { item && <ListElementsDetail item={item} loading={loading} />}
    </Box>
  )
}

export default ListVestidosDetail