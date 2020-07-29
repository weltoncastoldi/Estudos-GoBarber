import React from 'react';
import { BrowserRouter as Route } from 'react-router-dom';
import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <Route>
    <AppProvider>
      <Routes />
    </AppProvider>
    <GlobalStyle />
  </Route>
);

export default App;
