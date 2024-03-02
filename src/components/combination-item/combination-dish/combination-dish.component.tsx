import React, { memo, useState, useMemo } from 'react';
import { IDish, IExtra, LanguageLow } from '../../../types';
import { Grid, Modal } from '@mui/material';
import { useAppSelector } from '../../../store/app/hooks';
import { DedscriptionComponent } from '../../dish/description.component';
import { selectLanguage } from '../../../store/slices/menu/menu.slice';
import styles from './styles.module.css';
import { ISelectedDishes } from '../combination-item.component';
import { CombinationDetailsComponent } from '../combination-details';
import { Allergen } from '../../allergen/Allergen.component';
import { DishInfo } from '../../../types/allergens.enum';

interface IProps {
  dish: IDish;
  selectedDishes: ISelectedDishes;
  updateDishes: (key: string, qty: number, dish: IDish) => void;
  updateExtrass: (key: string, dishId: number, extra: IExtra) => void;
  category: string;
  qty: number;
}

export const CombinationDishComponent: React.FC<IProps> = memo(
  ({ dish, selectedDishes, updateDishes, updateExtrass, category, qty }) => {
    const lang =
      (useAppSelector(selectLanguage)?.toLowerCase() as LanguageLow) || 'en';
    const [isOpenModal, setIsOpenModal] = useState(false);

    const toggleIsOpenModal = () => {
      setIsOpenModal(!isOpenModal);
    };

    const isAddedToSelected = useMemo(() => {
      return selectedDishes[category]?.some((el) => el.dish.id === dish.id);
    }, [dish, category, selectedDishes]);

    const addRemoveDish = () => {
      updateDishes(category, qty, dish);
    };

    const handleUpdateExtrass = (extra: IExtra) => {
      updateExtrass(category, dish.id, extra);
    };

    return (
      <div
        className={`${styles.dish} ${isAddedToSelected ? styles.checked : ''}`}
      >
        <Modal open={isOpenModal} onClose={toggleIsOpenModal}>
          <CombinationDetailsComponent
            dish={dish}
            addRemoveDish={addRemoveDish}
            onClose={toggleIsOpenModal}
            selectedDishes={selectedDishes}
            category={category}
            handleUpdateExtrass={handleUpdateExtrass}
            isAddedToSelected={isAddedToSelected}
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
              <div className={styles.textContent} onClick={addRemoveDish}>
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
                <DedscriptionComponent
                  text={
                    dish.multilingualDescription?.[lang] || dish.description
                  }
                />
              </div>
            </Grid>
          </Grid>
          <div className={styles.side}>
            <div
              className={`${styles.right} ${
                dish?.imageUrl ? styles.rightLarge : ''
              }`}
            >
              {dish?.imageUrl && (
                <div
                  className={`${styles.box} imageBox`}
                  onClick={toggleIsOpenModal}
                >
                  <img src={dish.imageUrl} alt='dish' />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
