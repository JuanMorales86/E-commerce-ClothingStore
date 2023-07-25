import * as React from 'react';
import { Tabs, Tab, Box, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }


function TabsMenu({current, items}) {
  const navigate = useNavigate()//Custom hook
  const [value, setValue] = React.useState(current);
  const isXSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.between('sm', 'md'));

  const handleChangeResize = (event, newValue) => {
    setValue(newValue);
  };
 

  const handleChange = (_, newValue) => {//Accion del custom hook
    navigate('/products/' + newValue)//me va a llevar directo al componente seleccionado puedo colocarle uno fijo si aprieto cualquiera '/products/todo'
  };

  return (
   
      <Box sx={{ display: 'flex',  bgcolor: 'background.paper', borderBottom: 2, borderColor: 'divider', justifyContent:'center'  }}>
        <Tabs value={current} variant={isXSmallScreen ? 'scrollable' : isMediumScreen ? 'scrollable' : 'standard'} onChange={handleChange} aria-label="basic tabs example" scrollButtons={isXSmallScreen || isMediumScreen ? 'auto' : 'on'} swipeable={true} centered >
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