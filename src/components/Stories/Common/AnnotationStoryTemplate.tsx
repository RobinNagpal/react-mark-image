import { ArgTypes } from '@storybook/addons/dist/ts3.9/types';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import { AllowedShape } from '../../../types/index';
import Annotation, { AnnotationPropsOptional } from './../../Annotation';

const defaultImageUrl =
  'https://raw.githubusercontent.com/RobinNagpal/react-mark-image/HEAD/example/cats.jpg';

export const argTypes: ArgTypes = {
  src: {
    defaultValue: defaultImageUrl,
    control: {
      type: 'text',
    },
  },
};

const StoryComponent: (args: AnnotationPropsOptional) => React.ReactElement = (
  args: AnnotationPropsOptional
) => {
  const [annotations, setAnnotations] = useState<any[]>(args.annotations || []);

  return (
    <div style={{ width: '800px' }}>
      <Annotation
        annotations={annotations}
        onAnnotationsUpdate={setAnnotations}
        {...args}
      />
    </div>
  );
};

export const BaseStoryTemplateWithAnnotations: (
  config: AnnotationPropsOptional
) => Story<AnnotationPropsOptional> = (config: AnnotationPropsOptional) => {
  return (args: AnnotationPropsOptional) =>
    StoryComponent({ ...args, annotations: config.annotations });
};

export const DefaultAnnotationStoryTemplate: Story<AnnotationPropsOptional> =
  BaseStoryTemplateWithAnnotations({ annotations: [] });

export const ovalAnnotations = [
  {
    geometry: {
      type: AllowedShape.Oval,
      x: 33.25,
      y: 23.121134161694673,
      width: 20.875,
      height: 25.74853577097816,
    },
    data: {
      id: 'circle_1',
      text: 'circle 1 is great',
    },
  },
  {
    geometry: {
      type: AllowedShape.Oval,
      x: 45.875,
      y: 20.668892659696755,
      width: 20,
      height: 25.398215556407028,
    },
    data: {
      id: 'circle_2',
      text: 'circle 2 is awesome',
    },
  },
  {
    geometry: {
      type: AllowedShape.Oval,
      x: 43.75,
      y: 38.88554381739559,
      width: 20.5,
      height: 24.872735234550326,
    },
    data: {
      id: 'circle_3',
      text: 'circle 3 is Woohooo',
    },
  },
];

export const OvalTemplateWithExistingAnnotations: Story<AnnotationPropsOptional> =
  BaseStoryTemplateWithAnnotations({
    annotations: ovalAnnotations,
  });

export const rectangularAnnotations = [
  {
    geometry: {
      type: AllowedShape.Rectangle,
      x: 13.375,
      y: 28.20077727297608,
      width: 15.5,
      height: 22.070173517981278,
    },
    data: {
      id: 'rectangle_1',
      text: 'rectangle 1 is awesome',
    },
  },
  {
    geometry: {
      type: AllowedShape.Rectangle,
      x: 35.5,
      y: 40.286824675680116,
      width: 25.124999999999993,
      height: 23.29629426898024,
    },
    data: {
      id: 'rectangle_2',
      text: 'rectangle 2 is great',
    },
  },
  {
    geometry: {
      type: AllowedShape.Rectangle,
      x: 23.125,
      y: 58.67863594066451,
      width: 18.25,
      height: 18.917291586841095,
    },
    data: {
      id: 'rectangle_3',
      text: 'rectangle 3 is OMG',
    },
  },
  {
    geometry: {
      type: AllowedShape.Rectangle,
      x: 24.25,
      y: 31.353659204116262,
      width: 18.25,
      height: 31.1784990968307,
    },
    data: {
      id: 'rectangle_4',
      text: 'rectangle 4 is Woohooo',
    },
  },
];

export const RectangleTemplateWithExistingAnnotations: Story<AnnotationPropsOptional> =
  BaseStoryTemplateWithAnnotations({
    annotations: rectangularAnnotations,
  });

export const pointAnnotations = [
  {
    geometry: {
      x: 27.375,
      y: 34.50654113525645,
      width: 0,
      height: 0,
      type: AllowedShape.Point,
    },
    data: {
      id: 'point_1',
      text: 'point 1 is awesome',
    },
  },
  {
    geometry: {
      x: 31.125000000000004,
      y: 32.75494006240079,
      width: 0,
      height: 0,
      type: AllowedShape.Point,
    },
    data: {
      id: 'point_2',
      text: 'point 2 is great',
    },
  },
  {
    geometry: {
      x: 27.625,
      y: 35.73266188625541,
      width: 0,
      height: 0,
      type: AllowedShape.Point,
    },
    data: {
      id: 'point_3',
      text: 'point 3 OMG',
    },
  },
  {
    geometry: {
      x: 35.5,
      y: 43.61486671410586,
      width: 0,
      height: 0,
      type: AllowedShape.Point,
    },
    data: {
      id: 'point_4',
      text: 'point 5 is mind blowing',
    },
  },
  {
    geometry: {
      x: 50.74999999999999,
      y: 62.00667797909026,
      width: 0,
      height: 0,
      type: AllowedShape.Point,
    },
    data: {
      id: 'point_5',
      text: 'prrrrrr',
    },
  },
];

export const PointTemplateWithExistingAnnotations: Story<AnnotationPropsOptional> =
  BaseStoryTemplateWithAnnotations({
    annotations: pointAnnotations,
  });
