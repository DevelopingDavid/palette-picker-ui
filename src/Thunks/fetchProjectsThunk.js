import { addProjects, isLoading, hasError } from '../Actions'

const fetchProjectsThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch('http://localhost:3001/api/v1/projects')
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const projects = await response.json()
      dispatch(isLoading(false))
      dispatch(addProjects(projects))
    } catch (error) {
      dispatch(hasError(error.message))
    }
  }
}

export default fetchProjectsThunk