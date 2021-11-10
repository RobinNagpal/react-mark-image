import React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

import NavBar from './components/NavBar';
import Root from './components/Root';
import Home from './components/Home';

const Main = styled.main`
  margin: 51px 16px 0;
`;

const App = () => {
  return (
    <Router basename="/react-mark-image">
      <Root>
        <NavBar title="react-mark-image" />
        <Main>
          <Route exact path="/" component={Home} />
        </Main>
      </Root>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
