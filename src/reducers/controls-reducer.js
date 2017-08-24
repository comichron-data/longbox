import {
  TOGGLE_CONTROLS,
  CHANGE_FULLSCREEN
} from '../actions';

export default function controlsReducer(state, action) {
  state = state || {
    visible: false,
    isFullscreen: false,
    sharing: false
  };

  switch (action.type) {
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
