import React from 'react'
//Mis Componenetes
import ListElements from '../../listElements'
import { ListVestidos } from '../../Sdk/Vestidos'//SDK


function SectionVestidos() {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)

        async function fetchData() {
            try{
                const res = await ListVestidos()
                setItems(res.data)
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
        <ListElements items={items} loading={loading}/>
  )
}

export default SectionVestidos


// ListVestidos()
// .then((res) => {
//      setItems(res.data) //Axios ya proporciona directamente los datos en response.data.
// })
// .catch((err) => {
//     console.error(err)
//     alert('Ocurrio un error')
//     setLoading(false)
// })
// .finally(() => {
//     setLoading(false)
// })
// }, [])