import {
  BOOTSTRAP,
  SHOW_READER_COMMENTS,
  HIDE_READER_COMMENTS,
  STARTED_LOADING_READER_COMMENTS,
  FINISHED_LOADING_READER_COMMENTS,
  FAILED_LOADING_READER_COMMENTS
} from '../actions';

export default function commentsReducer(state, action) {
  state = state || {};

  switch (action.type) {
    case BOOTSTRAP: {
      return action.payload.pages
        .reduce((byPageId, page) => {
          byPageId[page.id] = {
            visible: false,
            loading: false,
            loaded: false,
            comments: [],
            pageId: page.id
          };
          return byPageId;
        }, {});
    }
    case SHOW_READER_COMMENTS: {
      return changePage(state, action.payload.pageId, {
        visible: true
      });
    }
    case HIDE_READER_COMMENTS: {
      return changePage(state, action.payload.pageId, {
        visible: false
      });
    }
    case STARTED_LOADING_READER_COMMENTS: {
      return changePage(state, action.payload.pageId, {
        loading: true
      });
    }
    case FINISHED_LOADING_READER_COMMENTS: {
      return changePage(state, action.payload.pageId, {
        loading: false,
        loaded: true,
        comments: action.payload.comments
      });
    }
    case FAILED_LOADING_READER_COMMENTS: {
      return changePage(state, action.payload.pageId, {
        loading: false,
        loaded: false
      });
    }
    default:
      return state;
  }
}

function changePage(state, pageId, changes) {
  const newPage = {
    ...state[pageId],
    ...changes
  };

  return {
    ...state,
    [pageId]: newPage
  };
}
