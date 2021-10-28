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

export const TYPE = 'RECTANGLE';

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

const RectangleSelector: ISelector = {
  TYPE,
  intersects,
  area,
  methods,
};

export default RectangleSelector;
