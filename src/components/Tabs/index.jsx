import React, { Fragment } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import SectionApiFaked from '../containers/list-externalAPIS';
import ListContainerItem from '../containers/itemListContainer';

//Perzonalizacion de Tabs styles
const stylesTabs = {
    tabRoot: {
        fontFamily: 'monospace',
        //fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        fontSize: '1rem',
        textTransform: 'upperCase'
    }
}

//!CONTROL DE TABS
function TabsComponents() {
    //cambio de color de las tabs
    const [value, setValue] = React.useState('Vestir');
    const handleChange = (event, newValue) => {
    setValue(newValue);
    };
    //fin cambio de color de las tabs

    //Selector de pestanas
    const [tabPush, setTabPush] = React.useState('Vestir')
    //console.log(tabPush)
    const handlePush = ( _, value) => {
        setTabPush(value)
    }
    //fin selector de pestanas

    return (
    <Fragment> 
    <Box sx={{ width: '100%', borderBottom: 1, borderColor:'divider' }}>
    <Tabs
      value={value}
      onChange={(event, newValue) => {//si quiero usar mas funciones dentro de un onchange que maneja una funcion padre los coloco en un function arrow
        handleChange(event, newValue);
        handlePush(event, newValue);
      }}
      textColor="secondary"
      indicatorColor="secondary"
      aria-label="secondary tabs example"
      sx={{ '& .MuiTab-root' : stylesTabs.tabRoot,
      }}
    >
      <Tab sx={{ color: 'secondary.A700' }} value="Vestir" label="Vestir" />
      <Tab value="Casual" label="Casual" />
      <Tab value="Deportiva" label="Deportiva" />
      <Tab value="Todas" label="Todas" />
    </Tabs>
    </Box>
    <Box>
            {/* desiciones de las tabs */}
        { tabPush === 'Vestir' ? <ListContainerItem/> : null }
        { tabPush === 'Casual' ? <SectionApiFaked/> : null }
        { tabPush === 'Deportiva' ? <Box>RopaDeportiva</Box> : null }
        { tabPush === 'Todas' ? <Box>Todalamercancia</Box> : null }
    </Box>
    </Fragment>
  )
}

export default TabsComponents