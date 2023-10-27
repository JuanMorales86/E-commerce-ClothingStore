
import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

function ConstructionPage() {
  return (
    <Grid container item spacing={0.5} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      
        <Grid item xs={12}>
            <Typography variant='h3' fontWeight={'bold'}>En Construcción</Typography>
        </Grid>

        <Grid item xs={12}  justifyContent={'center'} alignItems={'center'} mt={15} mb={15}>
                <Paper elevation={3} sx={{ p: '16px', backgroundColor: '#F5F5F5' }}>
                    <Box textAlign={'center'}>Actualmente esta en desarrollo...</Box>
                </Paper>
        </Grid>
        
    </Grid>
  )
}

export default ConstructionPage