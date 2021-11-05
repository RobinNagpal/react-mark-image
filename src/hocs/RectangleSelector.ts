import {
  AllowedShape,
  IGeometry,
  IPoint,
  ISelector,
  ISelectorMethods,
} from '../types/index';
import { createSelectorMethods } from './SelectorUtils';

export const TYPE = AllowedShape.Rectangle;

export function intersects({ x, y }: IPoint, geometry: IGeometry) {
  if (x < geometry.x) return false;
  if (y < geometry.y) return false;
  if (x > geometry.x + geometry.width) return false;
  if (y > geometry.y + geometry.height) return false;

  return true;
}

export function area(geometry: IGeometry) {
  return geometry.height * geometry.width;
}

export const methods: ISelectorMethods = createSelectorMethods(TYPE);

const RectangleSelector: ISelector = {
  TYPE,
  intersects,
  area,
  methods,
};

export default RectangleSelector;
