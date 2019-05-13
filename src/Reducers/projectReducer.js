const projectReducer = (state=[], action) => {
  switch (action.type) {
    case 'MAKE_NEW_PROJECT':
      return [action.project, ...state]
    default:
      return state
  }
}