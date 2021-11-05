import { MouseEvent, TouchEvent } from 'react';
import {
  AllowedShape,
  IAnnotation,
  IContainer,
  IGeometry,
  IPoint,
  ISelector,
  ISelectorMethods,
  SelectionMode,
  SelectorMethodsOptions,
} from '../types/index';
import { getCoordPercentage } from '../utils/offsetCoordinates';

const MARGIN = 6;

const marginToPercentage = (container: IContainer) => ({
  marginX: (MARGIN / container.width) * 100,
  marginY: (MARGIN / container.height) * 100,
});

export const TYPE = AllowedShape.Point;

export function intersects(
  { x, y }: IPoint,
  geometry: IGeometry,
  container: IContainer
) {
  const { marginX, marginY } = marginToPercentage(container);

  if (x < geometry.x - marginX) return false;
  if (y < geometry.y - marginY) return false;
  if (x > geometry.x + marginX) return false;
  if (y > geometry.y + marginY) return false;

  return true;
}

export function area(_geometry: IGeometry, container: IContainer) {
  const { marginX, marginY } = marginToPercentage(container);

  return marginX * marginY;
}

export const methods: ISelectorMethods = {
  onClick(
    annotation: IAnnotation | undefined,
    e: TouchEvent | MouseEvent,
    options: SelectorMethodsOptions
  ): IAnnotation | undefined {
    if (!annotation?.geometry) {
      return {
        ...annotation,
        selection: {
          mode: SelectionMode.Final,
        },
        geometry: {
          ...getCoordPercentage(e)!,
          width: 0,
          height: 0,
          type: TYPE,
        },
        data: {
          id: options.idFunction(),
        },
      };
    }
    return;
  },
};

const PointSelector: ISelector = {
  TYPE,
  intersects,
  area,
  methods,
};

export default PointSelector;
