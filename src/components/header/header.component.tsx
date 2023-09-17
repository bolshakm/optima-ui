import { Badge, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { API_KEYS, ROUTER_KEYS, STORAGE_KEYS } from '../../common/constants';
import { useAppSelector } from '../../store/app/hooks';
import { selectBill, selectCartItems, selectFavourites } from '../../store/slices/cart/cart.slice';
import { instance } from '../../axios/instanse';
import { useState, useMemo } from 'react';
import { selectCafe } from '../../store/slices/cafe/cafe.slice';
import { ReactComponent as Hand } from '../../assets/svg/back_hand.svg';
import { ReactComponent as Bag } from '../../assets/svg/shopping_bag.svg';
import { ReactComponent as Favourite } from '../../assets/svg/favorite.svg'

import styles from './header.module.css'
import { ModeEnum } from '../../types/mode.enum';
import { LanguageComponent } from '../language';
import { selectTexts } from '../../store/slices/texts.slice';

interface IProps {
  isCut?: boolean;
  addres?: string;
  text?: string;
  isSimple?: boolean;
}

export const HeaderComponent: React.FC<IProps> = ({ isCut = false, addres = '', text = null, isSimple = false }) => {
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartItems);
  const favourites = useAppSelector(selectFavourites);
  const bill = useAppSelector(selectBill);
  const [isCallToWaiter, setIsCallTowaiter] = useState(false);
  const { cafe, cafeId, tableId } = useAppSelector(selectCafe);
  const mode = sessionStorage.getItem(STORAGE_KEYS.MODE);
  const { texts } = useAppSelector(selectTexts);

  const isCartEmpty = useMemo(() => {
    if (mode === ModeEnum.readonly) {
      return favourites.length === 0
    } else {
      return cartItems.length === 0
    }
  }, [mode, cartItems.length, favourites.length])

  const handleNavigateToCart = () => {
    navigate(ROUTER_KEYS.CART)
  }

  const handleCallTowaiter = async () => {
    setIsCallTowaiter(true);

    if (mode === ModeEnum.readonly) {
      navigate(`${ROUTER_KEYS.MENU_ACTIONS}/${cafeId}/${tableId}`)
    } else {
      try {
        const { status } = await instance.get(`${API_KEYS.WAITER}/${cafeId}/${tableId}`);
  
        if (status !== 200) {
          setIsCallTowaiter(false);
        } 
      } catch (err) {
        console.error(err);
      }
    }
  }

  if (isSimple) {
    return (
      <div className={`${styles.header} ${styles.headerSm}`}>
        <div className={styles.content}>
          <Grid container justifyContent='center' alignItems='center'>
            <h3 className={styles.companyName}>{cafe?.name}</h3>
          </Grid>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <div className='container'>
          <div className={styles.inner}>
            {isCut ? (
              <div className={styles.backButton}>
                <button
                  onClick={() => navigate(addres)}
                >
                  <ArrowBackIosIcon color='inherit'/> {text || texts['back.to.menu']}
                </button>
              </div>
            ) : (<h3 className={styles.companyName}>{cafe?.name}</h3>)}
            <div className={styles.buttons}>
              <LanguageComponent />
              <button
                disabled={isCallToWaiter} 
                onClick={handleCallTowaiter}
                className={styles.button}
              >
                <Hand width={28} height={27} />
                {isCallToWaiter && (
                  <div className={styles.circle} />
                )}
                <h6 className={styles.text}>
                  {texts['call.waiter']}
                </h6>
              </button>
              <button
                disabled={isCartEmpty && !bill.totalSum} 
                onClick={handleNavigateToCart}
                className={styles.button}
                style={{ visibility: isCut ? 'hidden' : 'visible' }}
              >
                {mode === ModeEnum.readonly ? (
                  <Favourite className={`${styles.favourite} ${isCartEmpty ? '' : styles.favouriteActive}`} />
                ) :(
                  <Badge variant='dot' invisible={isCartEmpty} color='error'>
                    <Bag width={31} height={30} />
                  </Badge>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}