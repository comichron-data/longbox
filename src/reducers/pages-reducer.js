import {
  BOOTSTRAP,
  GO_TO_NEXT_PAGE,
  GO_TO_PREVIOUS_PAGE,
  PAGE_LOADED
} from '../actions';

const lazyLoadBufferSize = 2;

export default function pagesReducer(state, action) {
  state = state || {
    preloadsDone: false
  };

  switch (action.type) {
    case BOOTSTRAP: {
      return {
        ...state,
        currentPageId: action.payload.pages[0].id,
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
      const nextId = findNextId(state.idsInOrder, state.currentPageId);

      if (nextId !== state.currentPageId) {
        return lazyLoadLogic({
          ...state,
          currentPageId: nextId
        });
      } else {
        return state;
      }
    }
    case GO_TO_PREVIOUS_PAGE: {
      const prevId = findPreviousId(state.idsInOrder, state.currentPageId);

      if (prevId !== state.currentPageId) {
        return lazyLoadLogic({
          ...state,
          currentPageId: prevId
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

function findNextId(ids, currentId) {
  const index = ids.indexOf(currentId);

  if (index < ids.length - 1) {
    return ids[index + 1];
  } else {
    return currentId;
  }
}

function findPreviousId(ids, currentId) {
  const index = ids.indexOf(currentId);

  if (index > 0) {
    return ids[index - 1];
  } else {
    return currentId;
  }
}

function lazyLoadLogic(state) {
  const pages = getPages(state);
  const currentPageIndex = state.idsInOrder.indexOf(state.currentPageId);

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
