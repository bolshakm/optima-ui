import { Grid, Paper, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '../../common/constants';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const SuccessBillPage = () => {
  const navigate = useNavigate();

  return (
    <Grid container sx={{ height: '100%', minHeight: 'calc(100vh - 16px)', flexDirection: 'column' }}>
    <Paper sx={{ mb: 3, p: 2 }}>
      <Button
        variant='text'
        color='inherit'
        onClick={() => navigate(ROUTER_KEYS.MENU)}
      >
        <ArrowBackIosIcon color='inherit'/> Back to menu
      </Button>
    </Paper>
    <Paper sx={{ mb: 2, flexGrow: 1, p: 2 }}>
      <Box>
        <Grid container flexDirection="column" alignItems='center'>
          <Typography variant='h6' sx={{ mb: 4 }}>
            Thank you! <br/>
            Soon waiter will bring you a bill.
          </Typography>
        </Grid>
      </Box>
    </Paper>
  </Grid>
  )
}