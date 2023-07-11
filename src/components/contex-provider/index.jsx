import React from 'react'

//Padre de todo y 
export const AppContex = React.createContext()
const {Provider} = AppContex
// const {Provider: TrolleyProvider} = CustomContexProvider




const AppContexProvider = ({children}) => {
    const [trolley, setTrolley] = React.useState([])//carrito va  manejar un array de objetos //Estados Globales
    // console.log(trolley)
    
    // const user = 'juan'
    // const age = 27

    const handlePrToTrolley = (product) => {
        setTrolley((prevTrolley) => [...prevTrolley, product])//recibe un producto nuevo gracias a la prop product, setTrolley va  actualizar trolley con un nuevo producto y le voy a pasar lo que tenia carrito mas el nuevo product ademas agrege prevTrolley para verificar si hay o no un nuevo objeto para agregar correctamente indistintamente si habia algo o no
    }
    
  return (
   <Provider value={{trolley, handlePrToTrolley, quantityC: trolley.length}}>{children}</Provider>//props para acceder desde este padre reusavilidad
  )
}

export default AppContexProvider

// value={{trolley, handlePrToTrolley, cartQuantity: trolley.length}}: cuando se define de esta forma un objeto, cuando no se coloca la clave: valor  > la clave va a hacer igual al nombre de la variable, es igual que dejar carrito: carrito que dejarlo solo carrito