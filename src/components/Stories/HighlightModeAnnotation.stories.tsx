import { Meta, Story } from '@storybook/react';
import {
  EditorMode,
  OvalSelector,
  PointSelector,
  RectangleSelector,
} from './../../index';

import Annotation, { AnnotationPropsOptional } from './../Annotation';
import {
  argTypes,
  DefaultAnnotationStoryTemplate,
} from './AnnotationStoryTemplate';

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

const StoryTemplate: Story<AnnotationPropsOptional> = DefaultAnnotationStoryTemplate;

export const Oval = StoryTemplate.bind({});

Oval.args = {
  src: defaultImageUrl,
  editorMode: EditorMode.HighlightOnly,
  shapes: [OvalSelector.TYPE],
};

export const Rectangle = StoryTemplate.bind({});
Rectangle.args = {
  src: defaultImageUrl,
  editorMode: EditorMode.HighlightOnly,
  shapes: [RectangleSelector.TYPE],
};

export const Point = StoryTemplate.bind({});
Point.args = {
  src: defaultImageUrl,
  editorMode: EditorMode.HighlightOnly,
  shapes: [PointSelector.TYPE],
};
