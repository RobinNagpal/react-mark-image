import { MouseEvent, TouchEvent } from 'react';
import { IAnnotation, IGeometry, IPoint, ISelector } from '../types/index';
import { getCoordPercentage } from '../utils/offsetCoordinates';

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

export const methods = {
  onTouchStart(annotation: IAnnotation, e: TouchEvent) {
    return pointerDown(annotation, e);
  },
  onTouchEnd(annotation: IAnnotation, e: TouchEvent) {
    return pointerUp(annotation, e);
  },
  onTouchMove(annotation: IAnnotation, e: TouchEvent) {
    return pointerMove(annotation, e);
  },
  onMouseDown(annotation: IAnnotation, e: MouseEvent) {
    return pointerDown(annotation, e);
  },
  onMouseUp(annotation: IAnnotation, e: MouseEvent) {
    return pointerUp(annotation, e);
  },
  onMouseMove(annotation: IAnnotation, e: MouseEvent) {
    return pointerMove(annotation, e);
  },
};

function pointerDown(annotation: IAnnotation, e: TouchEvent | MouseEvent) {
  if (!annotation.selection) {
    const { x: anchorX, y: anchorY } = getCoordPercentage(e);
    return {
      ...annotation,
      selection: {
        mode: 'SELECTING',
        anchorX,
        anchorY,
      },
    };
  } else {
    return {};
  }
}

function pointerUp(annotation: IAnnotation, _e: TouchEvent | MouseEvent) {
  if (annotation.selection) {
    const { geometry } = annotation;
    if (!geometry) {
      return {};
    }
    switch (annotation.selection.mode) {
      case 'SELECTING':
        return {
          ...annotation,
          selection: {
            ...annotation.selection,
            showEditor: true,
            mode: 'EDITING',
          },
        };
      default:
        break;
    }
  }
  return annotation;
}

function pointerMove(annotation: IAnnotation, e: TouchEvent | MouseEvent) {
  if (annotation.selection && annotation.selection.mode === 'SELECTING') {
    const { anchorX, anchorY } = annotation.selection;
    const { x: newX, y: newY } = getCoordPercentage(e);
    const width = newX! - anchorX!;
    const height = newY! - anchorY!;

    return {
      ...annotation,
      geometry: {
        ...annotation.geometry,
        type: TYPE,
        x: width > 0 ? anchorX : newX,
        y: height > 0 ? anchorY : newY,
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
