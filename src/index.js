import React from 'react';
import { render } from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'mobx-react';
import 'styles/core.less';
import DevTools from 'mobx-react-devtools';

if (__DEV__) {
  require('preact/devtools');

  const devToolsRoot = document.createElement('div');
  devToolsRoot.id = 'devtools';
  document.body.appendChild(devToolsRoot);
  render(<DevTools />, devToolsRoot);
}

let root = null;

function bootstrap (App) {
  root = render((
    <Provider {...store}>
      <App />
    </Provider>
  ), document.getElementById('root'), root);
}

bootstrap(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    bootstrap(require('./App').default);
  });
}
