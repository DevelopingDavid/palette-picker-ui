import React, { Component } from 'react'
import Card from '../Card/Card'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import Modal from '@material-ui/core/Modal'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import makeNewProjectThunk from '../../Thunks/makeNewProjectThunk'
import shortid from 'shortid'

export class CardContainer extends Component {

  state = {
    open: false,
    projectName: ''
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // styles = theme => ({
  //   paper: {
  //     position: 'absolute',
  //     width: theme.spacing.unit * 50,
  //     backgroundColor: theme.palette.background.paper,
  //     boxShadow: theme.shadows[5],
  //     padding: theme.spacing.unit * 4,
  //     outline: 'none',
  //   },
  // });

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  createNewProject = async () => {
    console.log('hit!!!')
    const newProject = {
      name: this.state.projectName,
      palettes: this.props.currentPalette
    }
    await makeNewProjectThunk(newProject)
  }


  render() {
    const { classes } = this.props;
    const { currentPalette } = this.props
    const makeCards = currentPalette.map(color => {
      return <Card colorObject={color} key={shortid.generate()} />
    })

    return (
      <div className='card-container'>
        {makeCards}
        <Button className="generate-colors-btn" onClick={this.props.checkLockedColors}>Generate New Colors</Button>
        <Button
          className="save-palette-btn"
          onClick={this.handleOpen}>Save Palette
      </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className='modal'>
            <Typography variant="h6" id="modal-title">
              Save New Project
          </Typography>
          <input name='projectName' value={this.state.projectName} onChange={this.handleChange} />
          <Button className='save-new-project-btn' onClick={this.createNewProject}>
          Save New Project
          </Button>
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          </div>
        </Modal>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  currentPalette: state.currentPalette
})

export default connect(mapStateToProps)(CardContainer);
