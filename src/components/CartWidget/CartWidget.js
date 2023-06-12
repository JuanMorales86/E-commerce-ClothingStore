import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';




const CartWidget = () => {
    return (
        <div>
            <Button variant='danger' size='sm' className='carrito'>
            <FontAwesomeIcon icon={faTrash} size='sm' />(0)
            </Button>
        </div>
    )
}

export default CartWidget