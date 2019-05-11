export const addPalette = (palette) => ({
  type: 'ADD_PALETTE',
  palette
})

export const toggleLocked = (color) => ({
  type: 'TOGGLE_LOCKED',
  color
})