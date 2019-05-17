import React from 'react';
import AppContext from './AppContext';

function Box({ name, id, deleteBox }, index) {
  return <AppContext.Consumer>
    {({deleteBox}) => (
      <div className={`box ${name}`} key={id}>
        <span className="delete-box" onClick={() => deleteBox(index)}>✖</span>
        {name}
      </div>
    )}
  </AppContext.Consumer>;
}

export default Box;
