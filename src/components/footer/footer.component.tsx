import { Grid, Paper, Typography, Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { ReactComponent as TripAdvisor } from '../../assets/svg/tripadvisor.svg'
import { Link } from 'react-router-dom';

export const FooterComponent = () => (
  <Paper sx={{ p: 2 }}>
    <Grid container flexDirection='column' gap={3}>
      <Box>
        <Grid container flexDirection='column' gap={1}>
          <Typography fontWeight={700}>Working hours</Typography>
          <Typography>9:00 - 21:00</Typography>
        </Grid>
        
      </Box>
      <Box>
        <Grid container flexDirection='column' gap={1}>
          <Typography fontWeight={700}>We are on social network</Typography>
          <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
            <Grid container alignItems='center' gap={2}>
              <FacebookIcon /> <Typography>Facebook</Typography>
            </Grid>
          </Link>
          <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
            <Grid container alignItems='center' gap={2}>
              <TripAdvisor /><Typography>TripAdvisor</Typography>
            </Grid>
          </Link>
          <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
            <Grid container alignItems='center' gap={2}>
              <InstagramIcon /> <Typography>Instagram</Typography>
            </Grid>
          </Link>
        </Grid>
      </Box>
    </Grid>
  </Paper>
)