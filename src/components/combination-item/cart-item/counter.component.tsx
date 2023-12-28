import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { 
  decreaseCombinationQty, 
  increaseCombinationQty, 
  selectCombination, 
} from '../../../store/slices/cart/cart.slice';
import { ReactComponent as FavouriteIcon } from '../../../assets/svg/favorite.svg'
import styles from './styles.module.css';
import { STORAGE_KEYS } from '../../../common/constants';
import { ModeEnum } from '../../../types/mode.enum';

interface IProps {
  combinationId: string;
}

export const CounterComponent: React.FC<IProps> = memo(({ combinationId }) => {
  const dispatch = useAppDispatch();
  const combination = useAppSelector(selectCombination(combinationId));
  const modeFromStorage = sessionStorage.getItem(STORAGE_KEYS.MODE);
  
  const handleIncreaseCount = () => {
    dispatch(increaseCombinationQty({ id: combinationId }))
  }

  const handleDecreaseCount = () => {
    dispatch(decreaseCombinationQty({ id: combinationId }))
  }

  if (modeFromStorage === ModeEnum.readonly) {
    return (
      <button
        onClick={handleDecreaseCount}
        className={styles.favourite}
      >
        <FavouriteIcon />
      </button>
    )
  }

  return (
    <div className={styles.buttons}>
      <button 
        className={styles.button}
        onClick={handleDecreaseCount}
        >
        -
      </button>
      <span className={styles.quantity}>{combination?.qty}</span>
      
      <button
        className={styles.button}
        onClick={handleIncreaseCount}
        >
          +
      </button>
    </div>
  )
})