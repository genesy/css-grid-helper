import React, { useState } from 'react';
import './App.scss';
import MonacoEditor from 'react-monaco-editor';

const defaultCss = (`html {
  background: red
}`);
function App() {
  const [css, setCss] = useState(defaultCss);

  const options = {
    minimap: {
      enabled: false,
      scrollBeyondLastLine: false,
      scrollbar: {
        horizontal: 'auto',
        vertical: 'auto'
      }
    }
  }
  function onChange(code) {
    setCss(code);
  }
  return (
    <div className="App">
      <style>{css}</style>
      <div className="layout">
        <div className="settings">
        </div>
        <MonacoEditor
          language="css"
          theme="vs-dark"
          value={css}
          onChange={onChange}
          options={options}
        />
        <div className="result"></div>
      </div>
    </div>
  );
}

export default App;
