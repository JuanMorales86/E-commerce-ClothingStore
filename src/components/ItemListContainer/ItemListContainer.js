import {Typography} from '@mui/material'
import { Container } from '@mui/material'

const ItemListContainer = ({ greeting }) => {
    return (
      <Container maxWidth="xl">
            <Typography style={{ fontSize: '60px', textAlign: 'center', marginTop: '3rem' }}>{greeting}</Typography>
       </Container>
    )
}

export default ItemListContainer