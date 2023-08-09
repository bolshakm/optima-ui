import { Box, Button, Grid } from '@mui/material';
import { FooterComponent, HeaderComponent } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store/app/hooks'
import { getMenu } from '../../store/slices/menu/menu.slice'
import { useEffect } from 'react';
import { MenuContentComponent } from '../../components/menu-content/menu-content.component';
import { selectCartItems } from '../../store/slices/cart/cart.slice';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '../../common/constants';
import { MOCK } from '../../common/mockData';

export const MenuPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const navigate = useNavigate();

  const { cafeId, tableId } = MOCK;

  useEffect(() => {
    dispatch(getMenu({cafeId, tableId}))
  }, [dispatch]);

  const handleNavigateToCart = () => {
    navigate(ROUTER_KEYS.CART)
  };

  return (
    <Grid container sx={{ height: '100%', minHeight: 'calc(100vh)', flexDirection: 'column' }}>
      <Box sx={{ mb: 3 }}>
        <HeaderComponent />
      </Box>
      <Box sx={{ mb: 2, flexGrow: 1 }}>
        <MenuContentComponent />
      </Box>
      {Boolean(cartItems.length) && (
        <Grid container sx={{ width: '100%', mb: 3, justifyContent: 'flex-end' }}>
          <Button 
            color='success' 
            variant='contained' 
            sx={{ width: '100%', maxWidth: 400 }}
            onClick={handleNavigateToCart}
          >
            Go to cart
          </Button>
        </Grid>
      )}
      <FooterComponent />
    </Grid>
  )
}