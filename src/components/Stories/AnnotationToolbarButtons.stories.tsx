import { Meta } from '@storybook/react';
import {
  EditorMode,
  OvalSelector,
  PointSelector,
  RectangleSelector,
} from './../../index';

import Annotation from './../Annotation';
import {
  argTypes,
  OvalTemplateWithExistingAnnotations,
  PointTemplateWithExistingAnnotations,
  RectangleTemplateWithExistingAnnotations,
} from './AnnotationStoryTemplate';

const meta: Meta = {
  title: 'StackedAnnotationsHighlightOnly',
  component: Annotation,
  argTypes,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export const Oval = OvalTemplateWithExistingAnnotations.bind({});
Oval.args = {
  editorMode: EditorMode.HighlightOnly,
  shapes: [OvalSelector.TYPE],
};

export const Rectangle = RectangleTemplateWithExistingAnnotations.bind({});
Rectangle.args = {
  editorMode: EditorMode.HighlightOnly,
  shapes: [RectangleSelector.TYPE],
};

export const Point = PointTemplateWithExistingAnnotations.bind({});
Point.args = {
  editorMode: EditorMode.HighlightOnly,
  shapes: [PointSelector.TYPE],
};
