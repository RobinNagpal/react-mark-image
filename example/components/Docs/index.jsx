import React, { Component } from 'react';
import styled from 'styled-components';
import Highlight from '../Highlight';
import Multi from '../Samples/Multiple';
import Linked from '../Samples/Linked';
import Custom from '../Samples/Custom';
import Threaded from '../Samples/Threaded';
import Touch from '../Samples/Touch';
import multiCode from 'url:../Samples/Multiple/index.txt';
import linkedCode from 'url:../Samples/Linked/index.txt';
import touchCode from 'url:../Samples/Touch/index.txt';

const Container = styled.main`
  margin: 0 auto;
  padding-top: 16px;
  padding-bottom: 64px;
  max-width: 700px;
`;

const SourceLink = styled.a`
  display: block;
  margin-top: 8px;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
`;

export default class Docs extends Component {
  render() {
    return (
      <Container>
        <h1>Multiple Type/Shape Support</h1>
        <Multi />
        <Highlight>{multiCode}</Highlight>
        <h1>Controlled Active Annotations</h1>
        <Linked />
        <p>
          Hover over the text items above and notice how it triggers the active
          status of their respective annotations
        </p>
        <Highlight>{linkedCode}</Highlight>
        <h1>Custom Renderers/Components/Styles</h1>
        <Custom />
        <SourceLink
          target="_blank"
          href="https://github.com/RobinNagpal/react-mark-image/blob/master/example/components/Samples/Custom/index.jsx"
        >
          View source
        </SourceLink>
        <h1>Threaded Comments (Custom Content Overlay)</h1>
        <Threaded />
        <SourceLink
          target="_blank"
          href="https://github.com/RobinNagpal/react-mark-image/blob/master/example/components/Samples/Threaded/index.jsx"
        >
          View source
        </SourceLink>
        <h1>Touch support</h1>
        <Touch />
        <Highlight>{touchCode}</Highlight>
      </Container>
    );
  }
}
