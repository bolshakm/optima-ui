import { Box } from '@mui/material';
import { FooterComponent, HeaderComponent } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store/app/hooks'
import { getMenu, selectMenu } from '../../store/slices/menu/menu.slice'
import { memo, useEffect } from 'react';
import { MenuContentComponent } from '../../components/menu-content/menu-content.component';
import { checkOrder, selectCartItems } from '../../store/slices/cart/cart.slice';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTER_KEYS, STORAGE_KEYS } from '../../common/constants';
import { getCafe, selectCafe, setCafeId, setTableId } from '../../store/slices/cafe/cafe.slice';
import styles from './menu.module.css';
import { ModeEnum } from '../../types/mode.enum';

interface IProps {
  mode?: ModeEnum;
}

export const MenuPage: React.FC<IProps> = memo(({ mode = null }) => {
  const dispatch = useAppDispatch();
  const { menu } = useAppSelector(selectMenu);
  const { cafe } = useAppSelector(selectCafe);
  const cartItems = useAppSelector(selectCartItems);
  const navigate = useNavigate();
  const { cafeId = "1", tableId = "1" } = useParams();
  const modeFromStorage = sessionStorage.getItem(STORAGE_KEYS.MODE)

  useEffect(() => {
    if (mode) {
      sessionStorage.setItem(STORAGE_KEYS.MODE, mode)
    } else {
      if (modeFromStorage === ModeEnum.readonly) {
        sessionStorage.removeItem(STORAGE_KEYS.MODE)
      }
    }
  }, [mode, modeFromStorage])

  useEffect(() => {
    dispatch(setCafeId(cafeId));    
    dispatch(setTableId(tableId));

    if (!cafe) {
      dispatch(getCafe({cafeId}));
    }
    
    if (!menu) {
      dispatch(getMenu({cafeId, tableId}));
    }

    if (mode !== ModeEnum.readonly) {
      dispatch(checkOrder({cafeId, tableId}))
    }
  }, [dispatch, cafeId, tableId, menu, cafe, mode]);

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
})