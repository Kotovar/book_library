import { useCallback, useMemo, useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

import { ThemeContext } from './app/context/ThemeContext';
import { Router } from './routes';
import { useFirebaseAuth } from './utils/useFirebaseAuth';

import './styles/reset.css';
import './styles/global.css';

export const App = () => {
  useFirebaseAuth();

  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  const toggleTheme = useCallback(() => {
    setTheme(theme => (theme === 'dark' ? 'light' : 'dark'));
  }, []);

  const themeValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ThemeContext.Provider value={themeValue}>
          <Router />
        </ThemeContext.Provider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
