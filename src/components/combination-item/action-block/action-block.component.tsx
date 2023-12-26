import { CheckedIcon } from '../../../assets/icons/checked.icon';
import { PlusIcon } from '../../../assets/icons/plus.icon';
import { IDishVolumesAndPrice } from '../../../types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './styles.module.css';

interface IProps {
  isAddedToSelected: boolean;
  addRemoveDish: () => void;
  volume: IDishVolumesAndPrice;
  withoutMargin?: boolean;
}

export const ActionBlockComponent: React.FC<IProps> = ({
  addRemoveDish,
  isAddedToSelected,
  volume,
  withoutMargin = false,
}) => {
  return (
    <div className={`${styles.wrapper} ${withoutMargin ? styles.wrapperWithoutMargin : ''}`}>
      <div className={styles.volume}>
        {volume.volume && (
          <>{volume} <ExpandMoreIcon /></>
        )}
      </div>
      <button
        onClick={addRemoveDish}
        className={`${styles.check} ${isAddedToSelected ? styles.checked : ''}`}
      >
        {isAddedToSelected ? <CheckedIcon /> : <PlusIcon />}
      </button>
    </div>
  );
}