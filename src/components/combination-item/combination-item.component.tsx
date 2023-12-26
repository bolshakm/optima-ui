import { useEffect, useState, memo, useCallback, useMemo } from 'react';
import { ICombination } from '../../types/combination.interface';
import styles from './styles.module.css';
import { IDish, IExtra } from '../../types';
import { selectLanguage } from '../../store/slices/menu/menu.slice';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { CombinationDishComponent } from './combination-dish';
import { addCombination } from '../../store/slices/cart/cart.slice';

interface IProps {
  combination: ICombination;
}

export interface ISelectedDishes {
  [key: string]: {
    dish: IDish; 
    extrass: IExtra[]
  }[]
}

export const CombinationItemComponent: React.FC<IProps> = memo(({ combination }) => {
  const [selectedDishes, setSelectedDishes] = useState<ISelectedDishes>({});
  const laguage = useAppSelector(selectLanguage) || 'EN';
  const dispatch = useAppDispatch();

  const extrasTotalPrice = useMemo(() => {
    return Object.keys(selectedDishes).reduce((acc, key) => {
      return acc + selectedDishes[key].reduce((sum, dishItem) => {
        return sum + dishItem.extrass.reduce((extrasSum, ext) => (
          extrasSum + ext.price
        ), 0)
      }, 0)
    }, 0)
  }, [selectedDishes])

  const combinationTotalPrice = useMemo(() => (
    combination.price + extrasTotalPrice
  ), [extrasTotalPrice, combination.price])
  
  const createInitState = useCallback(() => {
    return combination.combinationDishes.reduce((acc, el) => (
     {...acc, [el.name]: []}
    ), {})
  }, [combination.combinationDishes]);

  const hundleAddToCart = () => {
    dispatch(addCombination({ combination: selectedDishes, combinationId: combination.id }))
  }

  useEffect(() => {
    if (!Object.keys(selectedDishes).length) {
      setSelectedDishes(createInitState())
    }
  }, [combination, selectedDishes, createInitState]);

  const handleUpdateSelectedDishes = (key: string, qty: number, dish: IDish) => {
    const dishValue = {
      dish,
      extrass: [] as IExtra[],
    }

    const dishIndex = selectedDishes[key]?.findIndex((el) => el.dish.id === dish.id);

    if (dishIndex !== -1) {
        setSelectedDishes((curr) => ({
          ...curr,
          [key]: curr[key].filter((el) => el.dish.id !== dish.id),
        }))
    } else {
      const updatedValue = qty > selectedDishes[key]?.length 
        ? [...selectedDishes[key], dishValue] 
        : [...selectedDishes[key]?.slice(0, -1), dishValue]

      setSelectedDishes((curr) => ({
        ...curr,
        [key]: updatedValue,
      }))
    }
  }

  const handleUpdateExtrass = (key: string, dishId: number, extra: IExtra) => {
    setSelectedDishes((curr) => {
      const findedDish = curr[key]?.find((el) => el.dish.id === dishId);
  
      if (!findedDish) return curr;
  
      const extraIndex = findedDish.extrass.findIndex((el) => el.id === extra.id);
  
      const updatedExtrass =
        extraIndex === -1
          ? [...findedDish.extrass, extra]
          : findedDish.extrass.filter((el) => el.id !== extra.id);
  
      return {
        ...curr,
        [key]: curr[key].map((item) =>
          item.dish.id === dishId ? { ...item, extrass: updatedExtrass } : item
        ),
      };
    });
  };

  const isDisabledButton = useMemo(() => (
    Object.values(selectedDishes).some((value) => !(value.length))
  ), [selectedDishes])

  console.log(isDisabledButton);
  
  return (
    <div className={styles.combination}>
      {combination.combinationDishes.map((item) => (
        <div className={styles.combinationItem} key={item.id}>
          <h6 className={styles.combinationName}>
            {item.multilingualNameMap?.[laguage] || item.name}
          </h6>
          <p className={styles.combinationDescription}>
            {item.multilingualDescriptionMap?.[laguage] || item.description}
          </p>
          <div className={styles.dishes}>
            {item.dishes.map((dish) => (
              <CombinationDishComponent 
                dish={dish} 
                category={item.name}
                qty={item.allowedQty}
                key={dish.id}
                selectedDishes={selectedDishes}
                updateDishes={handleUpdateSelectedDishes}
                updateExtrass={handleUpdateExtrass}
              />
            ))}
          </div>
        </div>
      ))}
      <div className={styles.footer}>
        <span className={styles.price}>
          {`Sum: ${combinationTotalPrice}€`}
        </span>
        <button 
          onClick={hundleAddToCart}
          className={styles.addButton}
          disabled={isDisabledButton}
        >
          Add to cart
        </button>
      </div>
    </div>
  )
})