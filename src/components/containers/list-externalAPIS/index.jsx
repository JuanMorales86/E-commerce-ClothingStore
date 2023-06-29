import React from 'react'
import { ListApiFaked } from '../../Sdk/externalAPIS'
import ElementsList from '../../listElements'

function SectionApiFaked() {
        const [items, setItems] = React.useState([])//me va a devolver un array
        const [loading, setLoading] = React.useState(false)

        React.useEffect(() => {
            setLoading(true)

            ListApiFaked()
            .then((res) => {
               setItems(res.data)
            })
            .catch((err) => {
                console.error(err)
                alert('error al cargar')
                setLoading(false)
            })
            .finally(() => {
                setLoading(false)
            })
        }, [])
  
  
    return (
        <ElementsList items={items} loading={loading}/>
  )
}

export default SectionApiFaked