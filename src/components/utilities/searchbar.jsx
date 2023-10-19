import * as React from 'react'
import { TextField, Box, Button, Tooltip } from '@mui/material'
import { AppContex } from '../../Providers/contex-provider'
import { useContext } from 'react'

function SearchBar() {
const {searchOrders, filteredOrders} = useContext(AppContex)
const [searchText, setSearchText] = React.useState('')
const [error, setError] = React.useState(null); // Estado para el mensaje de error
// const [formattedText,setFormattedText] = React.useState('')

// const formatDate = (dateString) => {
//     const date = new Date(dateString);
    
//     if (isNaN(date.getTime())) {
//         // Si la fecha no es válida, puedes manejarla como desees, como mostrar un mensaje de error.
//         return null; // O podrías devolver una cadena de error, por ejemplo: "Fecha no válida".
//     } else {
//         // Formatea la fecha en el formato deseado
//         const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//         return date.toLocaleDateString(undefined, options);
//     }
// }

const handleSearchTextChange = (e) => {
    const newText = e.target.value;
    setSearchText(newText);

    // Realiza la validación aquí (puedes personalizar esta función)
    if (newText.trim() === '') {
      setError('No se encontraron resultados.'); // Muestra el mensaje de error si no hay resultados
    } else {
      setError(null); // Limpia el mensaje de error si hay texto en el campo
    }
}

    const handleSearch = () => {
        searchOrders(searchText)
        setError(null)
    }

    console.log(searchText)
    console.log(filteredOrders)
   

  return (
    <>
    <Box display={'flex'} flexDirection={['column', 'row']} gap={1}>
        <Tooltip title="Puedes realizar las siguientes busquedas por tipo: Numero de Orden, Nombre, Apellido, Telefono, Correo, Estado de orden, Fecha de creacion formato(01/10/2023)">
        <TextField sx={{width:'100%'}} id='filled-basic' label="Buscar Ordenes" placeholder='orden1014' variant='outlined' value={searchText} onChange={handleSearchTextChange} helperText={error} error={!!error} />
        </Tooltip>
        <Button sx={{width:'100px', height:'55px', alignSelf:"center"}} variant='contained' color='primary' onClick={handleSearch}>Buscar</Button>
    </Box>
    {/* <Box>
        {filteredOrders.map((order,index) => (
            <p key={index}>{order.customOrderId}</p>
        ))

        }
        
    </Box> */}
    </>
    
  )
}

export default SearchBar