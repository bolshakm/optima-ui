import { useNavigate, useParams } from 'react-router-dom';
import { API_KEYS, ROUTER_KEYS } from '../../common/constants';
import { ReactComponent as CreditCardIcon } from '../../assets/svg/credit_card.svg';
import { ReactComponent as HandIcon } from '../../assets/svg/back_hand.svg';
import { ReactComponent as ReviewsIcon } from '../../assets/svg/reviews.svg';
import { ReactComponent as Payments } from '../../assets/svg/payments.svg';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { getCafe, selectCafe, setCafeId, setTableId } from '../../store/slices/cafe/cafe.slice';
import { FooterComponent, HeaderComponent } from '../../components';
import styles from './styles.module.css';
import { instance } from '../../axios/instanse';

export const OptionsPage = () => {
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

  
  const handleCallTowaiter = async () => {
    try {
      const { status } = await instance.get(`${API_KEYS.WAITER}/${cafeId}/${tableId}`);

      if (status === 200) {
        navigate(`${ROUTER_KEYS.SUCCESS_BILL}?parent=options&reason=call-waiter`)
      } 
    } catch (err) {
      console.error(err);
    }
  }

  const navigateToReview = () => {
    if (cafe?.googleReview) {
      navigate(cafe.googleReview)
    }
  }

  const handleChoosePaymentMethod = async (key: string) => {
    const res 
      = await instance.get(`${API_KEYS.BILL}/${cafeId}/${tableId}/?type=${key}`);

    if (res.status === 200) {
      navigate(`${ROUTER_KEYS.SUCCESS_BILL}?parent=options`);
    }
  }

  return (
    <div className={styles.box}>
      <HeaderComponent isSimple={true} />
      <div className={styles.inner}>
        <div className='container'>
          <div className={styles.buttons}>
            <button
              className={styles.button}
              onClick={handleCallTowaiter}
            >
              <HandIcon /> I have a question
            </button>
            <button
              className={styles.button}
              onClick={() => handleChoosePaymentMethod('cash')}
            >
              <Payments /> Bill, please. I pay by cash
            </button>
            <button
              className={styles.button}
              onClick={() => handleChoosePaymentMethod('card')}
            >
              <CreditCardIcon /> Bill, please. I pay by card
            </button>
            <button
              className={styles.button}
              onClick={navigateToReview}
            >
              <ReviewsIcon /> Rate and review
            </button>
          </div>
        </div>
      </div>
    <FooterComponent />
  </div>
  )
}