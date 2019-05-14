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

class ColorBox extends Component {
  constructor() {
    super() 
    this.state = {
      locked: false
    }
  }

  toggleLock = () => {
    const hex = this.props.colorObject.hex
    this.props.toggleLockInStore(hex)
    this.toggleLockInState()
  }

  toggleLockInState = () => {
    this.setState({
      locked: !this.state.locked
    })
  }
  
  render() {
    const { hex } = this.props.colorObject
    const { classes } = this.props;
    return (
      <Card className={`${classes.card} card`} 
        onClick={this.toggleLock}  
        >
        <CardContent style={{backgroundColor: hex, height: '12vw'}} className='color-container'>
        </CardContent>
        {
          this.state.locked ? <i className="material-icons lock-closed">lock</i> : <i className="material-icons lock-open">lock_open</i>
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

export default connect(null, mapDispatchToProps)(withStyles(styles)(ColorBox));