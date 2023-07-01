import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
//Mis Componenetes
import ListElements from '../../itemList'
import { ListVestidos } from '../../Sdk/Vestidos'//SDK
import TabsComponents from '../../Tabs'
import TabsMenu from '../../Tabs/tabs'


const niveles = [{id:"todo", title:"Todas las categorias"}, {id:"vest", title:"Vestidos"}, {id:"casu", title:"Casual"}, {id:"depo", title:"Deportiva"}]

const searchLevels = (id) => {
    switch (id) {
        case 'vest':
        return 'vestidos'
        case 'casu':
        return 'casual'
        case 'depo':
        return 'deportiva'
        default:
            return 'todo'
    }
}

//Renderizado desde itemListContainer llmando a itemlist y a su vez item card (Render *PRINCIPAL)
function ListContainerItem() {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(false)

//const levels = useParams().levels // es lo mismo que poner lo de abajo
  const { levels } = useParams()//escucha para la URL (Hook)
  const navigate = useNavigate()

  const current = niveles.some(niv => niv.id === levels) ? levels : "todo"//si coloca cualquier otro string dentro de la url products/ va a volver a all

  //   console.log(levels)

    //Restriccion en url
    React.useEffect(() => {
        if(!niveles.some(niv => niv.id === levels)){
            navigate('/products/todo')//navigate es como un href
        }
    }, [levels, navigate])


    //Api Local
    React.useEffect(() => {
        setLoading(true)

        async function fetchData() {//traigo al API ListVestidos
            console.log('Levels', levels)
            try{
                const res = await ListVestidos(searchLevels(levels))//promesa
                setItems(res.data)//resuelvo la promesa
            } catch(error) {
                console.error(error)
                alert('error en base de datos desde sectionVestidos')
                setLoading(false)
                
            }finally {
                setLoading(false)
            }
        } 
        fetchData()}, [levels])
  
    return (
        <>
        <TabsMenu current={current} items={niveles}/>
        <ListElements items={items} loading={loading}/>
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