import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/root-reducer';

import fscreenMiddleware from './fscreen-middleware';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk, fscreenMiddleware);

export default function configureStore() {
  return createStore(rootReducer, middleware);
}
