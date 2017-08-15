import {createStore} from 'redux';
import rootReducer from '../reducers/root-reducer';

export default function configureStore() {
  return createStore(rootReducer);
}
