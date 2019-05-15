import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleLocked } from '../../Actions'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 290
  }
};

export class ColorBox extends Component {
  constructor() {
    super() 
    this.state = {
      locked: false
    }
  }

  toggleLock = () => {
    const hex = this.props.colorObject.hex
    this.props.toggleLockInStore(hex)
  }

  
  render() {
    const foundColor = this.props.currentPalette.find(colorObj => {
      return colorObj.hex === this.props.colorObject.hex
    })
    const { hex } = this.props.colorObject
    const { classes } = this.props;
    return (
      <Card className={`${classes.card} card`} 
        onClick={this.toggleLock}  
        >
        <CardContent style={{backgroundColor: hex, height: '12vw'}} className='color-container'>
        </CardContent>
        {
          foundColor.locked ? <i className="material-icons lock-closed">lock</i> : <i className="material-icons lock-open">lock_open</i>
        } 
        <Typography className='color-code' variant="h6" color="inherit" noWrap>
          { hex }
        </Typography>
      </Card>
    )
  }
}

ColorBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const mapDispatchToProps = (dispatch) => ({
  toggleLockInStore: (hex) => dispatch(toggleLocked(hex))
});

export const mapStateToProps = (state) => ({
  currentPalette: state.currentPalette
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ColorBox));