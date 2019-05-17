import React from 'react';
import AppContext from './AppContext';
import MonacoEditor from 'react-monaco-editor';

function Editor() {
  return (
    <AppContext.Consumer>
      {({css, settings}) => (
        <MonacoEditor
          language="css"
          theme="vs-dark"
          value={css}
          options={settings.editorOptions}
        />
      )}
    </AppContext.Consumer>
  )
}

export default Editor;
