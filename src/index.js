import React from 'react';
import ReactDOM from 'react-dom';
import storeConfig from './store';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

const store = storeConfig();
ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
