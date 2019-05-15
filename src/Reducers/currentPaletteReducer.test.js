import * as actions from '../Actions'
import { currentPaletteReducer } from './currentPaletteReducer'

describe('currentPaletteReducer', () => {

  let mockDefaultState;

  beforeEach(() => {
    mockDefaultState = []
  })

  it('should return state if there is no action.type', () => {
    const mockAction = {}
    const results = currentPaletteReducer(mockDefaultState, mockAction)
    expect(results).toEqual(mockDefaultState)
  })

  it(
    'should toggle a locked property to ONE index in an array of color objects if the action.type is TOGGLE_LOCKED and there is a match',
    () => {
      const mockState = [
        {
          hex: "#ffff",
          locked: false
        },
        {
          hex: "#fff",
          locked: false
        }, {
          hex: "#fffF68",
          locked: false
        }, {
          hex: "#fff",
          locked: false
        }, {
          hex: "#3C4F68",
          locked: false
        }
      ]
      const mockAction = {
        type: 'TOGGLE_LOCKED',
        color: '#3C4F68'
      }

      const expected = [
        {
          hex: "#ffff",
          locked: false
        },
        {
          hex: "#fff",
          locked: false
        }, {
          hex: "#fffF68",
          locked: false
        }, {
          hex: "#fff",
          locked: false
        }, {
          hex: '#3C4F68',
          locked: true
        }
      ]

      const results = currentPaletteReducer(mockState, mockAction)
      expect(results).toEqual(expected)
    })

  
})