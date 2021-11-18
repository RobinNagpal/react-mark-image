import React from 'react';
import { withShapeWrapper } from './withShapeWrapper';
import styled from 'styled-components';
import { EditorMode, ShapeProps } from '../../types/index';

const Container = styled.div`
  border-radius: 100%;
  box-shadow: 0 0 2px 2px white inset;
  box-sizing: border-box;
  transition: box-shadow 0.21s ease-in-out;
  z-index: ${({ isReadOnly }: { isReadOnly: boolean }) =>
    `${isReadOnly ? 0 : 1};`};
  cursor: ${({ isReadOnly }: { isReadOnly: boolean }) =>
    isReadOnly ? 'auto;' : 'pointer;'};
`;

function Oval(props: ShapeProps) {
  const {
    annotation: { geometry },
    children,
    editorMode,
    isMouseOver,
    isSelected,
    onMouseEnter,
    onMouseLeave,
  } = props;
  const isReadOnly = editorMode === EditorMode.ReadOnly;

  if (!geometry) return null;

  const isActive = !isReadOnly && (isMouseOver || isSelected);

  return (
    <Container
      isReadOnly={isReadOnly}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'absolute',
        left: `${geometry.x}%`,
        top: `${geometry.y}%`,
        height: `${geometry.height}%`,
        width: `${geometry.width}%`,
        border: isActive ? 'solid 1px black' : 'dashed 2px black',
        boxShadow: isActive ? '0 0 1px 1px black inset' : '',
        backgroundColor: isActive
          ? 'rgba(128, 128, 128, 0.3)'
          : 'rgba(128, 128, 128, 0.05)',
        ...(props.style || {}),
      }}
    >
      {children || null}
    </Container>
  );
}

export default React.memo(withShapeWrapper(Oval));
