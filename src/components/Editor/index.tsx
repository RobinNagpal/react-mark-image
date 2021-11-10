import React, { ChangeEvent, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import TextEditor from '../TextEditor';
import { IAnnotation } from '../../types/index';

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Container = styled.div`
  background: white;
  border-radius: 2px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  margin-top: 16px;
  transform-origin: top left;

  animation: ${fadeInScale} 0.31s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  z-index: 2;
`;

interface EditorProps {
  annotation: IAnnotation;
  className?: string;
  onSubmit: (e: IAnnotation) => void;
  style?: object;
}

function Editor(props: EditorProps) {
  const { geometry } = props.annotation;
  const [text, setText] = useState('');

  if (!geometry) return null;

  return (
    <Container
      className={props.className}
      style={{
        position: 'absolute',
        left: `${geometry.x}%`,
        top: `${geometry.y + geometry.height}%`,
        ...props.style,
      }}
    >
      <TextEditor
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setText(e.target.value)
        }
        onSubmit={() => {
          props.onSubmit({
            ...props.annotation,
            data: {
              ...props.annotation.data,
              text,
            },
          });
        }}
        value={text}
      />
    </Container>
  );
}

export default Editor;
