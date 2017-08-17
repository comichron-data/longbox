import {
  TOGGLE_CONTROLS
} from '../actions';

export default function controlsReducer(state, action) {
  state = state || {
    visible: false
  };

  switch (action.type) {
    case TOGGLE_CONTROLS:
      return {
        ...state,
        visible: !state.visible
      };
    default:
      return state;
  }
}
