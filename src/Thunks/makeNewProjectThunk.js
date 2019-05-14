import { makeNewProject, isLoading, hasError } from '../Actions'

const makeNewProjectThunk = (project) => {
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
      const response = await fetch('http://localhost:3001/api/v1/projects', options)
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const project = await response.json()
      dispatch(isLoading(false))
      dispatch(makeNewProject(project))
      return project
    } catch (error) {
      dispatch(hasError(error.message))
    }
  }
}

export default makeNewProjectThunk