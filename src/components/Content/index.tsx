import React from 'react';
import styled from 'styled-components';
import { IAnnotation } from '../../types/index';

const Container = styled.div`
  background: white;
  border-radius: 2px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  padding: 8px 16px;
  margin-top: 8px;
  margin-left: 8px;
  z-index: 2;
`;

export interface ContentProps {
  style?: {};
  className?: '';
  annotation: IAnnotation;
}

export default function Content(props: ContentProps) {
  const { geometry } = props.annotation;
  if (!geometry) return null;

  return (
    <Container
      style={{
        position: 'absolute',
        left: `${geometry.x}%`,
        top: `${geometry.y + geometry.height}%`,
        ...props.style,
      }}
      className={props.className}
    >
      {props.annotation.data && props.annotation.data.text}
    </Container>
  );
}
