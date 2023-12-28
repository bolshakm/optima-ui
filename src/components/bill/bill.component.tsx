import { Grid } from '@mui/material'
import React, { memo } from 'react';
import { IBill } from '../../types';
import { BillItemComponent } from '../dish/bill-item.component';
import styles from './styles.module.css';
import { selectTexts } from '../../store/slices/texts.slice';
import { useAppSelector } from '../../store/app/hooks';
import { CombinationBillItemComponent } from '../combination-item/cart-item';

interface IProps {
  bill: IBill;
}

export const BillComponent: React.FC<IProps> = memo(({ bill }) => {
  const { texts } = useAppSelector(selectTexts);

  return (
    <div className={styles.box}>
        <h6 className={styles.title}>
          {texts['your.order']}
        </h6>
        <div className={styles.list}>
          {bill.orderedDish.map((item) => (
            <React.Fragment key={item.id + item.selectedVolumeId}>
              <BillItemComponent item={item} />
            </React.Fragment>
          ))}
          {bill.orderedCombinationData.map((item) => (
            <React.Fragment key={`${Math.random()}-${item.name}`}>
              <CombinationBillItemComponent billItem={item} />
            </React.Fragment>
          ))}
        </div>
        <Grid container sx={{ justifyContent: 'flex-end'}}>
          <h6 className={styles.sum}>
            {`${texts['total.sum']} ${bill.totalSum.toFixed(2)}€`}
          </h6>
        </Grid>
      </div>
  )
})