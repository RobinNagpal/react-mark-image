import React, { ComponentType, useState } from 'react';
import { ShapeProps, WrappedShapeProps } from '../../types';

export const withShapeWrapper = (
  DecoratedShape: ComponentType<ShapeProps>
): ComponentType<
  Omit<WrappedShapeProps, 'isMouseOver' | 'onMouseEnter' | 'onMouseLeave'>
> => {
  const WrappedComponent = (props: WrappedShapeProps) => {
    const { renderContent } = props;
    const [mouseHovered, setMouseHovered] = useState<boolean>(false);
    const reactElement =
      mouseHovered && renderContent ? renderContent(props) : null;

    return (
      <>
        <DecoratedShape
          {...props}
          isMouseOver={mouseHovered}
          onMouseEnter={() => setMouseHovered(true)}
          onMouseLeave={() => setMouseHovered(false)}
        />

        {reactElement}
      </>
    );
  };

  return WrappedComponent;
};
