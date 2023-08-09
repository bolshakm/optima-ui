import { Grid, Paper, Typography, Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { ReactComponent as TripAdvisor } from '../../assets/svg/tripadvisor.svg'
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/app/hooks';
import { selectCafe } from '../../store/slices/cafe/cafe.slice';

export const FooterComponent = () => {
  const { cafe } = useAppSelector(selectCafe);

  return (
  <Paper sx={{ p: 2 }}>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Grid container flexDirection='column' gap={1}>
          <Typography fontWeight={700}>Our adress</Typography>
          <Typography fontWeight={500}>{cafe?.address}</Typography>{}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Grid container flexDirection='column' gap={1}>
          <Typography fontWeight={700}>Working hours</Typography>
          {cafe && (
            Object.entries(cafe.workingHours).map(([day, hours]) => (
              <Grid container key={day} maxWidth={160} alignItems='center' gap={2}>
                <Typography width={33} fontWeight={500}>{day}</Typography>
                <Typography>{hours}</Typography>
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Grid container flexDirection='column' gap={1}>
          <Typography fontWeight={700}>We are on social network</Typography>
          <Link to={cafe?.facebook || '/'} style={{ color: 'inherit', textDecoration: 'none' }}>
            <Grid container alignItems='center' gap={2}>
              <FacebookIcon /> <Typography>Facebook</Typography>
            </Grid>
          </Link>
          <Link to={cafe?.tripAdvisor || '/'} style={{ color: 'inherit', textDecoration: 'none' }}>
            <Grid container alignItems='center' gap={2}>
              <TripAdvisor /><Typography>TripAdvisor</Typography>
            </Grid>
          </Link>
          <Link to={cafe?.instagram || '/'} style={{ color: 'inherit', textDecoration: 'none' }}>
            <Grid container alignItems='center' gap={2}>
              <InstagramIcon /> <Typography>Instagram</Typography>
            </Grid>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  </Paper>
)}