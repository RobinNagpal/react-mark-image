import { MouseEvent, TouchEvent } from 'react';
import {
  EditorMode,
  IAnnotation,
  IGeometry,
  IPoint,
  ISelector,
  ISelectorMethods,
} from '../types/index';
import { pointerDown, pointerMove, pointerUp } from './SelectorUtils';

const square = (n: number) => Math.pow(n, 2);

export const TYPE = 'OVAL';

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

export const methods: ISelectorMethods = {
  onMouseDown(
    annotation: IAnnotation | undefined,
    e: MouseEvent,
    _editorMode: EditorMode
  ): IAnnotation | undefined {
    return pointerDown(annotation, e, TYPE);
  },

  onMouseUp(
    annotation: IAnnotation | undefined,
    e: MouseEvent,
    editorMode: EditorMode
  ): IAnnotation | undefined {
    return pointerUp(annotation, e, editorMode);
  },

  onMouseMove(
    annotation: IAnnotation | undefined,
    e: MouseEvent,
    _editorMode: EditorMode
  ): IAnnotation | undefined {
    return pointerMove(annotation, e);
  },

  onTouchStart(
    annotation: IAnnotation | undefined,
    e: TouchEvent,
    _editorMode: EditorMode
  ): IAnnotation | undefined {
    return pointerDown(annotation, e, TYPE);
  },

  onTouchEnd(
    annotation: IAnnotation | undefined,
    e: TouchEvent,
    editorMode: EditorMode
  ): IAnnotation | undefined {
    return pointerUp(annotation, e, editorMode);
  },

  onTouchMove(
    annotation: IAnnotation | undefined,
    e: TouchEvent,
    _editorMode: EditorMode
  ): IAnnotation | undefined {
    return pointerMove(annotation, e);
  },
};

const OvalSelector: ISelector = {
  TYPE,
  intersects,
  area,
  methods,
};

export default OvalSelector;
