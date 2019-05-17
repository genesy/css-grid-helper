import React, { useState } from 'react';
import './App.scss';
import Layout from './Layout';
import Settings from './Settings';
import Results from './Results';
import AppContext from './AppContext';
import Editor from './Editor';
import _ from 'lodash';

function App() {
  const [settings, setSettings] = useState({
    rows: 1,
    cols: 1,
    boxes: [],
    gap: '20px',
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
  });

  function editGrid(x, y) {
    const newSettings = { ...settings };
    newSettings[y] += x;
    if (newSettings[y] < 1) {
      newSettings[y] = 1;
    }
    setSettings(newSettings);
  }

  function addBox() {
    const newSettings = { ...settings };
    newSettings.boxes.push({ id: _.uniqueId('box_') })
    setSettings(newSettings);
  }

  function deleteBox(index) {
    let newSettings = { ...settings };
    newSettings.boxes.splice(index, 1);
    setSettings(newSettings);
  }

  return (
    <AppContext.Provider value={{
      settings,
      editGrid,
      addBox,
      deleteBox
    }}>
      <div className="App">
        <Layout>
          <Editor />
          <Settings/>
          <Results/>
        </Layout>
      </div>
    </AppContext.Provider>
  );
}

export default App;
