import { useState, useMemo } from 'react';
import { IDishVolumesAndPrice } from '../../types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './style.module.css';

interface IProps {
  volumes: IDishVolumesAndPrice[];
  setVolumeId: (x: number) => void;
  volumeId: number;
  readonly: boolean;
}

export const PriceComponent: React.FC<IProps> = ({volumes, setVolumeId, volumeId, readonly}) => {
  const [isExpanded, setIsExpanded] = useState(false);
 
  const selectedVolume = useMemo(() => volumes.find((vol) => vol.id === volumeId), [volumeId, volumes])
  const filteredList = useMemo(() => volumes.filter((vol) => vol.id !== volumeId), [volumeId, volumes])

  if (readonly) {
    return (
      <div className={styles.priceBlock}>
        <span className={styles.volumeText}>{selectedVolume?.volume}</span>
        <h6 className={styles.price}>{selectedVolume?.price}€</h6>
      </div>
    )
  }

  if (volumes.length === 1) {
    return <h6 className={styles.price}>{volumes[0].price}€</h6>
  }

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={styles.priceBlock}>
      <button className={styles.volumeBtn} onClick={toggleIsExpanded}>
        <span className={styles.volumeText}>{selectedVolume?.volume}</span>
        <span className={`${styles.icon} ${isExpanded ? styles.iconReverted : ''}`}><ExpandMoreIcon /></span>
      </button>
      {isExpanded ? (
        <ul className={styles.volumesList}>
          {filteredList.map((item) =>(
            <li 
              key={item.id} 
              className={styles.volumeItem} 
              onClick={() => {
                setIsExpanded(false)
                setVolumeId(item.id)}
              }
            >
              {item.volume}
            </li>
          ))}
        </ul>
      ) : <h6 className={styles.price}>{selectedVolume?.price}€</h6>}
    </div>
  )
}