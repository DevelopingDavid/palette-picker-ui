import React, { Component } from 'react';
import HeaderBar from '../../HeaderBar/HeaderBar';
import CardContainer from '../../Components/CardContainer/CardContainer';
import { connect } from 'react-redux'
import { addPalette } from '../../Actions/'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentPalette: []
    }
  } 

  componentDidMount() {
    this.generateColors()
  }

  generateColors = () => {
    let currentPalette = [];
    let currentColor = {
      locked: false
    }
    for (var i = 0; i < 5; i++) {
      let color = '#' + Math.random().toString(16).slice(2, 8).toUpperCase()
      currentPalette.push({color: color, ...currentColor})
    }
    this.props.addPalette(currentPalette)
  }

  render () {
    return (
      <div className="app">
        <HeaderBar />
        <CardContainer 
          generateColors={this.generateColors}
          projects={this.state.projects} />
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  addPalette: (palette) => dispatch(addPalette(palette))
})

export default connect(null, mapDispatchToProps)(App);
