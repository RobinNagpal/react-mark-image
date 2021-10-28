import { MouseEvent, TouchEvent } from 'react';
import {
  EditorMode,
  IAnnotation,
  IGeometry,
  IPoint,
  ISelector,
  ISelectorMethods,
  SelectionMode,
} from '../types/index';
import { getCoordPercentage } from '../utils/offsetCoordinates';
import { newAnnotation } from './SelectorUtils';

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
    return pointerDown(annotation, e);
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
    return pointerDown(annotation, e);
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

function pointerDown(
  annotation: IAnnotation | undefined,
  e: TouchEvent | MouseEvent
): IAnnotation | undefined {
  const selection = annotation?.selection;
  if (!selection) {
    return newAnnotation(TYPE, e);
  }

  return;
}

function pointerUp(
  annotation: IAnnotation | undefined,
  _e: TouchEvent | MouseEvent,
  editorMode: EditorMode
): IAnnotation | undefined {
  if (annotation?.selection) {
    const { geometry } = annotation;

    if (!geometry) {
      return;
    }

    switch (annotation.selection.mode) {
      case SelectionMode.Selecting:
        return {
          ...annotation,
          selection: {
            ...annotation.selection,
            mode:
              editorMode === EditorMode.HighlightOnly
                ? SelectionMode.Final
                : SelectionMode.Editing,
          },
        };
      default:
        break;
    }
  }
  return annotation;
}

function pointerMove(
  annotation: IAnnotation | undefined,
  e: TouchEvent | MouseEvent
): IAnnotation | undefined {
  if (annotation?.selection?.mode === SelectionMode.Selecting) {
    const { anchorX, anchorY } = annotation.selection;
    const { x: newX, y: newY } = getCoordPercentage(e)!;
    const width = newX! - anchorX!;
    const height = newY! - anchorY!;

    const x = width > 0 ? anchorX : newX;
    const y = height > 0 ? anchorY : newY!;
    return {
      ...annotation,
      geometry: {
        ...annotation.geometry,
        type: TYPE,
        // Fix types so that these defaults are not needed
        x: x ?? 0,
        y: y ?? 0,
        width: Math.abs(width),
        height: Math.abs(height),
      },
    };
  }
  return annotation;
}

const OvalSelector: ISelector = {
  TYPE,
  intersects,
  area,
  methods,
};

export default OvalSelector;
