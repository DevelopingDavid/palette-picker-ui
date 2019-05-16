import React from 'react';
import { CardContainer, mapStateToProps, mapDispatchToProps } from './CardContainer';
import makeNewProjectThunk from '../../Thunks/makeNewProjectThunk';
import makeNewPaletteThunk from '../../Thunks/makeNewPaletteThunk';
import fetchProjectsThunk from '../../Thunks/fetchProjectsThunk';
import { createShallow } from '@material-ui/core/test-utils';
// import shortid from 'shortid';
// jest.mock('shortid');
// shortid.mockReturnValue("12345789");
jest.mock('../../Thunks/makeNewProjectThunk')
jest.mock('../../Thunks/makeNewPaletteThunk')
jest.mock('../../Thunks/fetchProjectsThunk')

let mockClasses = {
  root: '',
  paper: '',
  formControl: '',
  button: ''
};

const mockProjects = [
  {
    project_name: 'My Project',
    id: 50
  }
];

let mockPalette = [
  { hex: "#FB5985", locked: false },
  { hex: "#FFFFFF", locked: false },
  { hex: "#FFFFFF", locked: false },
  { hex: "#FFFFFF", locked: false },
  { hex: "#FFFFFF", locked: false }
];

describe('CardContainer', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(
      <CardContainer
        classes={mockClasses}
        currentPalette={mockPalette}
        projects={mockProjects} />
    )
  });

  it.skip('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should return styles for modal', () => {
    expect(wrapper.instance().getModalStyle()).toEqual({
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    });
  });

  it('should handle open', () => {
    wrapper.instance().handleOpen();
    expect(wrapper.state('open')).toEqual(true);
  });

  it('should handle close', () => {
    wrapper.instance().handleClose();
    expect(wrapper.state('open')).toEqual(false);
  });

  it('should handle change', () => {
    const fakeEvent = { target: { name: 'projectName', value: 'oi' } };
    wrapper.instance().handleChange(fakeEvent);
    expect(wrapper.state('projectName')).toEqual('oi');
  });

  it('should change state for new entry', () => {
    const instance = wrapper.instance();
    // jest.spyOn(instance, 'postPalette');
    wrapper.setState({ projectName: 'New Project' });

    instance.createNewProject();

    expect(wrapper.state('invalidName')).toEqual(false);
    // expect(instance.postPalette).toHaveBeenCalled();
  });

  it('should change state for old entry', () => {
    const instance = wrapper.instance();
    wrapper.setState({ projectName: 'My Project' });

    instance.createNewProject();

    expect(wrapper.state('invalidName')).toEqual(true);
  });

  it('should change the state for id', () => {
    const fakeEvent = { target: { value: '1' } };
    wrapper.instance().handleSelectChange(fakeEvent);
    expect(wrapper.state('selectedProjectId')).toEqual('1');
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
