import { CircularProgress, Grid } from '@mui/material';
import { useAppSelector } from '../../store/app/hooks';
import { selectMenu } from '../../store/slices/menu/menu.slice';
import { LoadingStatus } from '../../types';
import { CategoryItemComponent, ErrorComponent } from '..';
import { useEffect, useState } from 'react';
import { scrollToTop } from '../../utils/scrollToTop';

import styles from './styles.module.css'

export const MenuContentComponent = () => {
  const { menu, status } = useAppSelector(selectMenu);
  const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(null);

  const toggleCategoryId = (categoryId: number) => {
    setExpandedCategoryId(expandedCategoryId === categoryId ? null : categoryId);
  };

  useEffect(() => {
    scrollToTop()
  }, [expandedCategoryId])


  if (status === LoadingStatus.failed) {
    return <ErrorComponent title='Problem with fetching data' />
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
      
      {menu?.categories?.map((category) => {
        if (expandedCategoryId) {
          if (category.id === expandedCategoryId) {
            return (
              <CategoryItemComponent
                key={category.id + category.name}
                category={category}
                isExpanded={true}
                toggleCategory={() => toggleCategoryId(category.id)}
              />
            )
          } else {
            return null;
          }
        } else {
          return (
            <CategoryItemComponent
              key={category.id + category.name}
              category={category}
              toggleCategory={() => toggleCategoryId(category.id)}
            />
          )
        }
      })}
    </div>
  )
}