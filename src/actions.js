export const GO_TO_NEXT_PAGE = 'GO_TO_NEXT_PAGE';
export const GO_TO_PREVIOUS_PAGE = 'GO_TO_PREVIOUS_PAGE';

export const TOGGLE_CONTROLS = 'TOGGLE_CONTROLS';
// user using UI to manipulate fscreen
export const TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN';
// fscreen telling us that its state has changed
export const CHANGE_FULLSCREEN = 'CHANGE_FULLSCREEN';

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


/*

go to next page
go to previous page
go to start

toggle controls

enter full screen
exit full screen

toggle reader comments
add reader comment
vote reader comment - up/down

toggle creator comments

lazy load finished

*/
