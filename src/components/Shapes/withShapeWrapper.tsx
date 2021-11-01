import React, { ComponentType, useCallback, useState } from 'react';
import { EditorMode, ShapeProps, WrappedShapeProps } from '../../types';

export const withShapeWrapper = (
  DecoratedShape: ComponentType<ShapeProps>
): ComponentType<
  Omit<WrappedShapeProps, 'isMouseOver' | 'onMouseEnter' | 'onMouseLeave'>
> => {
  const WrappedComponent = (props: WrappedShapeProps) => {
    const { annotation, editMode, renderContent } = props;
    const [mouseHovered, setMouseHovered] = useState<boolean>(false);

    const shouldShowContent =
      editMode === EditorMode.Annotate && mouseHovered && renderContent;

    const reactContentElement =
      shouldShowContent && props.annotation.data.text
        ? renderContent(props)
        : null;

    const onMouseEnter = useCallback(() => setMouseHovered(true), []);
    const onMouseLeave = useCallback(() => setMouseHovered(false), []);
    const onClick = useCallback(() => {
      if (props.selectAnnotation) {
        props.selectAnnotation(annotation);
      }
    }, []);

    return (
      <div onClick={onClick}>
        <DecoratedShape
          annotation={props.annotation}
          isMouseOver={mouseHovered}
          isSelected={!!annotation.isSelected}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />

        {reactContentElement}
      </div>
    );
  };

  return WrappedComponent;
};
