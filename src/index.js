import React from 'react';
import ReactDOM from 'react-dom';
import DashApp from 'layouts/baseLayout';
import registerServiceWorker from './registerServiceWorker';
import 'settings/styles/antd/antd.less';
ReactDOM.render(<DashApp />, document.getElementById('root'));

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('layouts/baseLayout', () => {
    const NextApp = require('layouts/baseLayout').default;
    ReactDOM.render(<NextApp />, document.getElementById('root'));
  });
}
registerServiceWorker();
