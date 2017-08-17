import {combineReducers} from 'redux';
import {
  GO_TO_NEXT_PAGE,
  GO_TO_PREVIOUS_PAGE
} from '../actions';

const rootReducer = combineReducers({
  pages: pagesReducer
});

function pagesReducer(state, action) {
  state = state || {
    pages: [{
      id: 1,
      url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
      preload: true,
      label: 'page 1'
    }, {
      id: 2,
      url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
      preload: false,
      label: 'page 2'
    }, {
      id: 3,
      url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
      preload: false,
      label: 'page 3'
    }],
    currentPageIndex: 0
  };

  switch (action.type) {
    case GO_TO_NEXT_PAGE: {
      const targetIndex = state.currentPageIndex + 1;

      if (targetIndex < state.pages.length) {
        return {
          ...state,
          currentPageIndex: targetIndex
        };
      }
      break;
    }
    case GO_TO_PREVIOUS_PAGE: {
      const targetIndex = state.currentPageIndex - 1;
      if (targetIndex >= 0) {
        return {
          ...state,
          currentPageIndex: targetIndex
        };
      }
      break;
    }
  }

  return state;
}

export default rootReducer;
