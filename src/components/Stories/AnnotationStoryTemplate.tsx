import { ArgTypes } from '@storybook/addons/dist/ts3.9/types';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import { IAnnotation } from './../../types/index';

import Annotation, { AnnotationPropsOptional } from './../Annotation';

const defaultImageUrl =
  'https://raw.githubusercontent.com/RobinNagpal/react-image-annotation-ts/HEAD/example/img.jpeg';

export const argTypes: ArgTypes = {
  src: {
    defaultValue: defaultImageUrl,
    control: {
      type: 'text',
    },
  },
};

export const Template: Story<AnnotationPropsOptional> = (args) => {
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
