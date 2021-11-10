import React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

import NavBar from './components/NavBar';
import Root from './components/Root';
import Home from './components/Home';
import Docs from './components/Docs';
import Footer from './components/Footer';

const Main = styled.main`
  margin: 0 16px;
  margin-top: 51px;
`;

const App = () => {
  return (
    <Router basename="/react-mark-image">
      <Root>
        <NavBar title="react-mark-image" />
        <Main>
          <Route exact path="/" component={Home} />
          <Route path="/docs" component={Docs} />
        </Main>
        <Footer />
      </Root>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
