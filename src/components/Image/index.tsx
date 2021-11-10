import React, { useRef } from 'react';
import styled from 'styled-components';

const Img = styled.img`
  display: block;
  width: 100%;
`;

interface ImageProps {
  alt?: string;
  draggable?: boolean;
  src: string;
  style?: object;
}

export default function Image(props: ImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  const { alt, draggable, src, style } = props;
  return (
    <Img
      alt={alt}
      draggable={draggable}
      ref={imageRef}
      src={src}
      style={style}
    />
  );
}
