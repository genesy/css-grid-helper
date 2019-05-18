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
    // const isSameBoxes = nextProps.context.settings.boxes !== this.props.context.settings.boxes;
    // console.log(isSameBoxes);
    const { settings: oldSettings } = this.props.context;
    const { settings: newSettings } = nextProps.context;
    // const isSameBoxes = _.isEqual(nextProps.context.settings.boxes, this.props.context.settings.boxes);
    // const isSameRows = _.isEqual(oldSettings.rows, newS)
    const isSameRows = oldSettings.rows === newSettings.rows;
    const isSameCols = oldSettings.cols === newSettings.cols;
    return !isSameCols || !isSameRows;
    // return !isSameBoxes;
  }
  componentDidUpdate() {
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

