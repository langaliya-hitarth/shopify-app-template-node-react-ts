import App from './App';
import { createRoot } from 'react-dom/client';
import { initI18n } from './utils/i18nUtils';

// Ensure that locales are loaded before rendering the app
initI18n().then(() => {
  const container = document.getElementById('app');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  } else {
    console.error('Failed to find the app container');
  }
});
