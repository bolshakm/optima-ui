import { Box, Container } from '@mui/material';
import { HashRouter } from 'react-router-dom';
import { Router } from './navigation';
import './app.css';

function App() {
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
