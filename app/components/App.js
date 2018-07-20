
import React, { Component } from 'react';

import Heading from './common/Heading';

import './App.scss';

export default class App extends Component {
  state = {
    name: 'Eduardo Perez',
  }

  render() {
    const { name } = this.state;

    return (
      <div className="App">
        <Heading>i am {name}.</Heading>
        <Heading>k. thanks. bye.</Heading>
      </div>
    );
  }
}
