import { Grid, Paper, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_KEYS, ROUTER_KEYS } from '../../common/constants';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { instance } from '../../axios/instanse';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { removeBill } from '../../store/slices/cart/cart.slice';
import { selectCafe } from '../../store/slices/cafe/cafe.slice';

export const RequestBillPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const { cafeId, tableId } = useAppSelector(selectCafe);

  const handleChoosePaymentMethod = async (key: string) => {
    setError(false);
    const res 
      = await instance.get(`${API_KEYS.BILL}/${cafeId}/${tableId}/?type=${key}`);

    if (res.status === 200) {
      dispatch(removeBill());
      navigate(ROUTER_KEYS.SUCCESS_BILL);
    } else {
      setError(true);
    }
  }

  return (
    <Grid container sx={{ height: '100%', minHeight: 'calc(100vh - 16px)', flexDirection: 'column' }}>
    <Paper sx={{ mb: 3, p: 2 }}>
      <Button
        variant='text'
        color='inherit'
        onClick={() => navigate(ROUTER_KEYS.CART)}
      >
        <ArrowBackIosIcon color='inherit'/> Back to my order
      </Button>
    </Paper>
    <Paper sx={{ mb: 2, flexGrow: 1, p: 2 }}>
      <Box>
        <Grid container flexDirection="column" alignItems='center'>
          <Typography variant='h5' sx={{ mb: 4, textAlign: 'center' }}>How do you want to pay?</Typography>
          <Grid item>
            <Grid container flexDirection="column" gap={2} maxWidth={320}>
              <Button 
                variant='outlined' 
                color='inherit' 
                sx={{ minWidth: 300 }}
                onClick={() => handleChoosePaymentMethod('card')}
              >
                <CreditCardIcon /> Credit card
              </Button>
              <Button 
                variant='outlined' 
                color='inherit' 
                sx={{ minWidth: 300 }}
                onClick={() => handleChoosePaymentMethod('cash')}
              >
                <AttachMoneyIcon /> Cash
              </Button>
            </Grid>
          </Grid>
          {error && (
            <Grid item sx={{ mt: 5 }}>
              <Typography variant='h5' sx={{ mb: 4, textAlign: 'center' }} color='error'>
                Oops! Something wrong
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  </Grid>
  )
}