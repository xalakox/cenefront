
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { history, store, persistor } from './configureStore';
import { Route, Switch } from 'react-router'; // react-router v4
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';

import App from './components/app';
import LoadingView from './components/loadingView';

render(
  <Provider store={store}>
    <PersistGate loading={<LoadingView />} persistor={persistor}>
      <ConnectedRouter history={history}>
        <div>
          <Switch>
            <Route path="/" component={App} />
            <Route render={() => (<div>404</div>)} />
          </Switch>
        </div>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('content'),
);
