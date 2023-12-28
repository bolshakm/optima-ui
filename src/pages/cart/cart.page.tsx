import { Grid, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { ICombinationItem, checkOrder, clearCart, selectBill, selectCartItems, selectCombinations, selectFavourites, updateBill } from '../../store/slices/cart/cart.slice';
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
import { CartItemComponent } from '../../components/combination-item/cart-item';
import { CombinationItemComponent } from '../../components/combination-item';
import { modifyCombinationData } from '../../utils/modifyCombinationData';

interface IProps {
  mode?: ModeEnum;
}

interface IComment {
  [key: string]: string;
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
  const [comments, setComments] = useState({});
  const [combinationComments, setCombinationComments] = useState<IComment>({});
  const combinations = useAppSelector(selectCombinations);
  const [combinationToUpdate, setCombinationToUpdate] = useState<ICombinationItem | null>(null);

  useEffect(() => {
    cartItems.forEach((item) => {
      setComments((curr) => ({
        ...curr,
        [`${item.dish.id}-${item.volumeId}`]: '',
      }))
    })
  }, [cartItems]);

  useEffect(() => {
    combinations.forEach((item: ICombinationItem) => {
      setCombinationComments((curr) => ({
        ...curr,
        [item.id]: '',
      }))
    })
  }, [combinations]);
  
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

    const combinationsForms = modifyCombinationData(combinations, combinationComments)
    const modifiedData = modifyData(cartItems, cafeId, tableId, comments)
    const { data, status } 
      = await instance.post<IBill>(`${API_KEYS.ORDER}/${cafeId}/${tableId}`, {...modifiedData, combinationsForms});

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
      if (!favourites.length && !combinations.length && !Boolean(combinationToUpdate)) {
        navigate(backAddress)
      }
    } else {
      if (!cartItems.length && !bill.totalSum && !combinations.length && !Boolean(combinationToUpdate)) {
        navigate(backAddress)
      }
    }
  }, [
    cartItems.length, 
    navigate, 
    bill.totalSum, 
    favourites, 
    backAddress, 
    currentMode, 
    combinations.length, 
    combinationToUpdate
  ]);

  useEffect(() => {
    if (currentMode !== ModeEnum.readonly) {
      dispatch(checkOrder({cafeId, tableId}))
    }
  }, [dispatch, cafeId, tableId, currentMode])

  const totalSum = useMemo(() => {
    const totalCombinationsSum = combinations.reduce((sum, combination) => {
      
      return sum + combination.totalPrice * combination.qty
    }, 0);

    if (currentMode === ModeEnum.readonly) {
      return favourites.reduce((sum, item) => {
        const price = item.dish.dishVolumesAndPrice.find((vol) => vol.id === item.volumeId)?.price || 0;
        const extraPrice = item.extras.reduce((acc, extra) => acc + extra.price, 0)
  
        return sum + price + extraPrice;
      }, 0) + totalCombinationsSum
    }

    if (!cartItems.length && !combinations.length) return 0;

    return cartItems.reduce((sum, item) => {
      const price = item.dish.dishVolumesAndPrice.find((vol) => vol.id === item.volumeId)?.price || 0;
      const extraPrice = item.extras.reduce((acc, extra) => acc + extra.price, 0)
      const totalItemPrice = (price + extraPrice) * item.quantity;

      return sum + totalItemPrice;
    }, 0) + totalCombinationsSum
  }, [cartItems, currentMode, favourites, combinations])

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
                    <DishComponent 
                      dish={item.dish} 
                      readonly={true} 
                      volumeId={item.volumeId} 
                      count={item.quantity} 
                      isCartItem={true}
                      comments={comments}
                      setComments={setComments}
                    />
                  </div>
                ))}
              </div>
            </Box>
          )}
          <div className={styles.combinationWrapper}>
            {Boolean(combinations.length) && (
              <>
                {combinations.filter((el) => el.id !== combinationToUpdate?.id)
                  .map((el) => (
                    <CartItemComponent
                      combination={el.combination}
                      dishes={el.orderedDishesForms}
                      combinationId={el.id}
                      key={el.id}
                      price={el.totalPrice}
                      withComment={true}
                      qty={el.qty}
                      value={combinationComments[el.id]}
                      setComments={setCombinationComments}
                      editFn={() => setCombinationToUpdate(el)}
                    />
                ))}
              </>
            )}
            {combinationToUpdate && (
              <CombinationItemComponent
                combination={combinationToUpdate.combination} 
                dishes={combinationToUpdate.orderedDishesForms}
                combinationId={combinationToUpdate.id}
                editFn={() => setCombinationToUpdate(null)}
              />
            )}
          </div>
          
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
                  disabled={(!cartItems.length && !combinations.length) || Boolean(combinationToUpdate)}
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