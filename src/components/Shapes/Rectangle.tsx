import React from 'react';
import styled from 'styled-components';
import { EditorMode, ShapeProps } from '../../types/index';
import { withShapeWrapper } from './withShapeWrapper';

const Container = styled.div`
  box-shadow: 0 0 2px 2px white inset;
  box-sizing: border-box;
  transition: box-shadow 0.21s ease-in-out;
  z-index: ${({ isReadOnly }: { isReadOnly: boolean }) =>
    `${isReadOnly ? 0 : 1};`};
  cursor: ${({ isReadOnly }: { isReadOnly: boolean }) =>
    isReadOnly ? 'auto;' : 'pointer;'};
`;

function Rectangle(props: ShapeProps) {
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

export default React.memo(withShapeWrapper(Rectangle));
