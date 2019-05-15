import React from 'react';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { addPalette } from '../../Actions'
jest.mock('../../Actions')
import { createShallow } from '@material-ui/core/test-utils';

const mockPalette = [
  {
    hex: "#ffff",
    locked: false
  },
  {
    hex: "#fff",
    locked: false
  }, {
    hex: "#fffF68",
    locked: false
  }, {
    hex: "#fff",
    locked: false
  }, {
    hex: "#3C4F68",
    locked: false
  }
]

describe('App', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(
      <App currentPalette={mockPalette} addPalette={jest.fn()} />
      // <Project project={mockProject} fetchProjectsThunk={mockFunction} />
    )
  });
  it('should match Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

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