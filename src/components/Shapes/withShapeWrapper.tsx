import React, { ComponentType, useState } from 'react';
import { ShapeProps, WrappedShapeProps } from '../../types';

export const withShapeWrapper = (
  DecoratedShape: ComponentType<ShapeProps>
): ComponentType<
  Omit<WrappedShapeProps, 'isMouseOver' | 'onMouseEnter' | 'onMouseLeave'>
> => {
  const WrappedComponent = (props: WrappedShapeProps) => {
    const { isInSelectionMode, renderContent } = props;
    const [mouseHovered, setMouseHovered] = useState<boolean>(false);
    const reactElement =
      mouseHovered && renderContent && props.annotation.data.text
        ? renderContent(props)
        : null;

    return (
      <>
        <DecoratedShape
          {...props}
          isMouseOver={mouseHovered}
          onMouseEnter={() => {
            if (!isInSelectionMode) setMouseHovered(true);
          }}
          onMouseLeave={() => {
            if (!isInSelectionMode) setMouseHovered(false);
          }}
        />

        {reactElement}
      </>
    );
  };

  return WrappedComponent;
};
