import React, { memo, useState, useMemo } from 'react';
import { IDish, LanguageLow } from '../../types';
import { Grid, Modal } from '@mui/material';
import { CounterComponent } from '../counter/counter.component';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import {
  selectCartItems,
  selectFavourites,
  updateFavourites,
} from '../../store/slices/cart/cart.slice';
import { DedscriptionComponent } from './description.component';
import { PriceComponent } from './price.component';
import { STORAGE_KEYS } from '../../common/constants';
import { ModeEnum } from '../../types/mode.enum';
import { ReactComponent as FavouriteIcon } from '../../assets/svg/favorite.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { selectLanguage } from '../../store/slices/menu/menu.slice';
import styles from './style.module.css';
import { AllergensComponent } from './allergens.component';
import { selectTexts } from '../../store/slices/texts.slice';
import { ExtraComponent } from './extra.component';
import { DishDetailsComponent } from '../dishDetails';

interface IProps {
  dish: IDish;
  readonly?: boolean;
  count?: number;
  volumeId?: number;
  isCartItem?: boolean;
  isBillItem?: boolean;
  comments?: { [key: string]: string };
  setComments?: React.Dispatch<React.SetStateAction<{}>>;
}

export const DishComponent: React.FC<IProps> = memo(
  ({
    dish,
    readonly = false,
    count,
    volumeId,
    isCartItem = false,
    comments,
    setComments,
  }) => {
    const [showExtras, setShowExtras] = useState(false);
    const cartItems = useAppSelector(selectCartItems);
    const favourites = useAppSelector(selectFavourites);
    const lang =
      (useAppSelector(selectLanguage)?.toLowerCase() as LanguageLow) || 'EN';
    const { texts } = useAppSelector(selectTexts);
    const [choosenVolumeId, setChoosenVolumeId] = useState(
      volumeId || dish.dishVolumesAndPrice[0].id
    );
    const mode = sessionStorage.getItem(STORAGE_KEYS.MODE);
    const dispatch = useAppDispatch();
    const [isOpenModal, setIsOpenModal] = useState(false);

    const toggleIsOpenModal = () => {
      setIsOpenModal(!isOpenModal);
    };

    const isDishAddedToCart = useMemo(() => {
      if (mode === ModeEnum.readonly) {
        return favourites.some(
          (item) =>
            item.dish.id === dish.id && item.volumeId === choosenVolumeId
        );
      } else {
        return cartItems.some(
          (item) =>
            item.dish.id === dish.id && item.volumeId === choosenVolumeId
        );
      }
    }, [mode, cartItems, favourites, choosenVolumeId, dish.id]);

    const handleShowExtras = () => {
      setShowExtras(!showExtras);
    };

    const changeVolumeId = (id: number) => {
      setChoosenVolumeId(id);
    };

    const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (setComments) {
        setComments((curr) => ({
          ...curr,
          [`${dish.id}-${choosenVolumeId}`]: e.target.value,
        }));
      }
    };

    return (
      <div
        className={`${styles.dish} ${isDishAddedToCart ? styles.checked : ''}`}
      >
        <Modal open={isOpenModal} onClose={toggleIsOpenModal}>
          <DishDetailsComponent
            dish={dish}
            onClose={toggleIsOpenModal}
            volumeId={choosenVolumeId}
            setVolumeId={changeVolumeId}
            readonly={readonly}
            isDishAddedToCart={isDishAddedToCart}
          />
        </Modal>
        <div className={styles.content}>
          <Grid container flexDirection='column' className={styles.description}>
            <Grid
              container
              flexDirection='column'
              justifyContent='space-between'
              height='100%'
            >
              <div className={styles.textContent}>
                <h5 className={styles.name}>
                  {dish.multilingualName?.[lang] || dish.name}
                </h5>
                <DedscriptionComponent
                  text={
                    dish.multilingualDescription?.[lang] || dish.description
                  }
                />
              </div>
              <PriceComponent
                volumeId={choosenVolumeId}
                setVolumeId={changeVolumeId}
                volumes={dish.dishVolumesAndPrice}
                readonly={readonly}
              />
              {(Boolean(dish.allergens?.length) ||
                Boolean(dish.infoDishIcons?.length)) && (
                <AllergensComponent
                  allergens={dish.allergens}
                  info={dish.infoDishIcons}
                />
              )}
            </Grid>
          </Grid>
          <div className={styles.side}>
            <div
              className={`${styles.right} ${
                dish?.imageUrl ? styles.rightLarge : ''
              }`}
            >
              {dish?.imageUrl && (
                <div className={styles.box} onClick={toggleIsOpenModal}>
                  <img src={dish.imageUrl} alt='dish' />
                </div>
              )}
              {mode === ModeEnum.readonly ? (
                <button
                  onClick={() =>
                    dispatch(
                      updateFavourites({ dish, volumeId: choosenVolumeId })
                    )
                  }
                  className={`${styles.favourite} ${
                    isDishAddedToCart ? styles.favouriteSelected : ''
                  }`}
                >
                  <FavouriteIcon />
                </button>
              ) : (
                <CounterComponent dish={dish} volumeId={choosenVolumeId} />
              )}
            </div>
          </div>
        </div>
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
                volumeId={choosenVolumeId}
                isDisabled={!isDishAddedToCart}
              />
            ))}
          </div>
        )}
        {isCartItem && comments && handleChangeComment && (
          <input
            type='text'
            value={comments[`${dish.id}-${choosenVolumeId}`]}
            onChange={handleChangeComment}
            placeholder={texts['add.comment']}
            className={styles.input}
          />
        )}
      </div>
    );
  }
);
