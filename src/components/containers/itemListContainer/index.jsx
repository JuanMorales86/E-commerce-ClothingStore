import React from 'react'
//Libreria router dom
import { useNavigate, useParams } from 'react-router-dom'
//Libreria database Firestore 
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';

//Mis Componenetes
import ListElements from '../../itemList'
import TabsMenu from '../../Tabs/tabs'

//Array de titulos para los tabs
const niveles = [
  {id:'all', title:'Todas las categorias'}, 
  {id:"vestido", title:"Vestidos"},
  {id:'remera', title:'Remeras'}, 
  {id:'deportiva', title:'Deportiva'}, 
  {id:'sweater', title:'Sweaters'},
  {id:'trajesdebaño', title:'Trajes de baños'}, 
  {id:'ropainterior', title:'Ropa Interior'},
  {id:'camisas', title:'Camisas'}
]

//Renderizado desde itemListContainer llmando a itemlist y a su vez item card (Render *PRINCIPAL)
function ListContainerItem() {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [id, setId] = React.useState('')

//const levels = useParams().levels // es lo mismo que poner lo de abajo
  const { levels } = useParams()//permite ver la prop pasada traida desde en este caso app.jsx (Hook)
  const navigate = useNavigate()

  const current = niveles.some(niv => niv.id === levels) ? levels : "all"//si coloca cualquier otro string dentro de la url products/ va a volver a all

  //!hice cambios aqui selectedproductId por id por que cambie el params en app.jsx principal a id
  const handleGoItemDetail = (id) => {//uso dos funciones dentro de una
    setId(id)
    navigate(`/product/${id}`, {state: { id }})//puedo recuperar entonces selectProductId gracias al state
  }

    //Restriccion en url
    React.useEffect(() => {
        if(!niveles.some(niv => niv.id === levels)){//si no devuelve nada
            navigate('/products/all')//navigate es como un href
        }
    }, [levels, navigate])

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
        })
      } else if(niveles.some(nivel => nivel.id === levels) ) {
        const mark = query(getCollection, where("categoryType", '==', levels))

        getDocs(mark)
        .then((snapshot) => {
            setItems(snapshot.docs.map(e => ({id: e.id, ...e.data()})))
            setLoading(false)
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
