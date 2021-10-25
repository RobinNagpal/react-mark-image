import { ArgTypes } from '@storybook/addons/dist/ts3.9/types';
import { Meta, Story } from '@storybook/react';
import { EditorMode, IAnnotation } from './../types/index';
import React, { useState } from 'react';

import Annotation, { AnnotationPropsOptional } from './Annotation';

const defaultImageUrl =
  'https://raw.githubusercontent.com/RobinNagpal/react-image-annotation-ts/HEAD/example/img.jpeg';

const argTypes: ArgTypes = {
  src: {
    defaultValue: defaultImageUrl,
    control: {
      type: 'text',
    },
  },
};

const meta: Meta = {
  title: 'Annotation',
  component: Annotation,
  argTypes,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<AnnotationPropsOptional> = (args) => {
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [annotation, setAnnotation] = useState<any>({});

  const onSubmit = (annotation: IAnnotation) => {
    const { geometry, data } = annotation;

    setAnnotation({});

    setAnnotations([
      ...annotations,
      {
        geometry,
        data: {
          ...data,
          id: Math.random(),
        },
      },
    ]);
  };

  return (
    <Annotation
      value={annotation}
      annotations={annotations}
      onChange={setAnnotation}
      onSubmit={onSubmit}
      {...args}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  src: defaultImageUrl,
};

export const HighlightOnlyAnnotations = Template.bind({});
HighlightOnlyAnnotations.args = {
  src: defaultImageUrl,
  editorMode: EditorMode.HighlightOnly,
};
