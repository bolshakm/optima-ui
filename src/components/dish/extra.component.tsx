import React, { memo } from 'react';
import { IExtra } from '../../types';
import styles from './style.module.css';
import { useAppSelector } from '../../store/app/hooks';
import { selectLanguage } from '../../store/slices/menu/menu.slice';

interface IProps {
  extra: IExtra;
}

export const ExtraComponent: React.FC<IProps> = memo(({ extra }) => {
  const lang = useAppSelector(selectLanguage) || 'EN';

  return (
    <div className={styles.extra}>
      <div className={styles.extraContent}>
        <span className={styles.extraItem}>
          <label className={styles.extraCheckbox}>
            <span>
              <span className={styles.extraSquare} />
              <input type="checkbox" />
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
