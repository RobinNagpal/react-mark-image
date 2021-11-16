import React, { ComponentType, useCallback, useState } from 'react';
import { EditorMode, ShapeProps, WrappedShapeProps } from '../../types';

export const withShapeWrapper = (
  DecoratedShape: ComponentType<ShapeProps>
): ComponentType<
  Omit<WrappedShapeProps, 'isMouseOver' | 'onMouseEnter' | 'onMouseLeave'>
> => {
  const WrappedComponent = (props: WrappedShapeProps) => {
    const {
      annotation,
      children,
      editorMode,
      isInSelectionMode,
      renderContent,
      selectedAnnotation,
      style,
    } = props;
    const [mouseHovered, setMouseHovered] = useState<boolean>(false);

    const shouldShowContent =
      editorMode === EditorMode.AnnotateWithText &&
      mouseHovered &&
      renderContent;

    const reactContentElement =
      shouldShowContent && props.annotation.data.text && renderContent
        ? renderContent(props)
        : null;

    const onMouseEnter = useCallback(() => setMouseHovered(true), []);
    const onMouseLeave = useCallback(() => setMouseHovered(false), []);
    const onClick = () => {
      if (props.onAnnotationClick) {
        props.onAnnotationClick(annotation);
      }
    };

    const shapeStyle = isInSelectionMode
      ? { zIndex: 0, ...(style || {}) }
      : style;

    return (
      <div onClick={onClick}>
        <DecoratedShape
          annotation={annotation}
          children={children}
          editorMode={editorMode}
          isMouseOver={mouseHovered}
          isSelected={
            !!selectedAnnotation &&
            annotation.data.id === selectedAnnotation.data.id
          }
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={shapeStyle}
        />

        {reactContentElement}
      </div>
    );
  };

  return WrappedComponent;
};
