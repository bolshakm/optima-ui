import { Grid, Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { API_KEYS, ROUTER_KEYS } from '../../common/constants';
import { ReactComponent as CreditCardIcon } from '../../assets/svg/credit_card.svg';
import { ReactComponent as AttachMoneyIcon } from '../../assets/svg/euro_symbol.svg';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { getCafe, selectCafe, setCafeId, setTableId } from '../../store/slices/cafe/cafe.slice';
import { FooterComponent, HeaderComponent } from '../../components';
import styles from './styles.module.css';

export const RequestBillPage = () => {
  const dispatch = useAppDispatch();
  const { cafe } = useAppSelector(selectCafe);
  const navigate = useNavigate();
  const { cafeId = "1", tableId = "1" } = useParams();

  useEffect(() => {
    dispatch(setCafeId(cafeId));    
    dispatch(setTableId(tableId));

    if (!cafe) {
      dispatch(getCafe({cafeId}));
    }
  }, [dispatch, cafeId, tableId, cafe]);


  return (
    <div className={styles.box}>
      <HeaderComponent isSimple={true} />
      <div className={styles.inner}>
        <Box>
          <Grid container flexDirection="column" alignItems='center'>
            <Grid item>
              <div className={styles.buttons}>
                <button
                  className={styles.button}
                  onClick={() => {}}
                >
                  <CreditCardIcon /> Credit card
                </button>
                <button
                  className={styles.button}
                  onClick={() => {}}
                >
                  <AttachMoneyIcon /> Cash
                </button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    <FooterComponent />
  </div>
  )
}