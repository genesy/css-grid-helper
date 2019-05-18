import React, { Component, createRef } from 'react';
import Box from './Box';
import AppContext from './AppContext';

class Results extends Component {
  constructor(props) {
    super(props);
    this.innerRef = createRef();
  }
  style(settings) {
    return {
      '--rows': `repeat(${settings.rows}, 1fr)`,
      '--cols': `repeat(${settings.cols}, 1fr)`,
      '--gap': settings.gap
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { settings: oldSettings } = this.props.context;
    const { settings: newSettings } = nextProps.context;
    const isSameRows = oldSettings.rows === newSettings.rows;
    const isSameCols = oldSettings.cols === newSettings.cols;
    return !isSameCols || !isSameRows;
  }
  componentDidUpdate() {
    this.updateHtml();
  }

  componentDidMount() {
    this.updateHtml();
  }

  updateHtml() {
    const { setHtml } = this.props.context;
    setHtml(this.innerRef.current.outerHTML)
  }

  render() {
    const { editGrid, settings } = this.props.context;
    return (
      <div className="result-container">
        <button className="col-sub" onClick={() => editGrid(-1, 'cols') }>-</button>
        <button className="row-sub" onClick={() => editGrid(-1, 'rows') }>-</button>
        <div
          className="result"
          style={this.style(settings)}
          ref={this.innerRef}
        >
          {
            settings.boxes.map((box,i) => (
              <Box
                key={box.id}
                id={box.id}
                index={i}
                grid={{
                  rows: settings.rows,
                  cols: settings.cols
                }}
              />
            ))
          }
        </div>
        <button className="col-add" onClick={() => editGrid(1, 'cols') }>+</button>
        <button className="row-add" onClick={() => editGrid(1, 'rows') }>+</button>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <AppContext.Consumer>
    {(context) => (
      <Results context={context} ref={ref}/>
    )}
  </AppContext.Consumer>
));

