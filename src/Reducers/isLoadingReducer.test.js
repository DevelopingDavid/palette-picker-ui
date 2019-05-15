import * as actions from '../Actions'
import isLoadingReducer from './isLoadingReducer'

describe('isLoadingReducer', () => {
  const state = ''
  it('should return default state', () => {
    const action = {}
    const results = isLoadingReducer(state, action)
    expect(results).toEqual(state)
  })
  it('should return isLoading is true', () => {
    const action = actions.isLoading(true)
    const results = isLoadingReducer(state, action)
    expect(results).toBe(true)
  })
})