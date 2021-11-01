import { Meta, Story } from '@storybook/react';
import React, { CSSProperties, ReactElement, useState } from 'react';
import Oval from './../Shapes/Oval';
import Point from './../Shapes/Point';
import Rectangle from './../Shapes/Rectangle';
import { IAnnotation, PointSelector, RectangleSelector } from './../../index';
import styled from 'styled-components';
import { EditorMode, OvalSelector, RenderShapeProps } from './../../index';

import Annotation, { AnnotationPropsOptional } from './../Annotation';
import { argTypes, ovalAnnotations } from './AnnotationStoryTemplate';
import CheckSvg from './icons/check.svg';
import CloseSvg from './icons/close.svg';

const meta: Meta = {
  title: 'AnnotationToolBarButtons',
  component: Annotation,
  argTypes,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StyledIcon = styled.a`
  border-right: 1px solid #ccc;
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  background-color: ${({ isSelected }: { isSelected: boolean }) =>
    isSelected ? '#ccc' : '#efefef'};
`;

const CheckIcon = styled(StyledIcon)`
  background-image: url(${CheckSvg});
`;

const CloseIcon = styled(StyledIcon)`
  background-image: url(${CloseSvg});
`;

const renderShape = (props: RenderShapeProps): ReactElement | null => {
  const { annotation } = props;
  const styles: CSSProperties = {};
  if (annotation.data.isCorrectChoice) {
    styles.backgroundImage = `url(${CheckSvg})`;
    styles.backgroundRepeat = 'no-repeat';
    styles.backgroundPosition = 'center';
    styles.backgroundColor = 'rgba(0, 120, 0, 0.2)';
  }

  switch (annotation.geometry.type) {
    case RectangleSelector.TYPE:
      return <Rectangle {...props} style={styles} />;
    case PointSelector.TYPE:
      return <Point {...props} />;
    case OvalSelector.TYPE:
      return <Oval {...props} style={styles} />;
    default:
      return null;
  }
};

export const OvalAnnotation: Story<AnnotationPropsOptional> = (args) => {
  const [annotations, setAnnotations] = useState<any[]>(ovalAnnotations);

  const updateSelectedAnnotation = (
    selectedAnnotation: IAnnotation,
    isCorrectChoice: boolean
  ) => {
    const updated = annotations.map((annotation: IAnnotation) => ({
      ...annotation,
      data: {
        ...annotation.data,
        isCorrectChoice:
          annotation.data.id === selectedAnnotation.data.id
            ? isCorrectChoice
            : !!annotation.data.isCorrectChoice,
      },
    }));

    setAnnotations(updated);
  };

  const renderSelectedAnnotationIcons = (selectedAnnotation: IAnnotation) => {
    const markAsCorrectChoice = () =>
      updateSelectedAnnotation(selectedAnnotation, true);

    const markAsWrongChoice = () =>
      updateSelectedAnnotation(selectedAnnotation, false);

    return (
      <>
        <CheckIcon isSelected={false} onClick={() => markAsCorrectChoice()} />
        <CloseIcon isSelected={false} onClick={() => markAsWrongChoice()} />
      </>
    );
  };

  return (
    <div style={{ width: '800px' }}>
      <Annotation
        annotations={annotations}
        onAnnotationsUpdate={setAnnotations}
        toolBarOptions={{
          renderSelectedAnnotationIcons,
        }}
        {...args}
      />
    </div>
  );
};

OvalAnnotation.args = {
  editorMode: EditorMode.HighlightOnly,
  shapes: [OvalSelector.TYPE],
  renderShape: renderShape,
};
