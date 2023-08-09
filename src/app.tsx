import { Box, Container } from '@mui/material';
import { HashRouter } from 'react-router-dom';
import { Router } from './navigation';
import './app.css';
import { useAppDispatch } from './store/app/hooks';
import { useEffect } from 'react';
import { getCafe } from './store/slices/cafe/cafe.slice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCafe({ cafeId: '1' }));
  })

  return (
    <HashRouter>
      <Box sx={{ minHeight: '100vh' }}>
        <Container sx={{ px: 0.5 }}>
          <Router />
        </Container>
      </Box>
    </HashRouter>
  )
}

export default App;
