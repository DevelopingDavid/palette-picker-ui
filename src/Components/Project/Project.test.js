import React from 'react'
import { Project, mapStateToProps, mapDispatchToProps } from './Project';
import { createShallow } from '@material-ui/core/test-utils';
import shortid from 'shortid';

let mockProject = {
  id: 57,
  project_name: "Project 1"
};

let mockFunction = jest.fn();

describe('Project', () => {
  let wrapper;
  let shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(
      <Project project={mockProject} fetchProjectsThunk={mockFunction} />
    )
  });

  it('should match Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set state on toggleDrawer', () => {
    wrapper.instance().toggleDrawer();

    expect(wrapper.state('open')).toEqual(true);
  });

  it('should call upon fetchPalette on toggleDrawer', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'fetchPalette');
    instance.toggleDrawer();

    expect(instance.fetchPalette).toHaveBeenCalled();
  });

  it('should fetch all palletes & setState', () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    wrapper.instance().fetchPalette();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`http://localhost:3001/api/v1/projects/${mockProject.id}/palettes`);
  });

  it('should delete project', () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    const mockOptions = {method: 'DELETE'};
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    wrapper.instance().deleteProject();

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(`http://localhost:3001/api/v1/projects/${mockProject.id}`, mockOptions);
  });
});