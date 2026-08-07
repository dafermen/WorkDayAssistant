import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('The root element is required to start WorkDay Assistant.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
