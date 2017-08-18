import {
  GO_TO_NEXT_PAGE,
  GO_TO_PREVIOUS_PAGE,
  PAGE_LOADED
} from '../actions';

const lazyLoadBufferSize = 2;

export default function pagesReducer(state, action) {
  state = state || {
    byId: {
      '1': {
        id: '1',
        url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
        preload: true,
        readyToLoad: true,
        loaded: false,
        label: 'page 1'
      },
      '2': {
        id: '2',
        url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
        preload: false,
        readyToLoad: false,
        loaded: false,
        label: 'page 2'
      },
      '3': {
        id: '3',
        url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
        preload: false,
        readyToLoad: false,
        loaded: false,
        label: 'page 3'
      },
      '4': {
        id: '4',
        url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
        preload: false,
        readyToLoad: false,
        loaded: false,
        label: 'page 4'
      },
      '5': {
        id: '5',
        url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
        preload: false,
        readyToLoad: false,
        loaded: false,
        label: 'page 5'
      }
    },
    idsInOrder: [1, 2, 3, 4, 5],
    currentPageIndex: 0,
    preloadsDone: false
  };

  switch (action.type) {
    case GO_TO_NEXT_PAGE: {
      const targetIndex = state.currentPageIndex + 1;

      if (targetIndex < state.idsInOrder.length) {
        return lazyLoadLogic({
          ...state,
          currentPageIndex: targetIndex
        });
      }
      break;
    }
    case GO_TO_PREVIOUS_PAGE: {
      const targetIndex = state.currentPageIndex - 1;
      if (targetIndex >= 0) {
        return lazyLoadLogic({
          ...state,
          currentPageIndex: targetIndex
        });
      }
      break;
    }
    case PAGE_LOADED: {
      const {id} = action.payload;
      const page = state.byId[id];
      const newById = {
        ...state.byId,
        [id]: {
          ...page,
          loaded: true
        }
      };

      const newState = {
        ...state,
        byId: newById
      };

      newState.preloadsDone = allPreloadsHaveLoaded(newState);

      if (newState.preloadsDone && !state.preloadsDone) {
        return lazyLoadLogic(state);
      } else {
        return newState;
      }
    }
  }

  return state;
}

function lazyLoadLogic(state) {
  const pages = getPages(state);
  const {currentPageIndex} = state;

  const start = currentPageIndex + 1;
  const end = start + lazyLoadBufferSize;

  const pagesToLoad = pages
    .slice(start, end);

  const newById = pagesToLoad.reduce((byId, page) => {
    byId[page.id] = {
      ...page,
      readyToLoad: true
    };
    return byId;
  }, {...state.byId});

  return {
    ...state,
    byId: newById
  };
}

function allPreloadsHaveLoaded(state) {
  return getPreloads(state)
    .every(page => page.loaded);
}

function getPreloads(state) {
  return getPages(state)
    .filter(page => page.preload);
}

function getPages(state) {
  const {byId} = state;
  return Object.keys(byId)
    .map(id => byId[id]);
}
