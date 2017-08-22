import axios from 'axios';

/*
TODO

- go to start
- toggle reader comments
- add reader comment
- toggle creator comments
*/

export const BOOTSTRAP = 'BOOTSTRAP';

export const GO_TO_NEXT_PAGE = 'GO_TO_NEXT_PAGE';
export const GO_TO_PREVIOUS_PAGE = 'GO_TO_PREVIOUS_PAGE';
export const PAGE_LOADED = 'PAGE_LOADED';

export const TOGGLE_CONTROLS = 'TOGGLE_CONTROLS';
// user using UI to manipulate fscreen
export const TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN';
// fscreen telling us that its state has changed
export const CHANGE_FULLSCREEN = 'CHANGE_FULLSCREEN';

export const SHOW_READER_COMMENTS = 'SHOW_READER_COMMENTS';
export const HIDE_READER_COMMENTS = 'HIDE_READER_COMMENTS';

export const STARTED_LOADING_READER_COMMENTS = 'STARTED_LOADING_READER_COMMENTS';
export const FINISHED_LOADING_READER_COMMENTS = 'FINISHED_LOADING_READER_COMMENTS';
export const FAILED_LOADING_READER_COMMENTS = 'FAILED_LOADING_READER_COMMENTS';

export function showReaderComments(pageId) {
  return (dispatch, getState) => {
    dispatch({
      type: SHOW_READER_COMMENTS,
      payload: {
        pageId
      }
    });

    if (needToLoadReaderComments(getState(), pageId)) {
      dispatch(loadReaderComments(pageId));
    }
  };
}

function needToLoadReaderComments(state, pageId) {
  return !state.readerComments[pageId].loaded;
}

export function hideReaderComments(pageId) {
  return {
    type: HIDE_READER_COMMENTS,
    payload: {
      pageId
    }
  };
}

export function loadReaderComments(pageId) {
  return dispatch => {
    dispatch(startedLoadingReaderComments(pageId));

    const url = 'https://comichron-data.github.io/staticman-comments-test/comments.json';
    axios.get(url)
      .then(response => {
        dispatch(finishedLoadingReaderComments(pageId, response.data));
      })
      .catch(error => {
        dispatch(failedLoadingReaderComments(pageId, error));
      });
  };
}

function startedLoadingReaderComments(pageId) {
  return {
    type: STARTED_LOADING_READER_COMMENTS,
    payload: {
      pageId
    }
  };
}

function finishedLoadingReaderComments(pageId, comments) {
  return {
    type: FINISHED_LOADING_READER_COMMENTS,
    payload: {
      pageId,
      comments
    }
  };
}

function failedLoadingReaderComments(pageId, error) {
  return {
    type: FAILED_LOADING_READER_COMMENTS,
    payload: {
      pageId,
      error
    }
  };
}

export function bootstrap({pages}) {
  return {
    type: BOOTSTRAP,
    payload: {
      pages
    }
  };
}

export function toggleFullscreen() {
  return {
    type: TOGGLE_FULLSCREEN
  };
}

export function changeFullscreen(isFullscreen) {
  return {
    type: CHANGE_FULLSCREEN,
    payload: {
      isFullscreen
    }
  };
}

export function goToNextPage() {
  return {
    type: GO_TO_NEXT_PAGE
  };
}

export function goToPreviousPage() {
  return {
    type: GO_TO_PREVIOUS_PAGE
  };
}

export function toggleControls() {
  return {
    type: TOGGLE_CONTROLS
  };
}

export function pageLoaded(id) {
  return {
    type: PAGE_LOADED,
    payload: {
      id
    }
  };
}
