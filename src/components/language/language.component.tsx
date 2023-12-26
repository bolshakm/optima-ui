import React, { useState } from 'react';
import { ReactComponent as ExpandMoreIcon } from '../../assets/svg/expand_more.svg'
import styles from './styles.module.css';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { selectLanguage, setLanguage } from '../../store/slices/menu/menu.slice';
import { Language } from '../../types';
import { getTexts } from '../../store/slices/texts.slice';
import { selectCafe } from '../../store/slices/cafe/cafe.slice';

export const LanguageComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const lang = useAppSelector(selectLanguage) || 'en';
  const { cafe } = useAppSelector(selectCafe); 

  const dispatch = useAppDispatch();

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSetLanguage = (key: Language) => {
    if (key !== lang) {
      dispatch(setLanguage(key));
      dispatch(getTexts(key));
    }

    toggleIsExpanded();
  }

  return (
    <div className={styles.box}>
      <button className={styles.button} onClick={toggleIsExpanded}>
        {lang}
        <ExpandMoreIcon className={`${styles.icon} ${isExpanded ? styles.reverted : ''}`} />
      </button>
      <ul className={`${styles.list} ${isExpanded ? styles.visible : ''}`}>
        {cafe?.languageSet?.map((language) => (
          <li className={styles.item} key={language}>
            <button 
              className={`${styles.option} ${language === lang ? styles.active : ''}`} 
              onClick={() => handleSetLanguage(language as Language)}
            >
              {language}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}