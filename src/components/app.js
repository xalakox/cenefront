
import React from 'react';
import { Route, Switch } from 'react-router';
import SignInAndUp from './signinandup/index';
import Footer from './footer';
import Main from './main/index';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/main" component={Main}/>
          <Route exact path="/" component={SignInAndUp}/>
          <Route exact path="/signUp" component={SignInAndUp}/>
          <Route exact path="/confirmarCorreo" component={SignInAndUp}/>
          <Route render={() => (<div>404</div>)} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
