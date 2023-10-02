import { Allergens, DishInfo } from '../../types/allergens.enum'
import { Allergen } from '../allergen/Allergen.component';
import styles from './style.module.css';

interface IProps {
  allergens: Allergens[]; 
  info: DishInfo[];
}
export const AllergensComponent: React.FC<IProps> = ({allergens = [], info = []}) => (
  <div className={styles.allergensBox}>
    {Boolean(allergens.length) && (
      <div className={styles.allergens}>
        {allergens.map((allergen) => (
          <div className={styles.allergen} key={allergen}>
            <Allergen allergen={Allergens[allergen]} />
          </div>
        ))}
      </div>
    )}
    {Boolean(info.length) && (
      <div className={styles.allergens}>
        {info.map((icon) => (
          <Allergen allergen={DishInfo[icon]} key={icon}/>
        ))}
      </div>
    )}
  </div>
)