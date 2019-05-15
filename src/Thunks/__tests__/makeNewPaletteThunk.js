import { isLoading, hasError } from '../../Actions'
import { makeNewPaletteThunk } from '../makeNewPaletteThunk'

describe('makeNewPaletteThunk', () => {
  let mockDispatch
  let mockPalette

  beforeEach(() => {
    mockDispatch = jest.fn()
    mockPalette = [
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
  })

  it('should dispatch isLoading(true)', () => {
    const thunk = makeNewPaletteThunk(mockPalette)
    thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasError() if the response is not OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Oh no!'
    }))
    const thunk = makeNewPaletteThunk(mockPalette)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(hasError('Oh no!'))
  })

  it('should dispatch isLoading(false) if the response if OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        mockPalette
      })
    }))
    const thunk = makeNewPaletteThunk(mockPalette)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })
})