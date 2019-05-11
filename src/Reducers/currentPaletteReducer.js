const currentPaletteReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_PALETTE':
      return action.palette
    default:
      return state
  }
}

export default currentPaletteReducer