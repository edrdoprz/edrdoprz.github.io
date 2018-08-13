import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
// import styled from 'styled-components';

import Home from './Home';
import TicTacToe from './TicTacToe';

// const Wrapper = styled.div`
//   height: 100%;
// `;

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/tic-tac-toe" component={TicTacToe} />
      </Switch>
    </Router>
  );
};

export default App;
