import { CircularProgress, Grid } from '@mui/material';
import { useAppSelector } from '../../store/app/hooks';
import { selectMenu } from '../../store/slices/menu/menu.slice';
import { LoadingStatus } from '../../types';
import { CategoryItemComponent, ErrorComponent } from '..';
import { useState } from 'react';

import styles from './styles.module.css'
import { selectTexts } from '../../store/slices/texts.slice';
import { CombinationComponent } from '../combination';

export const MenuContentComponent = () => {
  const { menu, status } = useAppSelector(selectMenu);
  const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(null);
  const [isExpandedCombination, setIsExpandedCombination] = useState(false);
  const { texts } = useAppSelector(selectTexts);

  const toggleCategoryId = (categoryId: number) => {
    setExpandedCategoryId(expandedCategoryId === categoryId ? null : categoryId);
    setIsExpandedCombination(false);
  };

  const handleToggleCombination = () => {
    setIsExpandedCombination(!isExpandedCombination);
    setExpandedCategoryId(null);
  }

  if (status === LoadingStatus.failed) {
    return <ErrorComponent title={texts['default.error']} />
  }

  if (status === LoadingStatus.loading) {
    return (
    <Grid container sx={{ height: '60vh', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress size={80} color='inherit' />
    </Grid>
    )
  }

  return (
    <div className={styles.list}>
      {Boolean(menu?.combinations?.length) && (
        <>{
          menu?.combinations?.map((combination) => (
            <CombinationComponent 
              key={combination.id}
              combination={combination}
              isOpen={isExpandedCombination} 
              toggleOpen={handleToggleCombination} 
            />
          ))
        }</>
      )}
      {menu?.categories?.map((category, idx) => {
        return (
          <CategoryItemComponent
            key={category.id + category.name}
            category={category}
            isExpanded={expandedCategoryId === category.id}
            toggleCategory={() => toggleCategoryId(category.id)}
            index={idx}
          />
        )
      })}
    </div>
  )
}