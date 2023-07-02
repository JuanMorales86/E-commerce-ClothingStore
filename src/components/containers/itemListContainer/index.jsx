import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
//Mis Componenetes
import ListElements from '../../itemList'
import { ListVestidos } from '../../Sdk/Vestidos'//SDK
import { getProducts } from '../../Sdk/mercalibre'//SDK Mercadolibre
import TabsMenu from '../../Tabs/tabs'
import ListContainerDetail from '../itemDetailContainer'



const niveles = [{id:"all", title:"Todas las categorias"}, {id:"vest", title:"Vestidos"}, {id:"depo", title:"Deportiva"}, {id:"swet", title:"swetters"},{id:'bath', title:'trajes de baño'}]

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
        default:
            return 'all'
    }
}

//Renderizado desde itemListContainer llmando a itemlist y a su vez item card (Render *PRINCIPAL)
function ListContainerItem() {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [selectedProductId, setSelectedProductId] = React.useState('MLA898739509')

//const levels = useParams().levels // es lo mismo que poner lo de abajo
  const { levels } = useParams()//escucha para la URL (Hook)
  const navigate = useNavigate()

  const current = niveles.some(niv => niv.id === levels) ? levels : "all"//si coloca cualquier otro string dentro de la url products/ va a volver a all

  const handleItemClick = (productId) => {
    setSelectedProductId(productId)
  }
  console.log(selectedProductId)
  
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
                stock: e.available_quantity,
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

        // async function fetchData() {//traigo al API ListVestidos
        //     console.log('Levels', levels)
        //     try{
        //         const res = await ListVestidos(searchLevels(levels))//promesa
        //         setItems(res.data)//resuelvo la promesa
        //     } catch(error) {
        //         console.error(error)
        //         alert('error en base de datos desde sectionVestidos')
        //         setLoading(false)
                
        //     }finally {
        //         setLoading(false)
        //     }
        // } 
        // fetchData()}, [levels])
  
    return (
        <>
        <TabsMenu current={current} items={niveles}/>
        <ListElements items={items} loading={loading} onItemClick={handleItemClick}/>
        {selectedProductId && <ListContainerDetail selectedProductId={selectedProductId}/>}
        
        </>
  )
}

export default ListContainerItem


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