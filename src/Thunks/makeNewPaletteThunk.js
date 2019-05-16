import { isLoading, hasError } from '../Actions'

export const makeNewPaletteThunk = (palette) => {
  return async (dispatch) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(palette),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      dispatch(isLoading(true))
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/projects/${palette.project_id}/palettes`, options)
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      dispatch(isLoading(false))
    } catch (error) {
      dispatch(hasError(error.message))
    }
  }
}

export default makeNewPaletteThunk;