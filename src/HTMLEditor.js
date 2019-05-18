import React, { forwardRef, Component } from 'react';
import AppContext from './AppContext';
import MonacoEditor from 'react-monaco-editor';
import pretty from 'pretty';

class HTMLEditor extends Component{
  render() {
    const { context } = this.props;
    const html = context.getHtml();
    console.log(html)
    const d = document.createElement('div');
    let display = '';
    d.innerHTML = html;
    const result = d.querySelector('.result');
    if (result) {
      result.removeAttribute('style');
      display = pretty(d.innerHTML);
    }

    return (
      <div className="html-editor-wrapper">
        <h1>HTML</h1>
        <MonacoEditor
          language="html"
          theme="vs-dark"
          options={context.settings.editorOptions}
          value={display}
        />
      </div>
    )
  }
}

export default forwardRef((props, ref) => {
  return <AppContext.Consumer>
    {(context) => (
      <HTMLEditor
        context={context}
      />
    )}
  </AppContext.Consumer>
});
