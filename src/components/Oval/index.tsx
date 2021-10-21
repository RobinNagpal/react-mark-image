import React from 'react';
import styled from 'styled-components';
import { IAnnotation } from '../../types/index';

const Container = styled.div`
  border: dashed 2px black;
  border-radius: 100%;
  box-shadow: 0 0 1px 1px white inset;
  box-sizing: border-box;
  transition: box-shadow 0.21s ease-in-out;
`;

interface OvalProps {
  annotation: IAnnotation;
  className?: string;
  style?: object;
  active?: boolean;
}
function Oval(props: OvalProps) {
  const { geometry } = props.annotation;
  if (!geometry) return null;

  return (
    <Container
      className={props.className}
      style={{
        position: 'absolute',
        left: `${geometry.x}%`,
        top: `${geometry.y}%`,
        height: `${geometry.height}%`,
        width: `${geometry.width}%`,
        boxShadow: props.active ? '0 0 1px 1px yellow inset' : '',
        ...props.style,
      }}
    />
  );
}

export default Oval;
