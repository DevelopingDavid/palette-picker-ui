import React from 'react';
import Card from '../Card/Card';

const CardContainer = () => {
  const samplePalette = [
    {name: 'color_one', locked: false, color: 1 },
    {name: 'color_two', locked: false, color: 2},
    {name: 'color_three', locked: false, color: 3 },
    {name: 'color_four', locked: false, color: 4 },
    {name: 'color_five', locked: false, color: 5 },
  ];

  return (
    <div className='card-container'>
      {samplePalette.map(color => {
        return <Card color={color}/>
      })}
    </div>
  )
}

export default CardContainer;
