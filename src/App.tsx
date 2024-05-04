import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

import { Router } from './routes';

import './styles/reset.css';

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Router />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
