import {
  TOGGLE_CONTROLS,
  CHANGE_FULLSCREEN,
  BOOTSTRAP
} from '../actions';

export default function controlsReducer(state, action) {
  state = state || {
    visible: false,
    isFullscreen: false
  };

  switch (action.type) {
    case BOOTSTRAP:
      return {
        ...state,
        shareUrl: action.payload.shareUrl,
        tweet: action.payload.tweet
      };
    case TOGGLE_CONTROLS:
      return {
        ...state,
        visible: !state.visible
      };
    case CHANGE_FULLSCREEN:
      return {
        ...state,
        isFullscreen: action.payload.isFullscreen
      };
    default:
      return state;
  }
}
