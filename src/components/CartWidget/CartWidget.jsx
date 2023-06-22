import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

const CartWidget = () => {
    return (
        <div>
            <Button sx={{ color: 'white', fontWeight: 'bold' }} startIcon={ <DeleteIcon/>}>(0)</Button>
        </div>
    )
}

export default CartWidget