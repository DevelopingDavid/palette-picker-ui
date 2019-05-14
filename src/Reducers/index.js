import currentPaletteReducer from './currentPaletteReducer'
import isLoadingReducer from './isLoadingReducer'
import errorReducer from './errorReducer'
import { combineReducers } from 'redux'
import projectReducer from './projectReducer'

const rootReducer = combineReducers({
  currentPalette: currentPaletteReducer,
  isLoading: isLoadingReducer,
  hasError: errorReducer,
  projects: projectReducer
})

export default rootReducer