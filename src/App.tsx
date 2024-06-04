import { useCallback, useMemo } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

import { ThemeContext } from './app/context/ThemeContext';
import { Router } from './routes/Router';
import { useLocalStorage, useFirebaseAuth } from './utils';

import './styles/reset.css';
import './styles/global.css';

export const App = () => {
  useFirebaseAuth();
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const toggleTheme = useCallback(() => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }, [setTheme, theme]);

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
