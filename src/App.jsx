import { Component } from 'react';
import './App.css';

import Heading from './components/common/Heading';

export default class App extends Component {
  state = {
    name: 'Eduardo Perez',
  }

  render() {
    return (
      <div className="App">
        <Heading>i am {this.state.name}.</Heading>
        <Heading>k. thanks. bye.</Heading>
      </div>
    );
  }
}
