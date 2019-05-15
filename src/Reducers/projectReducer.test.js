import * as actions from '../Actions'
import projectReducer from './projectReducer';

describe('projectReducer', () => {
  let state = []
  it('should return default state', () => {
    const action = {}
    const result = projectReducer(state, action)
    expect(result).toEqual(state)
  })
  it('should add a project to the array', () => {
    const project = {
      project_name: 'Test Project'
    }
    const action = actions.makeNewProject(project)
    const expected = [{project_name: 'Test Project'}]
    const result = projectReducer(state, action)
    expect(result).toEqual(expected)
  })
  it('should return an array of projects', () => {
    const projects = [{project_name: 'Test Project'}, {project_name: 'Pass the tests'}]
    const action = actions.addProjects(projects)
    const result = projectReducer(state, action)
    expect(result).toEqual(projects)
  })
})