import { Grid, Paper, Box, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { clearCart, selectBill, selectCartItems, updateBill } from '../../store/slices/cart/cart.slice';
import { useNavigate } from 'react-router-dom';
import { API_KEYS, ROUTER_KEYS } from '../../common/constants';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { BillComponent, DishComponent, FooterComponent } from '../../components';
import { useEffect } from 'react';
import { instance } from '../../axios/instanse';
import { modifyData } from '../../utils/modifyCartData';
import { IBill } from '../../types/bill.interface';
import { getCafe, selectCafe } from '../../store/slices/cafe/cafe.slice';

export const CartPage = () => {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const bill = useAppSelector(selectBill);
  const { cafeId, tableId } = useAppSelector(selectCafe);

  useEffect(() => {
    dispatch(getCafe({cafeId}))
  }, [dispatch, cafeId]);
    
  const handleOrder = async () => {
    const modifiedData = modifyData(cartItems, 1)
    const { data } 
      = await instance.post<IBill>(`${API_KEYS.ORDER}/${cafeId}/${tableId}`, modifiedData);

    dispatch(updateBill(data));
    dispatch(clearCart())
  }

  useEffect(() => {
    if (!cartItems.length && !bill.totalSum) {
      navigate(`${ROUTER_KEYS.MENU}/${cafeId}/${tableId}`)
    }
  }, [cartItems.length, navigate, bill.totalSum]);

  return (
    <Grid container sx={{ height: '100%', minHeight: 'calc(100vh - 16px)', flexDirection: 'column' }}>
    <Paper sx={{ mb: 3, p: 2 }}>
      <Button
        variant='text'
        color='inherit'
        onClick={() => navigate(`${ROUTER_KEYS.MENU}/${cafeId}/${tableId}`)}
      >
        <ArrowBackIosIcon color='inherit'/> Back to menu
      </Button>
    </Paper>
    {bill.totalSum && (
      <BillComponent bill={bill} />
    )}
    <Box sx={{ mb: 2, flexGrow: 1 }}>
      <Grid container flexDirection="column" gap={1}>
        {cartItems.map((item) => (
          <Grid key={item.dish.id} item sx={{ height: 'max-content' }}>
            <DishComponent dish={item.dish} />
          </Grid>
        ))}
      </Grid>
    </Box>
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
          disabled={!cartItems.length}
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
          disabled={!bill.totalSum}
        >
          Request a bill
        </Button>
      </Grid>
    </Grid>
    <FooterComponent />
  </Grid>
  )
}