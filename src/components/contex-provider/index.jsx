import React from 'react'

//Padre de todo y 
export const AppContex = React.createContext()
const {Provider} = AppContex
// const {Provider: TrolleyProvider} = CustomContexProvider
const AppContexProvider = ({children}) => {
    const [trolley, setTrolley] = React.useState([])//carrito va  manejar un array de objetos //Estados Globales

    const handlePrToTrolley = (product) => {
        setTrolley([...trolley, product])//le voy a psar lo que tenia carrito mas el nuevo product
    }
    
  return (
   <Provider value={{trolley, handlePrToTrolley, quantityC: trolley.length}}>{children}</Provider>//props para acceder desde este padre reusavilidad
  )
}

export default AppContexProvider

// value={{trolley, handlePrToTrolley, cartQuantity: trolley.length}}: cuando se define de esta forma un objeto, cuando no se coloca la clave: valor  > la clave va a hacer igual al nombre de la variable, es igual que dejar carrito: carrito que dejarlo solo carrito