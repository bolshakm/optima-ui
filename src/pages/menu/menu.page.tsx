import { Box } from '@mui/material';
import { FooterComponent, HeaderComponent } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store/app/hooks'
import { getMenu, selectLanguage, selectMenu, setLanguage } from '../../store/slices/menu/menu.slice'
import { memo, useEffect, useMemo, useState } from 'react';
import { MenuContentComponent } from '../../components/menu-content/menu-content.component';
import { checkOrder, selectCartItems, selectFavourites } from '../../store/slices/cart/cart.slice';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTER_KEYS, STORAGE_KEYS } from '../../common/constants';
import { getCafe, selectCafe, setCafeId, setTableId } from '../../store/slices/cafe/cafe.slice';
import styles from './menu.module.css';
import { ModeEnum } from '../../types/mode.enum';
import { getTexts, selectTexts } from '../../store/slices/texts.slice';

interface IProps {
  mode?: ModeEnum;
}

export const MenuPage: React.FC<IProps> = memo(({ mode = null }) => {
  const dispatch = useAppDispatch();
  const { menu } = useAppSelector(selectMenu);
  const { cafe } = useAppSelector(selectCafe);
  const { texts } = useAppSelector(selectTexts);
  const cartItems = useAppSelector(selectCartItems);
  const favourites = useAppSelector(selectFavourites);
  const navigate = useNavigate();
  const { cafeId = "1", tableId = "1" } = useParams();
  const modeFromStorage = sessionStorage.getItem(STORAGE_KEYS.MODE);
  const language = useAppSelector(selectLanguage);
  const [isChecked, setIsChecked] = useState(false);
  
  useEffect(() => {
    if (mode) {
      sessionStorage.setItem(STORAGE_KEYS.MODE, mode);
      sessionStorage.removeItem(STORAGE_KEYS.CART);
      sessionStorage.removeItem(STORAGE_KEYS.BILL);
    } else {    
      if (modeFromStorage === ModeEnum.readonly) {
        sessionStorage.removeItem(STORAGE_KEYS.MODE)
      }

      sessionStorage.removeItem(STORAGE_KEYS.FAVOURITES)
    }
  }, [mode, modeFromStorage])

  useEffect(() => {
    if (!Boolean(Object.keys(texts).length) && language) {
      dispatch(getTexts(language))
    }
  }, [texts, language, dispatch]);

  useEffect(() => {
    dispatch(setCafeId(cafeId));    
    dispatch(setTableId(tableId));
  }, [dispatch, cafeId, tableId]);

  useEffect(() => {
    if (!cafe) {
      dispatch(getCafe({cafeId}));
    }
  }, [dispatch, cafeId, cafe]);

  useEffect(() => {   
    if (!menu) {
      dispatch(getMenu({cafeId, tableId}));
    }
  }, [dispatch, cafeId, tableId, menu]);

  useEffect(() => {
    if (mode !== ModeEnum.readonly && !isChecked) {
      setIsChecked(true);
      dispatch(checkOrder({cafeId, tableId}))
    }
  }, [dispatch, cafeId, tableId, mode, isChecked]);

  const handleNavigateToCart = () => {
    navigate(ROUTER_KEYS.CART)
  };

  const isVisibleButton = useMemo(() => {
    if (mode === ModeEnum.readonly) {
      return favourites.length > 0
    } else {
      return cartItems.length > 0
    }
  }, [mode, favourites.length, cartItems.length])

  return (
    <div className={styles.menu}>
      <HeaderComponent />
      <div className={styles.inner}>
        <div className="container container--sm">
          <Box sx={{ mb: 2, flexGrow: 1 }}>
            <MenuContentComponent />
          </Box>
          {isVisibleButton && (
            <button
              className={styles.button}
              onClick={handleNavigateToCart}
            >
              {mode === ModeEnum.readonly ? (texts['go.to.favourites']) : texts['go.to.cart']}
            </button>
          )}
        </div>
      </div>
      <FooterComponent />
    </div>
  )
})