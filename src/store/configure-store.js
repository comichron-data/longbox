import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/root-reducer';
import fscreenMiddleware from './fscreen-middleware';

const middleware = applyMiddleware(fscreenMiddleware);

export default function configureStore() {
  return createStore(rootReducer, middleware);
}
