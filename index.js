/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';

// import configureStore from './src/store/Index'
//import store from './src/redux/store';

//const store = configureStore();
import configureStore from './src/redux/store/configureStore';
const initialState = {
  categories: [],
  categoriesIsLoading: false,
  products: [],
};

const store = configureStore(initialState);

const reduxObject = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => reduxObject);
