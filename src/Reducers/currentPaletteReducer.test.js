import * as actions from '../Actions'
import { currentPaletteReducer } from './currentPaletteReducer'

describe('currentPaletteReducer', () => {

  let state;
  const mockPalette = [
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

  beforeEach(() => {
    state = []
  })

  it('should return state if there is no action.type', () => {
    const mockAction = {}
    const results = currentPaletteReducer(state, mockAction)
    expect(results).toEqual(state)
  })

  it('should return a palette', () => {
    const action = actions.addPalette(mockPalette)
    const result = currentPaletteReducer(state, action)
    expect(result).toEqual(mockPalette)
  })

  it('should toggle a locked property to ONE index in an array of color objects if the action.type is TOGGLE_LOCKED and there is a match',
    () => {

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

      const results = currentPaletteReducer(mockPalette, mockAction)
      expect(results).toEqual(expected)
    })

    it('should display a palette that is already saved to a project', () => {
      const action = actions.displaySavedPalette(mockPalette)
      const result = currentPaletteReducer(state, action)
      expect(result).toEqual(mockPalette)
    })

  
})