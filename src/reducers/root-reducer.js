import {combineReducers} from 'redux';

import pagesReducer from './pages-reducer';
import controlsReducer from './controls-reducer';

const rootReducer = combineReducers({
  pages: pagesReducer,
  controls: controlsReducer
});

export default rootReducer;
