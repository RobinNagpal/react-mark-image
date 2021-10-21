import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default (props) => (
  <SyntaxHighlighter language="jsx" style={dark}>
    {props.children}
  </SyntaxHighlighter>
);
