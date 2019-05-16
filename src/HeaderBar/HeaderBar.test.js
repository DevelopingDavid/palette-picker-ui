import React from 'react'
import { HeaderBar, mapStateToProps, mapDispatchToProps } from './HeaderBar'
import { createShallow } from '@material-ui/core/test-utils'
import { fetchProjectsThunk } from '../Thunks/fetchProjectsThunk'
import { createShallow } from '@material-ui/core/test-utils';
jest.mock('../Thunks/fetchProjectsThunk')


let mockClasses = {
  root: '',
  paper: '',
  formControl: '',
  button: '',
};

let mockTheme = {
  theme: ''
}

const mockProjects = [
  {
    project_name: 'My Project',
    id: 50
  }
];

describe('HeaderBar', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(
      <HeaderBar 
        classes={mockClasses}
        theme={mockTheme}
        projects={mockProjects} />
    )
  });

  it('Should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set state on handleDrawerOpen', () => {
    wrapper.instance().handleDrawerOpen();
    expect(wrapper.state('open')).toEqual(true)
  });

  it('should set state on handleDrawerClose', () => {
    wrapper.instance().handleDrawerClose();
    expect(wrapper.state('open')).toEqual(false)
  });

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

  describe('mapDispatchToProps', () => {
    it('should dispatch fetchProjectsThunk', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = fetchProjectsThunk()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.fetchProjects()
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})