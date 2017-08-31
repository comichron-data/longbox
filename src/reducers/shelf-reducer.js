import {
  TOGGLE_SHELF,
  GO_TO_NEXT_PAGE
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
    case GO_TO_NEXT_PAGE:
      if (action.payload.fromLastPage) {
        return {
          ...state,
          open: true
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}
