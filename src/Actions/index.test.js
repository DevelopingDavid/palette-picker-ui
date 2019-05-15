import * as actions from './index'

describe('addPalette', () => {
  let mockPalette;
  beforeEach(() => {
    mockPalette = [
      {
        hex: "#C2CF2A",
        locked: false
      },
      {
        hex: "#C2CF2A",
        locked: false
      },{
        hex: "#C2CF2A",
        locked: false
      },{
        hex: "#C2CF2A",
        locked: false
      },{
        hex: "#C2CF2A",
        locked: false
      }
    ]
  })
  it('should take in and return a palette if the action.type is ADD_PALETTE', () => {
    const results = actions.addPalette(mockPalette)
    const expected = {
      type: "ADD_PALETTE",
        palette: [{
          hex: "#C2CF2A",
          locked: false
        },{
          hex: "#C2CF2A",
          locked: false
        },{
          hex: "#C2CF2A",
          locked: false
        },{
          hex: "#C2CF2A",
          locked: false
        },{
          hex: "#C2CF2A",
          locked: false
        }
      ]
    }
    expect(results).toEqual(expected)
  })

  describe('toggleLocked', () => {
    it('should take in and return a color if the action.type is TOGGLE_LOCKED', () => {
      const color = '#fff'
      const results = actions.toggleLocked(color)
      const expected = {type: 'TOGGLE_LOCKED', color}
      expect(results).toEqual(expected)
    })
  })

  describe('makeNewProject', () => {
    it('should take in and return a project if the action.type is MAKE_NEW_PROJECT', () => {
      const project = {project_name: 'yeah'}
      const results = actions.makeNewProject(project)
      const expected = {type: 'MAKE_NEW_PROJECT', project}
      expect(results).toEqual(expected)
    })

    describe('isLoading', () => {
      it('should take in and return a boolean if the action.type is IS_LOADING', () => {
        const mockBool = 'false'
        const results = actions.isLoading(mockBool)
        const expected = {
          type: "IS_LOADING",
          isLoading: mockBool
        }
        expect(results).toEqual(expected)
      })
    })

    describe('hasError', () => {
      it('should take in and return a message when the action.type is HAS_ERROR', () => {
        const message = 'a;lskdjf'
        const results = actions.hasError(message)
        const expected = {
          type: "HAS_ERROR",
          message
        }
        expect(results).toEqual(expected)
      })
    })

    describe('addProjects', () => {
      it('should take in and return a projects array if the action.type is ADD_PROJECTS', () => {
        const projects = []
        const results = actions.addProjects(projects)
        const expected = {
          type: "ADD_PROJECTS",
          projects
        }
        expect(results).toEqual(expected)
      })
    })

    describe('displaySavedPalette', () => {
      it('should take in and return a palette if the action.type is DISPLAY_SAVED_PALETTE', () => {
        const results = actions.displaySavedPalette(mockPalette)
        const expected = {
          type: "DISPLAY_SAVED_PALETTE",
            palette: [{
              hex: "#C2CF2A",
              locked: false
            },{
              hex: "#C2CF2A",
              locked: false
            },{
              hex: "#C2CF2A",
              locked: false
            },{
              hex: "#C2CF2A",
              locked: false
            },{
              hex: "#C2CF2A",
              locked: false
            }
          ]
        }
        expect(results).toEqual(expected)
      })
    })
  })
})