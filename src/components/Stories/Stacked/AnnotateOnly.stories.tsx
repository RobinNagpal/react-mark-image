import { Meta } from '@storybook/react';
import {
  EditorMode,
  OvalSelector,
  PointSelector,
  RectangleSelector,
} from './../../../index';

import Annotation from './../../Annotation';
import {
  argTypes,
  OvalTemplateWithExistingAnnotations,
  PointTemplateWithExistingAnnotations,
  RectangleTemplateWithExistingAnnotations,
} from './../Common/AnnotationStoryTemplate';

const meta: Meta = {
  title: 'Stacked/AnnotateOnly',
  component: Annotation,
  argTypes,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export const Oval = OvalTemplateWithExistingAnnotations.bind({});
Oval.args = {
  editorMode: EditorMode.AnnotateOnly,
  shapes: [OvalSelector.TYPE],
};

export const Rectangle = RectangleTemplateWithExistingAnnotations.bind({});
Rectangle.args = {
  editorMode: EditorMode.AnnotateOnly,
  shapes: [RectangleSelector.TYPE],
};

export const Point = PointTemplateWithExistingAnnotations.bind({});
Point.args = {
  editorMode: EditorMode.AnnotateOnly,
  shapes: [PointSelector.TYPE],
};
