import {
  TOGGLE_CONTROLS,
  CHANGE_FULLSCREEN,
  SHOW_READER_COMMENTS,
  HIDE_READER_COMMENTS
} from '../actions';

export default function controlsReducer(state, action) {
  state = state || {
    visible: false,
    isFullscreen: false,
    showingReaderComments: false
  };

  switch (action.type) {
    case SHOW_READER_COMMENTS:
      return {
        ...state,
        showingReaderComments: true
      };
    case HIDE_READER_COMMENTS:
      return {
        ...state,
        showingReaderComments: false
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
