import React, { Component, createRef } from 'react';
import './App.scss';
import Layout from './Layout';
import Settings from './Settings';
import Results from './Results';
import AppContext from './AppContext';
import _ from 'lodash';
import HTMLEditor from './HTMLEditor';
import CSSEditor from './CSSEditor';

class App extends Component {
  constructor(props) {
    super(props);
    this.resultsRef = createRef();
    this.state = {
      css: '',
      html: '',
      boxes: [],
      settings: {
        rows: 1,
        cols: 1,
        boxes: [],
        boxesStyle: [],
        gap: '15px',
        editorOptions: {
          minimap: {
            readOnly: true,
            enabled: false,
            scrollBeyondLastLine: false,
            scrollbar: {
              horizontal: 'auto',
              vertical: 'auto'
            }
          }
        }
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const oldState = this.state;
    const gridChanged = nextState.rows !== oldState.rows || nextState.cols !== oldState.cols;
    // const boxesChanged = nextState.boxes.length !== oldState.boxes.length,
    if (gridChanged) {
      this.recalculateBoxes();
    }

    console.log({ nextState })
  }

  componentWillMount() {
    if (this.state.settings.boxes.length === 0) {
      this.addBox();
    }
  }

  recalculateBoxes() {
    const boxesStyle = [];
    this.state.boxes.forEach(box => {
      boxesStyle.push()
    });
  }

  editGrid(x, y) {
    const { settings } = this.state;
    const newSettings = { ...settings };
    newSettings[y] += x;

    if (newSettings[y] < 1) {
      newSettings[y] = 1;
    }
    const totalBoxCount = newSettings.rows * newSettings.cols;
    const currentBoxCount = newSettings.boxes.length;

    if (totalBoxCount > currentBoxCount) {
      _.times(totalBoxCount - currentBoxCount, () => {
        this.addBox();
      })
    } else {
      _.times(currentBoxCount - totalBoxCount, (i) => {
        this.deleteBox(currentBoxCount - i - 1);
      })
    }

    this.setState({ settings: newSettings })
  }


  generateStyle({ grid, index }) {
    // const { grid, index } = this.props;
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
  addBox() {
    const { settings } = this.state;
    const newSettings = { ...settings };
    const index = newSettings.boxes.length;
    const grid = {
      rows: settings.rows,
      cols: settings.cols
    }
    newSettings.boxes.push({
      id: _.uniqueId('box_')
    });
    this.setState({ settings: newSettings })
  }
  updateBox(id, data) {
    const newSettings = {... this.state.settings };
    const index = _.findIndex(newSettings.boxes, { id });
    newSettings.boxes[index] = { ...newSettings.boxes[index], ...data };
    this.setState({ settings: newSettings })
  }

  deleteBox(index) {
    const { settings } = this.state;
    let newSettings = { ...settings };
    newSettings.boxes.splice(index, 1);
    this.setState({ settings: newSettings })
  }

  getHtml = () => {
    return this.state.html;
  }

  setHtml = (html) => {
    this.setState({ html });
  }

  render() {
    const { deleteBox, addBox, editGrid, getHtml, setHtml, updateBox } = this;
    const { settings } = this.state;
    return (
      <AppContext.Provider value={{
        settings,
        editGrid: editGrid.bind(this),
        addBox,
        updateBox: updateBox.bind(this),
        deleteBox,
        getHtml,
        setHtml
      }}>
        <div className="App">
          <Layout>
            <HTMLEditor/>
            <CSSEditor/>
            {/* <Settings/> */}
            <Results ref={this.resultsRef}/>
          </Layout>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
