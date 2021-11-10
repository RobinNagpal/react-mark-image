import { Meta, Story } from '@storybook/react';

import Annotation, { AnnotationPropsOptional } from './../Annotation';
import {
  argTypes,
  DefaultAnnotationStoryTemplate,
} from './Common/AnnotationStoryTemplate';

const meta: Meta = {
  title: 'Annotation',
  component: Annotation,
  argTypes,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryTemplate: Story<AnnotationPropsOptional> =
  DefaultAnnotationStoryTemplate;

export const Default = StoryTemplate.bind({});
Default.args = {};
