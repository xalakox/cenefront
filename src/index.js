
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { history, store } from './configureStore';
import { Route, Switch } from 'react-router'; // react-router v4
import { ConnectedRouter } from 'connected-react-router';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route exact path="/" render={App} />
          <Route render={() => (<div>Miss</div>)} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('content'),
);
