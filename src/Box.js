import React from 'react';

function Box({ id }) {
  return (
    <div className={`box ${id}`} key={id}>
      {id}
    </div>
  )
}

export default Box;
