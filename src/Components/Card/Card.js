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

  toggleLock = () => {
    const hex = this.props.colorObject.hex
    // console.log('hex', hex)
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
    
    return (
      <div className='card' 
        // onClick={(hex) => this.props.toggleLockInStore(hex)}
        onClick={this.toggleLock} 
        style={{backgroundColor: hex}} 
        >
      {
        this.state.locked ? <i className="material-icons lock-closed">lock</i> : <i className="material-icons lock-open">lock_open</i>
      } 
        <p>{hex}</p>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  toggleLockInStore: (hex) => dispatch(toggleLocked(hex))
})

export default connect(null, mapDispatchToProps)(Card);