import React, { memo } from 'react';
import { IBillItem } from '../../types'
import { Grid } from '@mui/material';
import styles from './style.module.css';
import { DedscriptionComponent } from './description.component';
import { PriceComponent } from './price.component';

interface IProps {
  item: IBillItem;
}

export const BillItemComponent: React.FC<IProps> = memo(({ 
  item
}) => {
  return (
    <div className={styles.billItem}>
      <div className={styles.content}>
        <Grid item xs={8}>
          <Grid container flexDirection='column'>
            <h5 className={styles.name}>{item.name}</h5>
            <DedscriptionComponent text={item.description} />
            <PriceComponent
              volumeId={item.selectedVolumeId} 
              setVolumeId={() => {}} 
              volumes={item.volumeDataList} 
              readonly={true}
            />
          </Grid>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Grid container justifyContent='flex-end'>
            <h6 className={styles.count}>x{item.quantity}</h6>
          </Grid>
        </Grid>
      </div>
    </div>
  )
})