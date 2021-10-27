import React, { useState } from 'react';
import styled from 'styled-components';
import { IAnnotation } from '../../types/index';

const Container = styled.div`
  box-shadow: 0px 0px 1px 1px white inset;
  box-sizing: border-box;
  transition: box-shadow 0.21s ease-in-out;
  z-index: 1;
  cursor: pointer;
`;

interface RectangleProps {
  annotation: IAnnotation;
  className?: string;
  style?: object;
}

function Rectangle(props: RectangleProps) {
  const { geometry } = props.annotation;
  if (!geometry) return null;
  const [mouseHovered, setMouseHovered] = useState<boolean>(false);
  return (
    <Container
      className={props.className}
      style={{
        position: 'absolute',
        left: `${geometry.x}%`,
        top: `${geometry.y}%`,
        height: `${geometry.height}%`,
        width: `${geometry.width}%`,
        border: mouseHovered ? 'solid 1px black' : 'dashed 2px black',
        boxShadow: mouseHovered ? '0 0 1px 1px black inset' : '',
        backgroundColor: mouseHovered
          ? 'rgba(128, 128, 128, 0.3)'
          : 'rgba(128, 128, 128, 0.05)',

        ...props.style,
      }}
      onMouseEnter={() => setMouseHovered(true)}
      onMouseLeave={() => setMouseHovered(false)}
    />
  );
}

export default Rectangle;
