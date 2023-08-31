import { Box, Grid, Typography } from '@mui/material'
import React, { memo } from 'react';
import { IBill } from '../../types';
import { BillItemComponent } from '../dish/bill-item.component';

import styles from './styles.module.css';

interface IProps {
  bill: IBill;
}

export const BillComponent: React.FC<IProps> = memo(({ bill }) => {
  console.log(bill);
  
  return (
    <h6 className={styles.box}>
        <h6 className={styles.title}>
          Your order
        </h6>
        <div className={styles.list}>
          {bill.orderedDish.map((item) => (
            <React.Fragment key={item.id + item.selectedVolumeId}>
              <BillItemComponent item={item} />
            </React.Fragment>
          ))}
        </div>
        <Grid container sx={{ justifyContent: 'flex-end'}}>
        <h6 className={styles.sum}>
          Total sum: {bill.totalSum}UAH
        </h6>
        </Grid>
      </h6>
  )
})