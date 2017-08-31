import {
  TOGGLE_SHELF
} from '../actions';

export default function (state, action) {
  state = state || {
    open: false
  };

  switch (action.type) {
    case TOGGLE_SHELF:
      return {
        ...state,
        open: !state.open
      };
    default:
      return state;
  }
}
