import { Meta, Story } from '@storybook/react';
import {
  EditorMode,
  OvalSelector,
  PointSelector,
  RectangleSelector,
} from './../../index';

import Annotation, { AnnotationPropsOptional } from './../Annotation';
import { argTypes, Template } from './AnnotationStoryTemplate';

const defaultImageUrl =
  'https://raw.githubusercontent.com/RobinNagpal/react-image-annotation-ts/HEAD/example/img.jpeg';

const meta: Meta = {
  title: 'HighlightAnnotation',
  component: Annotation,
  argTypes,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryTemplate: Story<AnnotationPropsOptional> = Template;

export const Oval = StoryTemplate.bind({});
Oval.args = {
  src: defaultImageUrl,
  editorMode: EditorMode.HighlightOnly,
  type: OvalSelector.TYPE,
};

export const Rectangle = StoryTemplate.bind({});
Rectangle.args = {
  src: defaultImageUrl,
  editorMode: EditorMode.HighlightOnly,
  type: RectangleSelector.TYPE,
};

export const Point = StoryTemplate.bind({});
Point.args = {
  src: defaultImageUrl,
  editorMode: EditorMode.HighlightOnly,
  type: PointSelector.TYPE,
};
