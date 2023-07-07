import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
//Mis Componenetes
import ListElements from '../../itemList'
import { getProducts } from '../../sdk/mercalibre'//SDK Mercadolibre
import TabsMenu from '../../Tabs/tabs'



//Array de titulos para los tabs
const niveles = [{id:"all", title:"Todas las categorias"}, {id:"vest", title:"Vestidos"}, {id:"depo", title:"Deportiva"}, {id:"swet", title:"swetters"},{id:'bath', title:'trajes de baño'}, {id:'ropinte', title:'Ropa Interior'}]

const searchLevels = (id) => {
    switch (id) {
        case 'vest':
        return 'vestidos'
        case 'depo':
        return 'ropa deportiva mujer'
        case 'swet':
        return 'sueter mujer'
        case 'bath':
        return 'trajes de baño mujer'
        case 'ropinte':
          return 'ropa interior mujer y lenceria'
        default:
            return 'vestidos y ropa deportiva mujer y sueter mujer y trajes de bano mujer y ropa interior'
    }
}

//Renderizado desde itemListContainer llmando a itemlist y a su vez item card (Render *PRINCIPAL)
function ListContainerItem() {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [selectedProductId, setSelectedProductId] = React.useState('')

//const levels = useParams().levels // es lo mismo que poner lo de abajo
  const { levels } = useParams()//permite ver la prop pasada traida desde en este caso app.jsx (Hook)
  const navigate = useNavigate()

  const current = niveles.some(niv => niv.id === levels) ? levels : "all"//si coloca cualquier otro string dentro de la url products/ va a volver a all

  const handleGoItemDetail = (selectedProductId) => {//uso dos funciones dentro de una
    setSelectedProductId(selectedProductId)
    navigate(`/product/${selectedProductId}`, {state: { selectedProductId }})//puedo recuperar entonces selectProductId gracias al state
  }

  // console.log(selectedProductId)

  //   console.log(levels)

    //Restriccion en url
    React.useEffect(() => {
        if(!niveles.some(niv => niv.id === levels)){//si no devuelve nada
            navigate('/products/all')//navigate es como un href
        }
    }, [levels, navigate])


    //Api Local
    React.useEffect(() => {
        setLoading(true)

        getProducts(searchLevels(levels))
        .then(res => {
            // console.log(res.data)
            const data = res.data.results?.map((e) => ({
                //Busco en la BD
                id: e.id,
                title: e.title,
                price: e.price,
                shipping: e.address.state_name,
                place: e.address.city_name,
                type: e.condition,
                vendidos: e.sold_quantity,
                imagee: e.thumbnail,
                brand: e.attributes.find(attr => attr.id === "BRAND")?.value_name,
                
            }))
            setItems(data)
            // console.log(data)
        })
        

        .finally(() => {
            setLoading(false)
        })

    }, [levels])


  
    return (
        <>
        <TabsMenu current={current} items={niveles}/>
        <ListElements items={items} loading={loading} onItemClick={handleGoItemDetail}/>
        {/* {selectedProductId && <ListContainerDetail selectedProductId={selectedProductId}/>} */}
        
        </>
  )
}

export default ListContainerItem
