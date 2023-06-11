// import {Typography} from '@mui/material'
import { Container } from 'react-bootstrap'

const ItemListContainer = ({ greeting }) => {
    return (
      <Container className='text-center mt-5'>
            <h2 style={{ fontSize: '60px', textAlign: 'center', marginTop: '3rem' }}>{greeting}</h2>
       </Container>
    )
}

export default ItemListContainer