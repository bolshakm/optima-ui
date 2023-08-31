import { Badge } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { API_KEYS, ROUTER_KEYS } from '../../common/constants';
import { useAppSelector } from '../../store/app/hooks';
import { selectBill, selectCartItems } from '../../store/slices/cart/cart.slice';
import { instance } from '../../axios/instanse';
import { useState } from 'react';
import { selectCafe } from '../../store/slices/cafe/cafe.slice';
import { ReactComponent as Hand } from '../../assets/svg/back_hand.svg';
import { ReactComponent as Bag } from '../../assets/svg/shopping_bag.svg';

import styles from './header.module.css'

interface IProps {
  isCut?: boolean;
  addres?: string;
  text?: string;
}

export const HeaderComponent: React.FC<IProps> = ({ isCut = false, addres = '', text = '' }) => {
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartItems);
  const bill = useAppSelector(selectBill);
  const { cafe } = useAppSelector(selectCafe);
  const IsCartEmpty = cartItems.length === 0;
  const [isCallToWaiter, setIsCallTowaiter] = useState(false);
  const { cafeId, tableId } = useAppSelector(selectCafe);

  const handleNavigateToCart = () => {
    navigate(ROUTER_KEYS.CART)
  }

  const handleCallTowaiter = async () => {
    try {
      const { status } = await instance.get(`${API_KEYS.WAITER}/${cafeId}/${tableId}`);

      if (status === 200) {
        setIsCallTowaiter(true);
      } 
    } catch (err) {
      console.error(err);
    }
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
                  <ArrowBackIosIcon color='inherit'/> {`Back to ${text}`}
                </button>
              </div>
            ) : (<h3 className={styles.companyName}>{cafe?.name}</h3>)}
            <div className={styles.buttons}>
              <button
                disabled={isCallToWaiter} 
                onClick={handleCallTowaiter}
                className={styles.button} 
              >
                <Hand width={18} height={18} />
                {isCallToWaiter && (
                  <div className={styles.circle} />
                )}
                <h6 className={styles.text}>
                  Call waiter
                </h6>
              </button>
              <button
                disabled={IsCartEmpty && !bill.totalSum} 
                onClick={handleNavigateToCart}
                className={styles.button}
                style={{ visibility: isCut ? 'hidden' : 'visible' }}
              >
                <Badge variant='dot' invisible={IsCartEmpty} color='error'>
                  <Bag width={20} height={20} />
                </Badge>
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}