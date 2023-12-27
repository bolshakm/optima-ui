import React, { memo } from 'react';
import { IDish } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { decreaseCount, increaseCount, selectCartItems } from '../../store/slices/cart/cart.slice';
import styles from './styles.module.css';

interface IProps {
  dish: IDish;
  volumeId: number;
}

export const CounterComponent: React.FC<IProps> = memo(({ dish, volumeId }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const cartItem = cartItems.find((item) => (
    item.dish.id === dish.id && item.volumeId === volumeId
  ))

  const handleIncreaseCount = () => {
    dispatch(increaseCount({ dish, volumeId }))
  }

  const handleDecreaseCount = () => {
    dispatch(decreaseCount({ dish, volumeId }))
  }

  if (!cartItem) {
    return (
      <button
        className={styles.activeBtn}
        onClick={handleIncreaseCount}
        >
          +
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
      <span className={styles.quantity}>{cartItem.quantity}</span>
      
      <button
        className={styles.button}
        onClick={handleIncreaseCount}
        >
          +
      </button>
    </div>
  )
})