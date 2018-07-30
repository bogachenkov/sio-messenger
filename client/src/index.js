import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'emoji-mart/css/emoji-mart.css'
import './styles/css/index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
