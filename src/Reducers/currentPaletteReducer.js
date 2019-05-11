const currentPaletteReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_PALETTE':
      return action.palette
    case 'TOGGLE_LOCKED':
      return state.map(currentColor => {
        if (currentColor.color === action.color) {
          console.log('state', action.color)
          console.log('currentcolor', currentColor.locked)
          return currentColor.locked = !currentColor.locked

        }
      })
    default:
      return state
  }
}

export default currentPaletteReducer