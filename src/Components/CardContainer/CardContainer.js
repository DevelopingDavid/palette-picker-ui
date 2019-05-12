import React, { Component } from 'react';
import Card from '../Card/Card';
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'

class CardContainer extends Component {

 render() {
  console.log('props', this.props)
  const { currentPalette } = this.props
  const makeCards = currentPalette.map(color => {
      return <Card colorObject={color} />
  })

   return (
     <div className='card-container'>
       { makeCards }
       <Button className="generate-colors-btn" onClick={this.props.generateColors}>Generate New Colors</Button>
       <Button className="save-palette-btn">Save Palette</Button>
     </div>
   )
 }
}

export const mapStateToProps = state => ({
  currentPalette: state.currentPalette
})

export default connect(mapStateToProps)(CardContainer);
