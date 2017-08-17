export const GO_TO_NEXT_PAGE = 'GO_TO_NEXT_PAGE';
export const GO_TO_PREVIOUS_PAGE = 'GO_TO_PREVIOUS_PAGE';



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
