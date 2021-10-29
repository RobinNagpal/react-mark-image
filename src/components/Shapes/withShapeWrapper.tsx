import React, { ComponentType, useState } from 'react';
import { EditorMode, ShapeProps, WrappedShapeProps } from '../../types';

export const withShapeWrapper = (
  DecoratedShape: ComponentType<ShapeProps>
): ComponentType<
  Omit<WrappedShapeProps, 'isMouseOver' | 'onMouseEnter' | 'onMouseLeave'>
> => {
  const WrappedComponent = (props: WrappedShapeProps) => {
    const {
      annotation,
      editMode,
      onClick,
      renderContent,
      selectedAnnotation,
    } = props;
    const [mouseHovered, setMouseHovered] = useState<boolean>(false);

    const shouldShowContent =
      editMode === EditorMode.Annotate && mouseHovered && renderContent;

    const reactContentElement =
      shouldShowContent && props.annotation.data.text
        ? renderContent(props)
        : null;

    return (
      <div onClick={() => (onClick ? onClick(annotation) : false)}>
        <DecoratedShape
          {...props}
          isMouseOver={
            mouseHovered || annotation.data.id === selectedAnnotation?.data.id
          }
          onMouseEnter={() => setMouseHovered(true)}
          onMouseLeave={() => setMouseHovered(false)}
        />

        {reactContentElement}
      </div>
    );
  };

  return WrappedComponent;
};
