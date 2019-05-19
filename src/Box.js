import React, { Component } from 'react';

class Box extends Component {
  constructor(props) {
    super(props);
    this.updateBoxesCount();
  }

  componentWillReceiveProps() {
    this.updateBoxesCount();
  }

  updateBoxesCount() {
    const { grid } = this.props;
    this.totalBoxes = grid.rows * grid.cols;
  }

  isAtTop() {
    return this.props.index < this.props.grid.cols;
  }

  isAtBottom() {
    if(this.props.grid.rows === 1) return true;
    return this.props.index >= (this.props.totalBoxes - this.props.grid.cols);
  }

  isAtLeft() {
    return this.props.index % this.props.grid.cols === 0;
  }
  isAtRight() {
    return this.props.index % this.props.grid.cols === this.props.grid.cols - 1;
  }

  debuggerInfo(info, name) {
    const preStyle = {
      fontSize: 15,
      wordBreak: 'break-all',
    }
    const pStyle = {
      fontSize: 18
    }
    const wrapperStyle = {
      width: '80%'
    }
    return (
      <div className="debugger-info"
        style={wrapperStyle}>
        <p style={pStyle}> { name } </p>

        <pre style={preStyle}>
          {JSON.stringify(info, null, 2)}
        </pre>
      </div>
    )
  }

  renderExpandButtons() {
    return (
      <>
        { !this.isAtTop() ? <button className="expand-up">+</button> : '' }
        { !this.isAtLeft() ? <button className="expand-left">+</button> : '' }
        { !this.isAtBottom() ? <button className="expand-down">+</button> : '' }
        { !this.isAtRight() ? <button className="expand-right">+</button> : '' }
      </>
    )
  }


  render() {
    const { id, index, style } = this.props;
    return (
      <div
        className={`box ${index}`} key={id}
        style={{...style}}
        >
        { this.renderExpandButtons() }
        <div className="box-content">
          { this.debuggerInfo(this.props, 'props')}
          { this.debuggerInfo({ totalBoxes: this.totalBoxes }, 'total')}
        </div>
      </div>
    )
  }
}

export default Box;
