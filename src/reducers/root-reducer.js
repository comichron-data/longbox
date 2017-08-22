import {combineReducers} from 'redux';

import pagesReducer from './pages-reducer';
import controlsReducer from './controls-reducer';
import readerCommentsReducer from './reader-comments-reducer';

const rootReducer = combineReducers({
  pages: pagesReducer,
  controls: controlsReducer,
  readerComments: readerCommentsReducer
});

export default rootReducer;
