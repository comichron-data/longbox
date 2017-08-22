import {
  SHOW_ADD_COMMENT_FORM,
  HIDE_ADD_COMMENT_FORM
} from '../actions';

export default function commentFormReducer(state, action) {
  state = state || {
    visible: false,
    x: 0,
    y: 0
  };

  switch (action.type) {
    case SHOW_ADD_COMMENT_FORM: {
      return {
        ...state,
        visible: true,
        x: action.payload.x,
        y: action.payload.y
      };
    }
    case HIDE_ADD_COMMENT_FORM: {
      return {
        ...state,
        visible: false
      };
    }
    default:
      return state;
  }
}
