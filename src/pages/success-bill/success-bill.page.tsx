import { Grid, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '../../common/constants';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect } from 'react';
import { selectCafe } from '../../store/slices/cafe/cafe.slice';
import { useAppSelector } from '../../store/app/hooks';
import styles from './styles.module.css';
import { FooterComponent, HeaderComponent } from '../../components';

export const SuccessBillPage = () => {
  const navigate = useNavigate();
  const { cafeId, tableId } = useAppSelector(selectCafe);

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     navigate(`${ROUTER_KEYS.MENU}/${cafeId}/${tableId}`)
  //   }, 4000);

  //   return () => {
  //     clearTimeout(timerId);
  //   }
  // }, [navigate, tableId, cafeId])

  return (
    <div className={styles.box}>
      <HeaderComponent isCut={true} text='menu' addres={`${ROUTER_KEYS.MENU}/${cafeId}/${tableId}`} />
      <div className={styles.inner}>
        <Box>
          <Grid container flexDirection="column">
            <h6 className={styles.text}>
              Thank you! <br/>
              Soon waiter will bring you a bill.
            </h6>
          </Grid>
        </Box>
      </div>
      <FooterComponent />
    </div>
  )
}