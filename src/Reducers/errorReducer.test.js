import * as actions from '../Actions'
import errorReducer from './errorReducer'

describe('errorReducer', () => {
  let state = ''
  it('should return default state', () => {
    const action = {}
    const result = errorReducer(state, action)
    expect(result).toEqual(state)
  })
  it('should return an error message', () => {
    const error = `Something went wrong`
    const action = actions.hasError(error)
    const result = errorReducer(state, action)
    expect(result).toEqual(error)
  })
})