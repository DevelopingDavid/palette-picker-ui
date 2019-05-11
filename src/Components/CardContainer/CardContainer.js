import React from 'react';
import Card from '../Card/Card';
import Button from '@material-ui/core/Button'

const CardContainer = (props) => {
  const { projects } = props
  const makeCards = projects.map(color => {
    return <Card color={color}/>
  })
 
  return (
    <div className='card-container'>
      { makeCards }
      <Button className="generate-colors-btn" onClick={props.generateColors}>Generate New Colors</Button>
      <Button className="save-palette-btn">Save Palette</Button>
    </div>
  )
}

export default CardContainer;
