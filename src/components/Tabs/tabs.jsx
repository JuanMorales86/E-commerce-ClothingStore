import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
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

  const handleChange = (_, newValue) => {//Accion del custom hook
    navigate('/products/' + newValue)//me va a llevar directo al componente seleccionado puedo colocarle uno fijo si aprieto cualquiera '/products/todo'
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={current} onChange={handleChange} aria-label="basic tabs example">
        {
            items?.map((item, index)=>{
                return <Tab key={item.id + index} label={item.title} value={item.id}/>//por cada item del level va a devolver una opcion
                            //key                 //nombre           //valor
            })
        }
        </Tabs>
      </Box>
    </Box>
  );
}

export default TabsMenu