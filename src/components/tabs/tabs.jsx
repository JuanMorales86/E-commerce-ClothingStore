import * as React from 'react';
import { Tabs, Tab, Box  } from '@mui/material'  //useMediaQuery
import { useNavigate } from 'react-router-dom';


function TabsMenu({current, items}) {
  const navigate = useNavigate()//Custom hook
  // const isXSmallScreen = useMediaQuery((theme) => theme.breakpoints.between('xs', 'sm'));
  // const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.between('sm', 'md'));
  // const screenWidth = window.innerWidth



  const handleChange = (_, newValue) => {//Accion del custom hook
    navigate('/products/' + newValue)//me va a llevar directo al componente seleccionado puedo colocarle uno fijo si aprieto cualquiera '/products/todo'
  };

  return (
   
      <Box sx={{ display: 'flex',  bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider', justifyContent:'center', maxWidth: { xs: 600, sm: '100%' }  }}>
        <Tabs 
        value={current} 
        // variant={isXSmallScreen || isMediumScreen ? 'scrollable' : 'scrollable'} 
        // variant={screenWidth < 600 ? "scrollable" : "standard"} // Cambia a scrollable si el ancho es menor a 600px
        variant='scrollable'
        onChange={handleChange} 
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        // scrollButtons={isXSmallScreen || isMediumScreen ? 'auto' : 'auto'} // Corregimos el valor de scrollButtons
        // scrollButtons={screenWidth < 600 ? 'auto' : false} // Muestra los botones en pantallas más pequeñas
        swipeable={"true"} >
        {
            items?.map((item, index)=>{
                return <Tab key={item.id + index} label={item.title} value={item.id}  />//por cada item del level va a devolver una opcion
                            //key                 //nombre           //valor
            })
        }
        </Tabs>
      </Box>
  
  );
}

export default TabsMenu