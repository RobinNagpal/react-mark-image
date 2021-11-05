import { Meta } from '@storybook/react';
import { EditorMode, RectangleSelector } from './../../../index';

import Annotation from './../../Annotation';
import {
  argTypes,
  RectangleTemplateWithExistingAnnotations,
} from './../Common/AnnotationStoryTemplate';

const meta: Meta = {
  title: 'Toolbar/NoToolbar',
  component: Annotation,
  argTypes,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export const Rectangle = RectangleTemplateWithExistingAnnotations.bind({});
Rectangle.args = {
  editorMode: EditorMode.AnnotateOnly,
  allowedShapes: [RectangleSelector.TYPE],
  toolBarOptions: {
    showToolBar: false,
  },
};
