import React from 'react';

const Card = (props) => {
  return (
    <div className='card'>
      <i className="material-icons lock-open">lock_open</i>
      <p>{props.color.color}</p>
    </div>
  )
}

export default Card;