import React, { useState } from 'react';
import styled from 'styled-components';
import { IAnnotation } from '../../types/index';

const Container = styled.div`
  border-radius: 50%;
  box-sizing: border-box;
  // prettier-ignore
  box-shadow: 
          0 0 0 1px rgba(0, 0, 0, 0.3),
          0 0 0 2px rgba(0, 0, 0, 0.2),
          0 5px 4px rgba(0, 0, 0, 0.4);
  height: 16px;
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  width: 16px;
  z-index: 1;
  cursor: pointer;
`;
interface PointProps {
  annotation: IAnnotation;
}

function Point(props: PointProps) {
  const { geometry } = props.annotation;
  if (!geometry) return null;
  const [mouseHovered, setMouseHovered] = useState<boolean>(false);

  return (
    <Container
      style={{
        top: `${geometry.y}%`,
        left: `${geometry.x}%`,
        border: mouseHovered ? 'solid 3px grey' : 'solid 3px white',
      }}
      onMouseEnter={() => setMouseHovered(true)}
      onMouseLeave={() => setMouseHovered(false)}
    />
  );
}

export default Point;
