import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { decreaseCombinationQty, increaseCombinationQty, selectCombination,  } from '../../../store/slices/cart/cart.slice';
import styles from './styles.module.css';

interface IProps {
  combinationId: string;
}

export const CounterComponent: React.FC<IProps> = memo(({ combinationId }) => {
  const dispatch = useAppDispatch();
  const combination = useAppSelector(selectCombination(combinationId))

  const handleIncreaseCount = () => {
    dispatch(increaseCombinationQty({ id: combinationId }))
  }

  const handleDecreaseCount = () => {
    dispatch(decreaseCombinationQty({ id: combinationId }))
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