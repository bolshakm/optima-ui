import { Grid, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { checkOrder, clearCart, selectBill, selectCartItems, selectFavourites, updateBill } from '../../store/slices/cart/cart.slice';
import { useNavigate } from 'react-router-dom';
import { API_KEYS, ROUTER_KEYS, STORAGE_KEYS } from '../../common/constants';
import { BillComponent, DishComponent, FooterComponent, HeaderComponent } from '../../components';
import { useEffect, useMemo, memo, useState } from 'react';
import { instance } from '../../axios/instanse';
import { modifyData } from '../../utils/modifyCartData';
import { IBill } from '../../types/bill.interface';
import { getCafe, selectCafe } from '../../store/slices/cafe/cafe.slice';
import styles from './styles.module.css';
import { ModeEnum } from '../../types/mode.enum';
import { selectTexts } from '../../store/slices/texts.slice';

interface IProps {
  mode?: ModeEnum;
}

export const CartPage: React.FC<IProps> = memo(({ mode = null }) => {
  const cartItems = useAppSelector(selectCartItems);
  const favourites = useAppSelector(selectFavourites);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const bill = useAppSelector(selectBill);
  const { cafeId, tableId } = useAppSelector(selectCafe);
  const modeFromStorage = sessionStorage.getItem(STORAGE_KEYS.MODE);
  const [isOrdered, setIsOrdered] = useState(false);
  const { texts } = useAppSelector(selectTexts);

  useEffect(() => {
    if (mode) {
      sessionStorage.setItem(STORAGE_KEYS.MODE, mode)
    }
  }, [mode])

  const currentMode = useMemo(() => {
    if (mode) {
      return mode;
    }

    if (modeFromStorage) {
      return modeFromStorage;
    }

    return null;
  }, [mode, modeFromStorage])

  useEffect(() => {
    dispatch(getCafe({cafeId}))
  }, [dispatch, cafeId]);
    
  const handleOrder = async () => {
    if (isOrdered) {
      return;
    }

    setIsOrdered(true);

    const modifiedData = modifyData(cartItems, cafeId, tableId)
    const { data, status } 
      = await instance.post<IBill>(`${API_KEYS.ORDER}/${cafeId}/${tableId}`, modifiedData);

    if (status !== 200) {
      setIsOrdered(false)
    }
      
    dispatch(updateBill(data));
    dispatch(clearCart())
  }

  const backAddress = useMemo(() => {
    if (currentMode === ModeEnum.readonly) {
      return `${ROUTER_KEYS.MENU_READ}/${cafeId}/${tableId}`
    }

    return `${ROUTER_KEYS.MENU}/${cafeId}/${tableId}`
  }, [currentMode, cafeId, tableId]);

  useEffect(() => {  
    if (currentMode === ModeEnum.readonly) {
      if (!favourites.length) {
        navigate(backAddress)
      }
    } else {
      if (!cartItems.length && !bill.totalSum) {
        navigate(backAddress)
      }
    }
  }, [cartItems.length, navigate, bill.totalSum, favourites, backAddress, currentMode]);

  useEffect(() => {
    if (currentMode !== ModeEnum.readonly) {
      dispatch(checkOrder({cafeId, tableId}))
    }
  }, [dispatch, cafeId, tableId, currentMode])

  const totalSum = useMemo(() => {
    if (currentMode === ModeEnum.readonly) {
      return favourites.reduce((sum, item) => {
        const price = item.dish.dishVolumesAndPrice.find((vol) => vol.id === item.volumeId)?.price || 0;
  
        return sum + price;
      },0)
    }

    if (!cartItems.length) return 0;

    return cartItems.reduce((sum, item) => {
      const price = item.dish.dishVolumesAndPrice.find((vol) => vol.id === item.volumeId)?.price || 0;
      const totalItemPrice = price * item.quantity;

      return sum + totalItemPrice;
    },0)
  }, [cartItems, currentMode, favourites])

  return (
    <div className={styles.box}>
      <HeaderComponent isCut={true} addres={backAddress} />
      <div className={styles.inner}>
        <div className="container container--sm">
          {Boolean(Object.keys(bill).length) && (
            <BillComponent bill={bill} />
          )}
          {currentMode === ModeEnum.readonly ? (
            <Box sx={{ flexGrow: 1 }}>
              <div className={styles.favouritesBox}>
                <h6 className={styles.favouritesTitle}>
                  {texts['your.favourites']}
                </h6>
                <div className={styles.list}>
                  {favourites.map((item) => (
                    <div key={item.dish.id + item.volumeId}>
                      <DishComponent dish={item.dish} readonly={true} volumeId={item.volumeId} isCartItem={true} />
                    </div>
                  ))}
                </div>
              </div>
            </Box>
          ) :
          (
            <Box sx={{ flexGrow: 1 }}>
              <div className={styles.list}>
                {cartItems.map((item) => (
                  <div key={item.dish.id + item.volumeId}>
                    <DishComponent dish={item.dish} readonly={true} volumeId={item.volumeId} count={item.quantity} isCartItem={true} />
                  </div>
                ))}
              </div>
            </Box>
          )}
          {Boolean(totalSum) && (
            <div className={styles.sumBlock}>
              <span className={styles.sum}>{`${texts['total.sum']} ${totalSum.toFixed(2)}€`}</span>
            </div>
          )}
          {currentMode !== ModeEnum.readonly && (
            <Grid container sx={{ minWidth: '100%', mb: 3 }} spacing={1}>
              <Grid item xs={3} md={4}>
                <button 
                  className={styles.button}
                  onClick={() => navigate(ROUTER_KEYS.MENU)}
                >
                  {texts.add}
                </button>
              </Grid>
              <Grid item xs={3} md={4}>
                <button
                  className={styles.button}
                  onClick={handleOrder}
                  disabled={!cartItems.length}
                >
                  {texts.order}
                </button>
              </Grid>
              <Grid item xs={6} md={4}>
                <button
                  className={styles.button}
                  onClick={() => navigate(ROUTER_KEYS.REQUEST_BILL)}
                  disabled={!bill.totalSum}
                >
                  {texts['request.bill']}
                </button>
              </Grid>
            </Grid>
          )}
        </div>
      </div>
    <FooterComponent />
    </div>
  )
})