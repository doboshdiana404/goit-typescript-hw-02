import { createRoot } from 'react-dom/client';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { StrictMode } from 'react';
import App from './components/App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          marginTop: '50px',
        },
      }}
    />
  </StrictMode>
);
