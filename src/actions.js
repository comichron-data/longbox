import * as api from './api';

/*
Action types
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

export const SHOW_ADD_COMMENT_FORM = 'SHOW_ADD_COMMENT_FORM';
export const HIDE_ADD_COMMENT_FORM = 'HIDE_ADD_COMMENT_FORM';

export const STARTED_ADDING_COMMENT = 'STARTED_ADDING_COMMENT';
export const FINISHED_ADDING_COMMENT = 'FINISHED_ADDING_COMMENT';
export const FAILED_ADDING_COMMENT = 'FAILED_ADDING_COMMENT';

/*
Action creators
*/

export function showAddCommentForm(x, y) {
  return {
    type: SHOW_ADD_COMMENT_FORM,
    payload: {x, y}
  };
}

export function hideAddCommentForm() {
  return {
    type: HIDE_ADD_COMMENT_FORM
  };
}

export function addComment({name, text, x, y, pageId}) {
  return dispatch => {
    dispatch(startedAddingComment({
      name,
      text,
      x,
      y,
      pageId
    }));

    return api.addComment({name, text, x, y, pageId})
      .then(() => {
        dispatch(finishedAddingComment({name, text, x, y, pageId}));
      })
      .catch(error => {
        dispatch(failedAddingComment(error));
      });
  };
}

function startedAddingComment({name, text, x, y, pageId}) {
  return {
    type: STARTED_ADDING_COMMENT,
    payload: {name, text, x, y, pageId}
  };
}

function finishedAddingComment({name, text, x, y, pageId}) {
  return {
    type: FINISHED_ADDING_COMMENT,
    payload: {name, text, x, y, pageId}
  };
}

function failedAddingComment(error) {
  return {
    type: FAILED_ADDING_COMMENT,
    payload: {
      error
    }
  };
}


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

    return api.getComments(pageId)
      .then(comments => {
        dispatch(finishedLoadingReaderComments(pageId, comments));
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
