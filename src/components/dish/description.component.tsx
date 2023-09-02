import { useState } from 'react'
import styles from './style.module.css';

interface IProps {
  text: string | null;
}

export const DedscriptionComponent: React.FC<IProps> = ({ text }) => {
  const [isShowAll, setIsShowAll] = useState(false);

  const toggleShowMore = () => {
    setIsShowAll(!isShowAll);
  } 

  if (!text) return null;

  const isTextToLong = text?.length > 80;

  return (
    <p className={styles.text}>{isTextToLong ? (
      <>
        {isShowAll ? text : `${text.slice(0, 80)}...`}
        <button className={styles.button} onClick={toggleShowMore}>{isShowAll ? 'hide' : 'show'}</button>
      </>
    ) : text}</p>
  )
}