import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { GlobalProvider } from './context/GlobalContext';

render(
  <div>
    <GlobalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalProvider>
  </div>,
  document.getElementById('root'),
);
