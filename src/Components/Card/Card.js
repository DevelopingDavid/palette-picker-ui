import React from 'react';

const Card = (props) => {
  console.log("props in CARD",props)
  
  return (
    <div className='card' style={{backgroundColor: props.color}}>
      <i className="material-icons lock-open">lock_open</i>
      <p>{props.color.color}</p>
    </div>
  )
}

export default Card;