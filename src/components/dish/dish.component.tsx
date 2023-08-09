import React, { memo } from 'react';
import { IDish } from '../../types'
import { Grid, Paper, Typography } from '@mui/material';
import { COLORS } from '../../theme/colors';
import { CounterComponent } from '../counter/counter.component';
import { useAppSelector } from '../../store/app/hooks';
import { selectCartItems } from '../../store/slices/cart/cart.slice';

interface IProps {
  dish: IDish;
  readonly?: boolean;
  count?: number;
}

export const DishComponent: React.FC<IProps> = memo(({ dish, readonly = false, count }) => {
  const cartItems = useAppSelector(selectCartItems);
  const isDishAddedToCart = cartItems.some((item) => item.dish.id === dish.id);

  const color = isDishAddedToCart || readonly ? COLORS.LIGHT_GRAY : COLORS.WHITE;

  return (
    <Paper sx={{ py: 1, px: 1.5, backgroundColor: color }}>
      <Grid container justifyContent='space-between' alignItems='center' spacing={1}>
        <Grid item xs={7}>
          <Grid container flexDirection='column'>
            <Typography variant='h6' sx={{ fontWeight: 700 }}>{dish.name}</Typography>
            <Typography variant='h6' sx={{ color: COLORS.ORANGE, fontWeight: 600 }}>{dish.price}UAH</Typography>
            <Typography>{dish.description}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          {readonly ? (
            <Grid container justifyContent='flex-end'>
              <Typography variant='h6' sx={{ color: COLORS.ORANGE }}>x{count}</Typography>
            </Grid>
          ) : (<Grid container justifyContent='flex-end'>
            <CounterComponent dish={dish} />
          </Grid>)}
        </Grid>
      </Grid>
    </Paper>
  )
})