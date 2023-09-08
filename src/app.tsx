import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Router } from './navigation';
import './app.css';
import { theme } from './theme/theme';
import { useAppDispatch, useAppSelector } from './store/app/hooks';
import { getCafe, selectCafe } from './store/slices/cafe/cafe.slice';
import { useEffect } from 'react';

function App() {
  const { cafe, cafeId } = useAppSelector(selectCafe)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!cafe && cafeId) {
      dispatch(getCafe({cafeId}))
    }
  }, [cafeId, cafe])

  return (
    <HashRouter>
      <div className="app">
        <span className="hero">
          <img src={`data:image/png;base64,${cafe?.banner}`} alt="hero"/>
        </span>
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
