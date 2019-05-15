import React from 'react'
import { CardContainer, mapStateToProps, mapDispatchToProps } from './CardContainer';
import makeNewProjectThunk from '../../Thunks/makeNewProjectThunk'
import makeNewPaletteThunk from '../../Thunks/makeNewPaletteThunk';
import fetchProjectsThunk from '../../Thunks/fetchProjectsThunk'
jest.mock('../../Thunks/makeNewProjectThunk')
jest.mock('../../Thunks/makeNewPaletteThunk')
jest.mock('../../Thunks/fetchProjectsThunk')

describe('CardContainer', () => {
  describe('mapStateToProps', () => {
    it('should mapStateToProps', () => {
      const mockState = {}
      const upDatedState = {
        currentPalette: []
      }
      const firstState = mapStateToProps(mockState)
      expect(firstState).toEqual({})
      const newState = mapStateToProps(upDatedState)
      expect(newState).toEqual(upDatedState)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should dispatch makeNewProjectThunk', () => {
      const mockDispatch = jest.fn()
      const mockProject = {
        project_name: 'My Project'
      }
      const actionToDispatch = makeNewProjectThunk(mockProject)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.makeNewProjectThunk(mockProject)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should dispatch makeNewPaletteThunk', () => {
      const mockDispatch = jest.fn()
      const mockPalette = {
        project_name: 'a;lskdjf',
        color_one: '#fff',
        color_two: '#aaa',
        color_three: '#bbb',
        color_four: '#aaa',
        color_five: '#fff'
      }
      const actionToDispatch = makeNewPaletteThunk(mockPalette)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.makeNewPaletteThunk(mockPalette)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should dispatch fetchProjectsThunk', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = fetchProjectsThunk()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.fetchProjectsThunk()
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})
