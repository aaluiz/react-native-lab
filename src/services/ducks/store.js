import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

import reducer from './index';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = applyMiddleware(thunk, multi, promise)(createStore)(
  persistedReducer,
);

export default store;
