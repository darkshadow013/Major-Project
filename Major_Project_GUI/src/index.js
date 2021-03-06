import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App.js'
import {Provider} from 'react-redux'
import {store} from './Redux/Store/store';
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
