import React from 'react';
import { Palette, mapDispatchToProps  } from './Palette';
import { createShallow } from '@material-ui/core/test-utils';

let mockPalette = {
  id: 72,
  color_one: "#00FF00",
  color_two: "#008000",
  color_three: "#00FFFF",
  color_four: "#3374FF",
  color_five: "#FF335E",
  created_at: "2019",
  updated_at: "2019",
  project_id: 51
}

let mockClasses = {
  nested: ''
}

let mockFunction = jest.fn();

describe('Palette', () => {
  let shallow;
  let wrapper
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(
      <Palette
        palette={mockPalette}
        fetchPalette={mockFunction}
        displaySavedPalette={mockFunction}
        classes={mockClasses} />
    );
  });

  it('should match Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should delete palette', async () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    await wrapper.instance().deletePalette();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`http://localhost:3001/api/v1/projects/${mockPalette.project_id}/palettes/${mockPalette.id}`, {"method": "DELETE"});

  });

  it('should display call upon displaySavedPalette', () => {
    wrapper.instance().displayPalette();
    expect(mockFunction).toHaveBeenCalled();
  });

});