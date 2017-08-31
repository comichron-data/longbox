/*
Action types
*/

export const BOOTSTRAP = 'BOOTSTRAP';

export const GO_TO_NEXT_PAGE = 'GO_TO_NEXT_PAGE';
export const GO_TO_PREVIOUS_PAGE = 'GO_TO_PREVIOUS_PAGE';
export const PAGE_LOADED = 'PAGE_LOADED';

export const TOGGLE_CONTROLS = 'TOGGLE_CONTROLS';
// user using UI to manipulate fscreen
export const TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN';
// fscreen telling us that its state has changed
export const CHANGE_FULLSCREEN = 'CHANGE_FULLSCREEN';

export const TOGGLE_SHELF = 'TOGGLE_SHELF';

/*
Action creators
*/

export function bootstrap({pages, tweet, shareUrl}) {
  return {
    type: BOOTSTRAP,
    payload: {
      pages,
      tweet,
      shareUrl
    }
  };
}

export function toggleShelf() {
  return {
    type: TOGGLE_SHELF
  };
}

export function toggleFullscreen() {
  return {
    type: TOGGLE_FULLSCREEN
  };
}

export function changeFullscreen(isFullscreen) {
  return {
    type: CHANGE_FULLSCREEN,
    payload: {
      isFullscreen
    }
  };
}

export function goToNextPage() {
  return {
    type: GO_TO_NEXT_PAGE
  };
}

export function goToPreviousPage() {
  return {
    type: GO_TO_PREVIOUS_PAGE
  };
}

export function toggleControls() {
  return {
    type: TOGGLE_CONTROLS
  };
}

export function pageLoaded(id) {
  return {
    type: PAGE_LOADED,
    payload: {
      id
    }
  };
}
