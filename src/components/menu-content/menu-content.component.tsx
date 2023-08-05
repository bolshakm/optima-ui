import { Box, CircularProgress, Grid } from '@mui/material';
import { useAppSelector } from '../../store/app/hooks';
import { selectRestaurant } from '../../store/slices/restaurant/restaurant.slice';
import { LoadingStatus } from '../../types';
import { CategoryItemComponent, ErrorComponent } from '..';

export const MenuContentComponent = () => {
  const { restaurant, status } = useAppSelector(selectRestaurant);

  if (status === LoadingStatus.failed) {
    return <ErrorComponent title='Problem with fetching data' />
  }

  if (status === LoadingStatus.loading) {
    return (
    <Grid container sx={{ height: '60vh', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress size={80} color='inherit' />
    </Grid>
    )
  }

  return (
    <Box>
      {restaurant?.categories.map((category) => <CategoryItemComponent key={category.id + category.name} category={category} />)}
    </Box>
  )
}