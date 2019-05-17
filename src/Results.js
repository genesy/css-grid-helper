import React from 'react';
import Box from './Box';
import AppContext from './AppContext';

function Results({
  editGrid,
  settings,
  deleteBox,
  addBox
}) {

  function style(settings) {
    return {
      '--rows': `repeat(${settings.rows}, 1fr)`,
      '--cols': `repeat(${settings.cols}, 1fr)`,
      '--gap': settings.gap
    }
  }

  return (
    <AppContext.Consumer>
      {({
        settings,
        editGrid,
        addBox
      }) => (
        <div className="result-container">
          <button className="col-sub" onClick={() => editGrid(-1, 'cols') }>-</button>
          <button className="row-sub" onClick={() => editGrid(-1, 'rows') }>-</button>
          <div
            className="result"
            style={style(settings)}
          >
            {
              settings.boxes.map((box,i) => (
                <Box key={box.id} deleteBox={deleteBox}/>
              ))
            }
            <div className="box add-box" onClick={() => addBox(1)}>Add Box</div>
          </div>
          <button className="col-add" onClick={() => editGrid(1, 'cols') }>+</button>
          <button className="row-add" onClick={() => editGrid(1, 'rows') }>+</button>
        </div>
      )}
    </AppContext.Consumer>
  );
}

export default Results;
