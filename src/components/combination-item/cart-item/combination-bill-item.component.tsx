import { memo, useMemo } from 'react';
import { useAppSelector } from '../../../store/app/hooks';
import { selectLanguage } from '../../../store/slices/menu/menu.slice';
import styles from './styles.module.css'
import { IBillCombination } from '../../../types';

interface IProps {
  billItem: IBillCombination;
}

export const CombinationBillItemComponent: React.FC<IProps> = memo(({ 
  billItem,
}) => {
  const laguage = useAppSelector(selectLanguage) || 'EN';

  const dishesNames = useMemo(() => {
    const names: string[] = billItem.orderedCombinationDishData.reduce(
      (acc: string[], dish) => {
        const dishName = dish.multilingualNameMap[laguage];
        if (dishName) {
          acc.push(dishName);
        }
        return acc;
      },
      []
    );
  
    return names;
  }, [billItem, laguage]);

  return (
    <div className={styles.cartItem}>
      <h6 className={styles.name}>
        {billItem.name}
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
        </div>
        <div className={styles.row} style={{ margin: 0 }}>
          <p className={styles.price}>
            Qty: {billItem.qty}
          </p>
          <p className={styles.price}>
            {Math.trunc(10 * (billItem.price * billItem.qty)) / 10}€
          </p>
        </div>
      </div>
    </div>
  )
})