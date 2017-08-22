import {
  BOOTSTRAP,
  GO_TO_NEXT_PAGE,
  GO_TO_PREVIOUS_PAGE,
  PAGE_LOADED
} from '../actions';

const lazyLoadBufferSize = 2;

export default function pagesReducer(state, action) {
  state = state || {
    currentPageIndex: 0,
    preloadsDone: false
  };

  switch (action.type) {
    case BOOTSTRAP: {
      return {
        ...state,
        idsInOrder: action.payload.pages.map(p => p.id),
        byId: action.payload.pages
          .reduce((byId, page) => {
            byId[page.id] = {
              ...page,
              readyToLoad: page.preload,
              loaded: false
            };
            return byId;
          }, {})
      };
    }
    case GO_TO_NEXT_PAGE: {
      const targetIndex = state.currentPageIndex + 1;

      if (targetIndex < state.idsInOrder.length) {
        return lazyLoadLogic({
          ...state,
          currentPageIndex: targetIndex
        });
      } else {
        return state;
      }
    }
    case GO_TO_PREVIOUS_PAGE: {
      const targetIndex = state.currentPageIndex - 1;
      if (targetIndex >= 0) {
        return lazyLoadLogic({
          ...state,
          currentPageIndex: targetIndex
        });
      } else {
        return state;
      }
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
    default:
      return state;
  }
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
