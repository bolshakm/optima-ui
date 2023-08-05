import { Grid, Paper, Typography } from '@mui/material'
import React, { memo } from 'react';
import { IBill } from '../../types';
import { COLORS } from '../../theme/colors';

interface IProps {
  data: IBill;
  clearCartAndNavigate: () => void;
}

export const BillComponent: React.FC<IProps> = memo(({ data, clearCartAndNavigate }) => {
  return (
    <Grid 
      container
      sx={{ height: '100vh', alignItems: 'center' }}
      onClick={clearCartAndNavigate}
    >
      <Paper sx={{ px: 3, py: 2, width: '100%', backgroundColor: COLORS.LIGHT_GRAY }}>
        <Grid container alignItems='center' flexDirection='column' gap={2}>
          <Typography variant='h4' fontWeight={700} mb={2} >Bill</Typography>
          {data.orderedDish.map((item) => (
            <Grid item key={item.dish.id + item.dish.name} width='100%'>
              <Grid container justifyContent='space-between' width='100%'>
                <Typography fontWeight={700}>{item.dish.name}</Typography>
                <Typography fontWeight={700} sx={{ color: COLORS.ORANGE }}>x{item.quantity}</Typography>
              </Grid>
            </Grid>
          )
          )}
          <Typography variant='h6' sx={{ alignSelf: 'flex-end', fontWeight: 700 }}>
            Total count:
            <Typography variant='h6' sx={{ color: COLORS.ORANGE, display: 'inline-block', ml: 2, fontWeight: 700 }}>
              {data.totalSum}UAH
            </Typography>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  )
})