import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default (props) => (
  <SyntaxHighlighter language="jsx" style={darcula}>
    {props.children}
  </SyntaxHighlighter>
);
