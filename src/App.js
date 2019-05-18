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
      settings: {
        rows: 1,
        cols: 1,
        boxes: [],
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

  componentWillMount() {
    if (this.state.settings.boxes.length === 0) {
      this.addBox();
    }
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

  addBox() {
    const { settings } = this.state;
    const newSettings = { ...settings };
    newSettings.boxes.push({ id: _.uniqueId('box_') });
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
    const { deleteBox, addBox, editGrid, getHtml, setHtml } = this;
    const { settings } = this.state;
    return (
      <AppContext.Provider value={{
        settings,
        editGrid: editGrid.bind(this),
        addBox,
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
