import React, { forwardRef, Component } from 'react';
import AppContext from './AppContext';
import MonacoEditor from 'react-monaco-editor';
// import pretty from 'pretty';

class CSSEditor extends Component{
  render() {
    const { context } = this.props;
    const display ='';
    // const html = context.getHtml();
    // const d = document.createElement('div');
    // let display = '';
    // d.innerHTML = html;
    // const result = d.querySelector('.result');
    // if (result) {
    //   result.removeAttribute('style');
    //   display = pretty(d.innerHTML);
    // }


    return (
      <div className="css-editor-wrapper">
        <h1>CSS</h1>
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
      <CSSEditor
        context={context}
      />
    )}
  </AppContext.Consumer>
});
