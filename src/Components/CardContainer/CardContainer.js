import React, { Component } from 'react'
import ColorBox from '../ColorBox/ColorBox'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import Modal from '@material-ui/core/Modal'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import makeNewProjectThunk from '../../Thunks/makeNewProjectThunk'
import makeNewPaletteThunk from '../../Thunks/makeNewPaletteThunk'
import fetchProjectsThunk from '../../Thunks/fetchProjectsThunk'
import shortid from 'shortid'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  formControl: {
    width: '60%'
  }
});

export class CardContainer extends Component {

  state = {
    open: false,
    projectName: '',
    selectedProjectId: '',
    invalidName: false
  };

  getModalStyle = () => {
    const top = 50
    const left = 50

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  createNewProject = async () => {
    const { projects, makeNewProjectThunk } = this.props
    const newProject = {
      project_name: this.state.projectName,
    }
    const foundProject = projects.find(project => project.project_name === this.state.projectName)
    if (!foundProject) {
      this.setState({ invalidName: false })
      const id = await makeNewProjectThunk(newProject)
      this.postPalette(id)
    } else {
      this.setState({ invalidName: true })
    }
  }

  saveToExistingProject = () => {
    const id = this.state.selectedProjectId
    const { currentPalette, fetchProjectsThunk, makeNewPaletteThunk } = this.props
    const paletteWithId = {
      project_id: id,
      color_one: currentPalette[0].hex,
      color_two: currentPalette[1].hex,
      color_three: currentPalette[2].hex,
      color_four: currentPalette[3].hex,
      color_five: currentPalette[4].hex
    }
    makeNewPaletteThunk(paletteWithId)
    fetchProjectsThunk()
  }

  postPalette = async (id) => {
    const { fetchProjectsThunk, makeNewPaletteThunk } = this.props
    const projects = await fetchProjectsThunk()
    const foundId = await projects.find((project) => {
      return project.id === id.id
    })
    const { currentPalette } = this.props
    const paletteWithId = {
      project_id: foundId.id,
      color_one: currentPalette[0].hex,
      color_two: currentPalette[1].hex,
      color_three: currentPalette[2].hex,
      color_four: currentPalette[3].hex,
      color_five: currentPalette[4].hex
    }
    makeNewPaletteThunk(paletteWithId)
    fetchProjectsThunk()
  }

  handleSelectChange = event => {
    this.setState({ selectedProjectId: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { currentPalette } = this.props
    const makeCards = currentPalette.map(color => {
      return <ColorBox colorObject={color} key={shortid.generate()} />
    })
    
    const displayMenuItems = this.props.projects.map(project => {
      return <MenuItem key={shortid.generate()} value={project.id}>{project.project_name}</MenuItem>
    })

    return (
      <div className='container'>

        <div className='cards-container'>
          {makeCards}
        </div>
        <div className='buttons-container'>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.props.checkLockedColors}>Generate New Colors</Button>
          <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleOpen}>Save Palette</Button>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={this.getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Save New Project
            </Typography>
            <input name='projectName' value={this.state.projectName} onChange={this.handleChange} />
            <Button className='save-new-project-btn' onClick={this.createNewProject}>
              Save New Project
            </Button>
            <Typography variant="subtitle1" id="simple-modal-description">
              or
            </Typography>
            { this.state.invalidName ? <Typography variant="subtitle1" id="invalid-name">Sorry, that name is already in use. {<br />} Please choose a new name.</Typography> : undefined }
            <form className={classes.root} id='save-form' autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Select Existing Project</InputLabel>
                <Select
                  value={this.state.selectedProjectId}
                  onChange={this.handleSelectChange} >
                  { displayMenuItems }
                </Select>
                <Button className='save-to-existing-project-btn' onClick={this.saveToExistingProject}>
                  Save
                </Button>
              </FormControl>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}

CardContainer.propTypes = {
  makeNewProjectThunk: PropTypes.func.isRequired,
  currentPalette: PropTypes.array.isRequired,
  checkLockedColors: PropTypes.func.isRequired,
  projects: PropTypes.array
}

export const mapDispatchToProps = (dispatch) => ({
  makeNewProjectThunk: (project) => dispatch(makeNewProjectThunk(project)),
  makeNewPaletteThunk: (palette) => dispatch(makeNewPaletteThunk(palette)),
  fetchProjectsThunk: () => dispatch(fetchProjectsThunk())
})

export const mapStateToProps = state => ({
  currentPalette: state.currentPalette,
  projects: state.projects
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardContainer));