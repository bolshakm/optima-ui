import React, { memo, useState } from 'react';
import { IDish } from '../../types'
import { Grid, Box } from '@mui/material';
import { CounterComponent } from '../counter/counter.component';
import { useAppSelector } from '../../store/app/hooks';
import { selectCartItems } from '../../store/slices/cart/cart.slice';
import styles from './style.module.css';
import { DedscriptionComponent } from './description.component';
import { PriceComponent } from './price.component';

interface IProps {
  dish: IDish;
  readonly?: boolean;
  count?: number;
  volumeId?: number;
  isCartItem?: boolean;
  isBillItem?: boolean;
}

export const DishComponent: React.FC<IProps> = memo(({ 
  dish, 
  readonly = false, 
  count, 
  volumeId, 
  isCartItem = false 
}) => {
  const cartItems = useAppSelector(selectCartItems);
  const [choosenVolumeId, setChoosenVolumeId] = useState(volumeId || dish.dishVolumesAndPrice[0].id);

  const isDishAddedToCart = cartItems.some((item) => item.dish.id === dish.id && item.volumeId === choosenVolumeId);

  const changeVolumeId = (id: number) => {
    setChoosenVolumeId(id)
  }

  return (
    <div className={`${styles.dish} ${isDishAddedToCart ? styles.checked : ''}`}>
      <div className={styles.content}>
        <Grid container flexDirection='column'>
          <Grid container flexDirection='column' justifyContent='space-between' height='100%'>
            <div className={styles.textContent}>
              <h5 className={styles.name}>{dish.name}</h5>
              <DedscriptionComponent text={dish.description} />
            </div>
            <PriceComponent
              volumeId={choosenVolumeId} 
              setVolumeId={changeVolumeId} 
              volumes={dish.dishVolumesAndPrice} 
              readonly={readonly}
            />
          </Grid>
        </Grid>
        <div className={styles.side}>
          <div className={`${styles.right} ${dish?.image ? styles.rightLarge : ''}`}>
            {dish?.image && (
              <div className={styles.box}>
                <img src={`data:image/png;base64,${dish.image}`} alt="dish" />
              </div>
            )}
            <CounterComponent dish={dish} volumeId={choosenVolumeId} />
          </div>
        </div>
      </div>
    </div>
  )
})