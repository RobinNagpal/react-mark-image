import { MouseEvent, TouchEvent } from 'react';
import { SelectionMode } from '../types';
import { getCoordPercentage } from '../utils/offsetCoordinates';

export function newAnnotation(type: string, e: TouchEvent | MouseEvent) {
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
      showEditor: false,
      anchorX,
      anchorY,
    },
    data: {
      id: Math.random(),
    },
  };
}
