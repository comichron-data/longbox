import {combineReducers} from 'redux';

import pagesReducer from './pages-reducer';
import controlsReducer from './controls-reducer';
import shelfReducer from './shelf-reducer';

const rootReducer = combineReducers({
  pages: pagesReducer,
  controls: controlsReducer,
  shelf: shelfReducer
});

export default rootReducer;
