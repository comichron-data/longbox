import {combineReducers} from 'redux';

import pagesReducer from './pages-reducer';
import controlsReducer from './controls-reducer';
import readerCommentsReducer from './reader-comments-reducer';
import commentFormReducer from './comment-form-reducer';

const rootReducer = combineReducers({
  pages: pagesReducer,
  controls: controlsReducer,
  readerComments: readerCommentsReducer,
  commentForm: commentFormReducer
});

export default rootReducer;
