import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
//Libreria database Firestore 
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';

//Mis Componenetes
import ListElements from '../../itemList'
import { getProducts } from '../../sdk/mercalibre'//SDK Mercadolibre
import TabsMenu from '../../Tabs/tabs'

//Array de titulos para los tabs
const niveles = [{id:"all", title:"Todas las categorias"}, {id:"vestido", title:"Vestidos"}, {id:"deportiva", title:"Deportiva"}, {id:"sweater", title:"swetters"},{id:'bath', title:'trajes de baño'}, {id:'ropainterior', title:'Ropa Interior'}]

// const searchLevels = (id) => {
//     switch (id) {
//         case 'vestido':
//         return 'vestidos'
//         case 'deportiva':
//         return 'ropa deportiva mujer'
//         case 'sweater':
//         return 'sueter mujer'
//         case 'bath':
//         return 'trajes de baño mujer'
//         case 'ropainterior':
//           return 'ropa interior mujer y lenceria'
//         default:
//             return 'vestidos y ropa deportiva mujer y sueter mujer y trajes de bano mujer y ropa interior'
//     }
// }




//Renderizado desde itemListContainer llmando a itemlist y a su vez item card (Render *PRINCIPAL)
function ListContainerItem() {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [id, setId] = React.useState('')

//const levels = useParams().levels // es lo mismo que poner lo de abajo
  const { levels } = useParams()//permite ver la prop pasada traida desde en este caso app.jsx (Hook)
  const navigate = useNavigate()

  const current = niveles.some(niv => niv.id === levels) ? levels : "all"//si coloca cualquier otro string dentro de la url products/ va a volver a all

  //!hice cambios aqui selectedproductId por id por qu cambie el params en app.jsx principal a id
  const handleGoItemDetail = (id) => {//uso dos funciones dentro de una
    setId(id)
    navigate(`/product/${id}`, {state: { id }})//puedo recuperar entonces selectProductId gracias al state
  }

  // console.log(id)

  //   console.log(levels)

    //Restriccion en url
    React.useEffect(() => {
        if(!niveles.some(niv => niv.id === levels)){//si no devuelve nada
            navigate('/products/all')//navigate es como un href
        }
    }, [levels, navigate])


    //Api Local
    // React.useEffect(() => {
    //     setLoading(true)

    //     getProducts(searchLevels(levels))
    //     .then(res => {
    //         // console.log(res.data)
    //         const data = res.data.results?.map((e) => ({
    //             //Busco en la BD
    //             id: e.id,
    //             title: e.title,
    //             price: e.price,
    //             shipping: e.address.state_name,
    //             place: e.address.city_name,
    //             type: e.condition,
    //             vendidos: e.sold_quantity,
    //             imagee: e.thumbnail,
    //             brand: e.attributes.find(attr => attr.id === "BRAND")?.value_name,
                
    //         }))
    //         setItems(data)
    //         console.log(data)
    //         // console.log(data)
    //     })
        

    //     .finally(() => {
    //         setLoading(false)
    //     })

    // }, [levels])

    //API FireStore
    React.useEffect(() => {
      setLoading(true)

      const db = getFirestore()
      const getCollection = collection(db, 'productos')

      if(levels === 'all') {
        getDocs(getCollection)//promesa
        .then((snapshot) => {//resuelvo la promesa
            setLoading(false)
            setItems(snapshot.docs.map(e => ({id: e.id, ...e.data()})))
            console.log(snapshot.docs.map(e => ({id: e.id, ...e.data()})))
        })
      } else if(niveles.some(nivel => nivel.id === levels) ) {
        const mark = query(getCollection, where("categoryType", '==', levels))

        getDocs(mark)
        .then((snapshot) => {
            setItems(snapshot.docs.map(e => ({id: e.id, ...e.data()})))
            setLoading(false)
            console.log(snapshot.docs.map(e => ({id: e.id, ...e.data()})))
        })

      }



    }, [levels])

    
  
    return (
        <>
        <TabsMenu current={current} items={niveles}/>
        <ListElements items={items} loading={loading} onItemClick={handleGoItemDetail}/>
        
        
        </>
  )
}

export default ListContainerItem
