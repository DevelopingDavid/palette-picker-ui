import React, { Component } from 'react';
import Card from '../ColorBox/ColorBox';
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class CardContainer extends Component {

 render() {
  const { classes } = this.props;
  const { currentPalette } = this.props
  const makeCards = currentPalette.map(color => {
      return <Card key={color.hex} colorObject={color} />
  })

   return (
    <div>
      <div className='cards-container'>
        { makeCards }
      </div>
      <div className='buttons-container'>
        <Button variant="contained" color="primary" className={classes.button} onClick={this.props.generateColors}>Generate New Colors</Button>
        <Button variant="contained" color="secondary" className={classes.button}>Save Palette</Button>
      </div>
    </div>
   )
 }
}

export const mapStateToProps = state => ({
  currentPalette: state.currentPalette
})

export default connect(mapStateToProps)(withStyles(styles)(CardContainer));