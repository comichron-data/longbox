import {
  GO_TO_NEXT_PAGE,
  GO_TO_PREVIOUS_PAGE
} from '../actions';

export default function pagesReducer(state, action) {
  state = state || {
    byId: {
      '1': {
        id: 1,
        url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
        preload: true,
        label: 'page 1'
      },
      '2': {
        id: 2,
        url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
        preload: false,
        label: 'page 2'
      },
      '3': {
        id: 3,
        url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
        preload: false,
        label: 'page 3'
      }
    },
    idsInOrder: [1, 2, 3],
    currentPageIndex: 0
  };

  switch (action.type) {
    case GO_TO_NEXT_PAGE: {
      const targetIndex = state.currentPageIndex + 1;

      if (targetIndex < state.idsInOrder.length) {
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
