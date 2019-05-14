export const addPalette = (palette) => ({
  type: 'ADD_PALETTE',
  palette
})

export const toggleLocked = (color) => ({
  type: 'TOGGLE_LOCKED',
  color
})

export const makeNewProject = (project) => ({
  type: "MAKE_NEW_PROJECT",
  project
})

export const isLoading = (bool) => ({
  type: 'IS_LOADING',
  isLoading: bool
})

export const hasError = (message) => ({
  type: "HAS_ERROR",
  message
})