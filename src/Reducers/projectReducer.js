const projectReducer = (state=[], action) => {
  switch (action.type) {
    case 'MAKE_NEW_PROJECT':
      return [...state, action.project]
    case 'ADD_PROJECTS':
      return action.projects
    default:
      return state
  }
}

export default projectReducer