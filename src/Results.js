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

  function Boxes({ settings }) {
    console.log(settings)
    return settings.boxes.map((box,i) => (
      <Box key={box.id} id={box.id} deleteBox={deleteBox} index={i}/>
    ));
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
            <Boxes settings={settings} />
            {/* <div className="box add-box" onClick={() => addBox(1)}>Add Box</div> */}
          </div>
          {/* <div
            className="background-result"
            style={style(settings)}
          >
            {
              [...Array(settings.cols * settings.rows)].map((v,i) => (
                <Box key={'bg_box_' + i} />
              ))
            }
          </div> */}
          <button className="col-add" onClick={() => editGrid(1, 'cols') }>+</button>
          <button className="row-add" onClick={() => editGrid(1, 'rows') }>+</button>
        </div>
      )}
    </AppContext.Consumer>
  );
}

export default Results;
