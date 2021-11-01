import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { EditorMode, OvalSelector } from './../../index';

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

const renderSelectedAnnotationIcons = () => {
  return (
    <>
      <CheckIcon isSelected={false} />
      <CloseIcon isSelected={false} />
    </>
  );
};

export const Oval: Story<AnnotationPropsOptional> = (args) => {
  const [annotations, setAnnotations] = useState<any[]>(ovalAnnotations);

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

Oval.args = {
  editorMode: EditorMode.HighlightOnly,
  shapes: [OvalSelector.TYPE],
};
