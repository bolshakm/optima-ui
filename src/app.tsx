import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Router } from './navigation';
import './app.css';
import { theme } from './theme/theme';

function App() {
  return (
    <HashRouter>
      <div className="app">
        <span className="hero" />
        <div className="content">
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
        </div>
      </div>
    </HashRouter>
  )
}

export default App;
