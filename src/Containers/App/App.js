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
    this.checkLockedColors()
  }

  checkLockedColors = () => {
    let currentPalette = []
    if (this.props.currentPalette.length) {
      this.props.currentPalette.map(colorObject => {
        if (colorObject.locked) {
          currentPalette.push(colorObject)
        } else {
          colorObject.hex =  '#' + Math.random().toString(16).slice(2, 8).toUpperCase()
          colorObject = {hex: colorObject.hex, locked: colorObject.locked}
          currentPalette.push(colorObject)
        }
        this.props.addPalette(currentPalette)
      })
    } else {
      this.generateNewPalette()
    }
  }

  generateNewPalette = async () => {
    let currentPalette = [];
    let currentColorObject = {
      locked: false
    }
    for(let i = 0; i < 5; i++) {
      let hex = '#' + Math.random().toString(16).slice(2, 8).toUpperCase()
      currentPalette.push({hex, ...currentColorObject})
    }
    await this.setState({ currentPalette })
    this.props.addPalette(this.state.currentPalette)
  }

  render () {
    return (
      <div className="app">
        <HeaderBar />
        <CardContainer 
          checkLockedColors={this.checkLockedColors}
          projects={this.state.projects} />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  currentPalette: state.currentPalette
})

export const mapDispatchToProps = (dispatch) => ({
  addPalette: (palette) => dispatch(addPalette(palette))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
