import { Box, Button, Grid } from '@mui/material';
import { FooterComponent, HeaderComponent } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store/app/hooks'
import { getMenu } from '../../store/slices/menu/menu.slice'
import { useEffect } from 'react';
import { MenuContentComponent } from '../../components/menu-content/menu-content.component';
import { selectCartItems } from '../../store/slices/cart/cart.slice';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTER_KEYS } from '../../common/constants';
import { getCafe, setCafeId, setTableId } from '../../store/slices/cafe/cafe.slice';
import styles from './menu.module.css';

export const MenuPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const navigate = useNavigate();
  const { cafeId = "1", tableId = "1" } = useParams();

  useEffect(() => {
    dispatch(setCafeId(cafeId));    
    dispatch(setTableId(tableId));
    dispatch(getCafe({cafeId}));
    dispatch(getMenu({cafeId, tableId}));
  }, [dispatch, cafeId, tableId]);

  const handleNavigateToCart = () => {
    navigate(ROUTER_KEYS.CART)
  };

  return (
    <div className={styles.menu}>
      <HeaderComponent />
      <div className={styles.inner}>
        <div className="container container--sm">
          <Box sx={{ mb: 2, flexGrow: 1 }}>
            <MenuContentComponent />
          </Box>
          {Boolean(cartItems.length) && (
            <button
              className={styles.button}
              onClick={handleNavigateToCart}
            >
              Go to cart
            </button>
          )}
        </div>
      </div>
      
      <FooterComponent />
    </div>
  )
}