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

const defaultImageUrl =
  'https://raw.githubusercontent.com/RobinNagpal/react-image-annotation-ts/HEAD/example/img.jpeg';

const meta: Meta = {
  title: 'StackedAnnotationsAnnotate',
  component: Annotation,
  argTypes,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export const Oval = OvalTemplateWithExistingAnnotations.bind({});
Oval.args = {
  src: defaultImageUrl,
  editorMode: EditorMode.Annotate,
  shapes: [OvalSelector.TYPE],
};

export const Rectangle = RectangleTemplateWithExistingAnnotations.bind({});
Rectangle.args = {
  src: defaultImageUrl,
  editorMode: EditorMode.Annotate,
  shapes: [RectangleSelector.TYPE],
};

export const Point = PointTemplateWithExistingAnnotations.bind({});
Point.args = {
  src: defaultImageUrl,
  editorMode: EditorMode.Annotate,
  shapes: [PointSelector.TYPE],
};
