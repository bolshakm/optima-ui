import React, { memo } from 'react';
import { IDish } from '../../types';
import { Button, ButtonGroup, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { COLORS } from '../../theme/colors';
import { decreaseCount, increaseCount, selectCartItems } from '../../store/slices/cart/cart.slice';

interface IProps {
  dish: IDish;
}

export const CounterComponent: React.FC<IProps> = memo(({ dish }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const cartItem = cartItems.find((item) => item.dish.name === dish.name)

  const handleIncreaseCount = () => {
    dispatch(increaseCount({ dish }))
  }

  const handleDecreaseCount = () => {
    dispatch(decreaseCount({ dish }))
  }

  return (
    <Paper sx={{ p: 0, border: `1px solid ${COLORS.GRAY}` }}>
      <ButtonGroup
        disableElevation
        variant="outlined"
        color='inherit'
      >
        {cartItem && (
          <>
            <Button 
              sx={{ border: 'none', fontSize: 16, fontWeight: 700 }} 
              onClick={handleDecreaseCount}
              >
                -
              </Button>
            <Button sx={{ border: 'none' }}>{cartItem.quantity}</Button>
          </>
        )}
        
        <Button 
          sx={{ border: 'none', fontSize: 16, fontWeight: 700 }} 
          onClick={handleIncreaseCount}
          >
            +
          </Button>
      </ButtonGroup> 
    </Paper>
  )
})