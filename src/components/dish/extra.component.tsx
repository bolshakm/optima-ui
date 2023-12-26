import React, { memo, useCallback, useMemo } from 'react';
import { IDish, IExtra } from '../../types';
import styles from './style.module.css';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { selectLanguage } from '../../store/slices/menu/menu.slice';
import { addRemoveExtra, addRemoveExtraToFromFavourites, selectCartItems, selectFavourites } from '../../store/slices/cart/cart.slice';
import { STORAGE_KEYS } from '../../common/constants';
import { ModeEnum } from '../../types/mode.enum';

interface IProps {
  extra: IExtra;
  dish: IDish;
  volumeId: number;
  isDisabled?: boolean;
}

export const ExtraComponent: React.FC<IProps> = memo(({ extra, dish, volumeId, isDisabled = false }) => {
  const mode = sessionStorage.getItem(STORAGE_KEYS.MODE);
  const lang = useAppSelector(selectLanguage) || 'EN';
  const cartItems = useAppSelector(selectCartItems);
  const favouritesItems = useAppSelector(selectFavourites);
  const dispatch = useAppDispatch()

  const currentItems = useMemo(() => {
    return mode === ModeEnum.readonly ? favouritesItems : cartItems;
  }, [mode, cartItems, favouritesItems])

  const isCheckedExtra 
    = currentItems.find((item) => (
      item.dish.id === dish.id && item.volumeId === volumeId
      ))?.extras?.some((existExtra) => (
        extra.id === existExtra.id
      )) || false;
  
  const handleAddRemoveExtra = useCallback((extra: IExtra) => {
    if (isDisabled) return;

    if (mode === ModeEnum.readonly) {
      dispatch(addRemoveExtraToFromFavourites({ dish, volumeId, extra }))
    } else {
      dispatch(addRemoveExtra({ dish, volumeId, extra }))
    }
  }, [volumeId, dispatch, dish, mode, isDisabled])

  return (
    <div className={styles.extra}>
      <div className={styles.extraContent}>
        <span className={styles.extraItem}>
          <label className={styles.extraCheckbox}>
            <span>
              <span className={styles.extraSquare} />
              <input 
                type="checkbox" 
                checked={isCheckedExtra} 
                disabled={isDisabled}
                onChange={() => handleAddRemoveExtra(extra)}
              />
            </span>
            {extra.multilingualExtraNameMap[lang]}
          </label>
        </span>
        <span className={styles.extraItem}>
          +{extra.price}€
        </span>
      </div>
    </div>
  )
})
