import React, { Component } from 'react';
import HeaderBar from '../../HeaderBar/HeaderBar';
import CardContainer from '../../Components/CardContainer/CardContainer';

class App extends Component {
  constructor() {
    super()
    this.state = {
      projects: []
    }
  } 

  componentDidMount() {
    this.generateColors()
  }

  generateColors = () => {
    let projects = [];
    for (var i = 0; i < 5; i++) {
      let color = '#' + Math.random().toString(16).slice(2, 8).toUpperCase()
      projects.push(color)
    }
    this.setState({ projects }) 
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

export default App;
