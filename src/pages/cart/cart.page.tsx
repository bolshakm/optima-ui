import { Grid, Paper, Box, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { clearCart, selectCartItems } from '../../store/slices/cart/cart.slice';
import { useNavigate } from 'react-router-dom';
import { API_KEYS, ROUTER_KEYS } from '../../common/constants';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { BillComponent, DishComponent, FooterComponent } from '../../components';
import { useCallback, useEffect, useState } from 'react';
import { instance } from '../../axios/instanse';
import { getRestaurant, selectRestaurant } from '../../store/slices/restaurant/restaurant.slice';
import { modifyData } from '../../utils/modifyCartData';
import { IBill } from '../../types/bill.interface';

export const CartPage = () => {
  const cartItems = useAppSelector(selectCartItems);
  const { restaurant } = useAppSelector(selectRestaurant);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState<null | IBill>(null);

  useEffect(() => {
    dispatch(getRestaurant('1'))
  }, [dispatch]);
    
  const handleOrder = async () => {
    const modifiedData = modifyData(cartItems, restaurant?.tableNumber || 1)
    const { data } = await instance.post<IBill>(`${API_KEYS.ORDER}/${restaurant?.tableNumber}`, modifiedData);

    setResponseData(data);
  }

  const clearCartAndNavigate = useCallback(() => {
    dispatch(clearCart());
    navigate(ROUTER_KEYS.HOME);
  }, [dispatch, navigate]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (responseData) {
      timerId = setTimeout(() => {
        clearCartAndNavigate();
      }, 3000)
    }
    return () => {
      clearTimeout(timerId)
    }
  }, [responseData, clearCartAndNavigate])

  useEffect(() => {
    if (!cartItems.length && !responseData) {
      navigate(ROUTER_KEYS.HOME)
    }
  }, [cartItems.length, navigate, responseData]);

  if (responseData) {
    return (
      <BillComponent data={responseData} clearCartAndNavigate={clearCartAndNavigate} />
    );
  }

  return (
    <Grid container sx={{ height: '100%', minHeight: 'calc(100vh - 16px)', flexDirection: 'column' }}>
    <Paper sx={{ mb: 3, p: 2 }}>
      <Button
        variant='text'
        color='inherit'
        onClick={() => navigate(ROUTER_KEYS.MENU)}
      >
        <ArrowBackIosIcon color='inherit'/> Back to menu
      </Button>
    </Paper>
    <Box sx={{ mb: 2, flexGrow: 1 }}>
      <Grid container flexDirection="column" gap={2}>
        {cartItems.map((item) => (
          <Grid key={item.dish.id} item sx={{ height: 'max-content' }}>
            <DishComponent dish={item.dish} />
          </Grid>
        ))}
      </Grid>
    </Box>
    {Boolean(cartItems.length) && (
      <Grid container sx={{ minWidth: '100%', mb: 3 }} spacing={1}>
        <Grid item xs={3} md={4}>
          <Button 
            color='success' 
            variant='contained' 
            sx={{ width: '100%' }}
            onClick={() => navigate(ROUTER_KEYS.MENU)}
          >
            Add
          </Button>
        </Grid>
        <Grid item xs={3} md={4}>
          <Button 
            color='success' 
            variant='contained' 
            sx={{ width: '100%' }}
            onClick={handleOrder}
          >
            Order
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button 
            color='success' 
            variant='contained' 
            sx={{ width: '100%'}}
            onClick={() => navigate(ROUTER_KEYS.REQUEST_BILL)}
          >
            Request a bill
          </Button>
        </Grid>
      </Grid>
    )}
    <FooterComponent />
  </Grid>
  )
}