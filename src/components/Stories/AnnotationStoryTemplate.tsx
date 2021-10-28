import { ArgTypes } from '@storybook/addons/dist/ts3.9/types';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
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
  const [annotations, setAnnotations] = useState<any[]>(args.annotations || []);

  return (
    <div style={{ width: '800px' }}>
      <Annotation
        annotations={annotations}
        onAnnotationsUpdate={setAnnotations}
        {...args}
      />
    </div>
  );
};
