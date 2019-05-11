import React, { Component } from 'react';

class Card extends Component {
  constructor() {
    super() 
    this.state = {
      locked: false
    }
  }

  toggleLock = () => {
    this.setState({
      locked: !this.state.locked
    })
  }

  render() {
    
    return (
      <div className='card' style={{backgroundColor: this.props.color}} onClick={this.toggleLock}>
      {
        this.state.locked ? <i className="material-icons lock-closed">lock</i> : <i className="material-icons lock-open">lock_open</i>
      } 
        <p>{this.props.color.color}</p>
      </div>
    )
  }
}

export default Card;