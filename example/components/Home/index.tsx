import simple from 'bundle-text:./simple.txt';
import React, { Component } from 'react';
import styled from 'styled-components';
import GithubStarLink from '../GithubStarLink';
import Highlight from '../Highlight';
import Simple from '../Samples/Simple';

const Hero = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 36px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 20px;
  text-align: center;
`;

const Container = styled.main`
  margin: 0 auto;
  padding: 64px 0;
  max-width: 700px;
`;

const GithubButton = styled.div`
  margin-bottom: 16px;
`;

export default class App extends Component {
  render() {
    return (
      <Container>
        <Hero>
          <Title>React Image Annotation</Title>
          <Subtitle>
            An infinitely customizable image annotation library built on React
          </Subtitle>
          <GithubButton>
            <GithubStarLink />
          </GithubButton>
        </Hero>
        <h2>Install</h2>
        <Highlight>npm install --save react-mark-image</Highlight>
        <h2>Demo</h2>
        <Simple />
        <Highlight>{simple}</Highlight>
      </Container>
    );
  }
}
