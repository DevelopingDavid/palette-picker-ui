import React from 'react'
import { HeaderBar, mapStateToProps, mapDispatchToProps } from './HeaderBar'
import { fetchProjectsThunk } from '../Thunks/fetchProjectsThunk'
jest.mock('../Thunks/fetchProjectsThunk')

describe('HeaderBar', () => {
  describe('mapStateToProps', () => {
    it('should mapStateToProps', () => {
      const mockState = {}
      const upDatedState = {
        projects: []
      }
      const firstState = mapStateToProps(mockState)
      expect(firstState).toEqual({})
      const newState = mapStateToProps(upDatedState)
      expect(upDatedState).toEqual(newState)
    })
  })

  describe.skip('mapDispatchToProps', () => {
    it('should dispatch fetchProjectsThunk', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = fetchProjectsThunk()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.fetchProjects()
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})