import currentPaletteReducer from './currentPaletteReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  currentPalette: currentPaletteReducer
})

export default rootReducer