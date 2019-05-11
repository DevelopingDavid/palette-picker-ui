import React, { Component } from 'react';
import HeaderBar from '../../HeaderBar/HeaderBar';
import CardContainer from '../../Components/CardContainer/CardContainer';

class App extends Component {
  render () {
    return (
      <div className="app">
        <HeaderBar />
        <CardContainer />
      </div>
    );
  }
}

export default App;
