import { Meta, Story } from '@storybook/react';

import Annotation, { AnnotationPropsOptional } from './../Annotation';
import {
  argTypes,
  DefaultAnnotationStoryTemplate,
} from './AnnotationStoryTemplate';

const defaultImageUrl =
  'https://raw.githubusercontent.com/RobinNagpal/react-image-annotation-ts/HEAD/example/img.jpeg';

const meta: Meta = {
  title: 'Annotation',
  component: Annotation,
  argTypes,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryTemplate: Story<AnnotationPropsOptional> = DefaultAnnotationStoryTemplate;

export const Default = StoryTemplate.bind({});
Default.args = {
  src: defaultImageUrl,
};
