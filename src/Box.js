import React, { Component } from 'react';

class Box extends Component {
  constructor(props) {
    super(props);
    const { grid } = this.props;
    this.totalBoxes = grid.rows * grid.cols;
  }

  isAtTop() {
    return this.props.index < this.props.grid.cols;
  }

  isAtBottom() {
    return this.props.index >= (this.totalBoxes - this.props.grid.cols);
  }

  isAtLeft() {
    return this.props.index % this.props.grid.cols === 0;
  }
  isAtRight() {
    return this.props.index % this.props.grid.cols === this.props.grid.cols - 1;
  }

  generateStyle() {
    const { grid, index } = this.props;
    const gridRowStart = Math.floor(index / grid.cols) + 1;
    const gridRowEnd = gridRowStart + 1;
    const gridColumnStart = (index % grid.cols) + 1;
    const gridColumnEnd = gridColumnStart + 1;
    console.log({
      index,
      cols: grid.cols,
      rows: grid.rows
    })
    const style = {
      gridRowStart,
      gridRowEnd,
      gridColumnStart,
      gridColumnEnd
    };
    return style;
  }

  render() {
    const { id, index, style } = this.props;
    return (
      <div
        className={`box ${index}`} key={id}
        style={this.generateStyle(index)}
        >
        { !this.isAtTop() ? <button className="expand-up">+</button> : '' }
        { !this.isAtLeft() ? <button className="expand-left">+</button> : '' }
        { !this.isAtBottom() ? <button className="expand-down">+</button> : '' }
        { !this.isAtRight() ? <button className="expand-right">+</button> : '' }
        <div className="box-content">
          <pre style={{fontSize: 15, wordBreak: 'break-all', whiteSpace: 'pre-line'}}>
            { JSON.stringify(style)}
            {/* cols: {grid.cols}<br/>
            rows: {grid.rows}<br/>
            { JSON.stringify(generateStyle(index)) } */}
          </pre>
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
}

export default Box;
