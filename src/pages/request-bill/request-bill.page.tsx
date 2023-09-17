import { Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_KEYS, ROUTER_KEYS } from '../../common/constants';
import { ReactComponent as CreditCardIcon } from '../../assets/svg/credit_card.svg';
import { ReactComponent as AttachMoneyIcon } from '../../assets/svg/euro_symbol.svg';
import { instance } from '../../axios/instanse';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { removeBill } from '../../store/slices/cart/cart.slice';
import { selectCafe } from '../../store/slices/cafe/cafe.slice';
import { FooterComponent, HeaderComponent } from '../../components';
import styles from './styles.module.css';
import { selectTexts } from '../../store/slices/texts.slice';

export const RequestBillPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const { cafeId, tableId } = useAppSelector(selectCafe);
  const { texts } = useAppSelector(selectTexts);

  const handleChoosePaymentMethod = async (key: string) => {
    setError(false);
    const res 
      = await instance.get(`${API_KEYS.BILL}/${cafeId}/${tableId}/?type=${key}`);

    if (res.status === 200) {
      dispatch(removeBill());
      navigate(ROUTER_KEYS.SUCCESS_BILL);
    } else {
      setError(true);
    }
  }

  return (
    <div className={styles.box}>
      <HeaderComponent isCut={true} addres={ROUTER_KEYS.CART} text={texts['back.to.cart']}/>
      <div className={styles.inner}>
        <Box>
          <Grid container flexDirection="column" alignItems='center'>
            <h6 className={styles.question}>{texts['how.pay']}</h6>
            <Grid item>
              <div className={styles.buttons}>
                <button
                  className={styles.button}
                  onClick={() => handleChoosePaymentMethod('card')}
                >
                  <CreditCardIcon />{texts['credit.card']}
                </button>
                <button
                  className={styles.button}
                  onClick={() => handleChoosePaymentMethod('cash')}
                >
                  <AttachMoneyIcon />{texts.cash}
                </button>
              </div>
            </Grid>
            {error && (
              <Grid item sx={{ mt: 5 }}>
                <Typography variant='h5' sx={{ mb: 4, textAlign: 'center' }} color='error'>
                  Oops! Something wrong
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </div>
    <FooterComponent />
  </div>
  )
}