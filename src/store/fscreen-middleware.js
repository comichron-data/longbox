import fscreen from 'fscreen';

import {
  TOGGLE_FULLSCREEN,
  changeFullscreen
} from '../actions';

export default store => {
  fscreen.addEventListener('fullscreenchange', () => {
    store.dispatch(changeFullscreen(isFullscreen()));
  });

  return next => action => {
    if (action.type === TOGGLE_FULLSCREEN) {
      toggleFullscreen();
      return;
    }

    return next(action);
  };
};

function toggleFullscreen() {
  if (isFullscreen()) {
    exitFullscreen();
  } else {
    enterFullscreen();
  }
}

function isFullscreen() {
  return fscreen.fullscreenElement != null;
}

function enterFullscreen() {
  fscreen.requestFullscreen(document.documentElement);
}

function exitFullscreen() {
  fscreen.exitFullscreen();
}
