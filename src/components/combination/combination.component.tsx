import { useEffect, useRef, useState, useMemo, memo } from 'react';
import { useAppSelector } from '../../store/app/hooks';
import { selectLanguage, selectMenu } from '../../store/slices/menu/menu.slice';
import styles from './styles.module.css';
import { Grid } from '@mui/material';
import { ICombination } from '../../types/combination.interface';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CombinationItemComponent } from '../combination-item';
import { selectCombinations, ICombinationItem as ICombinationFromSlice } from '../../store/slices/cart/cart.slice';
import { CartItemComponent } from '../combination-item/cart-item/cart-item.component';

interface IProps {
  isOpen: boolean;
  combination: ICombination;
  toggleOpen: () => void;
}

export const CombinationComponent: React.FC<IProps> = memo(({
  isOpen = false,
  combination,
  toggleOpen,
}) => {
  const combinations = useAppSelector(selectCombinations);
  const { menu } = useAppSelector(selectMenu);
  const laguage = useAppSelector(selectLanguage) || 'EN';
  const itemContainerRef = useRef<HTMLDivElement>(null);
  const itemBoxRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(1);
  const [combinationToUpdate, setCombinationToUpdate] = useState<ICombinationFromSlice | null>(null);

  let isTransform = false;

  const relatedCombinations = useMemo(() => (
    combinations.filter((el) => el.combinationId === combination.id)
  ), [combinations, combination]);

  useEffect(() => {
    setCount(relatedCombinations.length || 1)
  }, [relatedCombinations])

  const handleIncreaseCount = () => {
    setCount((curr) => curr + 1)
  }

  useEffect(() => {
    if (!isOpen) return;
    let timeout = false;

    const timerId = setTimeout(() => {
      timeout = true;
    }, 200);

    const handleScroll = () => {
      if (itemBoxRef.current?.classList.contains('transform') && timeout) {
        itemBoxRef.current?.classList.remove('transform')
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      clearTimeout(timerId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTransform, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (itemContainerRef.current) {
      itemContainerRef.current.scrollIntoView({ behavior: 'auto', block: 'start' })
    }

    itemBoxRef.current?.classList.add('transform')
  }, [isOpen])

  if (!menu) {
    return null;
  }

  return (
    <div className={styles.category} ref={itemContainerRef}>
      <button
        className={`${styles.button} ${isOpen ? styles.stiky : ''}`}
        onClick={toggleOpen}
      >
        <Grid container sx={{ flexDirection: 'column' }}>
          <h6 className={styles.buttonText}>
            {combination.multilingualNameMap?.[laguage] || combination.name}
          </h6>
          <p className={styles.buttonSubtext}>
            {combination.availableTime}
          </p>
        </Grid>
        <span className={`${styles.icon} ${isOpen ? styles.iconReverted : ''}`}><ExpandMoreIcon /></span>
      </button>
      <div ref={itemBoxRef} className={`${styles.list} ${isOpen ? styles.listExpanded : ''}`}>
        <div className={styles.combinationInner}>
          <div className={styles.combinationHeader}>
            <div className={styles.combinationWarning}>
              Sorry, menu del dia is not available now.<br/>
              Available on 
              {' '}
              {combination.availableTime}
            </div>
            <div className={styles.combinationPrice}>
              {combination.price}€
            </div>
            <div className={styles.combinationDescription}>
              {combination.multilingualDescriptionMap?.[laguage] || combination.description}
            </div>
          </div>
          <div className={styles.combinationList} id='combinationList'>
            {Boolean(relatedCombinations.length) && (
              <>
                {relatedCombinations.filter((el) => el.id !== combinationToUpdate?.id)
                  .map((el) => (
                    <CartItemComponent 
                      combination={combination}
                      dishes={el.orderedDishesForms}
                      combinationId={el.id}
                      key={el.id}
                      qty={el.qty}
                      price={el.totalPrice}
                      withComment={false}
                      editFn={() => setCombinationToUpdate(el)}
                    />
                ))}
              </>
            )}
            {combinationToUpdate && (
              <CombinationItemComponent 
                combination={combination} 
                dishes={combinationToUpdate.orderedDishesForms}
                combinationId={combinationToUpdate.id}
                editFn={() => setCombinationToUpdate(null)}
              />
            )}
            {relatedCombinations.length < count 
              && (
                <CombinationItemComponent 
                  combination={combination} 
                  key={`${Math.random()}-${Date.now()}`}
                />
              )
            }
          </div>
        </div>
        <div className={styles.combinationFooter}>
          <button
            className={styles.combinationBtn}
            onClick={handleIncreaseCount}
            disabled={!Boolean(relatedCombinations.length) || count > relatedCombinations.length}
          >
            Add more menu del dia
          </button>
        </div>
      </div>
    </div>
  )
})