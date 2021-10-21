import React from 'react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Img = styled.img`
  display: block;
  width: 100%;
`;

interface ImageProps {
  alt?: string;
  className?: string;
  draggable?: boolean;
  setInnerRef: (el: HTMLImageElement | null) => void;
  src: string;
  style?: object;
}

export default function Image(props: ImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    props.setInnerRef(imageRef.current);
  }, [imageRef.current]);

  const { alt, className, draggable, src, style } = props;
  return (
    <Img
      alt={alt}
      className={className}
      draggable={draggable}
      ref={imageRef}
      src={src}
      style={style}
    />
  );
}
