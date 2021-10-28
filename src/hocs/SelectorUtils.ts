import { MouseEvent, TouchEvent } from 'react';
import { IAnnotation, SelectionMode } from '../types';
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
      mode: SelectionMode.Selecting,
      anchorX,
      anchorY,
    },
    data: {
      id: Math.random(),
    },
  };
}
