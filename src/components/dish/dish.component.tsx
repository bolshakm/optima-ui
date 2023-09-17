import React, { memo, useState, useMemo } from 'react';
import { IDish } from '../../types'
import { Grid } from '@mui/material';
import { CounterComponent } from '../counter/counter.component';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { selectCartItems, selectFavourites, updateFavourites } from '../../store/slices/cart/cart.slice';
import styles from './style.module.css';
import { DedscriptionComponent } from './description.component';
import { PriceComponent } from './price.component';
import { STORAGE_KEYS } from '../../common/constants';
import { ModeEnum } from '../../types/mode.enum';
import { ReactComponent as FavouriteIcon } from '../../assets/svg/favorite.svg'
import { selectLanguage } from '../../store/slices/menu/menu.slice';

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
  const favourites = useAppSelector(selectFavourites);
  const lang = useAppSelector(selectLanguage) || 'en';
  const [choosenVolumeId, setChoosenVolumeId] = useState(volumeId || dish.dishVolumesAndPrice[0].id);
  const mode = sessionStorage.getItem(STORAGE_KEYS.MODE);
  const dispatch = useAppDispatch();

  const isDishAddedToCart = useMemo(() => {
    if (mode === ModeEnum.readonly) {
      return favourites.some((item) => item.dish.id === dish.id && item.volumeId === choosenVolumeId);
    } else {
      return cartItems.some((item) => item.dish.id === dish.id && item.volumeId === choosenVolumeId);
    }
  }, [mode, cartItems, favourites, choosenVolumeId, dish.id])


  const changeVolumeId = (id: number) => {
    setChoosenVolumeId(id)
  }

  return (
    <div className={`${styles.dish} ${isDishAddedToCart ? styles.checked : ''}`}>
      <div className={styles.content}>
        <Grid container flexDirection='column'>
          <Grid container flexDirection='column' justifyContent='space-between' height='100%'>
            <div className={styles.textContent}>
              <h5 className={styles.name}>{dish.multilingualName?.[lang] || dish.name}</h5>
              <DedscriptionComponent text={dish.multilingualDescription?.[lang] || dish.description} />
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
            {mode === ModeEnum.readonly ? (
              <button
                onClick={() => dispatch(updateFavourites({ dish, volumeId: choosenVolumeId }))}
                className={`${styles.favourite} ${isDishAddedToCart ? styles.favouriteSelected : ''}`}
              >
                <FavouriteIcon />
              </button>
            ) : <CounterComponent dish={dish} volumeId={choosenVolumeId} />}
          </div>
        </div>
      </div>
    </div>
  )
})