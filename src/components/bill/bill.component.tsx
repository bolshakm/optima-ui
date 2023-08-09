import { Box, Grid, Typography } from '@mui/material'
import React, { memo } from 'react';
import { IBill } from '../../types';
import { DishComponent } from '../dish/dish.component';

interface IProps {
  bill: IBill;
}

export const BillComponent: React.FC<IProps> = memo(({ bill }) => {
  return (
    <Box sx={{ mb: 3, flexGrow: 1 }}>
        <Typography 
          variant='h5'
          sx={{ mb: 1, ml: 2, fontWeight: 700, }} 
        >
          Your order
        </Typography>
        <Grid container flexDirection="column" gap={1} mb={2}>
          {bill.orderedDish.map((item) => (
            <Grid key={item.dish.id} item sx={{ height: 'max-content' }}>
              <DishComponent dish={item.dish} readonly={true} count={item.quantity}/>
            </Grid>
          ))}
        </Grid>
        <Grid container sx={{ justifyContent: 'flex-end'}}>
        <Typography 
          variant='h5' 
          mb={2}
          mr={2} 
          fontWeight={700}
        >
          Total sum: {bill.totalSum}UAH
        </Typography>
        </Grid>
      </Box>
  )
})