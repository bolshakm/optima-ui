import { memo, useState, useEffect } from 'react';
import { IDish, LanguageLow } from '../../types';
import styles from './styles.module.css';
import { ReactComponent as CloseBtn } from '../../assets/svg/closeBtn.svg';
import { ReactComponent as FavouriteIcon } from '../../assets/svg/favorite.svg';
import { Allergen } from '../allergen/Allergen.component';
import { Allergens, DishInfo } from '../../types/allergens.enum';
import { PriceComponent } from '../dish/price.component';
import { CounterComponent } from '../counter/counter.component';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { STORAGE_KEYS } from '../../common/constants';
import { ModeEnum } from '../../types/mode.enum';
import { updateFavourites } from '../../store/slices/cart/cart.slice';
import { ExtraComponent } from '../dish/extra.component';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { selectLanguage } from '../../store/slices/menu/menu.slice';
import { selectTexts } from '../../store/slices/texts.slice';

interface IProps {
  dish: IDish;
  onClose: () => void;
  setVolumeId: (x: number) => void;
  volumeId: number;
  readonly: boolean;
  isDishAddedToCart: boolean;
}

export const DishDetailsComponent: React.FC<IProps> = memo(
  ({ dish, onClose, setVolumeId, volumeId, readonly, isDishAddedToCart }) => {
    const dispatch = useAppDispatch();
    const mode = sessionStorage.getItem(STORAGE_KEYS.MODE);
    const [showExtras, setShowExtras] = useState(false);
    const lang =
      (useAppSelector(selectLanguage)?.toLowerCase() as LanguageLow) || 'en';
    const { texts } = useAppSelector(selectTexts);

    const handleShowExtras = () => {
      if (!isDishAddedToCart) return;

      setShowExtras(!showExtras);
    };

    useEffect(() => {
      if (!isDishAddedToCart) {
        setShowExtras(false);
      }
    }, [isDishAddedToCart]);

    return (
      <div className={styles.detailCard}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <button className={styles.closeBtn} onClick={onClose}>
              <CloseBtn />
            </button>
          </div>
          <div className={styles.image}>
            <img src={dish.imageUrl} alt='dish' />
          </div>
          <div className={styles.titleBlock}>
            <h6 className={styles.name}>
              {dish.multilingualName?.[lang] || dish.name}
            </h6>
            {Boolean(dish.infoDishIcons) && (
              <div className={styles.allergens}>
                {dish.infoDishIcons.map((icon) => (
                  <Allergen allergen={DishInfo[icon]} key={icon} />
                ))}
              </div>
            )}
          </div>
          {Boolean(dish.description) && (
            <p className={styles.description}>
              {dish.multilingualDescription?.[lang] || dish.description}
            </p>
          )}
          <div className={styles.actions}>
            <PriceComponent
              volumeId={volumeId}
              setVolumeId={setVolumeId}
              volumes={dish.dishVolumesAndPrice}
              readonly={readonly}
            />
            {mode === ModeEnum.readonly ? (
              <button
                onClick={() => dispatch(updateFavourites({ dish, volumeId }))}
                className={`${styles.favourite} ${
                  isDishAddedToCart ? styles.favouriteSelected : ''
                }`}
              >
                <FavouriteIcon />
              </button>
            ) : (
              <CounterComponent dish={dish} volumeId={volumeId} />
            )}
          </div>
          {Boolean(dish.allergens.length) && (
            <div className={`${styles.allergens} ${styles.mb20}`}>
              {dish.allergens.map((allergen) => (
                <div className={styles.allergen} key={allergen}>
                  <Allergen allergen={Allergens[allergen]} />
                </div>
              ))}
            </div>
          )}
          {Boolean(dish?.extras.length) && (
            <button
              onClick={handleShowExtras}
              className={styles.showExtrasButton}
            >
              {texts['add.your.extra']}
              <span
                className={`${styles.icon} ${
                  showExtras ? styles.iconReverted : ''
                }`}
              >
                <ExpandMoreIcon sx={{ width: 20, height: 20 }} />
              </span>
            </button>
          )}
          {showExtras && (
            <div className={styles.extras}>
              {dish.extras.map((extra) => (
                <ExtraComponent
                  key={extra.id}
                  extra={extra}
                  dish={dish}
                  volumeId={volumeId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);
