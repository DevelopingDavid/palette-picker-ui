import React from 'react';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { addPalette } from '../../Actions'
jest.mock('../../Actions')


describe('App', () => {
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

    it('should dispatch addPalette', () => {
      const mockDispatch = jest.fn()
      const mockPalette = {
        project_name: 'a;lskdjf',
        color_one: '#fff',
        color_two: '#aaa',
        color_three: '#bbb',
        color_four: '#aaa',
        color_five: '#fff'
      }
      const actionToDispatch = addPalette(mockPalette)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.addPalette(mockPalette)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})