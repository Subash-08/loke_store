import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';

if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  const appComponent = (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );

  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, appComponent);
  } else {
    const root = createRoot(rootElement);
    root.render(appComponent);
  }
}