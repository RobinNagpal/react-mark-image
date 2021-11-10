import { Meta, Story } from '@storybook/react';
import {
  EditorMode,
  OvalSelector,
  PointSelector,
  RectangleSelector,
} from './../../../index';

import Annotation, { AnnotationPropsOptional } from './../../Annotation';
import {
  argTypes,
  DefaultAnnotationStoryTemplate,
} from './../Common/AnnotationStoryTemplate';

const meta: Meta = {
  title: 'EditMode/AnnotateOnly',
  component: Annotation,
  argTypes,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryTemplate: Story<AnnotationPropsOptional> =
  DefaultAnnotationStoryTemplate;

export const Oval = StoryTemplate.bind({});

Oval.args = {
  editorMode: EditorMode.AnnotateOnly,
  allowedShapes: [OvalSelector.TYPE],
};

export const Rectangle = StoryTemplate.bind({});
Rectangle.args = {
  editorMode: EditorMode.AnnotateOnly,
  allowedShapes: [RectangleSelector.TYPE],
};

export const Point = StoryTemplate.bind({});
Point.args = {
  editorMode: EditorMode.AnnotateOnly,
  allowedShapes: [PointSelector.TYPE],
};
