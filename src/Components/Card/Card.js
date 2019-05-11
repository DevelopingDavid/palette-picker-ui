import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleLocked } from '../../Actions'

class Card extends Component {
  constructor() {
    super() 
    this.state = {
      locked: false
    }
  }

  toggleLockInState = () => {
    // console.log(this.props)
    this.props.toggleLockInStore(this.props.color.color)
    this.setState({
      locked: !this.state.locked
    })
  }
  
  render() {
    
    return (
      <div className='card' style={{backgroundColor: this.props.color.color}} onClick={this.toggleLockInState}>
      {
        this.state.locked ? <i className="material-icons lock-closed">lock</i> : <i className="material-icons lock-open">lock_open</i>
      } 
        <p>{this.props.color.color}</p>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  toggleLockInStore: (color) => dispatch(toggleLocked(color))
})

export default connect(null, mapDispatchToProps)(Card);