
import React from 'react';
import { Route, Switch } from 'react-router';
import SignInAndUp from './signinandup/index';
import Footer from './footer';
import Main from './main/index';
import Profesor from './main/profesor';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/main" component={Main} />
      <Route exact path="/profesor/:profesorId" component={Profesor} />
      <Route exact path="/" component={SignInAndUp} />
      <Route exact path="/signUp" component={SignInAndUp} />
      <Route exact path="/confirmarCorreo" component={SignInAndUp} />
      <Route render={() => (<div>404</div>)} />
    </Switch>
    <Footer />
  </div>
);
export default App;
