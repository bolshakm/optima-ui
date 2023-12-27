import { memo, useMemo, useState } from 'react';
import { useAppSelector } from '../../../store/app/hooks';
import { selectLanguage } from '../../../store/slices/menu/menu.slice';
import { ICombination } from '../../../types/combination.interface';
import { ISelectedDishes } from '../combination-item.component';
import styles from './styles.module.css'
import { CounterComponent } from './counter.component';
import { selectTexts } from '../../../store/slices/texts.slice';

interface IProps {
  withComment?: boolean;
  combination: ICombination;
  dishes: ISelectedDishes;
  combinationId: string;
  price: number;
  editFn: () => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CartItemComponent: React.FC<IProps> = memo(({ 
  withComment, 
  combination, 
  dishes, 
  combinationId, 
  editFn, 
  price, 
  value, 
  onChange,
}) => {
  const laguage = useAppSelector(selectLanguage) || 'EN';
  const { texts } = useAppSelector(selectTexts);

  const dishesNames = useMemo(() => {
    const names: string[] = Object.values(dishes).reduce((acc: string[], dishList) => {
      const dishNames = dishList.map((el) => el.dish.multilingualNameMap?.[laguage] || el.dish.name);
      return [...acc, ...dishNames];
    }, []);
  
    return names;
  }, [dishes, laguage]);

  return (
    <div className={styles.cartItem}>
      <h6 className={styles.name}>
        {combination.multilingualNameMap?.[laguage] || combination.name}
      </h6>
      <div className={styles.rows}>
        <div className={styles.row}>
          <ul className={styles.list}>
            {dishesNames.map((name) => (
              <li className={styles.listItem}>{name}</li>
            ))}
          </ul>
          <CounterComponent combinationId={combinationId} />
        </div>
        <div className={styles.row}>
          <p className={styles.price}>
            {price}€
          </p>
          <button 
            className={styles.editButton} 
            onClick={editFn}
          >
            Edit
          </button>
        </div>
      </div>
      {withComment && value && onChange && (
        <input 
          type="text" 
          value={value} 
          onChange={onChange} 
          placeholder={texts['add.comment']}
          className={styles.input}
        />
      )}
    </div>
  )
})