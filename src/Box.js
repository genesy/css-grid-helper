import React from 'react';

function Box({ id, index, grid }) {
  const totalBoxes = grid.rows * grid.cols;

  function isAtTop() {
    return index < grid.cols;
  }

  function isAtBottom() {
    return index >= (totalBoxes - grid.cols);
  }

  function isAtLeft() {
    return index % grid.cols === 0;
  }
  function isAtRight() {
    return index % grid.cols === grid.cols - 1;
  }

  function generateStyle(index) {
    let row;
    let col;
    const style = {
      gridRow: `${index}/${index+1}`
    };
    return style;
  }
  return (
    <div className={`box ${id}`} key={id} style={{...generateStyle()}}>
      { !isAtTop() ? <button className="expand-up">+</button> : '' }
      { !isAtLeft() ? <button className="expand-left">+</button> : '' }
      { !isAtBottom() ? <button className="expand-down">+</button> : '' }
      { !isAtRight() ? <button className="expand-right">+</button> : '' }
      <div className="box-content">
        {/* <pre>
          isAtTop: {isAtTop() ? 'true': 'false'}
          <br/>
          isAtBottom: {isAtBottom() ? 'true': 'false'}
          <br/>
          isAtLeft: {isAtLeft() ? 'true': 'false'}
          <br/>
          isAtRight: {isAtRight() ? 'true': 'false'}
        </pre> */}
        box {index}
      </div>
    </div>
  )
}

export default Box;
