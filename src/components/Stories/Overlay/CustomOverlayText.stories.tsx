import { Meta } from '@storybook/react';
import { EditorMode } from './../../../index';

import Annotation from './../../Annotation';
import {
  argTypes,
  RectangleTemplateWithExistingAnnotations,
} from './../Common/AnnotationStoryTemplate';

const meta: Meta = {
  title: 'Overlay/CustomOverlayText',
  component: Annotation,
  argTypes,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export const Default = RectangleTemplateWithExistingAnnotations.bind({});
Default.args = {
  editorMode: EditorMode.AnnotateOnly,
  overlayOptions: {
    displayOverlay: true,
    overlayText: 'Some custom text',
  },
};
