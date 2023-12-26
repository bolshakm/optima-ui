import React, { memo } from 'react';
import { IExtra } from '../../../types';
import styles from './styles.module.css';
import { useAppSelector } from '../../../store/app/hooks';
import { selectLanguage } from '../../../store/slices/menu/menu.slice';
import { ISelectedDishes } from '../combination-item.component';

interface IProps {
  extra: IExtra;
  updateExtrass: (extra: IExtra) => void;
  selectedDishes: ISelectedDishes;
  category: string;
  dishId: number;
  isDisabled: boolean;
}

export const ExtraComponent: React.FC<IProps> = memo(({ 
  extra, 
  updateExtrass, 
  selectedDishes, 
  category, 
  dishId, 
  isDisabled
}) => {
  const lang = useAppSelector(selectLanguage) || 'EN';

  const isCheckedExtra 
    = selectedDishes[category].find((el) => el.dish.id === dishId)?.extrass.some((el) => el.id === extra.id);

  const hundleUpdateExtrass = () => {
    updateExtrass(extra)
  }

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
                onChange={hundleUpdateExtrass}
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
