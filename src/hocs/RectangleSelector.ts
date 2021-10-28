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
            showEditor: true,
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
  if (annotation?.selection?.mode === 'SELECTING') {
    const { anchorX, anchorY } = annotation.selection;
    const { x: newX, y: newY } = getCoordPercentage(e)!;
    const width = newX! - anchorX!;
    const height = newY! - anchorY!;

    const x = width > 0 ? anchorX : newX;
    const y = height > 0 ? anchorY : newY;
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

const RectangleSelector: ISelector = {
  TYPE,
  intersects,
  area,
  methods,
};

export default RectangleSelector;
