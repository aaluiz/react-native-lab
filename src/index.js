import React from 'react';

import '~/config/ReactotronConfig';

import Routes from '~/routes';
import {Provider} from 'react-redux';
import store from './services/ducks/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

const persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>
);

export default App;
