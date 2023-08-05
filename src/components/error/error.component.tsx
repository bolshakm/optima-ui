import { Grid, Paper, Typography } from '@mui/material';
import React, { memo } from 'react';

interface IProps {
  title: string;
}

export const ErrorComponent: React.FC<IProps> = memo(({ title }) => (
  <Grid container sx={{ alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
    <Paper sx={{ p: 5 }}>
      <Typography variant='h4' color='error'>{title}</Typography>
    </Paper>
  </Grid>
))