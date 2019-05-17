import React from 'react';
import AppContext from './AppContext';

function Box({ name, id, deleteBox }, index) {
  return <AppContext.Consumer>
    {({deleteBox}) => (
      <div className={`box ${id}`} key={id}>
        <span className="delete-box" onClick={() => deleteBox(index)}>✖</span>
        {id}
      </div>
    )}
  </AppContext.Consumer>;
}

export default Box;
