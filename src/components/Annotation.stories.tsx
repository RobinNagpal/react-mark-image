import { ArgTypes } from '@storybook/addons/dist/ts3.9/types';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import Annotation, { AnnotationPropsOptional } from './Annotation';

const argTypes: ArgTypes = {
  src: {
    defaultValue:
      'https://raw.githubusercontent.com/RobinNagpal/react-image-annotation-ts/HEAD/demo.gif',
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

const Template: Story<AnnotationPropsOptional> = (args) => (
  <Annotation {...args} />
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
const defaultProps: AnnotationPropsOptional = {
  src:
    'https://raw.githubusercontent.com/RobinNagpal/react-image-annotation-ts/HEAD/demo.gif',
};
export const Default = Template.bind(defaultProps);

Default.args = {};
