import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import {createBrowserHistory} from 'history';

import {configureStore} from './store';
import {routes} from './routes';

import App from './containers/App/App';

import './static/scss/main.scss';

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div className='app'>
        <App routes={routes}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
