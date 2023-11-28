import React, { memo } from 'react';
import { IBillItem } from '../../types'
import { Grid } from '@mui/material';
import styles from './style.module.css';
import { DedscriptionComponent } from './description.component';
import { PriceComponent } from './price.component';
import { useAppSelector } from '../../store/app/hooks';
import { selectLanguage } from '../../store/slices/menu/menu.slice';
import { AllergensComponent } from './allergens.component';
import { selectTexts } from '../../store/slices/texts.slice';

interface IProps {
  item: IBillItem;
}

export const BillItemComponent: React.FC<IProps> = memo(({ 
  item
}) => {
  const lang = useAppSelector(selectLanguage) || 'EN';
  const { texts } = useAppSelector(selectTexts);

  return (
    <div className={styles.billItem}>
      <div className={styles.content}>
        <Grid item xs={8}>
          <Grid container flexDirection='column' height='100%'>
            <h5 className={styles.name}>{item?.multilingualNameMap?.[lang] || item.name}</h5>
            <DedscriptionComponent text={item?.multilingualDescriptionMap?.[lang] || item.description} />
            <div className={styles.priceWrapper}>
              <PriceComponent
                volumeId={item.selectedVolumeId} 
                setVolumeId={() => {}} 
                volumes={item.volumeDataList} 
                readonly={true}
              />
            </div>
            {(Boolean(item.allergens?.length) || Boolean(item.infoDishIcons?.length)) && (
              <AllergensComponent allergens={item.allergens} info={item.infoDishIcons} />
            )}
          </Grid>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Grid container justifyContent='flex-end' alignItems='flex-end' flexDirection='column'>
            {item?.image && (
              <div className={styles.box}>
                <img src={`data:image/png;base64,${item.image}`} alt="dish" />
              </div>
            )}
            <h6 className={styles.count}>x{item.quantity}</h6>
          </Grid>
        </Grid>
      </div>
      {item.comment && (
        <p className={styles.comment}>
          <span><b>{texts.comment}:</b></span>
          {item.comment}
        </p>
      )}
    </div>
  )
})