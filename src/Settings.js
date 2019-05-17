import React from 'react';
import AppContext from './AppContext';

function Settings({ settings }) {
  return (
    <AppContext.Consumer>
      {({ settings }) => (
        <pre style={{ whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(settings)}
        </pre>
      )}
    </AppContext.Consumer>
  )
}

export default Settings;
