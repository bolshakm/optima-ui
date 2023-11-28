import { useNavigate, useParams } from 'react-router-dom';
import { API_KEYS, ROUTER_KEYS, STORAGE_KEYS } from '../../common/constants';
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
import { getTexts, selectTexts } from '../../store/slices/texts.slice';
import { Language } from '../../types';

export const ActionsPage = () => {
  const dispatch = useAppDispatch();
  const { cafe } = useAppSelector(selectCafe);
  const navigate = useNavigate();
  const { cafeId = "1", tableId = "1" } = useParams();
  const language = localStorage.getItem(STORAGE_KEYS.LANG) as Language;
  const { texts } = useAppSelector(selectTexts);

  useEffect(() => {
    if (!Boolean(Object.keys(texts).length) && language) {
      dispatch(getTexts(language))
    }
  }, [texts, language, dispatch]);

  useEffect(() => {
    if (cafe && !language) {
      localStorage.setItem(STORAGE_KEYS.LANG, cafe.defLang.toUpperCase())
    }
  }, [language, cafe])

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
        navigate(`${ROUTER_KEYS.SUCCESS_BILL}?parent=actions&reason=call-waiter`)
      } 
    } catch (err) {
      console.error(err);
    }
  }

  const handleChoosePaymentMethod = async (key: string) => {
    const res 
      = await instance.get(`${API_KEYS.BILL}/${cafeId}/${tableId}/?type=${key}`);

    if (res.status === 200) {
      navigate(`${ROUTER_KEYS.SUCCESS_BILL}?parent=actions`);
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
              <HandIcon /> {texts['have.question']}
            </button>
            <button
              className={styles.button}
              onClick={() => handleChoosePaymentMethod('cash')}
            >
              <Payments /> {texts['bill.cash']}
            </button>
            <button
              className={styles.button}
              onClick={() => handleChoosePaymentMethod('card')}
            >
              <CreditCardIcon /> {texts['bill.card']}
            </button>
            {/* <a
              href={cafe?.googleReview}
              target='_blank'
              rel="noreferrer"
              className={styles.button}
            >
              <ReviewsIcon /> Rate and review
            </a> */}
          </div>
        </div>
      </div>
    <FooterComponent />
  </div>
  )
}