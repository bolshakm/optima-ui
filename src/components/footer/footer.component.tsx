import { useState } from 'react';
import { Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { ReactComponent as TripAdvisor } from '../../assets/svg/tripadvisor.svg'
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/app/hooks';
import { selectCafe } from '../../store/slices/cafe/cafe.slice';
import { ReactComponent as Expand } from '../../assets/svg/expand_more.svg';
import styles from './styles.module.css';
import { IWorkingHours } from '../../types';
import { selectTexts } from '../../store/slices/texts.slice';

export const FooterComponent = () => {
  const { cafe } = useAppSelector(selectCafe);
  const [isExpanded, setIsExpanded] = useState(false);
  const { texts } = useAppSelector(selectTexts);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }) as keyof IWorkingHours;

  return (
  <div className={styles.box}>
    <div className="container">
        <Grid container spacing={3}>
          {cafe && cafe.address && (
            <Grid item xs={12} sm={6} md={4}>
              <Grid container flexDirection='column' gap={1}>
                <h6 className={styles.title}>{texts.address || 'Our adress'}</h6>
                <p className={styles.text}>{cafe.address}</p>{}
              </Grid>
            </Grid>
          )}
        {cafe && Boolean(Object.keys(cafe.workingHours).length) && (
          <Grid item xs={12} sm={6} md={4}>
            <div className={styles.list}>
              <h6 className={styles.title}>{texts['working.hours']}</h6>
              <button className={styles.button} onClick={() => setIsExpanded(!isExpanded)}>
                <p className={styles.text}>{cafe.workingHours[today]}</p>
                <span className={`${styles.icon} ${isExpanded ? styles.iconRevert : ''}`}><Expand /></span>
              </button>
              <div className={`${styles.list} ${!isExpanded ? styles.hidden : ''}`}>
                {Object.entries(cafe.workingHours).map(([day, hours]) => (
                  <div className={styles.item} key={day + hours}>
                    <p className={`${styles.text} ${styles.day}`}>{day}</p>
                    <p className={styles.text}>{hours}</p>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={4}>
          <div className={styles.list}>
            <h6 className={styles.title}>{texts['social.network']}</h6>
            <Link to={cafe?.facebook || '/'} style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className={styles.item}>
                <FacebookIcon /> <span className={styles.text}>Facebook</span>
              </div>
            </Link>
            <Link to={cafe?.instagram || '/'} style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className={styles.item}>
                <InstagramIcon /> <span className={styles.text}>Instagram</span>
              </div>
            </Link>
            <Link to={cafe?.tripAdvisor || '/'} style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className={styles.item}>
                <TripAdvisor /><span className={styles.text}>TripAdvisor</span>
              </div>
            </Link>
          </div>
        </Grid>
      </Grid>
    </div>
   
    <div className={styles.bottom}>
      {texts['created.by']} <a href='/' target='_blank' className={styles.link}>Optima</a>
    </div>
  </div>
)}