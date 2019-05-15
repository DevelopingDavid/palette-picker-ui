import React from 'react'
import { ColorBox, mapStateToProps, mapDispatchToProps } from './ColorBox';
import { createShallow} from '@material-ui/core/test-utils';
import { toggleLocked } from '../../Actions';
jest.mock('../../Actions')

describe('ColorBox', () => {
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

    it('should dispatch toggleLockInStore', () => {
      const mockDispatch = jest.fn()
      const mockHex = '#fff'
      const actionToDispatch = toggleLocked(mockHex)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.toggleLockInStore(mockHex)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})