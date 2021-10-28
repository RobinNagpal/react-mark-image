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
  title: 'StackedAnnotationsAnnotate',
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
  editorMode: EditorMode.Annotate,
  shapes: [OvalSelector.TYPE],
  annotations: [
    {
      geometry: {
        type: 'OVAL',
        x: 33.25,
        y: 23.121134161694673,
        width: 20.875,
        height: 25.74853577097816,
      },
      data: {
        id: 0.06820618880497009,
        text: 'circle 1 is great',
      },
    },
    {
      geometry: {
        type: 'OVAL',
        x: 45.875,
        y: 20.668892659696755,
        width: 20,
        height: 25.398215556407028,
      },
      data: {
        id: 0.5377627760248218,
        text: 'circle 2 is awesome',
      },
    },
    {
      geometry: {
        type: 'OVAL',
        x: 43.75,
        y: 38.88554381739559,
        width: 20.5,
        height: 24.872735234550326,
      },
      data: {
        id: 0.2866107008889738,
        text: 'circle 3 is Woohooo',
      },
    },
  ],
};

export const Rectangle = StoryTemplate.bind({});
Rectangle.args = {
  src: defaultImageUrl,
  editorMode: EditorMode.Annotate,
  shapes: [RectangleSelector.TYPE],
  annotations: [
    {
      geometry: {
        type: 'RECTANGLE',
        x: 13.375,
        y: 28.20077727297608,
        width: 15.5,
        height: 22.070173517981278,
      },
      data: {
        id: 0.6354036082020775,
        text: 'rectangle 1 is awesome',
      },
    },
    {
      geometry: {
        type: 'RECTANGLE',
        x: 35.5,
        y: 40.286824675680116,
        width: 25.124999999999993,
        height: 23.29629426898024,
      },
      data: {
        id: 0.2927749977194911,
        text: 'rectangle 2 is great',
      },
    },
    {
      geometry: {
        type: 'RECTANGLE',
        x: 23.125,
        y: 58.67863594066451,
        width: 18.25,
        height: 18.917291586841095,
      },
      data: {
        id: 0.6042324839873754,
        text: 'rectangle 3 is OMG',
      },
    },
    {
      geometry: {
        type: 'RECTANGLE',
        x: 24.25,
        y: 31.353659204116262,
        width: 18.25,
        height: 31.1784990968307,
      },
      data: {
        id: 0.09658012208210276,
        text: 'rectangle 4 is Woohooo',
      },
    },
  ],
};

export const Point = StoryTemplate.bind({});
Point.args = {
  src: defaultImageUrl,
  editorMode: EditorMode.Annotate,
  shapes: [PointSelector.TYPE],
  annotations: [
    {
      geometry: {
        x: 27.375,
        y: 34.50654113525645,
        width: 0,
        height: 0,
        type: 'POINT',
      },
      data: {
        id: 0.013204158033854219,
        text: 'point 1 is awesome',
      },
    },
    {
      geometry: {
        x: 31.125000000000004,
        y: 32.75494006240079,
        width: 0,
        height: 0,
        type: 'POINT',
      },
      data: {
        id: 0.47960881941169275,
        text: 'point 2 is great',
      },
    },
    {
      geometry: {
        x: 27.625,
        y: 35.73266188625541,
        width: 0,
        height: 0,
        type: 'POINT',
      },
      data: {
        id: 0.43760133237882637,
        text: 'point 3 OMG',
      },
    },
    {
      geometry: {
        x: 35.5,
        y: 43.61486671410586,
        width: 0,
        height: 0,
        type: 'POINT',
      },
      data: {
        id: 0.45050948559505843,
        text: 'point 5 is mind blowing',
      },
    },
    {
      geometry: {
        x: 50.74999999999999,
        y: 62.00667797909026,
        width: 0,
        height: 0,
        type: 'POINT',
      },
      data: {
        id: 0.32063690632538977,
        text: 'prrrrrr',
      },
    },
  ],
};
