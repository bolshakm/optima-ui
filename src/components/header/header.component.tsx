import { Grid, Typography, Badge, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_KEYS, ROUTER_KEYS } from '../../common/constants';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppSelector } from '../../store/app/hooks';
import { selectCartItems } from '../../store/slices/cart/cart.slice';
import EmojiPeople from '@mui/icons-material/EmojiPeople';
import { instance } from '../../axios/instanse';
import { useState } from 'react';
import { selectCafe } from '../../store/slices/cafe/cafe.slice';

export const HeaderComponent = () => {
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartItems);
  const { cafe } = useAppSelector(selectCafe);
  const IsCartEmpty = cartItems.length === 0;
  const [isCallToWaiter, setIsCallTowaiter] = useState(false);

  const handleNavigateToCart = () => {
    navigate(ROUTER_KEYS.CART)
  }

  const handleCallTowaiter = async () => {
    const { status } = await instance.get(API_KEYS.WAITER);

    if (status === 200) {
      setIsCallTowaiter(true);
    } else {
      console.error('Such functionality isn\'t exist');
    }
  }

  return (
    <Paper sx={{ py: 1, px: 2 }}>
      <Grid container justifyContent='space-between' alignItems='center'>
        <Typography variant='h5' fontWeight={900}>{cafe?.name}</Typography>
        <Box>
          <IconButton disabled={isCallToWaiter} onClick={handleCallTowaiter}>
            <EmojiPeople
              color={isCallToWaiter ? 'success' : 'inherit'}
              sx={{ width: 35, height: 35 }}
            />
          </IconButton>
          <IconButton disabled={IsCartEmpty} onClick={handleNavigateToCart}>
            <Badge variant='dot' invisible={IsCartEmpty} color='error'>
              <ShoppingCartIcon sx={{ width: 35, height: 35 }}/>
            </Badge>
          </IconButton>
        </Box>
      </Grid>
    </Paper>
  )
}