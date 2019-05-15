import React from 'react'
import { ColorBox, mapStateToProps, mapDispatchToProps } from './ColorBox';
import { createShallow } from '@material-ui/core/test-utils';
import { toggleLocked } from '../../Actions';

jest.mock('../../Actions');

let mockPalette = [
  { hex: "#FB5985", locked: false },
  { hex: "#FFFFFF", locked: false },
  { hex: "#FFFFFF", locked: false },
  { hex: "#FFFFFF", locked: false },
  { hex: "#FFFFFF", locked: false }
];

let mockColor = {
  hex:'#FB5985'
};

let mockClasses = {
  card: ''
};

let mockFunction = jest.fn();

describe('ColorBox', () => {
  let wrapper;
  let shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(
      <ColorBox
        currentPalette={mockPalette}
        colorObject={mockColor}
        toggleLockInStore={mockFunction}
        classes={mockClasses} />
    );
  });

  it('should match Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call upon toggleLockInStore', () => {
    wrapper.instance().toggleLock();
    expect(mockFunction).toHaveBeenCalled();
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