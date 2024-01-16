import * as React from 'react'
import { TextField, Box, Button, Tooltip, Typography  } from '@mui/material'
import { AppContex } from '../../Providers/contex-provider'
import { useContext } from 'react'

function SearchBar() {
const {searchOrders, filteredOrders} = useContext(AppContex) //filteredOrders
const [searchText, setSearchText] = React.useState('')
const [error, setError] = React.useState(null); // Estado para el mensaje de error
// const [formattedText,setFormattedText] = React.useState('')



const handleSearchTextChange = (e) => {
    const newText = e.target.value;
    setSearchText(newText);

    // Realiza la validación aquí 
    if (!newText.trim()) {
      setError('Debe llenar la Casilla.'); // Muestra el mensaje de error si no hay resultados
    } else {
      setError(null); // Limpia el mensaje de error si hay texto en el campo
    }
}

    const handleSearch = () => {
      if (!searchText.trim()) {
        setError('Debe llenar la Casilla para buscar.');
        return; 
      }   
      searchOrders(searchText);
      setError(null);

    // console.log(searchText)
    // console.log(filteredOrders)
    }

  return (
    <>
    <Box display={'flex'} flexDirection={['column', 'row']} gap={1}>
        <Tooltip title="Puedes realizar las siguientes busquedas por tipo: Numero de Orden, Nombre, Apellido, Telefono, Correo, Estado de orden, Fecha de creacion formato(01/10/2023)">
        <TextField sx={{width:'100%'}} id='filled-basic' label="Buscar Ordenes" placeholder='orden1014' variant='outlined' value={searchText} onChange={handleSearchTextChange} helperText={error} error={!!error} />
        </Tooltip>
        <Box display={'flex'} justifyContent={'center'}>
        <Button sx={{width:'100px', height:'55px', borderRadius:"0.25rem"}} variant='contained' color='primary' onClick={handleSearch}>Buscar</Button>
        </Box>
        <>
        {!filteredOrders.length && 
  <Typography>No se encontraron resultados</Typography>
} 
        </>
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