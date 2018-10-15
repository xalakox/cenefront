
import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
const ReactDOM = require('react-dom');

console.log({ React });
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { n: 0 };
  }
  handleClick = () => {
    this.setState({ n: this.state.n + 1 });
  }
  render() {
    return <div>
      <h1>clicked {this.state.n} times</h1>
      <button onClick={this.handleClick}>click me!</button>
    </div>
  }
  
};
ReactDOM.render(<App />, document.querySelector('#content'))
