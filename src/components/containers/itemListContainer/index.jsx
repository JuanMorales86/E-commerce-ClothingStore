import React, { lazy } from 'react'
//Libreria router dom
import { useNavigate, useParams } from 'react-router-dom'
//Libreria database Firestore 
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';

//Mis Componenetes
// import ListElements from '../itemList'
// import TabsMenu from '../../tabs/tabs'
import InfiniteScroller from '../../utilities/infinitescroller';
import { Box, CircularProgress, Pagination } from '@mui/material';
import { Suspense } from 'react';

//Array de titulos para los tabs
const niveles = [
  {id:'all', title:'Todas las categorias'}, 
  {id:"vestido", title:"Vestidos"},
  {id:'remera', title:'Remeras'}, 
  {id:'deportiva', title:'Deportiva'}, 
  {id:'sweater', title:'Sweaters'},
  {id:'trajesdebaño', title:'Trajes de baños'}, 
  {id:'ropainterior', title:'Ropa Interior'},
  {id:'camisas', title:'Camisas'},
  {id:'descuentos', title:'Descuentos'}
]

Object.freeze(niveles)

//Renderizado desde itemListContainer llmando a itemlist y a su vez item card (Render *PRINCIPAL)
function ListContainerItem({setShowComponent}) {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [hasDiscounts, sethasDiscounts] = React.useState(false)
  const LazyTabsMenu = lazy(() => import('../../tabs/tabs'))
  const LazyListElements = lazy(() => import('../itemList'))
  const [page, setPage] = React.useState(1)//Estado para Paginacion
  const itemsPerPage = 15

  //Mostrar por props Componente Whastapp
  React.useEffect(() => {
    setShowComponent(true)
    return () => 
    setShowComponent(false)
  },[setShowComponent])

  const [, setId] = React.useState('')

//const levels = useParams().levels // es lo mismo que poner lo de abajo
  const { levels } = useParams()//permite ver la prop pasada traida desde en este caso app.jsx (Hook)
  const navigate = useNavigate()

  const current = niveles.some(niv => niv.id === levels) ? levels : "all"//si coloca cualquier otro string dentro de la url products/ va a volver a all
 
  const handleGoItemDetail = (id) => {//uso dos funciones dentro de una
    setId(id)
    navigate(`/product/${id}`, {state: { id }})//puedo recuperar entonces selectProductId gracias al state
  }
    //Restriccion en url
    React.useEffect(() => {
        if(!niveles.some(niv => niv.id === levels)){//si no devuelve nada
            navigate('/home')//navigate es como un href = '/products/all'
        }
    }, [levels, navigate])

    //API FireStore
    React.useEffect(() => {
      setLoading(true)

      const db = getFirestore()
      const getCollection = collection(db, 'productos')
      const hasdescuentoQuery = query(getCollection, where('specialproduct', '==', true))

      getDocs(hasdescuentoQuery)
      .then((snapshot) => {
        sethasDiscounts(!snapshot.empty)
      })
      .catch(error => {
        console.error('Error al consultar los products con descuento:', error);
      });

      if( levels === 'descuentos' ) {
        const descuentoQuery = query(getCollection, where("specialproduct", '==', true))
        getDocs(descuentoQuery)
        .then((snapshot) => {
          // console.log("Productos con descuento:", snapshot.docs.map(e => e.data()));
          setItems(snapshot.docs.map(e => ({ id: e.id, ...e.data() })))
          setLoading(false)
        })
        .catch(error => {
          console.error("Error al consultar los products con descuento:", error);
          setLoading(false);
        });

      }else if(levels === 'all') {
        getDocs(getCollection)//promesa
        .then((snapshot) => {//resuelvo la promesa
            setItems(snapshot.docs.map(e => ({id: e.id, ...e.data()})))
            setLoading(false)
        })

        .catch(error => {
          console.error("Error fetching all products:", error);
          setLoading(false);
        });
      } 
      
      else if(niveles.some(nivel => nivel.id === levels) ) {
        const mark = query(getCollection, where("categoryType", '==', levels))
        getDocs(mark)
        .then((snapshot) => {
            setItems(snapshot.docs.map(e => ({id: e.id, ...e.data()})))
            setLoading(false)
        })
      
        .catch(error => {
          console.error(`Error fetching products for category:${levels}`, error);
          setLoading(false);
        });
    }

    }, [levels])

    //Calcular indices para slice
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    //const totalPages = Math.ceil(items.length / itemsPerPage)
    

    const handlePageChange = (event,newPage) => {
      if(newPage < page){
        //Pagina Anterior
        setPage(page - 1)
      }else if(newPage > page){
        //Pagina siguiente
        setPage(page + 1)
        }else{
          //Cambio de pagina "normal"
          setPage(newPage)
      }
    }

    return (
      <>
        <Suspense fallback={<CircularProgress/>}>
        <LazyTabsMenu current={current} items={niveles.filter(nivel => nivel.id !== 'descuentos' || hasDiscounts)}/>
        <LazyListElements items={items.slice(startIndex, endIndex)} loading={loading} onItemClick={handleGoItemDetail}/>
        
        <Box className="navBarPaginationStyle">
            <Pagination 
            page={page}
            count={Math.ceil(items.length / itemsPerPage)}
            onChange={handlePageChange} 
            shape='rounded'
            />
            </Box>
        
      

        <Box className="navBarInfinityScrollerStyle">
        <InfiniteScroller/>
        </Box>
        </Suspense>
      </>
  )
}

export default ListContainerItem

//En React, Suspense es un componente que se utiliza para gestionar la carga de recursos, como componentes perezosos o datos, de forma asincrónica. fallback es una prop (propiedad) de Suspense que especifica el contenido que se debe renderizar mientras se están cargando los recursos. El prop fallback acepta cualquier elemento de React que se renderizará mientras los recursos están siendo cargados. Esto puede ser cualquier cosa, desde un simple mensaje hasta un indicador de carga más complejo, como un spinner o una barra de progreso.