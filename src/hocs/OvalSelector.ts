import {
  AllowedShape,
  IGeometry,
  IPoint,
  ISelector,
  ISelectorMethods,
} from '../types/index';
import { createSelectorMethods } from './SelectorUtils';

const square = (n: number) => Math.pow(n, 2);

export const TYPE = AllowedShape.Oval;

export function intersects({ x, y }: IPoint, geometry: IGeometry) {
  const rx = geometry.width / 2;
  const ry = geometry.height / 2;
  const h = geometry.x + rx;
  const k = geometry.y + ry;

  const value = square(x - h) / square(rx) + square(y - k) / square(ry);

  return value <= 1;
}

export function area(geometry: IGeometry) {
  const rx = geometry.width / 2;
  const ry = geometry.height / 2;

  return Math.PI * rx * ry;
}

export const methods: ISelectorMethods = createSelectorMethods(TYPE);

const OvalSelector: ISelector = {
  TYPE,
  intersects,
  area,
  methods,
};

export default OvalSelector;
