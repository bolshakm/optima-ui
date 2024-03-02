import React, { memo, useEffect, useRef, useState } from 'react';
import { ICategory } from '../../types'
import { Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { COLORS } from '../../theme/colors';
import { DishComponent } from '../dish/dish.component';
import styles from './style.module.css';
import { useAppSelector } from '../../store/app/hooks';
import { selectLanguage } from '../../store/slices/menu/menu.slice';

interface IProps {
  category: ICategory;
  isExpanded?: boolean;
  toggleCategory: () => void;
  index: number;
}

export const CategoryItemComponent: React.FC<IProps> = memo(({ 
  category, 
  isExpanded = false, 
  toggleCategory, 
  index 
}) => {
  const laguage = useAppSelector(selectLanguage) || 'EN';
  const itemContainerRef = useRef<HTMLDivElement>(null);
  const [isTransform, setIsTransform] = useState(false);

  useEffect(() => {
    if (!isExpanded) return;
    let timeout = false;

    const timerId = setTimeout(() => {
      timeout = true;
    }, (index + 1) * 200);

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
  }, [isTransform, index, isExpanded]);

  useEffect(() => {
    if (!isExpanded) return;
    if (itemContainerRef.current) {
      itemContainerRef.current.scrollIntoView({ behavior: 'auto', block: 'start' })
    }

    setIsTransform(true);
  }, [isExpanded])
  
  return (
    <div className={styles.category} ref={itemContainerRef}>
      <button
        className={`${styles.button} ${isExpanded ? styles.stiky : ''}`}
        onClick={toggleCategory}
      >
        <Grid container sx={{ flexDirection: 'column' }}>
          <h6 className={styles.buttonText}>
            {category.multilingualNameMap?.[laguage] || category.name}
          </h6>
          <Typography sx={{ color: COLORS.GRAY }}>{category.description}</Typography>
        </Grid>
        <span className={`${styles.icon} ${isExpanded ? styles.iconReverted : ''}`}><ExpandMoreIcon /></span>
      </button>
      <div className={`${styles.list} ${isExpanded ? styles.listExpanded : ''} ${isTransform ? styles.transform : ''}`}>
        <div className={styles.dishes}>
          {category.dishes.map((dish) => (
            <DishComponent dish={dish} key={dish.id}/>
          ))}
        </div>
      </div>
    </div>
  )
})