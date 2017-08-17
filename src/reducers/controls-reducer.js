import {
  TOGGLE_CONTROLS,
  FULLSCREEN_CHANGED
} from '../actions';

export default function controlsReducer(state, action) {
  state = state || {
    visible: false,
    isFullscreen: false
  };

  switch (action.type) {
    case TOGGLE_CONTROLS:
      return {
        ...state,
        visible: !state.visible
      };
    case FULLSCREEN_CHANGED:
      return {
        ...state,
        isFullscreen: action.payload.isFullscreen
      };
    default:
      return state;
  }
}
