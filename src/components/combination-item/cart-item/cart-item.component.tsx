import { memo, useMemo, useState } from 'react';
import { useAppSelector } from '../../../store/app/hooks';
import { selectLanguage } from '../../../store/slices/menu/menu.slice';
import { ICombination } from '../../../types/combination.interface';
import { ISelectedDishes } from '../combination-item.component';
import styles from './styles.module.css'
import { CounterComponent } from './counter.component';
import { selectTexts } from '../../../store/slices/texts.slice';
import { STORAGE_KEYS } from '../../../common/constants';
import { ModeEnum } from '../../../types/mode.enum';

interface IComment {
  [key: string]: string;
}

interface IProps {
  withComment?: boolean;
  combination: ICombination;
  dishes: ISelectedDishes;
  combinationId: string;
  qty: number;
  price: number;
  editFn: () => void;
  value?: string;
  setComments?: React.Dispatch<React.SetStateAction<IComment>>;
}

export const CartItemComponent: React.FC<IProps> = memo(({ 
  withComment, 
  combination, 
  dishes, 
  combinationId, 
  editFn,
  qty = 1,
  price, 
  value, 
  setComments,
}) => {
  const laguage = useAppSelector(selectLanguage) || 'EN';
  const { texts } = useAppSelector(selectTexts);
  const modeFromStorage = sessionStorage.getItem(STORAGE_KEYS.MODE);

  const dishesNames = useMemo(() => {
    const names: string[] = Object.values(dishes).reduce((acc: string[], dishList) => {
      const dishNames = dishList.map((el) => el.dish.multilingualNameMap?.[laguage] || el.dish.name);
      return [...acc, ...dishNames];
    }, []);
  
    return names;
  }, [dishes, laguage]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!setComments) return;

    setComments((curr) => ({
      ...curr,
      [combinationId]: e.target.value
    }))
  }

  return (
    <div className={styles.cartItem} id={combinationId}>
      <h6 className={styles.name}>
        {combination.multilingualNameMap?.[laguage] || combination.name}
      </h6>
      <div className={styles.rows}>
        <div className={styles.row}>
          <ul className={styles.list}>
            {dishesNames.map((name) => (
              <li 
                className={styles.listItem} 
                key={`${Math.random()}-${name}`}
              >
                {name}
              </li>
            ))}
          </ul>
          <CounterComponent combinationId={combinationId} />
        </div>
        <div className={styles.row}>
          <p className={styles.price}>
            {Math.trunc(10 * (price * qty)) / 10}€
          </p>
          <button 
            className={styles.editButton} 
            onClick={editFn}
          >
            Edit
          </button>
        </div>
      </div>
      {withComment && onChange && modeFromStorage !== ModeEnum.readonly && (
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