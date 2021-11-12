import { Meta } from '@storybook/react';
import { EditorMode } from './../../../index';
import Annotation from './../../Annotation';
import {
  argTypes,
  OvalTemplateWithExistingAnnotations,
  PointTemplateWithExistingAnnotations,
  RectangleTemplateWithExistingAnnotations,
} from './../Common/AnnotationStoryTemplate';

const meta: Meta = {
  title: 'EditMode/ReadOnlyWithSelection',
  component: Annotation,
  argTypes,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export const Oval = OvalTemplateWithExistingAnnotations.bind({});
Oval.args = {
  editorMode: EditorMode.ReadOnlyWithSelection,
  onSelectedAnnotationUpdate: (annotation, selected) =>
    console.log('Annotation Selected : ', annotation, selected),
  onAnnotationClick: (annotation) =>
    console.log('Annotation Clicked : ', annotation),
  toolBarOptions: {
    showToolBar: false,
  },
};

export const Rectangle = RectangleTemplateWithExistingAnnotations.bind({});
Rectangle.args = {
  editorMode: EditorMode.ReadOnlyWithSelection,
  onSelectedAnnotationUpdate: (annotation, selected) =>
    console.log('Annotation Selected : ', annotation, selected),
  onAnnotationClick: (annotation) =>
    console.log('Annotation Clicked : ', annotation),
  toolBarOptions: {
    showToolBar: false,
  },
};

export const Point = PointTemplateWithExistingAnnotations.bind({});
Point.args = {
  editorMode: EditorMode.ReadOnlyWithSelection,
  onSelectedAnnotationUpdate: (annotation, selected) =>
    console.log('Annotation Selected : ', annotation, selected),
  onAnnotationClick: (annotation) =>
    console.log('Annotation Clicked : ', annotation),
  toolBarOptions: {
    showToolBar: false,
  },
};
