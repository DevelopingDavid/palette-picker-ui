import { makeNewProject, isLoading, hasError } from '../../Actions'
import { makeNewProjectThunk } from '../makeNewProjectThunk'

describe('makeNewProjectThunk', () => {
  let mockDispatch
  let project

  beforeEach(() => {
    mockDispatch = jest.fn()
    project = {
      id: 9
    }
  })
  it('should dispatch isLoading(true)', () => {
    const thunk = makeNewProjectThunk(project)
    thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasError if the response is not OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Oh no!'
    }))
    const thunk = makeNewProjectThunk(project)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(hasError('Oh no!'))
  })

  it('should dispatch isLoading(false) if the response is OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        project
      })
    }))
    const thunk = makeNewProjectThunk(project)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch makeNewProject with a project if the response is OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(
        project
      )
    }))
    const thunk = makeNewProjectThunk(project)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(makeNewProject(project))
  })
})