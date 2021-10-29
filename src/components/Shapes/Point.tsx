import React from 'react';
import styled from 'styled-components';
import { ShapeProps } from '../../types/index';
import { withShapeWrapper } from './withShapeWrapper';

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

function Point(props: ShapeProps) {
  const {
    annotation: { geometry },
    isMouseOver,
    isSelected,
    onMouseEnter,
    onMouseLeave,
  } = props;
  if (!geometry) return null;

  const isActive = isMouseOver || isSelected;

  return (
    <Container
      style={{
        top: `${geometry.y}%`,
        left: `${geometry.x}%`,
        border: isActive ? 'solid 3px grey' : 'solid 3px white',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}

export default withShapeWrapper(Point);
