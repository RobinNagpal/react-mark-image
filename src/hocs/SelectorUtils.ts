import { MouseEvent, TouchEvent } from 'react';
import {
  EditorMode,
  IAnnotation,
  ISelectorMethods,
  SelectionMode,
  SelectorMethodsOptions,
} from '../types';
import { getCoordPercentage } from '../utils/offsetCoordinates';

export function pointerDown(
  annotation: IAnnotation | undefined,
  e: TouchEvent | MouseEvent,
  options: SelectorMethodsOptions,
  type: string
): IAnnotation | undefined {
  const selection = annotation?.selection;
  if (!selection) {
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
        id: options.idFunction(),
      },
    };
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
              editorMode === EditorMode.AnnotateOnly
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

export const createSelectorMethods = (type: string): ISelectorMethods => ({
  onMouseDown(
    annotation: IAnnotation | undefined,
    e: MouseEvent,
    options: SelectorMethodsOptions
  ): IAnnotation | undefined {
    return pointerDown(annotation, e, options, type);
  },

  onMouseUp(
    annotation: IAnnotation | undefined,
    e: MouseEvent,
    { editorMode }: SelectorMethodsOptions
  ): IAnnotation | undefined {
    return pointerUp(annotation, e, editorMode);
  },

  onMouseMove(
    annotation: IAnnotation | undefined,
    e: MouseEvent
  ): IAnnotation | undefined {
    return pointerMove(annotation, e);
  },

  onTouchStart(
    annotation: IAnnotation | undefined,
    e: TouchEvent,
    options: SelectorMethodsOptions
  ): IAnnotation | undefined {
    return pointerDown(annotation, e, options, type);
  },

  onTouchEnd(
    annotation: IAnnotation | undefined,
    e: TouchEvent,
    { editorMode }: SelectorMethodsOptions
  ): IAnnotation | undefined {
    return pointerUp(annotation, e, editorMode);
  },

  onTouchMove(
    annotation: IAnnotation | undefined,
    e: TouchEvent
  ): IAnnotation | undefined {
    return pointerMove(annotation, e);
  },
});
