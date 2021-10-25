import { ArgTypes } from '@storybook/addons/dist/ts3.9/types';
import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { IAnnotation } from 'src/types';
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

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing

const defaultProps: AnnotationPropsOptional = {
  src: defaultImageUrl,
};
export const Default = Template.bind(defaultProps);

Default.args = {};
