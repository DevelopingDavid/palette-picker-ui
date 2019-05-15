import { addProjects, isLoading, hasError } from '../../Actions'
import { fetchProjectsThunk } from '../fetchProjectsThunk'

describe('fetchProjectsThunk', () => {
  let mockDispatch;
  let mockProjects;
  beforeEach(() => {
    mockDispatch = jest.fn()
    mockProjects = [
      {
        id: 74, 
        project_name: "Project 2"
      },
      {
        id: 75, 
        project_name: "Project 3"
      }
    ]
  })

  it('should dispatch isLoading(true)', () => {
    const thunk = fetchProjectsThunk()
    thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasError with a message if the response is not OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'I got 99 problems and a fetch is one.'
    }))
    const thunk = fetchProjectsThunk()
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(hasError('I got 99 problems and a fetch is one.'))
  })

  it('should dispatch isLoading(false) if the response is OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        projects: mockProjects
      })
    }))
    const thunk = fetchProjectsThunk()
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch addProjects with an array of projects', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(
        mockProjects
      )
    }))
    const thunk = fetchProjectsThunk()
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(addProjects(mockProjects))
  })
})