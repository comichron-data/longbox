import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {
  bootstrap,
  showReaderComments,
  hideReaderComments,
  addComment
} from './actions';

import App from './components/App';
import './index.css';

import configureStore from './store/configure-store';
import registerServiceWorker from './registerServiceWorker';

// TODO this comes from static gen or something
const pages = [
  {
    id: '1',
    url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
    preload: true,
    label: '1 / 5'
  },
  {
    id: '2',
    url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
    preload: false,
    label: '2 / 5'
  },
  {
    id: '3',
    url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
    preload: false,
    label: '3 / 5'
  },
  {
    id: '4',
    url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
    preload: false,
    label: '4 / 5'
  },
  {
    id: '5',
    url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
    preload: false,
    label: '5 / 5'
  }
];

const store = configureStore();
store.dispatch(bootstrap({
  pages
}));

setTimeout(() => store.dispatch(showReaderComments(2)), 2000);
setTimeout(() => store.dispatch(hideReaderComments(2)), 4000);

// setTimeout(() => store.dispatch(addComment({
//   name: 'comic fan bob',
//   text: 'hey everyone!',
//   x: 20,
//   y: 60,
//   pageId: 2
// })), 6000)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);



registerServiceWorker();
