import React, { forwardRef, Component } from 'react';
import AppContext from './AppContext';
import MonacoEditor from 'react-monaco-editor';
import pretty from 'pretty';

class Editor extends Component{
  render() {
    const { context } = this.props;
    const html = context.getHtml();
    const d = document.createElement('div');
    let display = '';
    d.innerHTML = html;
    const result = d.querySelector('.result');
    if (result) {
      result.removeAttribute('style');
      display = pretty(d.innerHTML);
    }


    return (
      <MonacoEditor
        language="html"
        theme="vs-dark"
        options={context.settings.editorOptions}
        value={display}
      />
    )
  }
}

export default forwardRef((props, ref) => {
  return <AppContext.Consumer>
    {(context) => (
      <Editor
        context={context}
      />
    )}
  </AppContext.Consumer>
});
