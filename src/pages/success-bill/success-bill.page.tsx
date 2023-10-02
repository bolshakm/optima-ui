import { Grid, Box } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTER_KEYS } from '../../common/constants';
import { useEffect } from 'react';
import { selectCafe } from '../../store/slices/cafe/cafe.slice';
import { useAppSelector } from '../../store/app/hooks';
import styles from './styles.module.css';
import { FooterComponent, HeaderComponent } from '../../components';
import { selectTexts } from '../../store/slices/texts.slice';

export const SuccessBillPage = () => {
  const navigate = useNavigate();
  const { cafeId, tableId } = useAppSelector(selectCafe);
  let [searchParams] = useSearchParams();
  const parent = searchParams.get('parent');
  const reason = searchParams.get('reason');
  const { texts } = useAppSelector(selectTexts);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (parent === 'actions') {
        window.history.back();
      } else {
        navigate(`${ROUTER_KEYS.MENU}/${cafeId}/${tableId}`)
      }
    }, 4000);

    return () => {
      clearTimeout(timerId);
    }
  }, [navigate, tableId, cafeId, parent])

  return (
    <div className={styles.box}>
      {parent === 'actions' ? (
        <HeaderComponent isSimple={true} />
      ) : (
        <HeaderComponent isCut={true}  addres={`${ROUTER_KEYS.MENU}/${cafeId}/${tableId}`} />
      )}
      <div className={styles.inner}>
        <Box>
          <Grid container flexDirection="column">
            {reason === 'call-waiter' ? (
              <h6 className={styles.text}>
                <span>{texts['soon.waiter']}</span>
                <span>{texts['will.come']}</span>
              </h6>
              ):(
                <h6 className={styles.text}>
                  <span className={styles.top}>{texts['thank.you']}</span>
                  <span>{texts['soon.waiter']}</span>
                  <span>{texts['will.bring']}</span>
                </h6>
              )}
          </Grid>
        </Box>
      </div>
      <FooterComponent />
    </div>
  )
}