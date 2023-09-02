import { Grid, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { clearCart, selectBill, selectCartItems, updateBill } from '../../store/slices/cart/cart.slice';
import { useNavigate } from 'react-router-dom';
import { API_KEYS, ROUTER_KEYS } from '../../common/constants';
import { BillComponent, DishComponent, FooterComponent, HeaderComponent } from '../../components';
import { useEffect, useMemo } from 'react';
import { instance } from '../../axios/instanse';
import { modifyData } from '../../utils/modifyCartData';
import { IBill } from '../../types/bill.interface';
import { getCafe, selectCafe } from '../../store/slices/cafe/cafe.slice';
import styles from './styles.module.css';

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
    const modifiedData = modifyData(cartItems, cafeId, tableId)
    const { data } 
      = await instance.post<IBill>(`${API_KEYS.ORDER}/${cafeId}/${tableId}`, modifiedData);

    dispatch(updateBill(data));
    dispatch(clearCart())
  }

  useEffect(() => {
    if (!cartItems.length && !bill.totalSum) {
      navigate(`${ROUTER_KEYS.MENU}/${cafeId}/${tableId}`)
    }
  }, [cartItems.length, navigate, bill.totalSum, cafeId, tableId]);

  const totalSum = useMemo(() => {
    if (!cartItems.length) return 0;

    return cartItems.reduce((sum, item) => {
      const price = item.dish.dishVolumesAndPrice.find((vol) => vol.id === item.volumeId)?.price || 0;
      const totalItemPrice = price * item.quantity;

      return sum + totalItemPrice;
    },0)
  }, [cartItems])

  return (
    <div className={styles.box}>
      <HeaderComponent isCut={true} text='menu' addres={`${ROUTER_KEYS.MENU}/${cafeId}/${tableId}`} />
      <div className={styles.inner}>
        <div className="container container--sm">
          {Boolean(Object.keys(bill).length) && (
            <BillComponent bill={bill} />
          )}
          <Box sx={{ mb: 2, flexGrow: 1 }}>
            <div className={styles.list}>
              {cartItems.map((item) => (
                <div key={item.dish.id + item.volumeId}>
                  <DishComponent dish={item.dish} readonly={true} volumeId={item.volumeId} count={item.quantity} isCartItem={true} />
                </div>
              ))}
            </div>
          </Box>
          {Boolean(totalSum) && (
            <div className={styles.sumBlock}>
              <span className={styles.sum}>Total sum: {totalSum}€</span>
            </div>
          )}
          <Grid container sx={{ minWidth: '100%', mb: 3 }} spacing={1}>
            <Grid item xs={3} md={4}>
              <button 
                className={styles.button}
                onClick={() => navigate(ROUTER_KEYS.MENU)}
              >
                Add
              </button>
            </Grid>
            <Grid item xs={3} md={4}>
              <button
                className={styles.button}
                onClick={handleOrder}
                disabled={!cartItems.length}
              >
                Order
              </button>
            </Grid>
            <Grid item xs={6} md={4}>
              <button
                className={styles.button}
                onClick={() => navigate(ROUTER_KEYS.REQUEST_BILL)}
                disabled={!bill.totalSum}
              >
                Request a bill
              </button>
            </Grid>
          </Grid>
        </div>
      </div>
      
    <FooterComponent />
    </div>
  )
}