import React from 'react';
import { withShapeWrapper } from './withShapeWrapper';
import styled from 'styled-components';
import { ShapeProps } from '../../types/index';

const Container = styled.div`
  border-radius: 100%;
  box-shadow: 0 0 1px 1px white inset;
  box-sizing: border-box;
  transition: box-shadow 0.21s ease-in-out;
  z-index: 1;
  cursor: pointer;
`;

function Oval(props: ShapeProps) {
  const {
    annotation: { geometry },
    isMouseOver,
    onMouseEnter,
    onMouseLeave,
  } = props;
  if (!geometry) return null;

  return (
    <Container
      style={{
        position: 'absolute',
        left: `${geometry.x}%`,
        top: `${geometry.y}%`,
        height: `${geometry.height}%`,
        width: `${geometry.width}%`,
        border: isMouseOver ? 'solid 1px black' : 'dashed 2px black',
        boxShadow: isMouseOver ? '0 0 1px 1px black inset' : '',
        backgroundColor: isMouseOver
          ? 'rgba(128, 128, 128, 0.3)'
          : 'rgba(128, 128, 128, 0.05)',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}

export default withShapeWrapper(Oval);
