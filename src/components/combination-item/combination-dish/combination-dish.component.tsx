import React, { memo, useState, useMemo } from 'react';
import { IDish, IExtra } from '../../../types'
import { Grid, Modal } from '@mui/material';
import { useAppSelector } from '../../../store/app/hooks';
import { DedscriptionComponent } from '../../dish/description.component';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { selectLanguage } from '../../../store/slices/menu/menu.slice';
import styles from './styles.module.css';
import { AllergensComponent } from '../../dish/allergens.component';
import { ISelectedDishes } from '../combination-item.component';
import { CombinationDetailsComponent } from '../combination-details';
import { PlusIcon } from '../../../assets/icons/plus.icon';
import { CheckedIcon } from '../../../assets/icons/checked.icon';
import { ExtraComponent } from './extra.component';
import { ActionBlockComponent } from '../action-block';
import { Allergen } from '../../allergen/Allergen.component';
import { Allergens, DishInfo } from '../../../types/allergens.enum';

interface IProps {
  dish: IDish;
  selectedDishes: ISelectedDishes;
  updateDishes: (key: string, qty: number, dish: IDish) => void;
  updateExtrass: (key: string, dishId: number, extra: IExtra) => void;
  category: string;
  qty: number;
}

export const CombinationDishComponent: React.FC<IProps> = memo(({ 
  dish, 
  selectedDishes,
  updateDishes,
  updateExtrass,
  category,
  qty,
}) => {
  const [showExtras, setShowExtras] = useState(false);
  const lang = useAppSelector(selectLanguage) || 'EN';
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleIsOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  }

  const handleShowExtras = () => {
    setShowExtras(!showExtras);
  }

  const isAddedToSelected = useMemo(() => {
    return selectedDishes[category]?.some((el) => el.dish.id === dish.id)
  }, [dish, category, selectedDishes]);

  const addRemoveDish = () => {
    updateDishes(category, qty, dish);
  }

  const handleUpdateExtrass = (extra: IExtra) => {
    updateExtrass(category, dish.id, extra)
  }

  return (
    <div className={`${styles.dish} ${isAddedToSelected ? styles.checked : ''}`}>
      <Modal
        open={isOpenModal}
        onClose={toggleIsOpenModal}
      >
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
          <Grid container flexDirection='column' justifyContent='space-between' height='100%'>
            <div className={styles.textContent}>
              <div className={styles.titleBlock}>
                <h6 className={styles.name}>{dish.multilingualNameMap?.[lang] || dish.name}</h6>
                  {Boolean(dish.infoDishIcons) && (
                    <div className={styles.allergens}>
                      {dish.infoDishIcons.map((icon) => (
                        <Allergen allergen={DishInfo[icon]} key={icon}/>
                      ))}
                    </div>
                  )}
              </div>
              <DedscriptionComponent text={dish.multilingualDescriptionMap?.[lang] || dish.description} />
            </div>
          </Grid>
        </Grid>
        <div className={styles.side}>
          <div className={`${styles.right} ${dish?.image ? styles.rightLarge : ''}`}>
            {dish?.image && (
              <div className={styles.box} onClick={toggleIsOpenModal}>
                <img src={`data:image/png;base64,${dish.image}`} alt="dish" />
              </div>
            )}
          </div>
        </div>
        <ActionBlockComponent 
          addRemoveDish={addRemoveDish} 
          isAddedToSelected={isAddedToSelected} 
          volume={dish.dishVolumesAndPrice[0]}
          withoutMargin={true}
        />
        {Boolean(dish.allergens.length) && (
          <div className={`${styles.allergens} ${styles.mb20}`}>
            {dish.allergens.map((allergen) => (
              <div className={styles.allergen} key={allergen}>
                <Allergen allergen={Allergens[allergen]} />
              </div>
            ))}
          </div>
        )}
      </div>
        {Boolean(dish?.extras.length) && (
          <button onClick={handleShowExtras} className={styles.showExtrasButton}>
            Add your extra
            <span className={`${styles.icon} ${showExtras ? styles.iconReverted : ''}`}>
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
                dishId={dish.id}
                category={category}
                isDisabled={!isAddedToSelected}
                updateExtrass={handleUpdateExtrass}
                selectedDishes={selectedDishes}
              />
            ))}
          </div>
        )}
    </div>
  )
})