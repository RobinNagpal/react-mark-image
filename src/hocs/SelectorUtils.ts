import { MouseEvent, TouchEvent } from 'react';
import { EditorMode, IAnnotation, SelectionMode } from '../types';
import { getCoordPercentage } from '../utils/offsetCoordinates';

export function newAnnotation(
  type: string,
  e: TouchEvent | MouseEvent
): IAnnotation {
  const { x: anchorX, y: anchorY } = getCoordPercentage(e)!;

  return {
    geometry: {
      x: 0,
      y: 0,
      type,
      width: 0,
      height: 0,
    },
    selection: {
      mode: SelectionMode.New,
      anchorX,
      anchorY,
    },
    data: {
      id: Math.random(),
    },
  };
}

export function pointerDown(
  annotation: IAnnotation | undefined,
  e: TouchEvent | MouseEvent,
  type: string
): IAnnotation | undefined {
  const selection = annotation?.selection;
  if (!selection) {
    return newAnnotation(type, e);
  }
  return;
}

export function pointerUp(
  annotation: IAnnotation | undefined,
  _e: TouchEvent | MouseEvent,
  editorMode: EditorMode
): IAnnotation | undefined {
  if (annotation?.selection) {
    const { geometry } = annotation;
    if (!geometry || annotation.selection.mode === SelectionMode.New) {
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

export function pointerMove(
  annotation: IAnnotation | undefined,
  e: TouchEvent | MouseEvent
): IAnnotation | undefined {
  if (
    annotation?.selection?.mode === SelectionMode.New ||
    annotation?.selection?.mode === SelectionMode.Selecting
  ) {
    const { anchorX, anchorY } = annotation.selection;
    const { x: newX, y: newY } = getCoordPercentage(e)!;
    const width = newX! - anchorX!;
    const height = newY! - anchorY!;

    const x = width > 0 ? anchorX : newX;
    const y = height > 0 ? anchorY : newY;
    return {
      ...annotation,
      selection: {
        ...annotation?.selection,
        mode: SelectionMode.Selecting,
      },
      geometry: {
        ...annotation.geometry,
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

export const createSelectorMethods = (type: string) => ({
  onMouseDown(
    annotation: IAnnotation | undefined,
    e: MouseEvent,
    _editorMode: EditorMode
  ): IAnnotation | undefined {
    return pointerDown(annotation, e, type);
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
    return pointerDown(annotation, e, type);
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
});
