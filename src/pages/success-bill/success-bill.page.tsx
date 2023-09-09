import { Grid, Paper, Box, Button } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTER_KEYS } from '../../common/constants';
import { useEffect } from 'react';
import { selectCafe } from '../../store/slices/cafe/cafe.slice';
import { useAppSelector } from '../../store/app/hooks';
import styles from './styles.module.css';
import { FooterComponent, HeaderComponent } from '../../components';

export const SuccessBillPage = () => {
  const navigate = useNavigate();
  const { cafeId, tableId } = useAppSelector(selectCafe);
  let [searchParams] = useSearchParams();
  const parent = searchParams.get('parent')
  const reason = searchParams.get('reason')

  useEffect(() => {
    const timerId = setTimeout(() => {
      navigate(`${ROUTER_KEYS.MENU}/${cafeId}/${tableId}`)
    }, 4000);

    return () => {
      clearTimeout(timerId);
    }
  }, [navigate, tableId, cafeId])

  return (
    <div className={styles.box}>
      {parent === 'options' ? (
        <HeaderComponent isSimple={true} />
      ) : (
        <HeaderComponent isCut={true} text='menu' addres={`${ROUTER_KEYS.MENU}/${cafeId}/${tableId}`} />
      )}
      <div className={styles.inner}>
        <Box>
          <Grid container flexDirection="column">
            {reason === 'call-waiter' ? (
              <h6 className={styles.text}>
                <span>Soon the waiter</span>
                <span>will come up to you.</span>
              </h6>
              ):(
                <h6 className={styles.text}>
                  <span className={styles.top}>Thank you!</span>
                  <span>Soon waiter</span>
                  <span>will bring you a bill.</span>
                </h6>
              )}
          </Grid>
        </Box>
      </div>
      <FooterComponent />
    </div>
  )
}