import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../store/app/hooks';
import { selectLanguage, selectMenu } from '../../store/slices/menu/menu.slice';
import styles from './styles.module.css';
import { Grid } from '@mui/material';
import { ICombination } from '../../types/combination.interface';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CombinationItemComponent } from '../combination-item/combination-item.component';

interface IProps {
  isOpen: boolean;
  combination: ICombination;
  toggleOpen: () => void;
}

export const CombinationComponent: React.FC<IProps> = ({
  isOpen = false,
  combination,
  toggleOpen,
}) => {
  const { menu } = useAppSelector(selectMenu);
  const laguage = useAppSelector(selectLanguage) || 'EN';
  const itemContainerRef = useRef<HTMLDivElement>(null);
  const [isTransform, setIsTransform] = useState(false);
  const [count, setCount] = useState(1);

  const handleIncreaseCount = () => {
    setCount((curr) => curr + 1)
  }

  useEffect(() => {
    if (!isOpen) return;
    let timeout = false;

    const timerId = setTimeout(() => {
      timeout = true;
    }, 200);

    const handleScroll = () => {
      if (isTransform && timeout) {
        setIsTransform(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      clearTimeout(timerId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTransform, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (itemContainerRef.current) {
      itemContainerRef.current.scrollIntoView({ behavior: 'auto', block: 'start' })
    }

    setIsTransform(true);
  }, [isOpen])

  if (!menu) {
    return null;
  }

  return (
    <div className={styles.category} ref={itemContainerRef}>
      <button
        className={`${styles.button} ${isOpen ? styles.stiky : ''}`}
        onClick={toggleOpen}
      >
        <Grid container sx={{ flexDirection: 'column' }}>
          <h6 className={styles.buttonText}>
            {combination.multilingualNameMap?.[laguage] || combination.name}
          </h6>
          <p className={styles.buttonSubtext}>
            {combination.availableTime}
          </p>
        </Grid>
        <span className={`${styles.icon} ${isOpen ? styles.iconReverted : ''}`}><ExpandMoreIcon /></span>
      </button>
      <div className={`${styles.list} ${isOpen ? styles.listExpanded : ''} ${isTransform ? styles.transform : ''}`}>
        <div className={styles.combinationInner}>
          <div className={styles.combinationHeader}>
            <div className={styles.combinationWarning}>
              Sorry, menu del dia is not available now.<br/>
              Available on 
              {' '}
              {combination.availableTime}
            </div>
            <div className={styles.combinationPrice}>
              {combination.price}€
            </div>
            <div className={styles.combinationDescription}>
              {combination.multilingualDescriptionMap?.[laguage] || combination.description}
            </div>
          </div>
          <div className={styles.combinationList}>
            {[...Array(count)].map((_, idx) => (
              <CombinationItemComponent 
                combination={combination} 
                key={`${Math.random()}-${idx}`} 
              />
            ))}
          </div>
        </div>
        <div className={styles.combinationFooter}>
          <button className={styles.combinationBtn} onClick={handleIncreaseCount}>
            Add more menu del dia
          </button>
        </div>
      </div>
    </div>
  )
}