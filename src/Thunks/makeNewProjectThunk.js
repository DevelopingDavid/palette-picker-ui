import { makeNewProject, isLoading, hasError } from '../Actions'

export const makeNewProjectThunk = (project) => {
  return async (dispatch) => {
    const options = {
      method: "POST",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      dispatch(isLoading(true))
      const response = await fetch(`${REACT_APP_BACKEND_URL}/api/v1/projects`, options)
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const projectId = await response.json()
      dispatch(isLoading(false))
      dispatch(makeNewProject(projectId))
      return projectId
    } catch (error) {
      dispatch(hasError(error.message))
    }
  }
}

export default makeNewProjectThunk