const projectReducer = (state=[], action) => {
  switch (action.type) {
    case 'MAKE_NEW_PROJECT':
      return [...state, action.project]
    default:
      return state
  }
}

export default projectReducer