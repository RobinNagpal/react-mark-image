import { Meta, Story } from '@storybook/react';
import React, { CSSProperties, ReactElement, useState } from 'react';
import styled from 'styled-components';
import {
  EditorMode,
  IAnnotation,
  OvalSelector,
  PointSelector,
  RectangleSelector,
  RenderSelectedAnnotationIconsProps,
  WrappedShapeProps,
} from './../../../index';

import Annotation, { AnnotationPropsOptional } from './../../Annotation';
import Oval from './../../Shapes/Oval';
import Point from './../../Shapes/Point';
import Rectangle from './../../Shapes/Rectangle';
import {
  argTypes,
  ovalAnnotations,
  pointAnnotations,
  rectangularAnnotations,
} from './../Common/AnnotationStoryTemplate';
import CheckSvg from './icons/check.svg';
import CheckWhite from './icons/check_white.svg';
import CloseSvg from './icons/close.svg';

const meta: Meta = {
  title: 'Toolbar/AnnotationToolBarButtons',
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

  svg {
    background-color: white;
    color: white;
  }
`;

const CorrectDiv = styled.div`
  align-items: center;
  background-color: rgb(51, 88, 233);
  border-radius: 50%;
  color: white;
  display: flex;
  flex-shrink: 0;
  font-size: 1em;
  height: 36px;
  justify-content: center;
  padding: 0px 0px;
  position: relative;
  user-select: none;
  width: 36px;
  background-image: url(${CheckWhite});
  background-repeat: no-repeat;
  background-position: center;
`;

const CheckIcon = styled(StyledIcon)`
  background-image: url(${CheckSvg});
`;

const CloseIcon = styled(StyledIcon)`
  background-image: url(${CloseSvg});
`;

const renderShape = (props: WrappedShapeProps): ReactElement | null => {
  const { annotation } = props;
  const styles: CSSProperties = {};
  if (annotation.data.isCorrectChoice) {
    styles.display = 'flex';
    styles.alignItems = 'center';
    styles.justifyContent = 'center';
    styles.backgroundColor = 'rgba(0, 0, 120, 0.2)';
  }

  switch (annotation.geometry.type) {
    case RectangleSelector.TYPE:
      return (
        <Rectangle
          {...props}
          style={styles}
          children={annotation.data.isCorrectChoice ? <CorrectDiv /> : null}
        />
      );
    case PointSelector.TYPE:
      return (
        <Point
          {...props}
          style={styles}
          children={annotation.data.isCorrectChoice ? <CorrectDiv /> : null}
        />
      );
    case OvalSelector.TYPE:
      return (
        <Oval
          {...props}
          style={styles}
          children={annotation.data.isCorrectChoice ? <CorrectDiv /> : null}
        />
      );
    default:
      return null;
  }
};

function extracted(initData: IAnnotation[]) {
  const annotationsWithChoices: IAnnotation[] = [...initData];
  const poppedElement = annotationsWithChoices.pop()!;

  const correctChoice = {
    ...poppedElement,
    data: {
      ...poppedElement.data,
      isCorrectChoice: true,
    },
  };

  const AnnotationStory: Story<AnnotationPropsOptional> = (args) => {
    const [annotations, setAnnotations] = useState<IAnnotation[]>([
      ...annotationsWithChoices,
      correctChoice,
    ]);

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

    const renderSelectedAnnotationIcons = ({
      annotation: selectedAnnotation,
    }: RenderSelectedAnnotationIconsProps) => {
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
            showToolBar: true,
          }}
          {...args}
        />
      </div>
    );
  };
  return AnnotationStory;
}

export const OvalAnnotation = extracted(ovalAnnotations);

OvalAnnotation.args = {
  editorMode: EditorMode.AnnotateOnly,
  renderShape: renderShape,
};

export const RectangleAnnotation = extracted(rectangularAnnotations);

RectangleAnnotation.args = {
  editorMode: EditorMode.AnnotateOnly,
  renderShape: renderShape,
};

export const PointAnnotation = extracted(pointAnnotations);

PointAnnotation.args = {
  editorMode: EditorMode.AnnotateOnly,
  renderShape: renderShape,
};
