import React from 'react';
import styled from 'styled-components';
import { EditorMode, ShapeProps } from '../../types/index';
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
  z-index: ${({ isReadOnly }: { isReadOnly: boolean }) =>
    `${isReadOnly ? 0 : 1};`};
  cursor: ${({ isReadOnly }: { isReadOnly: boolean }) =>
    isReadOnly ? 'auto;' : 'pointer;'};
`;

function Point(props: ShapeProps) {
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
        top: `${geometry.y}%`,
        left: `${geometry.x}%`,
        border: isActive ? 'solid 3px grey' : 'solid 3px white',
        ...(props.style || {}),
      }}
    >
      {children || null}
    </Container>
  );
}

export default React.memo(withShapeWrapper(Point));
