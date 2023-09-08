import React, { memo } from 'react';
import { ICategory } from '../../types'
import { Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { COLORS } from '../../theme/colors';
import { DishComponent } from '../dish/dish.component';
import styles from './style.module.css';

interface IProps {
  category: ICategory;
  isExpanded?: boolean;
  toggleCategory: () => void;
}

export const CategoryItemComponent: React.FC<IProps> = memo(({ category, isExpanded = false, toggleCategory }) => {
  return (
    <div className={styles.category}>
      <button
        className={`${styles.button} ${isExpanded ? styles.stiky : ''}`}
        onClick={toggleCategory}
      >
        <Grid container sx={{ flexDirection: 'column' }}>
          <h6 className={styles.buttonText}>{category.name}</h6>
          <Typography sx={{ color: COLORS.GRAY }}>{category.description}</Typography>
        </Grid>
        <span className={`${styles.icon} ${isExpanded ? styles.iconReverted : ''}`}><ExpandMoreIcon /></span>
      </button>
      <div className={`${styles.list} ${isExpanded ? styles.listExpanded : ''}`}>
        <div className={styles.dishes}>
          {category.dishes.map((dish) => (
            <React.Fragment key={dish.id}><DishComponent dish={dish} /></React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
})